import { publishedThoughts } from "@/data/published-thoughts";
import {
  ThoughtsError,
  validateThought,
  type ThoughtPost,
} from "@/lib/thoughts-model";
import type { ThoughtsStore } from "@/lib/thoughts-store";

const fallbackPosts: ThoughtPost[] = publishedThoughts.map((post) => ({
  ...post,
  date: `${post.date}Z`,
  updatedAt: `${post.date}Z`,
  category: "tech",
  tags: ["AI", "Search"],
}));

export function createThoughtsService(store: ThoughtsStore) {
  return {
    async all(): Promise<ThoughtPost[]> {
      const posts = new Map(fallbackPosts.map((post) => [post.slug, post]));
      // Tombstones reserve a slug and keep deleted fallback essays unpublished.
      const records = await store.all();
      for (const { slug, post } of records) {
        if (post) posts.set(post.slug, post);
        else posts.delete(slug);
      }
      return [...posts.values()].sort(
        (a, b) =>
          Date.parse(b.date) - Date.parse(a.date) ||
          a.slug.localeCompare(b.slug),
      );
    },
    async get(slug: string) {
      const stored = await store.read(slug);
      return stored
        ? stored.record.post
        : (fallbackPosts.find((post) => post.slug === slug) ?? null);
    },
    async save(input: unknown) {
      const { post, update } = validateThought(input);
      const stored = await store.read(post.slug);
      const fallback = fallbackPosts.find((item) => item.slug === post.slug);
      if (!update && (stored || fallback))
        throw new ThoughtsError(
          409,
          "Slug already exists. Set update: true to replace it.",
        );
      if (update && !stored && !fallback)
        throw new ThoughtsError(
          404,
          "Post not found. Omit update to create it.",
        );
      await store.write(
        post.slug,
        { slug: post.slug, post, updatedAt: post.updatedAt },
        stored?.etag,
      );
      return { post, created: !update };
    },
    async remove(slug: string) {
      const stored = await store.read(slug);
      const current = stored
        ? stored.record.post
        : fallbackPosts.find((post) => post.slug === slug);
      if (!current) throw new ThoughtsError(404, "Post not found.");
      await store.write(
        slug,
        { slug, post: null, updatedAt: new Date().toISOString() },
        stored?.etag,
      );
    },
  };
}
