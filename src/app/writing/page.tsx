import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import WritingCard from "@/components/WritingCard";
import { authorArchives, links } from "@/data/profile";
import { writingSamples } from "@/data/writing";
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
          Essays in development
        </ButtonLink>
      </div>

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
