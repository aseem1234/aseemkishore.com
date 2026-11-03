import { randomUUID } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { basename, extname } from "node:path";
import { upload } from "@vercel/blob/client";

const types = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
};

try {
  const file = process.argv[2];
  const key = process.env.THOUGHTS_API_KEY;
  if (!file || !key)
    throw new Error(
      "Usage: THOUGHTS_API_KEY=<key> npm run thoughts:media -- <file>",
    );
  const base = new URL(
    process.env.THOUGHTS_SITE_URL ?? "https://aseemkishore.com",
  );
  if (base.protocol !== "https:" || base.username || base.password)
    throw new Error("THOUGHTS_SITE_URL must be an HTTPS origin.");
  const contentType = types[extname(file).toLowerCase()];
  const { size } = await stat(file);
  if (!contentType || size < 1 || size > 50 * 1024 * 1024)
    throw new Error(
      "Expected a PNG, JPEG, WebP, GIF or MP4 between 1 byte and 50 MiB.",
    );
  const data = new File([await readFile(file)], basename(file), {
    type: contentType,
  });
  const headers = { "x-api-key": key };
  const endpoint = new URL("/api/thoughts/media", base).href;
  let result;
  if (size < 4 * 1024 * 1024 - 65_536) {
    const form = new FormData();
    form.set("file", data);
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: form,
    });
    result = await response.json();
    if (!response.ok)
      throw new Error(
        `Upload failed (${response.status}): ${result.error ?? "Unknown error"}`,
      );
  } else {
    result = await upload(
      `thoughts/media/${randomUUID()}${extname(file).toLowerCase()}`,
      data,
      {
        access: "public",
        contentType,
        handleUploadUrl: endpoint,
        headers,
        multipart: true,
        clientPayload: JSON.stringify({ size, contentType }),
      },
    );
  }
  console.log(JSON.stringify({ url: result.url, contentType, size }));
} catch {
  // SDK error messages may contain credentials or request details.
  console.error(
    "Media upload failed. Supply a supported file up to 50 MiB and check THOUGHTS_API_KEY and THOUGHTS_SITE_URL.",
  );
  process.exitCode = 1;
}
