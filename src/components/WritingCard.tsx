import TrackedAnchor from "@/components/TrackedAnchor";
import type { WritingSample } from "@/data/types";
import { formatDisplayDate } from "@/lib/site";

export default function WritingCard({ sample }: { sample: WritingSample }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
        <span className="font-mono uppercase tracking-[0.16em] text-blue-400">{sample.category}</span>
        <span>{sample.publication}</span>
        <time dateTime={sample.date}>{formatDisplayDate(sample.date)}</time>
      </div>
      <h3 className="text-lg font-bold text-zinc-100">
        <TrackedAnchor
          href={sample.url}
          event="writing_sample_click"
          eventData={{ slug: sample.slug }}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
        >
          {sample.title}
        </TrackedAnchor>
      </h3>
      <p className="text-sm leading-relaxed text-zinc-400">{sample.description}</p>
      <p className="text-xs text-zinc-500">
        {sample.role} · {sample.format}
      </p>
    </article>
  );
}
