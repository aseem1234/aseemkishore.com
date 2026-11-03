import Link from "next/link";



/* ------------------------------------------------------------------ */
/*  Pipeline stage data                                                */
/* ------------------------------------------------------------------ */

const stages = [
  {
    num: 1,
    title: "Connect Sources",
    description:
      "Link your Google Sheets, Drive folders, and Gmail labels as data sources",
  },
  {
    num: 2,
    title: "Extract & Aggregate",
    description:
      "Pull key metrics from spreadsheets, count updated Drive files, tally email threads by label",
  },
  {
    num: 3,
    title: "Generate Report",
    description:
      "Format a clean summary with key metrics, weekly highlights, and action items",
  },
  {
    num: 4,
    title: "Deliver",
    description:
      "Email the report, save a copy to Drive, and create a Calendar reminder to review",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Inline SVG illustrations for each stage                            */
/* ------------------------------------------------------------------ */

function Stage1Illustration() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full max-w-[200px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Spreadsheet icon */}
      <rect
        x="10"
        y="20"
        width="28"
        height="32"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-neutral-400"
      />
      <line x1="18" y1="20" x2="18" y2="52" stroke="currentColor" strokeWidth="1" className="text-neutral-400" />
      <line x1="28" y1="20" x2="28" y2="52" stroke="currentColor" strokeWidth="1" className="text-neutral-400" />
      <line x1="10" y1="30" x2="38" y2="30" stroke="currentColor" strokeWidth="1" className="text-neutral-400" />
      <line x1="10" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="1" className="text-neutral-400" />

      {/* Folder icon */}
      <path
        d="M10 75 L10 100 Q10 103 13 103 L35 103 Q38 103 38 100 L38 80 Q38 77 35 77 L25 77 L22 73 L13 73 Q10 73 10 75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-neutral-400"
        fill="none"
      />

      {/* Envelope icon */}
      <rect
        x="162"
        y="20"
        width="28"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-neutral-400"
      />
      <path
        d="M162 22 L176 32 L190 22"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-neutral-400"
        fill="none"
      />

      {/* Central hub */}
      <circle cx="100" cy="60" r="16" className="fill-brand-orange/20 stroke-brand-orange" strokeWidth="2" />
      <circle cx="100" cy="60" r="6" className="fill-brand-orange" />

      {/* Dotted connecting lines */}
      <line x1="40" y1="36" x2="84" y2="58" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-neutral-400" />
      <line x1="40" y1="88" x2="84" y2="64" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-neutral-400" />
      <line x1="160" y1="32" x2="116" y2="58" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" className="text-neutral-400" />
    </svg>
  );
}

function Stage2Illustration() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full max-w-[200px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Input arrows */}
      <line x1="10" y1="30" x2="55" y2="45" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
      <line x1="10" y1="60" x2="55" y2="58" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
      <line x1="10" y1="90" x2="55" y2="70" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
      {/* Arrowheads */}
      <circle cx="10" cy="30" r="3" className="fill-neutral-400" />
      <circle cx="10" cy="60" r="3" className="fill-neutral-400" />
      <circle cx="10" cy="90" r="3" className="fill-neutral-400" />

      {/* Funnel */}
      <path
        d="M55 30 L115 30 L105 55 L105 90 L65 90 L65 55 Z"
        className="fill-brand-orange/15 stroke-brand-orange"
        strokeWidth="2"
      />

      {/* Organized rows on right */}
      <rect x="130" y="35" width="55" height="10" rx="2" className="fill-neutral-200 mwork:fill-neutral-700" />
      <rect x="130" y="52" width="55" height="10" rx="2" className="fill-neutral-200 mwork:fill-neutral-700" />
      <rect x="130" y="69" width="55" height="10" rx="2" className="fill-neutral-200 mwork:fill-neutral-700" />
      <rect x="130" y="86" width="40" height="10" rx="2" className="fill-neutral-200 mwork:fill-neutral-700" />

      {/* Arrow from funnel to rows */}
      <line x1="108" y1="60" x2="126" y2="60" stroke="currentColor" strokeWidth="1.5" className="text-brand-orange" />
      <path d="M124 56 L130 60 L124 64" stroke="currentColor" strokeWidth="1.5" className="text-brand-orange" fill="none" />
    </svg>
  );
}

function Stage3Illustration() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full max-w-[200px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Document */}
      <rect
        x="55"
        y="8"
        width="90"
        height="104"
        rx="6"
        className="fill-white mwork:fill-neutral-800 stroke-neutral-300 mwork:stroke-neutral-600"
        strokeWidth="1.5"
      />

      {/* Text lines */}
      <rect x="70" y="22" width="60" height="5" rx="1" className="fill-neutral-300 mwork:fill-neutral-600" />
      <rect x="70" y="33" width="50" height="4" rx="1" className="fill-neutral-200 mwork:fill-neutral-700" />
      <rect x="70" y="42" width="55" height="4" rx="1" className="fill-neutral-200 mwork:fill-neutral-700" />
      <rect x="70" y="51" width="40" height="4" rx="1" className="fill-neutral-200 mwork:fill-neutral-700" />
      <rect x="70" y="60" width="58" height="4" rx="1" className="fill-neutral-200 mwork:fill-neutral-700" />

      {/* Mini bar chart */}
      <rect x="72" y="85" width="12" height="18" rx="1" className="fill-brand-orange/60" />
      <rect x="88" y="78" width="12" height="25" rx="1" className="fill-brand-orange/80" />
      <rect x="104" y="88" width="12" height="15" rx="1" className="fill-brand-orange/50" />
      <rect x="120" y="75" width="12" height="28" rx="1" className="fill-brand-orange" />

      {/* Chart baseline */}
      <line x1="70" y1="103" x2="134" y2="103" stroke="currentColor" strokeWidth="1" className="text-neutral-300 mwork:text-neutral-600" />
    </svg>
  );
}

function Stage4Illustration() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full max-w-[200px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Document source */}
      <rect
        x="10"
        y="35"
        width="40"
        height="50"
        rx="4"
        className="fill-white mwork:fill-neutral-800 stroke-neutral-300 mwork:stroke-neutral-600"
        strokeWidth="1.5"
      />
      <rect x="17" y="44" width="26" height="3" rx="1" className="fill-neutral-300 mwork:fill-neutral-600" />
      <rect x="17" y="51" width="20" height="3" rx="1" className="fill-neutral-200 mwork:fill-neutral-700" />
      <rect x="17" y="58" width="23" height="3" rx="1" className="fill-neutral-200 mwork:fill-neutral-700" />

      {/* Arrow to envelope */}
      <line x1="54" y1="48" x2="120" y2="25" stroke="currentColor" strokeWidth="1.5" className="text-brand-orange" />
      <path d="M117 20 L122 24 L115 27" stroke="currentColor" strokeWidth="1.5" className="text-brand-orange" fill="none" />

      {/* Arrow to folder */}
      <line x1="54" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="1.5" className="text-brand-orange" />
      <path d="M117 56 L122 60 L117 64" stroke="currentColor" strokeWidth="1.5" className="text-brand-orange" fill="none" />

      {/* Arrow to calendar */}
      <line x1="54" y1="72" x2="120" y2="95" stroke="currentColor" strokeWidth="1.5" className="text-brand-orange" />
      <path d="M117 92 L122 96 L115 98" stroke="currentColor" strokeWidth="1.5" className="text-brand-orange" fill="none" />

      {/* Envelope */}
      <rect x="125" y="12" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
      <path d="M125 14 L139 24 L153 14" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" fill="none" />

      {/* Folder */}
      <path
        d="M125 50 L125 70 Q125 73 128 73 L150 73 Q153 73 153 70 L153 55 Q153 52 150 52 L140 52 L137 48 L128 48 Q125 48 125 50Z"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-neutral-400"
        fill="none"
      />

      {/* Calendar */}
      <rect x="125" y="86" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
      <line x1="125" y1="94" x2="153" y2="94" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" />
      <line x1="133" y1="83" x2="133" y2="89" stroke="currentColor" strokeWidth="2" className="text-neutral-400" />
      <line x1="145" y1="83" x2="145" y2="89" stroke="currentColor" strokeWidth="2" className="text-neutral-400" />
      <rect x="130" y="98" width="5" height="4" rx="0.5" className="fill-neutral-400" />
      <rect x="138" y="98" width="5" height="4" rx="0.5" className="fill-neutral-400" />
    </svg>
  );
}

const stageIllustrations = [
  Stage1Illustration,
  Stage2Illustration,
  Stage3Illustration,
  Stage4Illustration,
];

/* ------------------------------------------------------------------ */
/*  Sample output bar chart                                            */
/* ------------------------------------------------------------------ */

function WeeklyBarChart() {
  const days = [
    { label: "Mon", pct: 60 },
    { label: "Tue", pct: 80 },
    { label: "Wed", pct: 45 },
    { label: "Thu", pct: 90 },
    { label: "Fri", pct: 70 },
  ];

  return (
    <svg
      viewBox="0 0 300 140"
      className="w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Axis */}
      <line x1="30" y1="110" x2="280" y2="110" stroke="currentColor" strokeWidth="1" className="text-neutral-300 mwork:text-neutral-600" />
      <line x1="30" y1="10" x2="30" y2="110" stroke="currentColor" strokeWidth="1" className="text-neutral-300 mwork:text-neutral-600" />

      {/* Bars */}
      {days.map((d, i) => {
        const barWidth = 32;
        const gap = 50;
        const x = 45 + i * gap;
        const barHeight = (d.pct / 100) * 95;
        const y = 110 - barHeight;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="3"
              className="fill-brand-orange"
            />
            <text
              x={x + barWidth / 2}
              y="128"
              textAnchor="middle"
              className="fill-neutral-500 mwork:fill-neutral-400"
              fontSize="11"
              fontFamily="sans-serif"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Tag pill data                                                      */
/* ------------------------------------------------------------------ */

const tagPills = [
  { label: "Sheets", bg: "bg-emerald-500/20", text: "text-emerald-400" },
  { label: "Drive", bg: "bg-blue-500/20", text: "text-blue-400" },
  { label: "Gmail", bg: "bg-red-500/20", text: "text-red-400" },
  { label: "Calendar", bg: "bg-purple-500/20", text: "text-purple-400" },
] as const;

/* ------------------------------------------------------------------ */
/*  Tech stack badges                                                  */
/* ------------------------------------------------------------------ */

const techBadges = [
  "Google Workspace CLI",
  "Sheets API",
  "Gmail API",
  "Drive API",
  "Calendar API",
];

/* ------------------------------------------------------------------ */
/*  Sample metrics                                                     */
/* ------------------------------------------------------------------ */

const metrics = [
  {
    label: "Revenue",
    value: "$12,450",
    sub: "↑ 8% from last week",
    subClass: "text-emerald-500",
  },
  {
    label: "Emails Processed",
    value: "147",
    sub: "across 4 labels",
    subClass: "text-neutral-500",
  },
  {
    label: "Drive Files Updated",
    value: "23",
    sub: "this week",
    subClass: "text-neutral-500",
  },
  {
    label: "Next Review",
    value: "Mon 9:00 AM",
    sub: "calendar reminder set",
    subClass: "text-brand-orange",
  },
];

/* ================================================================== */
/*  Page component                                                     */
/* ================================================================== */

export default function GwsReportAutomationPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-orange-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden py-16 md:py-24">
        {/* Decorative blurs */}
        <div className="absolute top-[-80px] left-[-60px] w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] right-[-40px] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="https://akcomputerservices.com/google-workspace-automation"
            className="text-neutral-400 hover:text-white text-sm inline-flex items-center gap-1 mb-8 transition-colors"
          >
            &larr; Back to Google Workspace Automation
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {tagPills.map((t) => (
              <span
                key={t.label}
                className={`${t.bg} ${t.text} text-xs font-medium px-3 py-1 rounded-full`}
              >
                {t.label}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">
            Automated Report Generation
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
            Your Monday morning business report, built automatically from data
            you already have.
          </p>
        </div>
      </section>

      {/* ── Problem / Solution ───────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Problem */}
            <div className="bg-red-50 mwork:bg-red-950/30 rounded-xl p-6 md:p-8 border border-red-200 mwork:border-red-900">
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <h2 className="text-xl font-heading font-bold text-red-700 mwork:text-red-400">
                  The Problem
                </h2>
              </div>
              <p className="text-neutral-700 mwork:text-neutral-300 leading-relaxed">
                Every Monday morning starts the same way: 45 minutes copying
                numbers from spreadsheets, checking email threads for updates,
                and formatting everything into a report. It&apos;s tedious,
                error-prone, and eats into time that could be spent on actual
                work.
              </p>
            </div>

            {/* Solution */}
            <div className="bg-emerald-50 mwork:bg-emerald-950/30 rounded-xl p-6 md:p-8 border border-emerald-200 mwork:border-emerald-900">
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h2 className="text-xl font-heading font-bold text-emerald-700 mwork:text-emerald-400">
                  The Solution
                </h2>
              </div>
              <p className="text-neutral-700 mwork:text-neutral-300 leading-relaxed">
                An automated pipeline connects to your existing Google Sheets,
                Drive folders, and Gmail labels. It pulls the data, generates a
                clean formatted report, and delivers it to your inbox before you
                finish your coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pipeline Stages ──────────────────────────────────────── */}
      <section className="bg-white mwork:bg-neutral-950 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">
            How it works
          </h2>

          <div className="space-y-0">
            {stages.map((stage, idx) => {
              const Illustration = stageIllustrations[idx];
              const isLast = idx === stages.length - 1;

              return (
                <div key={stage.num} className="flex gap-6 md:gap-8">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg flex items-center justify-center shrink-0">
                      {stage.num}
                    </div>
                    {!isLast && (
                      <div className="flex-1 border-l-2 border-brand-orange/30 min-h-[80px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={isLast ? "pb-0" : "pb-12"}>
                    <h3 className="text-xl font-heading font-bold mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-neutral-600 mwork:text-neutral-400 mb-4 leading-relaxed">
                      {stage.description}
                    </p>
                    <div className="text-neutral-500 mwork:text-neutral-400">
                      <Illustration />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Sample Output ────────────────────────────────────────── */}
      <section className="bg-neutral-50 mwork:bg-neutral-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            Sample output
          </h2>

          <div className="bg-white mwork:bg-neutral-800 rounded-xl border border-neutral-200 mwork:border-neutral-700 p-6 md:p-8 shadow-lg">
            {/* Report header */}
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
              <h3 className="font-bold text-lg">Weekly Business Report</h3>
              <span className="text-neutral-500 text-sm">
                Mar 3 &ndash; 7, 2026
              </span>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-neutral-50 mwork:bg-neutral-900 rounded-lg p-5"
                >
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                    {m.label}
                  </p>
                  <p className="text-2xl font-bold">{m.value}</p>
                  <p className={`text-sm ${m.subClass}`}>{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <WeeklyBarChart />

            {/* Footer */}
            <p className="text-neutral-500 text-xs italic mt-4 text-center">
              Auto-generated by Google Workspace Automation &middot; Delivered
              via Gmail
            </p>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────────────────────── */}
      <section className="bg-white mwork:bg-neutral-950 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold mb-6">Tech stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="bg-neutral-100 mwork:bg-neutral-800 text-neutral-700 mwork:text-neutral-300 text-sm font-medium px-4 py-2 rounded-full border border-neutral-200 mwork:border-neutral-700"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-akic-brown text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Want automated reports for your business?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
            Let&apos;s connect your existing Google Workspace data into reports
            that build themselves.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-brand-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
