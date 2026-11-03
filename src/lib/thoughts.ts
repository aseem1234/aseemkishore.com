import { cache } from "react";
import { unstable_cache } from "next/cache";
import { THOUGHTS_TAG, validateSlug } from "@/lib/thoughts-model";
import { createThoughtsService } from "@/lib/thoughts-service";
import { blobThoughtsStore } from "@/lib/thoughts-store";

export type { ThoughtPost } from "@/lib/thoughts-model";
export const thoughtsService = createThoughtsService(blobThoughtsStore);
const cacheScope = process.env.VERCEL_ENV ?? "development";

export const getPublishedThoughts = cache(
  unstable_cache(
    () => thoughtsService.all(),
    ["published-thoughts", cacheScope],
    { tags: [THOUGHTS_TAG], revalidate: 60 },
  ),
);

export const getPublishedThought = cache(async (slug: string) => {
  try {
    validateSlug(slug);
  } catch {
    return null;
  }
  return unstable_cache(
    () => thoughtsService.get(slug),
    ["thought", cacheScope, slug],
    {
      tags: [THOUGHTS_TAG],
      revalidate: 60,
    },
  )();
});

export async function getThoughtSitemapEntries(baseUrl: string) {
  return (await getPublishedThoughts()).map((post) => ({
    url: `${baseUrl}/thoughts/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));
}
