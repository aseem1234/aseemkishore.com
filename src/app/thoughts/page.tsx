import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ThoughtCard from "@/components/ThoughtCard";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getPublishedThoughts } from "@/lib/thoughts";
import { THOUGHTS_PAGE_SIZE, thoughtPage } from "@/lib/thoughts-model";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Aseem Kishore's personal takes on tech, AI, markets and stocks. What I think matters, where things are heading and predictions I can revisit.",
  alternates: { canonical: "/thoughts" },
};

type Props = { searchParams: Promise<{ page?: string | string[] }> };

export default async function ThoughtsPage({ searchParams }: Props) {
  const [params, posts] = await Promise.all([
    searchParams,
    getPublishedThoughts(),
  ]);
  const requested = typeof params.page === "string" ? Number(params.page) : 1;
  const lastPage = Math.max(1, Math.ceil(posts.length / THOUGHTS_PAGE_SIZE));
  const page =
    Number.isSafeInteger(requested) && requested > 0
      ? Math.min(requested, lastPage)
      : 1;
  const published = thoughtPage(posts, page);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Thoughts", path: "/thoughts" },
        ])}
      />
      <PageHero
        eyebrow="Thoughts"
        title="What I think comes next"
        description="My personal takes on tech, AI, markets and stocks. What I find interesting, where I think things are heading and predictions I can look back on. New thoughts throughout the week."
      />
      <section className="mt-16" aria-label="Published thoughts">
        {published.posts.length ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {published.posts.map((post) => (
              <ThoughtCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-400">More thoughts soon.</p>
        )}
        {published.totalPages > 1 ? (
          <nav
            className="mt-10 flex items-center justify-between gap-4 text-sm"
            aria-label="Thoughts pagination"
          >
            {page > 1 ? (
              <Link
                className="text-blue-400 hover:underline"
                href={page === 2 ? "/thoughts" : `/thoughts?page=${page - 1}`}
              >
                Newer thoughts
              </Link>
            ) : (
              <span />
            )}
            <span className="text-zinc-400" aria-current="page">
              Page {page} of {published.totalPages}
            </span>
            {page < published.totalPages ? (
              <Link
                className="text-blue-400 hover:underline"
                href={`/thoughts?page=${page + 1}`}
              >
                Older thoughts
              </Link>
            ) : (
              <span />
            )}
          </nav>
        ) : null}
      </section>
      <p className="mt-12 text-sm text-zinc-400">
        For my published work elsewhere,{" "}
        <Link className="text-blue-400 hover:underline" href="/writing">
          visit the writing portfolio
        </Link>
        .
      </p>
    </div>
  );
}
