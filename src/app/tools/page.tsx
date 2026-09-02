import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description: "Free, fast web utilities and iPhone apps.",
};

const tools = [
  {
    href: "/tools/tweet-score",
    name: "Tweet Flops-o-Meter",
    blurb: "Paste a draft tweet. Get a score, a roast, and a share card.",
  },
  {
    href: "/tools/flip",
    name: "Flip",
    blurb: "Sleek iPhone coin-flip. Coming soon.",
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
        Tools
      </h1>
      <p className="mt-4 text-lg text-zinc-400">
        Quick web utilities and iPhone apps.
      </p>

      <ul className="mt-12 space-y-4">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="block rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-zinc-600 hover:bg-zinc-900/70"
            >
              <h2 className="text-xl font-semibold text-zinc-100">
                {tool.name}
              </h2>
              <p className="mt-2 text-zinc-400">{tool.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
