import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { earlyCareerSummary, experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { formatDateRange } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience & Leadership",
  description:
    "Experience translating founder-led digital publishing into editorial operations, team leadership, SEO, and AI-enabled product work.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ])}
      />
      <PageHero
        eyebrow="Experience & Leadership"
        title="What the work actually involved"
        description="Founder titles can hide the job. This page translates the publishing business into responsibilities a hiring manager can recognize: strategy, people, systems, performance, and accountability for results."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/resume/Aseem-Kishore-Resume.pdf" event="resume_download">
          Download Résumé
        </ButtonLink>
        <ButtonLink href="/career" variant="secondary">
          Career profile
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact
        </ButtonLink>
      </div>

      <ol className="mt-16 space-y-12">
        {experience.map((role) => (
          <li key={role.id} className="border-l border-zinc-800 pl-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">
              {formatDateRange(role.dates.start, role.dates.end, role.dates.precision)}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-50">{role.title}</h2>
            <p className="mt-1 text-zinc-300">{role.organization}</p>
            {role.location ? <p className="mt-1 text-sm text-zinc-500">{role.location}</p> : null}
            {role.dates.note ? <p className="mt-2 text-sm text-zinc-500">{role.dates.note}</p> : null}
            <p className="mt-4 leading-relaxed text-zinc-400">{role.summary}</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-zinc-400">
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <section className="mt-20">
        <h2 className="text-2xl font-bold text-zinc-50">Early technical foundation</h2>
        <p className="mt-4 leading-relaxed text-zinc-400">{earlyCareerSummary}</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Education</h2>
        {profile.education.map((item) => (
          <div key={item.institution} className="mt-4">
            <p className="text-lg text-zinc-100">{item.institution}</p>
            <p className="mt-1 text-zinc-400">{item.fields.join(" · ")}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Skills</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-zinc-400">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
