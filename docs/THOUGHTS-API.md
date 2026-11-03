# Thoughts publishing API

Thoughts runs on Next.js on Vercel. Posts and media live in Vercel Blob. Once this feature is deployed, publishing requires an HTTP request and no Git commit, PR or deployment. An assistant such as Grok can call it every weekday; the site does not schedule or generate posts itself.

## Credentials and storage

All four endpoints require `x-api-key`, matched against the server-only `THOUGHTS_API_KEY`. Missing or incorrect keys return `401`. Generate a random key of at least 32 bytes and store it as a Vercel Secret. Give the assistant only the publishing key, never the Blob token. API responses use `Cache-Control: no-store`.

Connect a **public** Blob store to the existing `aseemkishore.com` Vercel project and set its server-only `BLOB_READ_WRITE_TOKEN`. Use separate Blob stores and publishing keys for Production and Preview. Development uses the preview store. Set secrets before building a deployment so functions receive them. Existing deployments retain their original environment values.

Post records use `thoughts/posts/<slug>.json`. Media uses immutable names under `thoughts/media/`. The built-in `ai-is-changing-search` essay remains available at its original URL until replaced or unpublished through the API. Deleted posts retain a tombstone to prevent the built-in fallback from returning. A deleted slug can be republished with `update: true`.

Post records and media are public assets, so send publishable material only. Unpublishing removes the post from site pages, API lists and the sitemap. It replaces the stored post body with a tombstone; it does not delete referenced media or retract copies already downloaded or indexed. Blob's public CDN may retain the old JSON for up to 60 seconds.

For the examples, set `THOUGHTS_API_KEY` in your shell and set `SITE=https://aseemkishore.com`. Keep the key out of repository files, logs and browser code.

## Create a post: POST /api/thoughts

```bash
curl --fail-with-body "$SITE/api/thoughts" \
  -H "x-api-key: $THOUGHTS_API_KEY" \
  -H 'Content-Type: application/json' \
  --data-binary @post.json
```

Example `post.json`:

```json
{
  "slug": "where-ai-goes-next",
  "title": "Where I think AI goes next",
  "excerpt": "My view of the next wave of useful AI products.",
  "date": "2026-11-03T09:00:00-05:00",
  "category": "tech",
  "tags": ["AI", "Predictions"],
  "contentHtml": "<p>Here is my view.</p><figure><img src=\"https://example.com/chart.png\" alt=\"AI adoption chart\"><figcaption>An illustrative forecast.</figcaption></figure><table><caption>My forecast</caption><thead><tr><th scope=\"col\">Year</th><th scope=\"col\">Index</th></tr></thead><tbody><tr><td>2027</td><td>110</td></tr></tbody></table>",
  "heroImage": {"url": "https://example.com/chart.png", "alt": "AI adoption chart"},
  "video": {"url": "https://example.com/explainer.mp4", "poster": "https://example.com/poster.jpg"}
}
```

Replace example media URLs with URLs returned by the upload endpoint.

| Field | Contract |
| --- | --- |
| `slug` | Required. 1–120 lowercase ASCII letters, digits and single separating hyphens. `media` is reserved. |
| `title` | Required plain text, 1–200 characters after trimming. |
| `excerpt` | Required plain text, 1–1000 characters after trimming. |
| `date` | Required valid ISO timestamp with seconds and an explicit `Z` or `±HH:MM` offset. Optional 1–3 fractional second digits. Publishes immediately, even if the date is in the future. |
| `category` | Required, `tech` or `markets`. Markets posts automatically display “Not investment advice, just my opinion.” |
| `tags` | Required array of 0–20 unique strings, each 1–60 characters. |
| `contentHtml` | Required, up to 1,000,000 characters. Must contain content after sanitizing. Total JSON request maximum: 1,100,000 bytes. |
| `heroImage` | Optional or null. Object with absolute HTTPS `url` (max 2048 characters) and `alt` (0–500 characters). Used as the social image. |
| `video` | Optional or null. Object with absolute HTTPS `url` for MP4 and `poster` image URL (each max 2048 characters). Renders a player after the article. Inline `<video>` also works. |
| `update` | Optional boolean, default `false`. Must be `true` to replace an existing or unpublished slug. |

Unknown fields, malformed URLs and invalid dates are rejected. URLs with embedded credentials are rejected. HTML allows paragraphs, h2/h3, lists, blockquotes, links, strong/em, figures, images, captions, table elements, video/source, code/pre, br and hr. Scripts, styles, event handlers, iframes, SVG and unsafe URLs are stripped. Media URLs must use HTTPS or a local root-relative path; anchors may also use HTTP or mailto. Video controls are always enabled, with metadata preload and no autoplay.

Success: `201` with `{ "post": {...}, "url": "/thoughts/<slug>" }`. A duplicate create returns `409`. Writes are atomic per slug. Concurrent modifications use ETags and return `409` if another write wins. Read the latest post before deciding whether to retry.

## Replace a post: POST /api/thoughts

Send the complete body with `update: true`. Omitted media fields are removed. Updating a slug that has never existed returns `404`.

```bash
jq '.update = true | .title = "My updated view"' post.json > updated-post.json
curl --fail-with-body "$SITE/api/thoughts" \
  -H "x-api-key: $THOUGHTS_API_KEY" \
  -H 'Content-Type: application/json' \
  --data-binary @updated-post.json
```

Success: `200`. Create, update and delete invalidate the Thoughts data tag, `/thoughts`, `/thoughts/<slug>` and `/sitemap.xml`. Pages also use a 60-second data cache. If saving succeeds but cache invalidation fails, the API returns `202` with the saved result and an explicit `warning`; verify the post instead of blindly repeating a create.

## Upload media: POST /api/thoughts/media

PNG, JPEG, WebP, GIF and MP4 are supported, with matching filename extension and MIME type. The `file` field must contain exactly one file. Small uploads also check file signatures.

```bash
curl --fail-with-body "$SITE/api/thoughts/media" \
  -H "x-api-key: $THOUGHTS_API_KEY" \
  -F 'file=@chart.png;type=image/png'
```

Success: `201` with `{ "url": "https://...public.blob.vercel-storage.com/...", "contentType": "image/png", "size": 12345 }`.

### Files up to 50 MiB

[Vercel limits function request bodies to 4.5 MB](https://vercel.com/docs/functions/limitations#request-body-size). The multipart endpoint caps its complete request at 4 MiB. Larger files use an authenticated Blob upload handshake at the same endpoint, then upload directly to Blob with a short-lived token restricted to a media pathname, MIME type and maximum 50 MiB. The publishing key is sent only to the site's token endpoint. No Blob read/write credential is shared with the assistant.

The included helper automatically chooses the right flow:

```bash
npm run thoughts:media -- ./explainer.mp4
# Optional preview target:
THOUGHTS_SITE_URL=https://your-preview.vercel.app npm run thoughts:media -- ./chart.png
```

Or use `@vercel/blob/client` from a Node.js assistant:

```js
import { upload } from '@vercel/blob/client';
const result = await upload('thoughts/media/my-video.mp4', file, {
  access: 'public', contentType: 'video/mp4', multipart: true,
  handleUploadUrl: `${site}/api/thoughts/media`,
  headers: { 'x-api-key': process.env.THOUGHTS_API_KEY },
  clientPayload: JSON.stringify({ size: file.size, contentType: 'video/mp4' })
});
console.log(result.url);
```

For inspection, the token request is:

```bash
curl --fail-with-body "$SITE/api/thoughts/media" \
  -H "x-api-key: $THOUGHTS_API_KEY" -H 'Content-Type: application/json' \
  --data '{"type":"blob.generate-client-token","payload":{"pathname":"thoughts/media/my-video.mp4","multipart":true,"clientPayload":"{\"size\":10000000,\"contentType\":\"video/mp4\"}"}}'
```

Let the SDK handle the returned token and multipart transfer. Tokens expire after five minutes and cannot overwrite posts or existing media. Preview protection requires Vercel's authenticated access or an automation bypass header in addition to the publishing key.

## Verify posts: GET /api/thoughts

```bash
curl --fail-with-body "$SITE/api/thoughts?page=1&limit=50" \
  -H "x-api-key: $THOUGHTS_API_KEY"
```

Returns `{ "posts": [...], "page": 1, "limit": 50, "total": 12, "totalPages": 1 }`, newest first by the actual timestamp. `page` is a positive integer and `limit` is 1–100 (default 50). Follow every page to verify a longer archive. Public `/thoughts?page=2` uses 12 posts per page. The sitemap includes the entire published archive.

## Unpublish: DELETE /api/thoughts/:slug

```bash
curl --fail-with-body -X DELETE "$SITE/api/thoughts/where-ai-goes-next" \
  -H "x-api-key: $THOUGHTS_API_KEY"
```

Success: `200` with `{ "slug": "where-ai-goes-next", "unpublished": true }`. A missing or already unpublished post returns `404`.

## Errors and verification

- `400`: invalid schema, JSON, pagination or file content.
- `401`: missing or incorrect publishing key, including an unconfigured server key.
- `404`: missing post for update or deletion.
- `409`: duplicate slug or concurrent modification.
- `413`: oversized JSON or media. Use the direct flow for large media.
- `415`: unsupported request Content-Type.
- `503`: storage unavailable or unconfigured. No successful write is claimed.

Run `npm test`, `npm run lint` and `npm run build`. Before release, publish a disposable post on the Vercel preview with a captioned image, a table and MP4 video. Check desktop/mobile layout, social tags, JSON-LD, sitemap, auth and duplicate behavior. Delete it and confirm its URL becomes 404. Repeat the publish/check/delete cycle on production and confirm visibility within about a minute. Preserve the original essay and confirm `/thoughts/ai-is-changing-search` works.
