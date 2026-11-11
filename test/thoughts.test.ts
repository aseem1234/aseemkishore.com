import assert from "node:assert/strict";
import { test } from "node:test";
import { publishedThoughts } from "../src/data/published-thoughts";
import {
  createThoughtsHandlers,
  readLimitedJson,
} from "../src/lib/thoughts-api";
import {
  createThoughtsMediaHandler,
  MAX_MEDIA_BYTES,
  validateMedia,
} from "../src/lib/thoughts-media";
import {
  ThoughtsError,
  sanitizeThoughtHtml,
  thoughtPage,
  validateThought,
} from "../src/lib/thoughts-model";
import { createThoughtsService } from "../src/lib/thoughts-service";
import type { StoredThought, ThoughtsStore } from "../src/lib/thoughts-store";
import { jsonLdScript, thoughtArticleJsonLd } from "../src/lib/jsonld";

const key = "test-publishing-key";
const valid = {
  slug: "test-thought",
  title: "A new thought",
  excerpt: "My view of what comes next.",
  date: "2026-11-03T09:00:00-05:00",
  category: "tech",
  tags: ["AI"],
  contentHtml: "<p>Something useful.</p>",
};

function fixture(invalidate: (slug: string) => void = () => {}) {
  const records = new Map<string, StoredThought>();
  let revision = 0;
  const store: ThoughtsStore = {
    async read(slug) {
      return records.get(slug) ?? null;
    },
    async all() {
      return [...records.values()].map(({ record }) => record);
    },
    async write(slug, record, etag) {
      if (records.has(slug) && records.get(slug)?.etag !== etag)
        throw new ThoughtsError(409, "Concurrent write.");
      records.set(slug, { record, etag: String(++revision) });
    },
  };
  const service = createThoughtsService(store);
  return {
    service,
    store,
    handlers: createThoughtsHandlers(service, invalidate, key),
  };
}
function request(
  method: string,
  body?: unknown,
  apiKey: string | null = key,
  path = "/api/thoughts",
) {
  return new Request(`https://example.test${path}`, {
    method,
    headers: {
      ...(apiKey === null ? {} : { "x-api-key": apiKey }),
      "Content-Type": "application/json",
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}
const slugParams = (slug = valid.slug) => ({
  params: Promise.resolve({ slug }),
});

test("missing, incorrect or unconfigured API key returns 401 on every endpoint", async () => {
  const { handlers, service } = fixture();
  const media = createThoughtsMediaHandler({ key });
  for (const apiKey of [null, "wrong", "x".repeat(1000)]) {
    assert.equal(
      (await handlers.GET(request("GET", undefined, apiKey))).status,
      401,
    );
    assert.equal(
      (await handlers.POST(request("POST", valid, apiKey))).status,
      401,
    );
    assert.equal(
      (
        await handlers.DELETE(
          request("DELETE", undefined, apiKey),
          slugParams(),
        )
      ).status,
      401,
    );
    assert.equal((await media(request("POST", {}, apiKey))).status, 401);
  }
  assert.equal(
    (await createThoughtsHandlers(service, () => {}, "").GET(request("GET")))
      .status,
    401,
  );
});

test("publishing, listing, updating and deleting refresh the same slug", async () => {
  const invalidations: string[] = [];
  const { handlers, service } = fixture((slug) => invalidations.push(slug));
  const created = await handlers.POST(request("POST", valid));
  assert.equal(created.status, 201);
  assert.equal(created.headers.get("cache-control"), "no-store");
  assert.equal((await created.json()).post.date, valid.date);
  assert.equal((await handlers.POST(request("POST", valid))).status, 409);
  const updated = await handlers.POST(
    request("POST", { ...valid, update: true, title: "Changed" }),
  );
  assert.equal(updated.status, 200);
  assert.equal((await service.get(valid.slug))?.title, "Changed");
  assert.equal(
    (
      await handlers.POST(
        request("POST", { ...valid, slug: "missing", update: true }),
      )
    ).status,
    404,
  );
  const listing = await (await handlers.GET(request("GET"))).json();
  assert.equal(listing.total, 2);
  assert.equal(listing.posts[0].slug, valid.slug);
  assert.equal(
    (await handlers.DELETE(request("DELETE"), slugParams())).status,
    200,
  );
  assert.equal(await service.get(valid.slug), null);
  assert.equal((await service.all()).length, 1);
  assert.equal(
    (await handlers.DELETE(request("DELETE"), slugParams())).status,
    404,
  );
  assert.deepEqual(invalidations, [valid.slug, valid.slug, valid.slug]);
});

test("duplicate concurrent creates have one winner and never overwrite", async () => {
  const { handlers, service } = fixture();
  const results = await Promise.all([
    handlers.POST(request("POST", valid)),
    handlers.POST(request("POST", { ...valid, title: "Racing" })),
  ]);
  assert.deepEqual(results.map((result) => result.status).sort(), [201, 409]);
  assert.equal(
    (await service.all()).filter((post) => post.slug === valid.slug).length,
    1,
  );
});

test("fallback essay keeps its content and URL, can be replaced and stays deleted", async () => {
  const { service } = fixture();
  const original = publishedThoughts[0];
  assert.equal(
    (await service.get(original.slug))?.contentHtml,
    original.contentHtml,
  );
  assert.equal((await service.get(original.slug))?.date, `${original.date}Z`);
  await assert.rejects(service.save({ ...valid, slug: original.slug }), {
    status: 409,
  });
  await service.save({ ...valid, slug: original.slug, update: true });
  assert.equal((await service.all()).length, 1);
  await service.remove(original.slug);
  assert.equal(await service.get(original.slug), null);
  assert.equal((await service.all()).length, 0);
  await service.save({ ...valid, slug: original.slug, update: true });
  assert.equal((await service.get(original.slug))?.title, valid.title);
});

test("a concurrent update/delete conflict is surfaced instead of losing a write", async () => {
  const { service } = fixture();
  await service.save(valid);
  const results = await Promise.allSettled([
    service.save({ ...valid, update: true }),
    service.remove(valid.slug),
  ]);
  assert.equal(
    results.filter((result) => result.status === "fulfilled").length,
    1,
  );
  const failure = results.find((result) => result.status === "rejected");
  assert.equal(failure?.status === "rejected" && failure.reason.status, 409);
});

test("every documented field rejects malformed input", () => {
  assert.throws(() => validateThought({}), ThoughtsError);
  const invalid = [
    null,
    [],
    { extra: 1 },
    { slug: "../bad" },
    { slug: "Capital" },
    { slug: "media" },
    { slug: "a".repeat(121) },
    { title: " " },
    { title: 42 },
    { title: "a".repeat(201) },
    { excerpt: null },
    { excerpt: "a".repeat(1001) },
    { date: "2026-11-03" },
    { date: "2026-11-03T09:00:00" },
    { date: "2026-02-30T09:00:00Z" },
    { date: "2026-11-03T24:00:00Z" },
    { category: "finance" },
    { tags: "AI" },
    { tags: [1] },
    { tags: ["AI", "AI"] },
    { tags: Array.from({ length: 21 }, (_, i) => String(i)) },
    { tags: ["a".repeat(61)] },
    { contentHtml: "<script>alert(1)</script>" },
    { contentHtml: "a".repeat(1_000_001) },
    { update: "true" },
    { heroImage: { url: "javascript:alert(1)", alt: "x" } },
    { heroImage: { url: "https://example.test/a.png" } },
    {
      heroImage: { url: "https://user:password@example.test/a.png", alt: "x" },
    },
    { video: { url: "https://example.test/a.mp4", poster: "/poster.png" } },
    { video: { url: 7, poster: "https://example.test/a.png" } },
  ];
  for (const input of invalid)
    assert.throws(
      () =>
        validateThought(
          input === null || Array.isArray(input)
            ? input
            : { ...valid, ...input },
        ),
      ThoughtsError,
    );
  assert.equal(
    validateThought({ ...valid, date: "2026-11-03T09:00:00Z" }).post.date,
    "2026-11-03T09:00:00Z",
  );
});

test("sanitizing removes executable HTML while preserving captions, tables, code and video", () => {
  const html =
    sanitizeThoughtHtml(`<script>alert(1)</script><style>body{display:none}</style><iframe src="https://bad.test"></iframe>
    <p onclick="evil()">Safe <strong>bold</strong> <em>emphasis</em></p><h2>Heading</h2><h3>Subheading</h3><blockquote>Quote</blockquote>
    <a href="jav&#x61;script:alert(1)">Bad</a><a href="https://example.test" target="_blank">Good</a>
    <figure><img src="https://example.test/chart.png" alt="Chart" onerror="evil()" style="display:none"><figcaption>A chart</figcaption></figure>
    <img src="data:image/svg+xml,evil"><img src="//bad.test/x.png"><img src="http://bad.test/x.png">
    <table><caption>Data</caption><thead><tr><th scope="col">Year</th></tr></thead><tbody><tr><td>2026</td></tr></tbody></table>
    <video autoplay onplay="evil()" poster="javascript:evil()"><source src="https://example.test/demo.mp4" type="video/mp4"></video>
    <pre><code class="language-js" onclick="evil()">const a = 1;</code></pre><svg><a xlink:href="javascript:evil()">x</a></svg>`);
  assert.doesNotMatch(
    html,
    /<script|<style|<iframe|<svg|onerror|onclick|onplay|autoplay|javascript:|data:image|http:\/\/bad|\/\/bad|style=/,
  );
  for (const fragment of [
    "<h2>",
    "<h3>",
    "<blockquote>",
    "<figure>",
    "<figcaption>",
    "<table>",
    "<caption>",
    '<th scope="col">',
    "<td>",
    "<video",
    "controls",
    'preload="metadata"',
    '<source src="https://example.test/demo.mp4"',
    '<code class="language-js">',
    'rel="noopener noreferrer"',
  ])
    assert.ok(html.includes(fragment), fragment);
});

test("API rejects invalid JSON, body sizes, bad content types and pagination", async () => {
  const { handlers } = fixture();
  assert.equal(
    (
      await handlers.POST(
        new Request("https://example.test/api/thoughts", {
          method: "POST",
          headers: { "x-api-key": key, "Content-Type": "application/json" },
          body: "{",
        }),
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await handlers.POST(
        new Request("https://example.test/api/thoughts", {
          method: "POST",
          headers: { "x-api-key": key },
          body: "x",
        }),
      )
    ).status,
    415,
  );
  await assert.rejects(
    readLimitedJson(
      new Request("https://example.test", { method: "POST", body: '"123456"' }),
      4,
    ),
    { status: 413 },
  );
  for (const query of [
    "page=0",
    "page=NaN",
    "page=1.5",
    "limit=101",
    "limit=-1",
  ])
    assert.equal(
      (
        await handlers.GET(
          request("GET", undefined, key, `/api/thoughts?${query}`),
        )
      ).status,
      400,
    );
});

test("pagination includes older posts beyond 50 and sorts by instants across offsets", async () => {
  const { service } = fixture();
  for (let i = 0; i < 55; i++)
    await service.save({
      ...valid,
      slug: `post-${i}`,
      date: new Date(Date.UTC(2026, 10, 1, 0, i)).toISOString(),
    });
  await service.save({
    ...valid,
    slug: "later-instant",
    date: "2026-11-03T08:00:00-08:00",
  });
  await service.save({
    ...valid,
    slug: "earlier-instant",
    date: "2026-11-03T12:00:00+02:00",
  });
  const posts = await service.all();
  assert.equal(posts[0].slug, "later-instant");
  assert.equal(posts[1].slug, "earlier-instant");
  const pages = Array.from({ length: 5 }, (_, i) => thoughtPage(posts, i + 1));
  assert.equal(pages.flatMap((page) => page.posts).length, 58);
  assert.equal(
    new Set(pages.flatMap((page) => page.posts.map((post) => post.slug))).size,
    58,
  );
});

test("cache invalidation failure reports that the write committed", async (t) => {
  t.mock.method(console, "error", () => {});
  const { handlers, service } = fixture(() => {
    throw new Error("cache unavailable");
  });
  const result = await handlers.POST(request("POST", valid));
  assert.equal(result.status, 202);
  assert.match((await result.json()).warning, /Write saved/);
  assert.equal((await service.get(valid.slug))?.title, valid.title);
});

test("storage failures return 503 and never success", async (t) => {
  t.mock.method(console, "error", () => {});
  const { service, store } = fixture();
  t.mock.method(store, "write", async () => {
    throw new Error("sensitive vendor details");
  });
  const result = await createThoughtsHandlers(service, () => {}, key).POST(
    request("POST", valid),
  );
  assert.equal(result.status, 503);
  assert.doesNotMatch(await result.text(), /sensitive vendor/);
});

test("media validates types, signatures, paths and 50 MiB maximum", async () => {
  assert.throws(() => validateMedia("a.svg", "image/svg+xml", 10), {
    status: 400,
  });
  assert.throws(() => validateMedia("a.png", "video/mp4", 10), { status: 400 });
  assert.throws(
    () => validateMedia("a.mp4", "video/mp4", MAX_MEDIA_BYTES + 1),
    { status: 413 },
  );
  assert.equal(validateMedia("a.mp4", "video/mp4", MAX_MEDIA_BYTES), "mp4");
  let uploads = 0;
  const media = createThoughtsMediaHandler({
    key,
    uploadFile: async () => {
      uploads++;
      return {
        url: "https://example.test/chart.png",
        downloadUrl: "https://example.test/chart.png",
        pathname: "chart.png",
        contentType: "image/png",
        contentDisposition: "inline",
        etag: "1",
      };
    },
  });
  for (const [bytes, status] of [
    [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), 201],
    [new TextEncoder().encode("<script>evil()</script>"), 400],
  ] as const) {
    const form = new FormData();
    form.set("file", new File([bytes], "chart.png", { type: "image/png" }));
    const response = await media(
      new Request("https://example.test/api/thoughts/media", {
        method: "POST",
        headers: { "x-api-key": key },
        body: form,
      }),
    );
    assert.equal(response.status, status);
  }
  assert.equal(uploads, 1);
  const direct = createThoughtsMediaHandler({
    key,
    directUpload: async (options) => {
      await options.onBeforeGenerateToken(
        "thoughts/posts/hijack.json",
        JSON.stringify({ size: 5, contentType: "image/png" }),
        true,
      );
      throw new Error("must not reach signing");
    },
  });
  assert.equal(
    (
      await direct(
        request("POST", {
          type: "blob.generate-client-token",
          payload: {
            pathname: "thoughts/posts/hijack.json",
            multipart: true,
            clientPayload: "{}",
          },
        }),
      )
    ).status,
    400,
  );
  const signed = createThoughtsMediaHandler({
    key,
    directUpload: async (options) => {
      const policy = await options.onBeforeGenerateToken(
        "thoughts/media/video.mp4",
        JSON.stringify({ size: MAX_MEDIA_BYTES, contentType: "video/mp4" }),
        true,
      );
      assert.equal(policy.maximumSizeInBytes, MAX_MEDIA_BYTES);
      assert.equal(policy.allowOverwrite, false);
      assert.deepEqual(policy.allowedContentTypes, ["video/mp4"]);
      return {
        type: "blob.generate-client-token",
        clientToken: "limited-token",
      };
    },
  });
  assert.equal(
    (
      await signed(
        request("POST", {
          type: "blob.generate-client-token",
          payload: {
            pathname: "thoughts/media/video.mp4",
            multipart: true,
            clientPayload: "{}",
          },
        }),
      )
    ).status,
    200,
  );
});

test("Article JSON-LD uses offset dates and escapes script-closing text", () => {
  const { post } = validateThought({
    ...valid,
    title: "</script><script>alert(1)</script>",
    heroImage: { url: "https://example.test/chart.png", alt: "Chart" },
  });
  const article = thoughtArticleJsonLd(post);
  assert.equal(article["@type"], "Article");
  assert.equal(article.datePublished, valid.date);
  assert.equal(article.image, post.heroImage?.url);
  const serialized = jsonLdScript(article);
  assert.doesNotMatch(serialized, /<\/script>/);
  assert.equal(JSON.parse(serialized).headline, post.title);
});

test("Blob origin reads use private storage and pass strong ETags to conditional writes", async () => {
  const { createBlobThoughtsStore } = await import("../src/lib/thoughts-store");
  const { post } = validateThought(valid);
  const record = { slug: post.slug, post, updatedAt: post.updatedAt };
  const blob = {
    url: "https://test.private.blob.vercel-storage.com/thoughts/posts/test-thought.json",
    downloadUrl:
      "https://test.private.blob.vercel-storage.com/thoughts/posts/test-thought.json?download=1",
    pathname: "thoughts/posts/test-thought.json",
    contentType: "application/json",
    contentDisposition: "inline",
    cacheControl: "max-age=60",
    uploadedAt: new Date(),
    size: 100,
    etag: 'W/"revision"',
  };
  let written = false;
  const cursors: Array<string | undefined> = [];
  const store = createBlobThoughtsStore(
    {
      get: async (_path, options) => {
        assert.equal(options.access, "private");
        assert.equal(options.useCache, false);
        assert.equal(options.token, "isolated-posts-token");
        assert.equal(
          new Headers(options.headers).get("accept-encoding"),
          "identity",
        );
        return {
          statusCode: 200 as const,
          stream: new Response(JSON.stringify(record)).body!,
          headers: new Headers(),
          blob,
        };
      },
      list: async (options) => {
        cursors.push(options?.cursor);
        return {
          blobs: [blob],
          hasMore: !options?.cursor,
          cursor: options?.cursor ? undefined : "next-page",
        };
      },
      put: async (_path, _body, options) => {
        assert.equal(options.access, "private");
        assert.equal(options.token, "isolated-posts-token");
        assert.equal(options.ifMatch, '"revision"');
        assert.equal(options.allowOverwrite, true);
        written = true;
        return blob;
      },
    },
    () => "isolated-posts-token",
  );
  const current = await store.read(post.slug);
  assert.equal(current?.etag, '"revision"');
  await store.write(post.slug, record, current?.etag);
  assert.ok(written);
  assert.equal((await store.all()).length, 2);
  assert.deepEqual(cursors, [undefined, "next-page"]);
});

test("Blob store ignores stray non-JSON objects, cancels streams on unexpected responses, and detects stalled cursors", async () => {
  const { createBlobThoughtsStore } = await import("../src/lib/thoughts-store");
  const { post } = validateThought(valid);
  const record = { slug: post.slug, post, updatedAt: post.updatedAt };
  let cancelledStream = false;

  const badReadStore = createBlobThoughtsStore(
    {
      get: async () => ({
        statusCode: 200 as const,
        stream: new ReadableStream({
          cancel() {
            cancelledStream = true;
          },
        }),
        headers: new Headers(),
        blob: {
          url: "https://test.private.blob.vercel-storage.com/thoughts/posts/test-thought.json",
          downloadUrl: "https://test.private.blob.vercel-storage.com/thoughts/posts/test-thought.json",
          pathname: "thoughts/posts/test-thought.json",
          contentType: "application/json",
          contentDisposition: "inline",
          cacheControl: "max-age=60",
          uploadedAt: new Date(),
          size: 10,
          etag: "",
        },
      }),
      list: async () => ({ blobs: [], hasMore: false }),
      put: async () => {
        throw new Error("unused");
      },
    },
    () => "isolated-posts-token",
  );
  await assert.rejects(() => badReadStore.read(post.slug), /Unexpected Blob response/);
  assert.equal(cancelledStream, true);

  const mixedStore = createBlobThoughtsStore(
    {
      get: async () => ({
        statusCode: 200 as const,
        stream: new Response(JSON.stringify(record)).body!,
        headers: new Headers(),
        blob: {
          url: "https://test.private.blob.vercel-storage.com/thoughts/posts/test-thought.json",
          downloadUrl: "https://test.private.blob.vercel-storage.com/thoughts/posts/test-thought.json",
          pathname: "thoughts/posts/test-thought.json",
          contentType: "application/json",
          contentDisposition: "inline",
          cacheControl: "max-age=60",
          uploadedAt: new Date(),
          size: 10,
          etag: '"1"',
        },
      }),
      list: async () => ({
        blobs: [
          {
            url: "https://test.private.blob.vercel-storage.com/thoughts/posts/",
            downloadUrl: "https://test.private.blob.vercel-storage.com/thoughts/posts/",
            pathname: "thoughts/posts/",
            size: 0,
            uploadedAt: new Date(),
          },
          {
            url: "https://test.private.blob.vercel-storage.com/thoughts/posts/nested/bad.json",
            downloadUrl: "https://test.private.blob.vercel-storage.com/thoughts/posts/nested/bad.json",
            pathname: "thoughts/posts/nested/bad.json",
            size: 5,
            uploadedAt: new Date(),
          },
          {
            url: "https://test.private.blob.vercel-storage.com/thoughts/posts/test-thought.json",
            downloadUrl: "https://test.private.blob.vercel-storage.com/thoughts/posts/test-thought.json",
            pathname: "thoughts/posts/test-thought.json",
            size: 10,
            uploadedAt: new Date(),
          },
        ],
        hasMore: false,
      }),
      put: async () => {
        throw new Error("unused");
      },
    },
    () => "isolated-posts-token",
  );
  const all = await mixedStore.all();
  assert.equal(all.length, 1);
  assert.equal(all[0].slug, post.slug);

  const stalledStore = createBlobThoughtsStore(
    {
      get: async () => null,
      list: async () => ({
        blobs: [],
        hasMore: true,
        cursor: "same-cursor",
      }),
      put: async () => {
        throw new Error("unused");
      },
    },
    () => "isolated-posts-token",
  );
  await assert.rejects(() => stalledStore.all(), /cursor stalled/);

  // Case-insensitive Content-Type header accepted by Thoughts POST
  const { handlers } = fixture();
  const resUpper = await handlers.POST(
    new Request("https://example.test/api/thoughts", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "Content-Type": "Application/JSON; charset=utf-8",
      },
      body: JSON.stringify(valid),
    }),
  );
  assert.equal(resUpper.status, 201);
});
