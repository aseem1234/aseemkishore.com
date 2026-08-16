import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ThoughtCard from "@/components/ThoughtCard";
import WritingCard from "@/components/WritingCard";
import { thoughtOutlines } from "@/data/thoughts";
import { getFeaturedWriting } from "@/data/writing";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getPostsByCategorySlug } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Original essays in development, plus selected verified writing. Draft first-person articles are held for review before publication.",
  alternates: { canonical: "/thoughts" },
};

export default async function ThoughtsPage() {
  const published = await getPostsByCategorySlug("thoughts", 20);
  const featuredWriting = getFeaturedWriting().slice(0, 4);

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
        title="Essays and observations"
        description="This section is for original writing on publishing, editorial operations, AI, and product work. Full first-person essays are drafted for review before they go live. In the meantime, the verified writing portfolio is the public reading list."
      />

      <div className="mt-8">
        <ButtonLink href="/writing" variant="secondary">
          Open the writing portfolio
        </ButtonLink>
      </div>

      {published.length > 0 ? (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-zinc-50">Published essays</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {published.map((post) => (
              <ThoughtCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Selected writing already published elsewhere</h2>
        <p className="mt-3 text-zinc-400">
          Verified bylines from the publications. These replace an empty “coming soon” state.
        </p>
        <div className="mt-6 grid gap-6">
          {featuredWriting.map((sample) => (
            <WritingCard key={sample.slug} sample={sample} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Essays in development</h2>
        <p className="mt-3 text-zinc-400">
          Outlines only. Draft articles are not published until they have been reviewed.
        </p>
        <div className="mt-6 space-y-6">
          {thoughtOutlines.map((thought) => (
            <article
              key={thought.slug}
              className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/30 p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">Draft</p>
              <h3 className="mt-2 text-xl font-bold text-zinc-100">{thought.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{thought.abstract}</p>
              <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-zinc-500">
                {thought.outline.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
