import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import {
  apiJson,
  authorizeThoughts,
  readLimitedBytes,
  readLimitedJson,
  thoughtsApiError,
} from "@/lib/thoughts-api";
import { ThoughtsError } from "@/lib/thoughts-model";

export const MAX_MEDIA_BYTES = 50 * 1024 * 1024;
export const MAX_MULTIPART_BYTES = 4 * 1024 * 1024;
const MEDIA_TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  mp4: "video/mp4",
};

export function validateMedia(name: string, type: string, size: number) {
  const extension = name.split(".").pop()?.toLowerCase() ?? "";
  const normalizedType = type.trim().toLowerCase();
  if (!MEDIA_TYPES[extension] || MEDIA_TYPES[extension] !== normalizedType) {
    throw new ThoughtsError(
      400,
      "File extension and Content-Type must match PNG, JPEG, WebP, GIF or MP4.",
    );
  }
  if (!Number.isSafeInteger(size) || size < 1 || size > MAX_MEDIA_BYTES) {
    throw new ThoughtsError(413, "Media must be between 1 byte and 50 MiB.");
  }
  return extension;
}

function matchesSignature(bytes: Buffer, type: string) {
  switch (type) {
    case "image/png":
      return bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    case "image/jpeg":
      return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    case "image/gif":
      return /^GIF8[79]a/.test(bytes.toString("ascii", 0, 6));
    case "image/webp":
      return (
        bytes.toString("ascii", 0, 4) === "RIFF" &&
        bytes.toString("ascii", 8, 12) === "WEBP"
      );
    case "video/mp4":
      return bytes.toString("ascii", 4, 8) === "ftyp";
    default:
      return false;
  }
}

export function createThoughtsMediaHandler({
  key,
  uploadFile = put,
  directUpload = handleUpload,
}: {
  key?: string;
  uploadFile?: typeof put;
  directUpload?: typeof handleUpload;
} = {}) {
  return async (request: Request) => {
    try {
      authorizeThoughts(request, key);
      const contentType = request.headers.get("content-type") ?? "";
      const mediaType = contentType.split(";")[0].trim().toLowerCase();
      if (mediaType === "application/json") {
        const body = (await readLimitedJson(
          request,
          16_384,
        )) as Partial<HandleUploadBody>;
        // No completion webhook is needed: upload() returns the public URL directly.
        if (
          !body ||
          body.type !== "blob.generate-client-token" ||
          !body.payload ||
          typeof body.payload.pathname !== "string" ||
          typeof body.payload.clientPayload !== "string" ||
          typeof body.payload.multipart !== "boolean"
        ) {
          throw new ThoughtsError(400, "Expected a Blob client-token request.");
        }
        const result = await directUpload({
          request,
          body: body as HandleUploadBody,
          onBeforeGenerateToken: async (pathname, clientPayload) => {
            if (
              !/^thoughts\/media\/[a-zA-Z0-9_-]{1,120}\.(?:png|jpe?g|webp|gif|mp4)$/.test(
                pathname,
              )
            ) {
              throw new ThoughtsError(
                400,
                "Upload path must be thoughts/media/<filename> with an allowed extension.",
              );
            }
            let meta: { size?: unknown; contentType?: unknown };
            try {
              meta = JSON.parse(clientPayload ?? "");
            } catch {
              throw new ThoughtsError(
                400,
                "clientPayload must describe size and contentType.",
              );
            }
            if (
              !meta ||
              typeof meta.contentType !== "string" ||
              typeof meta.size !== "number"
            ) {
              throw new ThoughtsError(
                400,
                "clientPayload must describe size and contentType.",
              );
            }
            validateMedia(pathname, meta.contentType, meta.size);
            return {
              allowedContentTypes: [meta.contentType],
              maximumSizeInBytes: MAX_MEDIA_BYTES,
              addRandomSuffix: true,
              allowOverwrite: false,
              validUntil: Date.now() + 5 * 60_000,
            };
          },
        });
        return apiJson(result);
      }
      if (mediaType !== "multipart/form-data" || !contentType.includes(";")) {
        throw new ThoughtsError(
          415,
          "Use multipart/form-data or the Blob SDK JSON upload handshake.",
        );
      }
      let form: FormData;
      const bytes = await readLimitedBytes(request, MAX_MULTIPART_BYTES);
      try {
        form = await new Response(new Uint8Array(bytes), {
          headers: { "Content-Type": contentType },
        }).formData();
      } catch {
        throw new ThoughtsError(400, "Invalid multipart upload.");
      }
      const file = form.get("file");
      if (!(file instanceof File) || [...form.keys()].length !== 1) {
        throw new ThoughtsError(
          400,
          "Upload exactly one file using the file field.",
        );
      }
      const extension = validateMedia(file.name, file.type, file.size);
      if (
        !matchesSignature(
          Buffer.from(await file.slice(0, 16).arrayBuffer()),
          file.type,
        )
      ) {
        throw new ThoughtsError(
          400,
          "File content does not match its media type.",
        );
      }
      const blob = await uploadFile(
        `thoughts/media/${randomUUID()}.${extension}`,
        file,
        {
          access: "public",
          addRandomSuffix: false,
          allowOverwrite: false,
          contentType: file.type,
        },
      );
      return apiJson(
        { url: blob.url, contentType: blob.contentType, size: file.size },
        201,
      );
    } catch (error) {
      return thoughtsApiError(error);
    }
  };
}
