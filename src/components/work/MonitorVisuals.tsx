import { FrameShell } from "@/components/work/OpsVisuals";

/**
 * Visuals for the SEC filing monitor case study.
 *
 * Everything in this file is REAL. The schedule rows are the live production
 * arrangement, the cadence histogram is measured from the repository's own
 * commit history, and both the input and output samples are excerpts of actual
 * SEC filing text and actual generated output. SEC filings are public record,
 * so no anonymisation is needed or appropriate here.
 *
 * Deliberately NOT published: the droplet's IP address and hostname.
 *
 * Server-component safe: no hooks, no client directives.
 */

/* ------------------------------------------------------------------ *
 * The live production schedule, spread across two runners.
 * ------------------------------------------------------------------ */
export function MonitorSchedule() {
  const rows = [
    {
      when: "Hourly, plus a second pass at half past",
      what: "Filing monitor",
      where: "Private server",
      plain:
        "The main job. Checks EDGAR for new filings, analyses anything material, and commits the results.",
      live: true,
    },
    {
      when: "07:30 and 13:30 UTC, weekdays",
      what: "Daily highlights",
      where: "GitHub Actions",
      plain:
        "Rolls the day's filings into one ranked digest with an executive summary at the top.",
      live: true,
    },
    {
      when: "09:20 UTC, daily",
      what: "Earnings fast-lane grader",
      where: "Private server",
      plain:
        "Grades yesterday's experimental earnings-detection runs and commits a dated report card.",
      live: true,
    },
    {
      when: "Continuous service",
      what: "Earnings fast-lane race",
      where: "Private server",
      plain:
        "A long-running experiment that races several sources to see which reports earnings first.",
      live: true,
    },
    {
      when: "Retained, switched off",
      what: "Legacy monitor workflow",
      where: "GitHub Actions",
      plain:
        "The original hosting for the filing monitor. Kept in place, disabled, as a one-command way back if the server ever fails.",
      live: false,
    },
  ];

  return (
    <FrameShell
      real
      title="What actually runs, and where"
      note="The live production arrangement. The filing monitor moved off GitHub Actions onto a dedicated server; the daily highlights digest still runs on GitHub Actions. The original workflow was disabled rather than deleted so the move can be reversed with a single command."
    >
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.what}
            className="min-w-0 rounded-lg border border-neutral-200 bg-neutral-50 p-3 mwork:border-neutral-700 mwork:bg-neutral-800/50"
          >
            <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="text-xs font-semibold text-neutral-900 mwork:text-neutral-100">
                {r.what}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${
                  r.live
                    ? "bg-akic-green/10 text-akic-green ring-akic-green/30 mwork:bg-akic-green/20"
                    : "bg-neutral-200/70 text-neutral-500 ring-neutral-300 mwork:bg-neutral-700/60 mwork:text-neutral-400 mwork:ring-neutral-600"
                }`}
              >
                {r.live ? "Live" : "Standby"}
              </span>
              <span className="text-[11px] text-neutral-400">{r.where}</span>
            </div>
            <p className="mb-1 text-[11px] font-medium text-brand-orange">{r.when}</p>
            <p className="text-xs leading-relaxed text-neutral-600 mwork:text-neutral-400">
              {r.plain}
            </p>
          </div>
        ))}
      </div>
    </FrameShell>
  );
}

/* ------------------------------------------------------------------ *
 * REAL cadence, measured from the repository's commit history.
 * 237 data commits written by the server between 27 July and 7 August
 * 2026, bucketed by hour of the day in UTC.
 * ------------------------------------------------------------------ */
const HOURS = [10, 7, 5, 4, 0, 0, 1, 0, 0, 0, 5, 10, 10, 20, 20, 20, 18, 17, 20, 20, 15, 16, 10, 9];

export function MonitorCadence() {
  const max = Math.max(...HOURS);
  return (
    <FrameShell
      real
      title="When the monitor actually wrote data"
      note="Measured from the repository's own commit history: 237 data commits written by the server between 27 July and 7 August 2026, bucketed by hour of the day in UTC. The tall block from 13:00 to 21:00 UTC is the US market session. Coverage thins overnight and drops to a few sweeps a day at weekends, which is the intended shape rather than a gap."
    >
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { v: "237", l: "data commits in 12 days" },
          { v: "31 min", l: "median gap between runs" },
          { v: "~23", l: "runs per weekday" },
          { v: "2\u20133", l: "runs per weekend day" },
        ].map((s) => (
          <div key={s.l} className="min-w-0">
            <div className="text-lg font-bold tabular-nums text-neutral-900 mwork:text-neutral-100">
              {s.v}
            </div>
            <div className="text-[11px] leading-tight text-neutral-500 mwork:text-neutral-400">
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* histogram */}
      <div className="flex h-28 items-end gap-[3px]" role="img" aria-label="Histogram of monitor runs by hour of day in UTC, peaking between 13:00 and 21:00">
        {HOURS.map((v, h) => {
          const market = h >= 13 && h <= 20;
          return (
            <div key={h} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
              <div
                className={`w-full rounded-t ${
                  v === 0
                    ? "bg-neutral-200 mwork:bg-neutral-700"
                    : market
                      ? "bg-brand-orange"
                      : "bg-brand-orange/40"
                }`}
                style={{ height: `${Math.max((v / max) * 100, v === 0 ? 2 : 8)}%` }}
              />
            </div>
          );
        })}
      </div>
      {/* hour axis: label every third hour so it stays readable on a phone */}
      <div className="mt-1.5 flex gap-[3px]">
        {HOURS.map((_, h) => (
          <div key={h} className="min-w-0 flex-1 text-center text-[9px] tabular-nums text-neutral-400">
            {h % 3 === 0 ? h : ""}
          </div>
        ))}
      </div>
      <div className="mt-1 text-center text-[10px] font-medium uppercase tracking-wider text-neutral-400">
        hour of day (UTC)
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-neutral-500 mwork:text-neutral-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-orange" /> US market session
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-orange/40" /> outside the session
        </span>
      </div>
    </FrameShell>
  );
}

/* ------------------------------------------------------------------ *
 * REAL input: an actual Costco 8-K as it arrives from EDGAR.
 * Text excerpted from the repository's own regression fixture.
 * ------------------------------------------------------------------ */
export function RawFilingSample() {
  const meta = [
    { k: "company_name", v: "COSTCO WHOLESALE CORPORATION" },
    { k: "ticker", v: "COST" },
    { k: "form_type", v: "8-K" },
    { k: "filing_date", v: "2026-04-15" },
    { k: "cik", v: "0000909832" },
    { k: "accepted_datetime", v: "2026-04-15T20:16:27+00:00" },
    { k: "detected_items", v: "[\"8.01\", \"9.01\"]" },
  ];

  return (
    <FrameShell
      real
      title="What arrives from EDGAR"
      note="A real Costco 8-K, excerpted from the project's own regression fixture. SEC filings are public record. The structured fields on the left are what the filing index gives you; the text on the right is the document itself, boilerplate and all. Note what is missing: nothing here tells you whether the filing matters."
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mwork:text-neutral-400">
            Index metadata
          </p>
          <div className="overflow-hidden rounded-lg border border-neutral-200 mwork:border-neutral-700">
            {meta.map((m, i) => (
              <div
                key={m.k}
                className={`flex flex-col gap-0.5 px-3 py-1.5 ${
                  i % 2 ? "bg-neutral-50 mwork:bg-neutral-800/40" : "bg-white mwork:bg-neutral-900"
                }`}
              >
                <code className="text-[10px] text-brand-orange">{m.k}</code>
                <code className="break-all text-[11px] text-neutral-700 mwork:text-neutral-300">
                  {m.v}
                </code>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mwork:text-neutral-400">
              Document text
            </p>
            <span className="text-[11px] text-neutral-400">2,924 characters</span>
          </div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-neutral-900 p-3 text-[10.5px] leading-relaxed text-neutral-300 mwork:bg-neutral-950">
{`cost-20260415 UNITED STATES SECURITIES AND
EXCHANGE COMMISSION Washington, D.C. 20549
FORM 8-K CURRENT REPORT Pursuant to Section 13
or 15(d) of the Securities Exchange Act of 1934
Date of Report (Date of Earliest Event
Reported): April 15, 2026 COSTCO WHOLESALE
CORPORATION (Exact name of registrant as
specified in its charter) Washington 0-20355
91-1223280 (State or other jurisdiction of
incorporation) (Commission File No.) (I.R.S.
Employer Identification No.) 999 Lake Drive
Issaquah , WA 98027 (Address of principal
executive offices and zip code) Registrant's
telephone number, including area code:
425 - 313-8100 Check the appropriate box below
if the Form 8-K filing is intended to si...`}
          </pre>
        </div>
      </div>
    </FrameShell>
  );
}

/* ------------------------------------------------------------------ *
 * REAL output: an excerpt of the digest generated on 7 August 2026.
 * ------------------------------------------------------------------ */
export function HighlightsSample() {
  const entries = [
    {
      ticker: "FOX",
      company: "Fox Corp",
      form: "10-K",
      score: 10,
      tone: "Bullish",
      tags: ["M&A", "Debt issuance"],
      text: "Fox Corp agreed to acquire Roku for $96.00 cash plus 0.9693 FOX Class A shares per Roku share, backed by $12.0 billion in bridge financing commitments.",
    },
    {
      ticker: "DDOG",
      company: "Datadog, Inc.",
      form: "10-Q",
      score: 10,
      tone: "Bearish",
      tags: ["Earnings miss"],
      text: "Datadog Q2 revenue grew 35.6% YoY to $1.121B and swung to $44.6M net income, but the stock plunged 19% as a 0.5% operating margin and $220.3M in quarterly stock-based compensation signaled severe profitability compression.",
    },
    {
      ticker: "NET",
      company: "Cloudflare, Inc.",
      form: "10-Q + 8-K",
      score: 10,
      tone: "Mixed",
      tags: ["Other"],
      text: "Cloudflare recorded a $150.7M restructuring charge in Q2 FY2026 for an \u201cagentic AI-first operating model\u201d pivot and workforce reduction, while revenue grew 35.9% YoY to $696.1M.",
    },
  ];

  const toneStyle: Record<string, string> = {
    Bullish: "bg-akic-green/10 text-akic-green ring-akic-green/30 mwork:bg-akic-green/20",
    Bearish: "bg-red-500/10 text-red-600 ring-red-500/30 mwork:bg-red-500/20 mwork:text-red-400",
    Mixed: "bg-brand-orange/10 text-brand-orange ring-brand-orange/30 mwork:bg-brand-orange/20",
  };

  return (
    <FrameShell
      real
      title="What comes out — Daily SEC Highlights, 7 August 2026"
      note="A genuine excerpt of the digest generated on 7 August 2026 from 156 filings. Every figure was written by the pipeline, not by hand. Shown for illustration of the output format only; this is not investment advice and the underlying filings are the authoritative source."
    >
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b border-neutral-200 pb-3 text-[11px] text-neutral-500 mwork:border-neutral-700 mwork:text-neutral-400">
        <span>
          <strong className="text-neutral-800 mwork:text-neutral-200">156</strong> filings analysed
        </span>
        <span>Generated 09:31 ET</span>
      </div>

      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mwork:text-neutral-400">
        Executive summary
      </p>
      <p className="mb-4 border-l-2 border-brand-orange pl-3 text-xs leading-relaxed text-neutral-700 mwork:text-neutral-300">
        FOX announced a $96/share plus 0.9693 FOX shares deal to acquire Roku, backed by $12B bridge
        financing, capping record Roku profitability. Cloud/AI infrastructure players diverged
        sharply: Cloudflare restructured for AI-first operations while Datadog&apos;s 35.6% revenue
        growth was overshadowed by a 19% stock plunge on thin margins.
      </p>

      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mwork:text-neutral-400">
        Ranked entries
      </p>
      <div className="space-y-2">
        {entries.map((e) => (
          <div
            key={e.ticker}
            className="min-w-0 rounded-lg border border-neutral-200 bg-white p-3 mwork:border-neutral-700 mwork:bg-neutral-900"
          >
            <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-mono text-xs font-bold text-brand-orange">${e.ticker}</span>
              <span className="text-xs font-semibold text-neutral-900 mwork:text-neutral-100">
                {e.company}
              </span>
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-600 mwork:bg-neutral-800 mwork:text-neutral-300">
                {e.form}
              </span>
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-bold text-akic-cream mwork:bg-neutral-950">
                {e.score}/10
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ring-inset ${toneStyle[e.tone]}`}
              >
                {e.tone}
              </span>
              {e.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600 mwork:bg-neutral-800 mwork:text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-neutral-600 mwork:text-neutral-400">
              {e.text}
            </p>
          </div>
        ))}
      </div>
    </FrameShell>
  );
}

/* ------------------------------------------------------------------ *
 * How the pieces connect. Git is the database.
 * ------------------------------------------------------------------ */
export function DataFlowDiagram() {
  const chain = [
    {
      n: "01",
      t: "EDGAR",
      d: "Public filings are pulled from the SEC, paced politely and identified honestly.",
      tag: "Source",
    },
    {
      n: "02",
      t: "Private server",
      d: "A scheduled job filters the noise, sends only what looks material for analysis, and scores it.",
      tag: "Compute",
    },
    {
      n: "03",
      t: "The Git repository",
      d: "Results are committed straight into version control. The repository is the database and the hand-off point, so every change has an author, a timestamp and a full history.",
      tag: "Storage",
    },
  ];

  const consumers = [
    {
      t: "The dashboard product",
      d: "Reads the committed files and sends every alert and digest email.",
      out: "Email",
    },
    {
      t: "The publishing service",
      d: "Reads the same files and posts the highest-scoring filings to a labelled automated X account.",
      out: "Public posts",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {chain.map((s) => (
          <div
            key={s.n}
            className="min-w-0 rounded-lg border border-neutral-200 bg-white p-4 mwork:border-neutral-700 mwork:bg-neutral-900"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                {s.n}
              </span>
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-500 mwork:bg-neutral-800 mwork:text-neutral-400">
                {s.tag}
              </span>
            </div>
            <p className="mb-1 text-xs font-semibold text-neutral-900 mwork:text-neutral-100">{s.t}</p>
            <p className="text-[11px] leading-relaxed text-neutral-600 mwork:text-neutral-400">
              {s.d}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] font-bold uppercase tracking-wider text-neutral-400 mwork:text-neutral-500">
        Two independent readers, neither one knowing about the other
      </p>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {consumers.map((c) => (
          <div
            key={c.t}
            className="min-w-0 rounded-lg border border-brand-orange/30 bg-brand-orange/5 p-4 mwork:border-brand-orange/30 mwork:bg-brand-orange/10"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold text-white mwork:bg-neutral-100 mwork:text-neutral-900">
                04
              </span>
              <span className="rounded-full bg-brand-orange/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-orange-dark mwork:text-brand-orange">
                {c.out}
              </span>
            </div>
            <p className="mb-1 text-xs font-semibold text-neutral-900 mwork:text-neutral-100">{c.t}</p>
            <p className="text-[11px] leading-relaxed text-neutral-600 mwork:text-neutral-400">
              {c.d}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// The anatomy of an automated post. Structure and field order are taken from the
// publishing service's own composer; the values shown are a representative
// example, not a specific archived post.
export function XPostAnatomy() {
  const rows: { icon: string; label: string; body: string }[] = [
    { icon: "📄", label: "Header", body: "$EXMPL · Q3 results filed - Example Industries" },
    { icon: "", label: "The take", body: "Revenue beat but guidance came down, and the margin line is doing the talking." },
    { icon: "📊", label: "Figures", body: "Revenue $4.10B vs $3.95B est · EPS $1.62 vs $1.48 est" },
    { icon: "", label: "Verdict", body: "Beat on both lines" },
    { icon: "🔷", label: "Key points", body: "Operating margin compressed 180bps year over year" },
    { icon: "🔷", label: "", body: "Full-year outlook trimmed to the low end of prior range" },
    { icon: "🔻", label: "Market reaction", body: "Shares down 6% after hours" },
    { icon: "👀", label: "Watch", body: "Whether the margin pressure is pricing or input costs on the call" },
  ];

  return (
    <FrameShell
      title="Anatomy of an automated post"
      real={false}
      note="Illustration. The field order and structure are taken from the publishing service's composer, but the company and figures are invented. Numbers lead deliberately: a post that says only that a company filed an 8-K is not a market update."
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 border-b border-neutral-200 pb-3 mwork:border-neutral-700">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white mwork:bg-neutral-100 mwork:text-neutral-900">
            SF
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-neutral-900 mwork:text-neutral-100">
                SEC Filings Bot
              </span>
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500 mwork:bg-neutral-800 mwork:text-neutral-400">
                Automated
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 mwork:text-neutral-400">
              posts on its own credentials
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          {rows.map((r, i) => (
            <div key={i} className="flex min-w-0 gap-2.5">
              <span className="w-4 flex-none text-center text-[11px] leading-relaxed">
                {r.icon}
              </span>
              <span className="w-24 flex-none text-[10px] font-bold uppercase tracking-wider text-neutral-400 mwork:text-neutral-500">
                {r.label}
              </span>
              <span className="min-w-0 flex-1 text-[11px] leading-relaxed text-neutral-700 mwork:text-neutral-300">
                {r.body}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-200 pt-2.5 mwork:border-neutral-700">
          <p className="text-[11px] leading-relaxed text-neutral-500 mwork:text-neutral-400">
            SEC filing: <span className="text-brand-orange">link to the original document</span>
            <br />
            Full analysis: <span className="text-brand-orange">link to the dashboard page</span>
          </p>
        </div>
      </div>
    </FrameShell>
  );
}

// The gates a filing must clear before it is allowed to post publicly.
export function PublishGates() {
  const gates = [
    {
      t: "Materiality",
      d: "Only filings scored 6 or higher out of 10 are eligible. Everything else is stored but never posted.",
    },
    {
      t: "Recency",
      d: "Nothing older than 24 hours. This stops a backlog from being dumped as if it were news.",
    },
    {
      t: "Volume cap",
      d: "At most 5 posts per run, so an unusually busy filing hour cannot turn into a flood.",
    },
    {
      t: "One event, one post",
      d: "A company often splits one earnings release across several filings. Only the highest-scoring one posts.",
    },
    {
      t: "But not over-merged",
      d: "Five executives each filing an insider trade on the same day stay five separate posts, because they are five real events.",
    },
    {
      t: "No dead links",
      d: "If the analysis page is not live yet, a fresh filing waits one cycle; after that it posts without the link rather than going silent.",
    },
    {
      t: "Never twice",
      d: "Every published filing is recorded, so a repeated run cannot repost the same thing.",
    },
  ];

  return (
    <FrameShell
      title="What has to be true before anything posts"
      real={false}
      note="Illustration of the real rules enforced in the publishing service. Each one exists because of something that actually went wrong or could."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        {gates.map((g, i) => (
          <div
            key={g.t}
            className="flex min-w-0 gap-2.5 rounded-lg border border-neutral-200 bg-white p-3 mwork:border-neutral-700 mwork:bg-neutral-900"
          >
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-akic-green/15 text-[10px] font-bold text-akic-green">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="mb-0.5 text-xs font-semibold text-neutral-900 mwork:text-neutral-100">
                {g.t}
              </p>
              <p className="text-[11px] leading-relaxed text-neutral-600 mwork:text-neutral-400">
                {g.d}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FrameShell>
  );
}
