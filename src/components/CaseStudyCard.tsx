import Link from "next/link";
import type { CaseStudy } from "@/data/types";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue-400">
        {study.kicker ?? "Case study"}
      </p>
      <h3 className="text-xl font-bold text-zinc-100 transition-colors group-hover:text-blue-400">
        {study.title}
      </h3>
      {study.teaser ? (
        <p className="text-sm leading-relaxed text-zinc-400">{study.teaser}</p>
      ) : (
        <>
          <p className="text-sm leading-relaxed text-zinc-400">{study.subtitle}</p>
          {study.context ? (
            <p className="text-sm leading-relaxed text-zinc-500">{study.context}</p>
          ) : null}
        </>
      )}
      {study.chips ? (
        <ul className="flex flex-wrap gap-2">
          {study.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
            >
              {chip}
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-auto text-sm font-medium text-blue-400">
        Read the case study <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
