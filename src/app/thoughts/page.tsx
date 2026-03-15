import type { Metadata } from "next";
import { getPostsByCategorySlug } from "@/lib/wordpress";
import ThoughtCard from "@/components/ThoughtCard";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Quick updates, musings, and articles by Aseem Kishore.",
};

export default async function ThoughtsPage() {
  const thoughts = await getPostsByCategorySlug("thoughts", 20);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Thoughts
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          Quick updates, musings, and articles.
        </p>
      </div>
      {thoughts.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <p className="text-zinc-500">Thoughts coming soon.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {thoughts.map((post) => (
            <ThoughtCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
