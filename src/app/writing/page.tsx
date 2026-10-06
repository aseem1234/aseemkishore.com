import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import TrackedAnchor from "@/components/TrackedAnchor";
import WritingCard from "@/components/WritingCard";
import { authorArchives, links } from "@/data/profile";
import { getWritingBySlugs, writingSamples } from "@/data/writing";
import { writingRoles } from "@/data/writing-roles";
import { breadcrumbJsonLd, writingJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "A curated portfolio of verified articles by Aseem Kishore across technology publications, plus author archives and Muck Rack.",
  alternates: { canonical: "/writing" },
};

const categoryOrder = [
  "Thought Leadership",
  "AI and Search",
  "Long-Form Guides",
  "Technical Education",
  "Product and Markets",
  "Editorial Leadership",
] as const;

export default function WritingPage() {
  const grouped = categoryOrder
    .map((category) => ({
      category,
      items: writingSamples.filter((sample) => sample.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/writing" },
        ])}
      />
      {writingSamples.map((sample) => (
        <JsonLd key={sample.slug} data={writingJsonLd(sample)} />
      ))}
      <PageHero
        eyebrow="Writing"
        title="Selected writing"
        description="A curated set of verified bylined pieces. I included only articles that appear on my author archives. This is a portfolio, not a dump of every how-to in the library."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={links.muckrack.href} event="muckrack_click">
          Muck Rack
        </ButtonLink>
        <ButtonLink href="/thoughts" variant="secondary">
          Essays
        </ButtonLink>
      </div>

      <section id="by-role" className="mt-16 scroll-mt-24" aria-labelledby="by-role-heading">
        <h2 id="by-role-heading" className="text-2xl font-bold text-zinc-50">
          Read by role
        </h2>
        <p className="mt-3 text-zinc-400">
          Short, curated lists for the kind of work you’re hiring for. The full categories are below.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {writingRoles.map((role) => (
            <li key={role.id}>
              <a
                href={`#by-role-${role.id}`}
                className="inline-flex rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                {role.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {writingRoles.map((role) => {
            const picks = role.picks.flatMap((pick) =>
              getWritingBySlugs([pick.slug]).map((sample) => ({ sample, note: pick.note })),
            );
            return (
              <div key={role.id} id={`by-role-${role.id}`} className="scroll-mt-24">
                <h3 className="text-xl font-bold text-zinc-100">{role.label}</h3>
                <ul className="mt-4 space-y-4">
                  {role.essays?.map((essay) => (
                    <li key={essay.href}>
                      <Link
                        href={essay.href}
                        className="font-medium text-blue-400 hover:text-blue-300"
                      >
                        {essay.label}
                      </Link>
                      <p className="mt-1 text-sm text-zinc-500">{essay.note}</p>
                    </li>
                  ))}
                  {picks.map(({ sample, note }) => (
                    <li key={sample.slug}>
                      <TrackedAnchor
                        href={sample.url}
                        event="writing_sample_click"
                        eventData={{ slug: sample.slug }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-400 hover:text-blue-300"
                      >
                        {sample.title}
                      </TrackedAnchor>
                      <p className="mt-1 text-sm text-zinc-500">
                        {sample.publication} · {note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {grouped.map((group) => (
        <section key={group.category} className="mt-16">
          <h2 className="text-2xl font-bold text-zinc-50">{group.category}</h2>
          <div className="mt-6 grid gap-6">
            {group.items.map((sample) => (
              <WritingCard key={sample.slug} sample={sample} />
            ))}
          </div>
        </section>
      ))}

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Author archives</h2>
        <p className="mt-3 text-zinc-400">
          Full byline indexes on each publication, for anyone who wants more than the curated set.
        </p>
        <ul className="mt-5 space-y-2">
          {authorArchives.map((archive) => (
            <li key={archive.id}>
              <a
                href={archive.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                {archive.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
