import { capabilities } from "@/data/skills";

export default function CapabilityGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {capabilities.map((capability) => (
        <article
          key={capability.id}
          className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
        >
          <h3 className="text-xl font-semibold text-zinc-50">{capability.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{capability.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {capability.items.map((item) => (
              <li
                key={item}
                className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
