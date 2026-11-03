import type { Metadata } from "next";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import CaseStudyCard from "@/components/CaseStudyCard";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { caseStudies } from "@/data/case-studies";
import { consultingOffers } from "@/data/consulting";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Consulting — Content, Editorial Operations & AI Automation",
  description:
    "Work with Aseem Kishore on content and search strategy, editorial operations, practical AI automation and internal tools.",
  alternates: { canonical: "/consulting" },
  openGraph: {
    title: "Consulting with Aseem Kishore",
    description:
      "Content and search strategy, editorial operations, practical AI automation and internal tools.",
    url: "/consulting",
  },
  twitter: {
    title: "Consulting with Aseem Kishore",
    description:
      "Content and search strategy, editorial operations and practical AI automation.",
  },
};

export default function ConsultingPage() {
  const selected = [
    "publishing-portfolio",
    "editorial-operations",
    "social-posts-dashboard",
  ];
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Consulting", path: "/consulting" },
        ])}
      />
      <PageHero
        eyebrow="Consulting"
        title="Bring me the problem you want to solve."
        description="Whether you need a content plan, an editorial process or an automation, I help define the problem and turn it into a practical project."
      />
      <div className="mt-8">
        <ButtonLink
          href="mailto:hello@aseemkishore.com?subject=Consulting%20inquiry"
          event="consulting_inquiry"
        >
          Discuss a project
        </ButtonLink>
      </div>
      <section className="mt-16" aria-label="Consulting areas">
        <div className="grid gap-6 lg:grid-cols-3">
          {consultingOffers.map((offer, index) => (
            <Link
              key={offer.slug}
              href={`/consulting/${offer.slug}`}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-7 transition-colors hover:border-blue-400"
            >
              <p className="font-mono text-xs text-blue-400">0{index + 1}</p>
              <h2 className="mt-5 text-2xl font-semibold text-zinc-100">
                {offer.name}
              </h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                {offer.description}
              </p>
              <p className="mt-6 text-sm text-blue-400">
                Explore the work <span aria-hidden="true">→</span>
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-20 grid gap-8 border-y border-zinc-800 py-12 md:grid-cols-[1fr_2fr]">
        <h2 className="text-3xl font-semibold text-zinc-100">How we work</h2>
        <ol className="grid gap-8 sm:grid-cols-3">
          {[
            [
              "Understand",
              "Review your setup, the repeated problem and what a useful result looks like.",
            ],
            [
              "Scope",
              "Agree the deliverables, access, acceptance criteria, price and timeline before implementation.",
            ],
            [
              "Build & hand off",
              "Work through checkpoints, test the result and document how to operate it.",
            ],
          ].map(([title, body]) => (
            <li key={title}>
              <h3 className="font-semibold text-zinc-200">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-20">
        <h2 className="text-3xl font-semibold text-zinc-100">
          Work behind the advice
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {selected
            .map((slug) => caseStudies.find((study) => study.slug === slug))
            .filter((study) => study !== undefined)
            .map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
        </div>
      </section>
      <section className="mt-20 rounded-xl border border-zinc-800 p-8 sm:p-10">
        <h2 className="text-2xl font-semibold text-zinc-100">
          Start with your current setup.
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          Email what you want to improve, the tools involved and any
          constraints. We can establish scope and timing from there. For
          WordPress care, Workspace support or a bookable technical session,
          visit AK Computer Services.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <ButtonLink href="/contact" event="consulting_inquiry">
            Get in touch
          </ButtonLink>
          <ButtonLink
            href="https://akcomputerservices.com/services"
            variant="secondary"
          >
            Bookable technical support
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
