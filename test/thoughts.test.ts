import assert from "node:assert/strict";
import { test } from "node:test";

import { publishedThoughts } from "../src/data/published-thoughts";
import { getThoughtSitemapEntries, getPublishedThought } from "../src/lib/thoughts";
import type { WPPost } from "../src/lib/wordpress";

const category = { id: 4, name: "Thoughts", slug: "thoughts", count: 2 };

function mockWordPress(t: import("node:test").TestContext, posts: Array<Partial<WPPost>>) {
  t.mock.method(globalThis, "fetch", async (input: string | URL | Request) => {
    const url = String(input);
    const body = url.includes("/categories") ? [category] : posts;
    return new Response(JSON.stringify(body), { status: 200 });
  });
}

test("thought sitemap entries merge CMS posts with repo essays", async (t) => {
  mockWordPress(t, [{ id: 7, slug: "cms-only-essay", date: "2026-10-01T09:00:00" }]);

  const entries = await getThoughtSitemapEntries("https://example.test");
  const urls = entries.map((entry) => entry.url);

  assert.ok(urls.includes("https://example.test/thoughts/cms-only-essay"));
  assert.ok(urls.includes("https://example.test/thoughts/ai-is-changing-search"));
  assert.equal(new Set(urls).size, urls.length);
});

test("a migrated CMS essay stays in the sitemap and wins over the repo copy", async (t) => {
  const repoSlug = publishedThoughts[0].slug;
  mockWordPress(t, [
    {
      id: 9,
      slug: repoSlug,
      date: "2026-10-07T09:00:00",
      title: { rendered: "From the CMS" },
    },
  ]);

  const entries = await getThoughtSitemapEntries("https://example.test");
  const matches = entries.filter((entry) => entry.url.endsWith(`/thoughts/${repoSlug}`));
  assert.equal(matches.length, 1);
  assert.equal(matches[0].lastModified?.toISOString(), "2026-10-07T09:00:00.000Z");

  const post = await getPublishedThought(repoSlug);
  assert.equal(post?.title.rendered, "From the CMS");
});
