import Link from "next/link";



/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tagPills = [
  { label: "Drive", bg: "bg-blue-500/20", text: "text-blue-400" },
  { label: "Calendar", bg: "bg-purple-500/20", text: "text-purple-400" },
  { label: "Gmail", bg: "bg-red-500/20", text: "text-red-400" },
  { label: "Admin", bg: "bg-amber-500/20", text: "text-amber-400" },
] as const;

const techBadges = [
  "Google Workspace CLI",
  "Drive API",
  "Calendar API",
  "Gmail API",
  "Admin API",
];

const beforeIssues = [
  {
    text: "5 calendar conflicts this week",
    severity: "Critical" as const,
    color: "red" as const,
  },
  {
    text: "3 shared drives with broken permissions",
    severity: "Critical" as const,
    color: "red" as const,
  },
  {
    text: "23 Drive files not opened in 6+ months",
    severity: "Warning" as const,
    color: "amber" as const,
  },
  {
    text: "12 unanswered emails older than 3 days",
    severity: "Warning" as const,
    color: "amber" as const,
  },
] as const;

const autoResolved = [
  "18 stale files archived to \u2018Old Files\u2019 folder",
  "5 calendar conflicts rescheduled",
  "Priority email digest sent to your inbox",
  "2 broken sharing links revoked",
];

const needsReview = [
  "5 files flagged \u2014 may still be needed",
  "1 shared drive needs owner confirmation",
  "3 emails may need personal replies",
];

/* ------------------------------------------------------------------ */
/*  SVG gauge component                                                */
/* ------------------------------------------------------------------ */

function HealthGauge({
  score,
  color,
}: {
  score: number;
  color: "red" | "emerald";
}) {
  const circumference = 2 * Math.PI * 60; // ~377
  const dashArray = `${(score / 100) * circumference} ${circumference}`;
  const strokeClass =
    color === "red" ? "stroke-red-500" : "stroke-emerald-500";
  const textClass =
    color === "red" ? "text-red-500" : "text-emerald-500";

  return (
    <div className="flex flex-col items-center mb-8">
      <svg width="160" height="160" viewBox="0 0 160 160" className="w-40 h-40 mx-auto" role="img" aria-label={`Workspace health score: ${score} out of 100`}>
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r="60"
          fill="none"
          strokeWidth="8"
          className="stroke-neutral-200 mwork:stroke-neutral-700"
        />
        {/* Progress arc */}
        <circle
          cx="80"
          cy="80"
          r="60"
          fill="none"
          strokeWidth="8"
          className={strokeClass}
          strokeDasharray={dashArray}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />
        {/* Score text */}
        <text
          x="80"
          y="76"
          textAnchor="middle"
          dominantBaseline="central"
          className={`${textClass} fill-current`}
          fontSize="40"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          {score}
        </text>
        <text
          x="80"
          y="104"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-neutral-500 fill-current"
          fontSize="16"
          fontFamily="sans-serif"
        >
          /100
        </text>
      </svg>
      <p className="text-neutral-600 mwork:text-neutral-400 text-center font-medium mt-2">
        Workspace Health Score
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Warning icon SVG                                                   */
/* ------------------------------------------------------------------ */

function WarningIcon({ color }: { color: "red" | "amber" }) {
  const cls =
    color === "red" ? "text-red-500" : "text-amber-500";
  return (
    <svg
      className={`w-5 h-5 shrink-0 ${cls}`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>
  );
}

/* ================================================================== */
/*  Page component                                                     */
/* ================================================================== */

export default function GwsWorkspaceHealthCheckPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-amber-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden py-16 md:py-24">
        {/* Decorative blurs */}
        <div className="absolute top-[-80px] left-[-60px] w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] right-[-40px] w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />

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
            Workspace Health Check
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
            When&apos;s the last time you cleaned house?
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
                Files pile up in Drive. Calendar gets double-booked. Emails go
                unanswered for days. Shared drives have permissions nobody
                remembers setting. You don&apos;t know what you don&apos;t know
                &mdash; until something breaks.
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
                An automated audit scans your entire Google Workspace and
                produces an actionable report. Stale files identified, conflicts
                flagged, unanswered emails surfaced, permissions audited &mdash;
                all in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Before State ─────────────────────────────────────────── */}
      <section className="bg-neutral-50 mwork:bg-neutral-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            Current health score
          </h2>

          <div className="bg-white mwork:bg-neutral-800 rounded-xl border border-neutral-200 mwork:border-neutral-700 shadow-lg p-8">
            <HealthGauge score={47} color="red" />

            {/* Issue rows */}
            <div className="divide-y divide-neutral-200 mwork:divide-neutral-700">
              {beforeIssues.map((issue) => (
                <div
                  key={issue.text}
                  className="flex items-center gap-3 py-3"
                >
                  <WarningIcon color={issue.color} />
                  <span className="flex-1 text-neutral-700 mwork:text-neutral-300 text-sm">
                    {issue.text}
                  </span>
                  <span
                    className={`text-xs rounded-full px-2 py-0.5 ${
                      issue.severity === "Critical"
                        ? "bg-red-100 text-red-700 mwork:bg-red-900/50 mwork:text-red-400"
                        : "bg-amber-100 text-amber-700 mwork:bg-amber-900/50 mwork:text-amber-400"
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Automation ────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-neutral-600 mwork:text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The health check scans Drive file activity, Calendar event overlaps,
            Gmail response times, and sharing permissions. Results are compiled
            into an actionable report with specific recommendations.
          </p>
          {/* Downward chevron */}
          <svg
            className="w-12 h-12 text-brand-orange mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </section>

      {/* ── After State ──────────────────────────────────────────── */}
      <section className="bg-white mwork:bg-neutral-950 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            After the health check
          </h2>

          <div className="bg-white mwork:bg-neutral-800 rounded-xl border border-neutral-200 mwork:border-neutral-700 shadow-lg p-8 mb-8">
            <HealthGauge score={92} color="emerald" />
          </div>

          {/* Resolution panels */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Panel 1: Stale Files */}
            <div className="bg-emerald-50/50 mwork:bg-emerald-950/20 rounded-xl p-6 border border-emerald-200 mwork:border-emerald-800">
              <div className="flex items-center gap-2 mb-2">
                {/* Folder icon */}
                <svg
                  className="w-5 h-5 text-emerald-600 mwork:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
                <h3 className="font-semibold text-emerald-700 mwork:text-emerald-400">
                  Stale Files Resolved
                </h3>
              </div>
              <p className="text-sm text-neutral-600 mwork:text-neutral-400 mb-3">
                18 files archived, 5 flagged for review
              </p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-neutral-700 mwork:text-neutral-300">
                    Q2-2025-report.xlsx
                  </span>
                  <span className="bg-emerald-100 mwork:bg-emerald-900/50 text-emerald-700 mwork:text-emerald-400 text-xs rounded-full px-2 py-0.5">
                    Archived
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-700 mwork:text-neutral-300">
                    old-logo-v2.png
                  </span>
                  <span className="bg-emerald-100 mwork:bg-emerald-900/50 text-emerald-700 mwork:text-emerald-400 text-xs rounded-full px-2 py-0.5">
                    Archived
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-700 mwork:text-neutral-300">
                    client-NDA-draft.docx
                  </span>
                  <span className="bg-amber-100 mwork:bg-amber-900/50 text-amber-700 mwork:text-amber-400 text-xs rounded-full px-2 py-0.5">
                    Review
                  </span>
                </li>
              </ul>
            </div>

            {/* Panel 2: Calendar Conflicts */}
            <div className="bg-emerald-50/50 mwork:bg-emerald-950/20 rounded-xl p-6 border border-emerald-200 mwork:border-emerald-800">
              <div className="flex items-center gap-2 mb-2">
                {/* Calendar icon */}
                <svg
                  className="w-5 h-5 text-emerald-600 mwork:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                <h3 className="font-semibold text-emerald-700 mwork:text-emerald-400">
                  Calendar Conflicts Resolved
                </h3>
              </div>
              <p className="text-sm text-neutral-600 mwork:text-neutral-400 mb-3">
                All 5 conflicts resolved
              </p>
              <ul className="space-y-1.5 text-sm text-neutral-700 mwork:text-neutral-300">
                <li>Tue 2:00 PM: Moved team sync to 3:00 PM</li>
                <li>Wed 10:00 AM: Declined duplicate meeting</li>
                <li>Thu 1:00 PM: Shortened review to 30 min</li>
              </ul>
            </div>

            {/* Panel 3: Email Follow-ups */}
            <div className="bg-emerald-50/50 mwork:bg-emerald-950/20 rounded-xl p-6 border border-emerald-200 mwork:border-emerald-800">
              <div className="flex items-center gap-2 mb-2">
                {/* Email icon */}
                <svg
                  className="w-5 h-5 text-emerald-600 mwork:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <h3 className="font-semibold text-emerald-700 mwork:text-emerald-400">
                  Email Digest Sent
                </h3>
              </div>
              <p className="text-sm text-neutral-600 mwork:text-neutral-400 mb-3">
                Priority digest with 12 items delivered
              </p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-neutral-700 mwork:text-neutral-300">
                    Sarah Chen &mdash; Website redesign
                  </span>
                  <span className="text-red-600 mwork:text-red-400 text-xs">
                    3 days waiting
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-700 mwork:text-neutral-300">
                    Mike Johnson &mdash; Budget review
                  </span>
                  <span className="text-amber-600 mwork:text-amber-400 text-xs">
                    2 days waiting
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-700 mwork:text-neutral-300">
                    David Kim &mdash; Partnership
                  </span>
                  <span className="text-amber-600 mwork:text-amber-400 text-xs">
                    2 days waiting
                  </span>
                </li>
              </ul>
            </div>

            {/* Panel 4: Permissions Audit */}
            <div className="bg-emerald-50/50 mwork:bg-emerald-950/20 rounded-xl p-6 border border-emerald-200 mwork:border-emerald-800">
              <div className="flex items-center gap-2 mb-2">
                {/* Shield icon */}
                <svg
                  className="w-5 h-5 text-emerald-600 mwork:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
                <h3 className="font-semibold text-emerald-700 mwork:text-emerald-400">
                  Permissions Fixed
                </h3>
              </div>
              <p className="text-sm text-neutral-600 mwork:text-neutral-400 mb-3">
                3 drives audited, issues resolved
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-neutral-500 mwork:text-neutral-400">
                    <th className="pb-1 font-medium">Drive</th>
                    <th className="pb-1 font-medium">Issue</th>
                    <th className="pb-1 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700 mwork:text-neutral-300">
                  <tr>
                    <td className="py-1">Marketing Assets</td>
                    <td className="py-1">Public link exposed</td>
                    <td className="py-1 text-right text-emerald-600 mwork:text-emerald-400">
                      Fixed &#10003;
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1">Client Files</td>
                    <td className="py-1">Ex-employee access</td>
                    <td className="py-1 text-right text-emerald-600 mwork:text-emerald-400">
                      Fixed &#10003;
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1">Finance</td>
                    <td className="py-1">Overly broad sharing</td>
                    <td className="py-1 text-right text-amber-600 mwork:text-amber-400">
                      Flagged &#9888;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Action Items ─────────────────────────────────────────── */}
      <section className="bg-neutral-50 mwork:bg-neutral-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            What happened
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Auto-resolved */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                <h3 className="font-semibold text-emerald-700 mwork:text-emerald-400">
                  Handled automatically
                </h3>
              </div>
              <ul className="space-y-3">
                {autoResolved.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-neutral-700 mwork:text-neutral-300 text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Needs review */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <h3 className="font-semibold text-amber-700 mwork:text-amber-400">
                  Needs your review
                </h3>
              </div>
              <ul className="space-y-3">
                {needsReview.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                    <span className="text-neutral-700 mwork:text-neutral-300 text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
            Want a health check for your workspace?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
            Let&apos;s audit your Google Workspace and surface the issues hiding
            in plain sight.
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
