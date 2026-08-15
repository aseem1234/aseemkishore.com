import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PublicationCard from "@/components/PublicationCard";
import { caseStudies } from "@/data/case-studies";
import { publications } from "@/data/publications";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and selected work spanning digital publishing, editorial operations, search strategy, and PositionTracker.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <PageHero
        eyebrow="Work"
        title="Selected work"
        description="Case studies first, then the publications and products. Each page explains the audience, my role, the system, and the outcome — not only the tech stack."
      />

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Case studies</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-bold text-zinc-50">Publications and products</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {publications.map((item) => (
            <PublicationCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
