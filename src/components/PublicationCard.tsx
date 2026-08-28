import Link from "next/link";
import { statusLabels } from "@/data/publications";
import type { Publication } from "@/data/types";

const kindLabel: Record<Publication["kind"], string> = {
  publication: "Publication",
  product: "Product",
  company: "Company",
};

export default function PublicationCard({ item }: { item: Publication }) {
  return (
    <Link
      href={`/projects/${item.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">
            {kindLabel[item.kind]}
          </p>
          <h3 className="mt-2 text-lg font-bold text-zinc-100 transition-colors group-hover:text-blue-400">
            {item.name}
          </h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
          {statusLabels[item.status]}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-400">{item.summary}</p>
      <p className="text-sm text-zinc-500">{item.role}</p>
    </Link>
  );
}
