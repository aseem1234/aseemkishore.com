import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import { earlyCareerSummary, experience } from "@/data/experience";
import { proofPoints } from "@/data/metrics";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { writingSamples } from "@/data/writing";
import { formatDateRange } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: "HTML résumé for Aseem Kishore, aligned with the downloadable PDF.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 print:px-0 print:py-0">
      <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-50">Résumé</h1>
          <p className="mt-3 text-zinc-400">
            Print-friendly version of the same facts used across the site.
          </p>
        </div>
        <ButtonLink href="/resume/Aseem-Kishore-Resume.pdf" event="resume_download">
          Download PDF
        </ButtonLink>
      </div>

      <header className="mt-10 border-b border-zinc-800 pb-8 print:border-zinc-300">
        <p className="text-3xl font-bold text-zinc-50 print:text-zinc-900">{profile.name}</p>
        <p className="mt-2 text-zinc-300 print:text-zinc-700">{profile.label}</p>
        <p className="mt-2 text-sm text-zinc-500">
          {profile.location} · {profile.email}
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-50 print:text-zinc-900">Summary</h2>
        <p className="mt-3 leading-relaxed text-zinc-400 print:text-zinc-700">{profile.heroSummary}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-50 print:text-zinc-900">Selected results</h2>
        <ul className="mt-3 space-y-1 text-zinc-400 print:text-zinc-700">
          {proofPoints.map((point) => (
            <li key={point.id}>
              <strong className="text-zinc-200 print:text-zinc-900">{point.value}</strong>
              {" — "}
              {point.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-50 print:text-zinc-900">Experience</h2>
        <div className="mt-4 space-y-8">
          {experience.map((role) => (
            <div key={role.id}>
              <p className="font-semibold text-zinc-100 print:text-zinc-900">{role.title}</p>
              <p className="text-sm text-zinc-400 print:text-zinc-700">
                {role.organization} · {formatDateRange(role.dates.start, role.dates.end, role.dates.precision)}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-400 print:text-zinc-700">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-50 print:text-zinc-900">Earlier technical work</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 print:text-zinc-700">
          {earlyCareerSummary}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-50 print:text-zinc-900">Education</h2>
        {profile.education.map((item) => (
          <p key={item.institution} className="mt-3 text-zinc-400 print:text-zinc-700">
            {item.institution} — {item.fields.join(" and ")}
          </p>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-50 print:text-zinc-900">Selected writing</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-400 print:text-zinc-700">
          {writingSamples.slice(0, 6).map((sample) => (
            <li key={sample.slug}>
              {sample.title} — {sample.publication}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-50 print:text-zinc-900">Skills</h2>
        <div className="mt-3 space-y-3">
          {skillGroups.map((group) => (
            <p key={group.id} className="text-sm text-zinc-400 print:text-zinc-700">
              <span className="font-semibold text-zinc-200 print:text-zinc-900">{group.title}: </span>
              {group.items.join("; ")}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
