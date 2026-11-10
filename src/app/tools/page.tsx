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
    blurb: "Fast Coin Flip for iPhone. Mint your own coin, flip it fair. On the App Store.",
  },
];

const positionTrackerTools = [
  {
    href: "https://positiontracker.trading/sec-filings",
    name: "SEC Filings Feed",
    blurb:
      "Public 8-K, 10-Q, 10-K, S-1, and Form 4 filings with plain-English summaries, searchable by ticker and form.",
  },
  {
    href: "https://positiontracker.trading/congress-trades",
    name: "Congressional Stock Trades",
    blurb:
      "U.S. House and Senate periodic transaction disclosures organized by member and ticker.",
  },
  {
    href: "https://positiontracker.trading/tools/portfolio-check",
    name: "Portfolio Concentration Check",
    blurb:
      "Check position weights and single-name concentration in your browser without creating an account.",
  },
  {
    href: "https://positiontracker.trading/tools/covered-call-calculator",
    name: "Covered Call Calculator",
    blurb:
      "Model covered-call premium, break-even price, and assignment payoff on shares you hold.",
  },
  {
    href: "https://positiontracker.trading/tools/wheel-calculator",
    name: "Wheel Strategy Calculator",
    blurb:
      "Model cash-secured put and covered-call strikes, premiums, and cost-basis scenarios.",
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

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
          Public Feeds &amp; Calculators on PositionTracker
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Free browser tools from{" "}
          <a
            href="https://positiontracker.trading"
            target="_blank"
            rel="noopener"
            className="text-blue-400 hover:text-blue-300"
          >
            positiontracker.trading
          </a>
          . No account required; informational only and not financial advice.
        </p>

        <ul className="mt-6 space-y-4">
          {positionTrackerTools.map((tool) => (
            <li key={tool.href}>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener"
                className="block rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-zinc-600 hover:bg-zinc-900/70"
              >
                <h3 className="text-xl font-semibold text-zinc-100">
                  {tool.name} <span className="text-sm text-zinc-500">↗</span>
                </h3>
                <p className="mt-2 text-zinc-400">{tool.blurb}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
