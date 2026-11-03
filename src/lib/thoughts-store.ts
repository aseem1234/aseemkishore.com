import {
  BlobError,
  BlobPreconditionFailedError,
  get,
  list,
  put,
} from "@vercel/blob";
import {
  ThoughtsError,
  validateSlug,
  type ThoughtPost,
} from "@/lib/thoughts-model";

export type ThoughtRecord = {
  slug: string;
  post: ThoughtPost | null;
  updatedAt: string;
};
export type StoredThought = { record: ThoughtRecord; etag: string };
export interface ThoughtsStore {
  read(slug: string): Promise<StoredThought | null>;
  all(): Promise<ThoughtRecord[]>;
  write(slug: string, record: ThoughtRecord, etag?: string): Promise<void>;
}

const PREFIX = "thoughts/posts/";

export function createBlobThoughtsStore(
  client = { get, list, put },
  getToken = () => process.env.THOUGHTS_POSTS_READ_WRITE_TOKEN,
): ThoughtsStore {
  return {
    async read(slug) {
      validateSlug(slug);
      const token = getToken();
      if (!token) return null;
      // Consistent origin reads are supported for private Blob stores only.
      const result = await client.get(`${PREFIX}${slug}.json`, {
        access: "private",
        token,
        useCache: false,
        headers: { "accept-encoding": "identity" },
      });
      if (!result) return null;
      if (result.statusCode !== 200 || !result.blob.etag)
        throw new Error("Unexpected Blob response");
      const record = (await new Response(
        result.stream,
      ).json()) as ThoughtRecord;
      // HTTP compression can mark a content-equivalent ETag weak. Blob writes
      // require the strong object ETag, with the same quoted digest.
      return { record, etag: result.blob.etag.replace(/^W\//, "") };
    },
    async all() {
      const token = getToken();
      if (!token) return [];
      const records: ThoughtRecord[] = [];
      let cursor: string | undefined;
      do {
        const batch = await client.list({
          token,
          prefix: PREFIX,
          cursor,
          limit: 1000,
        });
        // Bound fan-out even as the archive grows. Never truncate at Blob's first page.
        for (let i = 0; i < batch.blobs.length; i += 20) {
          const group = batch.blobs.slice(i, i + 20);
          const values = await Promise.all(
            group.map((blob) =>
              this.read(blob.pathname.slice(PREFIX.length, -5)),
            ),
          );
          records.push(
            ...values.flatMap((value) => (value ? [value.record] : [])),
          );
        }
        cursor = batch.hasMore ? batch.cursor : undefined;
      } while (cursor);
      return records;
    },
    async write(slug, record, etag) {
      validateSlug(slug);
      const token = getToken();
      if (!token)
        throw new ThoughtsError(503, "Thoughts storage is not configured.");
      try {
        await client.put(`${PREFIX}${slug}.json`, JSON.stringify(record), {
          access: "private",
          token,
          addRandomSuffix: false,
          allowOverwrite: Boolean(etag),
          ...(etag ? { ifMatch: etag } : {}),
          contentType: "application/json",
          cacheControlMaxAge: 60,
        });
      } catch (error) {
        if (
          error instanceof BlobPreconditionFailedError ||
          (error instanceof BlobError && /already exists/i.test(error.message))
        ) {
          throw new ThoughtsError(
            409,
            "Slug exists or changed during this request. Read the latest post before retrying with update: true.",
          );
        }
        throw error;
      }
    },
  };
}

export const blobThoughtsStore = createBlobThoughtsStore();
