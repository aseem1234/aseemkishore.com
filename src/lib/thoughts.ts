import { publishedThoughts } from "@/data/published-thoughts";
import { getPostByCategorySlug, getPostsByCategorySlug } from "@/lib/wordpress";
import type { WPPost } from "@/lib/wordpress";

export type ThoughtPost = Pick<WPPost, "slug" | "title" | "excerpt" | "content" | "date">;

const THOUGHTS_CATEGORY = "thoughts";

const repoThoughts: ThoughtPost[] = publishedThoughts.map((item) => ({
  slug: item.slug,
  title: { rendered: item.title },
  excerpt: { rendered: `<p>${item.excerpt}</p>` },
  content: { rendered: item.contentHtml },
  date: item.date,
}));

export async function getPublishedThoughts(perPage = 20): Promise<ThoughtPost[]> {
  const cms = await getPostsByCategorySlug(THOUGHTS_CATEGORY, perPage);
  const cmsSlugs = new Set(cms.map((post) => post.slug));
  const fromRepo = repoThoughts.filter((post) => !cmsSlugs.has(post.slug));
  return [...cms, ...fromRepo].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedThought(slug: string): Promise<ThoughtPost | null> {
  const cms = await getPostByCategorySlug(slug, THOUGHTS_CATEGORY);
  if (cms) return cms;
  return repoThoughts.find((post) => post.slug === slug) ?? null;
}
