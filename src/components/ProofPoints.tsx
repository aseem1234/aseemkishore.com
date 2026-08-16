import { proofPoints } from "@/data/metrics";

export default function ProofPoints() {
  return (
    <section aria-labelledby="proof-heading" className="mx-auto max-w-6xl px-6 py-20">
      <h2 id="proof-heading" className="sr-only">
        Selected results
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {proofPoints.map((point) => (
          <div
            key={point.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
          >
            <p className="text-2xl font-bold tracking-tight text-zinc-50">{point.value}</p>
            <p className="mt-2 text-sm font-medium text-zinc-200">{point.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">{point.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
