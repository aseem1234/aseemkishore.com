import Link from "next/link";



/* ------------------------------------------------------------------ */
/*  Dummy data                                                         */
/* ------------------------------------------------------------------ */

const emails = [
  {
    sender: "Acme Hosting",
    subject: "Invoice #4521 - March Services — $299.00",
    time: "9:02 AM",
  },
  {
    sender: "Sarah Chen",
    subject: "Re: Website redesign timeline — need update by Friday",
    time: "8:47 AM",
  },
  {
    sender: "TechCrunch Daily",
    subject: "This Week in Tech: AI assistants are everywhere",
    time: "8:30 AM",
  },
  {
    sender: "Mike Johnson",
    subject: "Re: Q1 Budget Review — updated numbers attached",
    time: "8:15 AM",
  },
  {
    sender: "Mailchimp",
    subject: "Your campaign report for February is ready",
    time: "7:58 AM",
  },
  {
    sender: "Lisa Park",
    subject: "Urgent: Client presentation needs review before 3pm",
    time: "7:41 AM",
  },
  {
    sender: "AWS",
    subject: "Invoice #8834 - February Usage — $1,247.00",
    time: "7:20 AM",
  },
  {
    sender: "David Kim",
    subject: "Follow up: Partnership proposal — any thoughts?",
    time: "6:55 AM",
  },
];

const techBadges = [
  "Google Workspace CLI",
  "Gmail API",
  "Sheets API",
  "Calendar API",
  "Claude AI",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function InboxTriagePage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-blue-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden py-16 md:py-24">
        {/* Decorative blurred circles */}
        <div className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-60px] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="https://akcomputerservices.com/google-workspace-automation"
            className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Google Workspace Automation
          </Link>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-500/20 text-red-400">
              Gmail
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
              Sheets
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
              Calendar
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Inbox Triage Automation
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
            Stop losing important emails in the noise.
          </p>
        </div>
      </section>

      {/* ── Problem / Solution ───────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="rounded-xl border border-red-200 mwork:border-red-900 bg-red-50/50 mwork:bg-red-950/20 p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                <h3 className="font-semibold text-red-700 mwork:text-red-400">
                  The Problem
                </h3>
              </div>
              <p className="text-neutral-700 mwork:text-neutral-300 text-sm leading-relaxed">
                47 unread emails every morning. Invoices buried under
                newsletters. Client requests missed for days. Follow-ups
                forgotten until it&apos;s too late. Sound familiar?
              </p>
            </div>

            {/* Solution */}
            <div className="rounded-xl border border-emerald-200 mwork:border-emerald-900 bg-emerald-50/50 mwork:bg-emerald-950/20 p-6">
              <div className="flex items-center gap-2 mb-3">
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
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="font-semibold text-emerald-700 mwork:text-emerald-400">
                  The Solution
                </h3>
              </div>
              <p className="text-neutral-700 mwork:text-neutral-300 text-sm leading-relaxed">
                An automated classification system scans your inbox, identifies
                what each email is, and routes it to the right place — Sheets
                for tracking, Calendar for follow-ups, archive for noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Before State ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-neutral-50 mwork:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Your inbox right now
          </h2>

          <div className="bg-white mwork:bg-neutral-800 rounded-xl border border-neutral-200 mwork:border-neutral-700 shadow-lg overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 mwork:border-neutral-700">
              <span className="font-semibold text-neutral-800 mwork:text-neutral-200">
                Inbox
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 mwork:bg-red-900/40 mwork:text-red-400">
                47 unread
              </span>
            </div>

            {/* Email rows */}
            <div className="divide-y divide-neutral-100 mwork:divide-neutral-700/50">
              {emails.map((email, i) => (
                <div
                  key={`${email.sender}-${email.subject}`}
                  className={`flex items-center gap-3 px-5 py-3 text-sm ${
                    i % 2 === 0
                      ? "bg-white mwork:bg-neutral-800"
                      : "bg-neutral-50/60 mwork:bg-neutral-800/60"
                  }`}
                >
                  <span className="w-2 h-2 shrink-0 bg-neutral-300 mwork:bg-neutral-600 rounded-full" />
                  <span className="w-32 truncate font-medium text-neutral-800 mwork:text-neutral-200">
                    {email.sender}
                  </span>
                  <span className="flex-1 truncate text-neutral-600 mwork:text-neutral-400">
                    {email.subject}
                  </span>
                  <span className="text-xs text-neutral-500 shrink-0">
                    {email.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Automation (arrow transition) ────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-600 mwork:text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The Google Workspace CLI scans each email, classifies it by sender
            patterns, subject keywords, and content type, then routes it to the
            right destination — automatically.
          </p>

          {/* Downward chevron */}
          <svg
            className="w-12 h-12 mx-auto text-brand-orange"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 5.25l-7.5 7.5-7.5-7.5M19.5 11.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </section>

      {/* ── After State ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white mwork:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Everything in its place
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Panel 1 — Payments Due */}
            <div className="bg-emerald-50/50 mwork:bg-emerald-950/20 rounded-xl p-6 border border-emerald-200 mwork:border-emerald-800">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-emerald-600 mwork:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M10.875 12c-.621 0-1.125.504-1.125 1.125M12 10.875c0-.621.504-1.125 1.125-1.125m0 0h1.5c.621 0 1.125.504 1.125 1.125"
                  />
                </svg>
                <h3 className="font-semibold text-emerald-700 mwork:text-emerald-400">
                  Payments Due
                </h3>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-emerald-800/70 mwork:text-emerald-400/70 border-b border-emerald-200 mwork:border-emerald-800">
                    <th className="pb-2 font-medium">Vendor</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Due Date</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700 mwork:text-neutral-300">
                  <tr className="border-b border-emerald-100 mwork:border-emerald-900/50">
                    <td className="py-2">Acme Hosting</td>
                    <td className="py-2">$299.00</td>
                    <td className="py-2">Mar 15</td>
                  </tr>
                  <tr>
                    <td className="py-2">AWS</td>
                    <td className="py-2">$1,247.00</td>
                    <td className="py-2">Mar 10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Panel 2 — Client Inbox */}
            <div className="bg-blue-50/50 mwork:bg-blue-950/20 rounded-xl p-6 border border-blue-200 mwork:border-blue-800">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-blue-600 mwork:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                  />
                </svg>
                <h3 className="font-semibold text-blue-700 mwork:text-blue-400">
                  Client Inbox
                </h3>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-blue-800/70 mwork:text-blue-400/70 border-b border-blue-200 mwork:border-blue-800">
                    <th className="pb-2 font-medium">Client</th>
                    <th className="pb-2 font-medium">Subject</th>
                    <th className="pb-2 font-medium">Urgency</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700 mwork:text-neutral-300">
                  <tr className="border-b border-blue-100 mwork:border-blue-900/50">
                    <td className="py-2">Lisa Park</td>
                    <td className="py-2">Client presentation review</td>
                    <td className="py-2">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        High
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100 mwork:border-blue-900/50">
                    <td className="py-2">Sarah Chen</td>
                    <td className="py-2">Website redesign timeline</td>
                    <td className="py-2">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Medium
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">David Kim</td>
                    <td className="py-2">Partnership proposal</td>
                    <td className="py-2">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Low
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Panel 3 — Calendar Reminders */}
            <div className="bg-amber-50/50 mwork:bg-amber-950/20 rounded-xl p-6 border border-amber-200 mwork:border-amber-800">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-amber-600 mwork:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                <h3 className="font-semibold text-amber-700 mwork:text-amber-400">
                  Follow-up Reminders
                </h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white/60 mwork:bg-neutral-800/60 rounded-lg p-3 border border-amber-100 mwork:border-amber-900/50">
                  <p className="font-medium text-sm text-neutral-800 mwork:text-neutral-200">
                    Reply to Sarah Chen
                  </p>
                  <p className="text-xs text-neutral-500 mwork:text-neutral-400 mt-0.5">
                    Website redesign — waiting 2 days
                  </p>
                  <p className="text-xs text-amber-600 mwork:text-amber-400 mt-1 font-medium">
                    Tomorrow, 9:00 AM
                  </p>
                </div>
                <div className="bg-white/60 mwork:bg-neutral-800/60 rounded-lg p-3 border border-amber-100 mwork:border-amber-900/50">
                  <p className="font-medium text-sm text-neutral-800 mwork:text-neutral-200">
                    Reply to David Kim
                  </p>
                  <p className="text-xs text-neutral-500 mwork:text-neutral-400 mt-0.5">
                    Partnership proposal — waiting 3 days
                  </p>
                  <p className="text-xs text-amber-600 mwork:text-amber-400 mt-1 font-medium">
                    Tomorrow, 10:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Panel 4 — Archived */}
            <div className="bg-neutral-100/50 mwork:bg-neutral-800/30 rounded-xl p-6 border border-neutral-300 mwork:border-neutral-700">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-neutral-600 mwork:text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                <h3 className="font-semibold text-neutral-600 mwork:text-neutral-400">
                  Archived &amp; Labeled
                </h3>
              </div>

              <ul className="space-y-2 text-sm text-neutral-600 mwork:text-neutral-400">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 mt-0.5 text-neutral-400 shrink-0"
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
                  2 newsletters archived &rarr; &ldquo;Newsletters&rdquo; label
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 mt-0.5 text-neutral-400 shrink-0"
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
                  1 marketing email archived &rarr; &ldquo;Promotions&rdquo;
                  label
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 mt-0.5 text-neutral-400 shrink-0"
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
                  1 internal update archived &rarr; &ldquo;Team&rdquo; label
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-neutral-50 mwork:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-around items-center gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-brand-orange to-akic-gold">
                47
              </p>
              <p className="text-sm text-neutral-500 mt-1">emails triaged</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-brand-orange to-akic-gold">
                12
              </p>
              <p className="text-sm text-neutral-500 mt-1">seconds</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-brand-orange to-akic-gold">
                4
              </p>
              <p className="text-sm text-neutral-500 mt-1">destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg font-semibold text-neutral-500 mwork:text-neutral-400 mb-6">
            Built with
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="text-sm px-4 py-2 rounded-full bg-neutral-100 mwork:bg-neutral-800 text-neutral-700 mwork:text-neutral-300 border border-neutral-200 mwork:border-neutral-700"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-akic-brown text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to tame your inbox?
          </h2>
          <p className="text-neutral-200 mb-8 max-w-xl mx-auto">
            Let&apos;s build an automation that sorts, tracks, and follows up on
            your emails — so you never miss what matters.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-block px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
