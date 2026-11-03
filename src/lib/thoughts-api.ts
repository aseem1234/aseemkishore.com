import { createHash, timingSafeEqual } from "node:crypto";
import {
  MAX_POST_BYTES,
  ThoughtsError,
  thoughtPage,
  validateSlug,
} from "@/lib/thoughts-model";
import type { createThoughtsService } from "@/lib/thoughts-service";

export function authorizeThoughts(
  request: Request,
  key = process.env.THOUGHTS_API_KEY,
) {
  const supplied = request.headers.get("x-api-key");
  if (
    !key ||
    !supplied ||
    !timingSafeEqual(
      createHash("sha256").update(key).digest(),
      createHash("sha256").update(supplied).digest(),
    )
  )
    throw new ThoughtsError(401, "Unauthorized.");
}

export function apiJson(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export function thoughtsApiError(error: unknown) {
  if (error instanceof ThoughtsError)
    return apiJson({ error: error.message }, error.status);
  // SDK errors can contain credentials or request payloads. Do not log them.
  console.error("Thoughts storage operation failed.");
  return apiJson(
    { error: "Thoughts storage is temporarily unavailable." },
    503,
  );
}

export async function readLimitedBytes(
  request: Request,
  limit: number,
): Promise<Buffer> {
  const reader = request.body?.getReader();
  if (!reader) throw new ThoughtsError(400, "Request body is required.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new ThoughtsError(413, "Request body is too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks);
}

export async function readLimitedJson(
  request: Request,
  limit = MAX_POST_BYTES,
): Promise<unknown> {
  const bytes = await readLimitedBytes(request, limit);
  try {
    return JSON.parse(bytes.toString("utf8"));
  } catch {
    throw new ThoughtsError(400, "Invalid JSON body.");
  }
}

type Service = ReturnType<typeof createThoughtsService>;
export function createThoughtsHandlers(
  service: Service,
  invalidate: (slug: string) => void,
  key?: string,
) {
  function refresh(slug: string) {
    try {
      invalidate(slug);
      return null;
    } catch {
      console.error("Thoughts saved but cache invalidation failed.");
      return "Write saved. Cache refresh failed; pages will refresh within about a minute.";
    }
  }
  return {
    async GET(request: Request) {
      try {
        authorizeThoughts(request, key);
        const query = new URL(request.url).searchParams;
        const page = Number(query.get("page") ?? 1),
          limit = Number(query.get("limit") ?? 50);
        if (
          !Number.isSafeInteger(page) ||
          page < 1 ||
          !Number.isInteger(limit) ||
          limit < 1 ||
          limit > 100
        ) {
          throw new ThoughtsError(
            400,
            "page must be a positive integer and limit must be 1–100.",
          );
        }
        return apiJson(thoughtPage(await service.all(), page, limit));
      } catch (error) {
        return thoughtsApiError(error);
      }
    },
    async POST(request: Request) {
      try {
        authorizeThoughts(request, key);
        if (
          request.headers.get("content-type")?.split(";")[0].trim() !==
          "application/json"
        ) {
          throw new ThoughtsError(
            415,
            "Content-Type must be application/json.",
          );
        }
        const { post, created } = await service.save(
          await readLimitedJson(request),
        );
        const warning = refresh(post.slug);
        return apiJson(
          {
            post,
            url: `/thoughts/${post.slug}`,
            ...(warning ? { warning } : {}),
          },
          warning ? 202 : created ? 201 : 200,
        );
      } catch (error) {
        return thoughtsApiError(error);
      }
    },
    async DELETE(
      request: Request,
      { params }: { params: Promise<{ slug: string }> },
    ) {
      try {
        authorizeThoughts(request, key);
        const slug = validateSlug((await params).slug);
        await service.remove(slug);
        const warning = refresh(slug);
        return apiJson(
          { slug, unpublished: true, ...(warning ? { warning } : {}) },
          warning ? 202 : 200,
        );
      } catch (error) {
        return thoughtsApiError(error);
      }
    },
  };
}
