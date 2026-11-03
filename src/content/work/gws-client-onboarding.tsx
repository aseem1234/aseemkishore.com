import Link from "next/link";



/* ------------------------------------------------------------------ */
/*  Pipeline stage data                                                */
/* ------------------------------------------------------------------ */

const stages = [
  {
    num: 1,
    title: 'Trigger \u2014 "New row in Clients sheet"',
    description:
      "A new row is added to your master Clients Google Sheet with the client\u2019s details",
  },
  {
    num: 2,
    title: 'Create Drive Structure \u2014 "Organized folders, instantly"',
    description:
      "A complete folder structure is created in Google Drive with project-specific subfolders",
  },
  {
    num: 3,
    title: 'Send Welcome Email \u2014 "Personalized from your template"',
    description:
      "A welcome email is automatically sent using your pre-written template, personalized with the client\u2019s details",
  },
  {
    num: 4,
    title: 'Schedule Kickoff \u2014 "Calendar invite, sent automatically"',
    description:
      "A kickoff meeting is created on Google Calendar with all attendees and a video link",
  },
  {
    num: 5,
    title: 'Update Tracker \u2014 "Sheet row completed"',
    description:
      "The original Clients sheet row is updated with links to everything that was just created",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Tag pills                                                          */
/* ------------------------------------------------------------------ */

const tagPills = [
  { label: "Sheets", bg: "bg-emerald-500/20", text: "text-emerald-400" },
  { label: "Drive", bg: "bg-blue-500/20", text: "text-blue-400" },
  { label: "Gmail", bg: "bg-red-500/20", text: "text-red-400" },
  { label: "Calendar", bg: "bg-purple-500/20", text: "text-purple-400" },
];

/* ------------------------------------------------------------------ */
/*  Tech badges                                                        */
/* ------------------------------------------------------------------ */

const techBadges = [
  "Google Workspace CLI",
  "Sheets API",
  "Drive API",
  "Gmail API",
  "Calendar API",
];

/* ------------------------------------------------------------------ */
/*  Stage illustrations                                                */
/* ------------------------------------------------------------------ */

/** Stage 1 — Spreadsheet with highlighted new row */
function Stage1Illustration() {
  return (
    <div className="bg-white mwork:bg-neutral-800 rounded-lg border border-neutral-200 mwork:border-neutral-700 shadow-sm overflow-hidden max-w-md">
      {/* Header row */}
      <div className="grid grid-cols-4 text-xs font-semibold bg-neutral-200 mwork:bg-neutral-700 text-neutral-600 mwork:text-neutral-300">
        <div className="px-3 py-2 border-r border-neutral-300 mwork:border-neutral-600">Company</div>
        <div className="px-3 py-2 border-r border-neutral-300 mwork:border-neutral-600">Contact</div>
        <div className="px-3 py-2 border-r border-neutral-300 mwork:border-neutral-600">Email</div>
        <div className="px-3 py-2">Service</div>
      </div>
      {/* Existing rows */}
      <div className="grid grid-cols-4 text-xs text-neutral-500 mwork:text-neutral-400 border-b border-neutral-100 mwork:border-neutral-700">
        <div className="px-3 py-1.5 border-r border-neutral-100 mwork:border-neutral-700">Globex Inc</div>
        <div className="px-3 py-1.5 border-r border-neutral-100 mwork:border-neutral-700">Tom Lee</div>
        <div className="px-3 py-1.5 border-r border-neutral-100 mwork:border-neutral-700">tom@globex.io</div>
        <div className="px-3 py-1.5">SEO Audit</div>
      </div>
      <div className="grid grid-cols-4 text-xs text-neutral-500 mwork:text-neutral-400 border-b border-neutral-100 mwork:border-neutral-700">
        <div className="px-3 py-1.5 border-r border-neutral-100 mwork:border-neutral-700">Initech</div>
        <div className="px-3 py-1.5 border-r border-neutral-100 mwork:border-neutral-700">Bill Lum</div>
        <div className="px-3 py-1.5 border-r border-neutral-100 mwork:border-neutral-700">bill@initech.co</div>
        <div className="px-3 py-1.5">Brand Pkg</div>
      </div>
      {/* New highlighted row */}
      <div className="grid grid-cols-4 text-xs font-medium bg-emerald-100 mwork:bg-emerald-900/50 border border-emerald-400 text-neutral-800 mwork:text-neutral-200 relative">
        <div className="px-3 py-1.5 border-r border-emerald-300 mwork:border-emerald-700">Acme Corp</div>
        <div className="px-3 py-1.5 border-r border-emerald-300 mwork:border-emerald-700">Jane Smith</div>
        <div className="px-3 py-1.5 border-r border-emerald-300 mwork:border-emerald-700">jane@acme.com</div>
        <div className="px-3 py-1.5 flex items-center gap-1.5">
          Web Redesign
          <span className="bg-emerald-500 text-white text-[10px] rounded px-1.5 py-0.5 leading-none font-bold">NEW</span>
        </div>
      </div>
    </div>
  );
}

/** Stage 2 — Folder tree */
const FolderIcon = ({ className = "" }: { className?: string }) => (
    <svg className={`w-5 h-5 inline-block shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>
  );

function Stage2Illustration() {


  return (
    <div className="bg-white mwork:bg-neutral-800 rounded-lg border border-neutral-200 mwork:border-neutral-700 shadow-sm p-5 max-w-sm text-sm">
      {/* Root */}
      <div className="flex items-center gap-2 text-neutral-500">
        <FolderIcon />
        <span>Clients/</span>
      </div>
      {/* Acme Corp — highlighted */}
      <div className="ml-4 mt-1">
        <div className="border-l border-neutral-300 mwork:border-neutral-600 pl-4">
          <div className="flex items-center gap-2 bg-brand-orange/10 rounded px-2 py-1 -ml-2">
            <FolderIcon className="text-brand-orange" />
            <span className="text-brand-orange font-semibold">Acme Corp/</span>
          </div>
          {/* Sub-folders */}
          <div className="ml-4 mt-1 space-y-1">
            <div className="border-l border-neutral-300 mwork:border-neutral-600 pl-4">
              <div className="flex items-center gap-2 text-neutral-600 mwork:text-neutral-400">
                <FolderIcon />
                <span>Contracts</span>
              </div>
            </div>
            <div className="border-l border-neutral-300 mwork:border-neutral-600 pl-4">
              <div className="flex items-center gap-2 text-neutral-600 mwork:text-neutral-400">
                <FolderIcon />
                <span>Deliverables</span>
              </div>
            </div>
            <div className="border-l border-neutral-300 mwork:border-neutral-600 pl-4">
              <div className="flex items-center gap-2 text-neutral-600 mwork:text-neutral-400">
                <FolderIcon />
                <span>Communications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Stage 3 — Email preview */
function Stage3Illustration() {
  return (
    <div className="bg-white mwork:bg-neutral-800 rounded-lg border border-neutral-200 mwork:border-neutral-700 shadow-sm p-5 max-w-md relative overflow-hidden">
      {/* Window dots */}
      <div className="flex gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
      </div>
      {/* Email headers */}
      <div className="text-xs space-y-1 mb-3">
        <p className="text-neutral-500 mwork:text-neutral-400">
          <span className="font-semibold text-neutral-700 mwork:text-neutral-300">From:</span> you@company.com
        </p>
        <p className="text-neutral-500 mwork:text-neutral-400">
          <span className="font-semibold text-neutral-700 mwork:text-neutral-300">To:</span> jane@acme.com
        </p>
        <p className="text-neutral-500 mwork:text-neutral-400">
          <span className="font-semibold text-neutral-700 mwork:text-neutral-300">Subject:</span>{" "}
          <span className="text-neutral-800 mwork:text-neutral-200">Welcome to the team &mdash; Next Steps for Web Redesign</span>
        </p>
      </div>
      {/* Divider */}
      <div className="border-t border-neutral-200 mwork:border-neutral-700 mb-3" />
      {/* Body */}
      <div className="text-sm text-neutral-600 mwork:text-neutral-400 leading-relaxed space-y-2">
        <p>Hi Jane,</p>
        <p>
          We&apos;re excited to get started on your Web Redesign project.
          Here&apos;s what happens next:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li>Review the project brief (linked in your Drive folder)</li>
          <li>Join the kickoff meeting (invite sent separately)</li>
          <li>Share any existing brand assets...</li>
        </ol>
      </div>
      {/* Fade-out gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white mwork:from-neutral-800 to-transparent" />
    </div>
  );
}

/** Stage 4 — Calendar event card */
function Stage4Illustration() {
  return (
    <div className="bg-white mwork:bg-neutral-800 rounded-lg border border-neutral-200 mwork:border-neutral-700 shadow-sm p-5 max-w-sm">
      <div className="flex gap-3">
        {/* Left accent bar */}
        <div className="w-1 bg-blue-600 rounded-full shrink-0" />
        {/* Event details */}
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-neutral-800 mwork:text-neutral-200">
            Kickoff: Acme Corp &mdash; Web Redesign
          </p>
          <div className="flex items-center gap-2 text-neutral-500 mwork:text-neutral-400 text-xs">
            {/* Calendar icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span>Tuesday, Mar 10, 2026</span>
          </div>
          <p className="text-xs text-neutral-500 mwork:text-neutral-400">
            10:00 AM &ndash; 10:30 AM
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mwork:text-neutral-400">
            {/* User icons */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <span>you@company.com, jane@acme.com</span>
          </div>
          <p className="text-xs text-blue-500">
            meet.google.com/abc-defg-hij
          </p>
        </div>
      </div>
    </div>
  );
}

/** Stage 5 — Updated spreadsheet with status columns */
function Stage5Illustration() {
  return (
    <div className="bg-white mwork:bg-neutral-800 rounded-lg border border-neutral-200 mwork:border-neutral-700 shadow-sm overflow-hidden max-w-lg">
      {/* Header row */}
      <div className="grid grid-cols-7 text-[10px] font-semibold bg-neutral-200 mwork:bg-neutral-700 text-neutral-600 mwork:text-neutral-300">
        <div className="px-2 py-1.5 border-r border-neutral-300 mwork:border-neutral-600">Company</div>
        <div className="px-2 py-1.5 border-r border-neutral-300 mwork:border-neutral-600">Contact</div>
        <div className="px-2 py-1.5 border-r border-neutral-300 mwork:border-neutral-600">Email</div>
        <div className="px-2 py-1.5 border-r border-neutral-300 mwork:border-neutral-600">Service</div>
        <div className="px-2 py-1.5 border-r border-neutral-300 mwork:border-neutral-600 bg-emerald-100 mwork:bg-emerald-900/30">Folder</div>
        <div className="px-2 py-1.5 border-r border-neutral-300 mwork:border-neutral-600 bg-emerald-100 mwork:bg-emerald-900/30">Email Sent</div>
        <div className="px-2 py-1.5 bg-emerald-100 mwork:bg-emerald-900/30">Meeting</div>
      </div>
      {/* Existing rows */}
      <div className="grid grid-cols-7 text-[10px] text-neutral-500 mwork:text-neutral-400 border-b border-neutral-100 mwork:border-neutral-700">
        <div className="px-2 py-1 border-r border-neutral-100 mwork:border-neutral-700">Globex Inc</div>
        <div className="px-2 py-1 border-r border-neutral-100 mwork:border-neutral-700">Tom Lee</div>
        <div className="px-2 py-1 border-r border-neutral-100 mwork:border-neutral-700">tom@globex.io</div>
        <div className="px-2 py-1 border-r border-neutral-100 mwork:border-neutral-700">SEO Audit</div>
        <div className="px-2 py-1 border-r border-neutral-100 mwork:border-neutral-700 text-blue-500 underline">Open</div>
        <div className="px-2 py-1 border-r border-neutral-100 mwork:border-neutral-700 text-emerald-500">Mar 1</div>
        <div className="px-2 py-1 text-purple-500">Mar 4</div>
      </div>
      {/* Acme Corp — highlighted with new columns filled */}
      <div className="grid grid-cols-7 text-[10px] font-medium bg-emerald-100 mwork:bg-emerald-900/50 border border-emerald-400 text-neutral-800 mwork:text-neutral-200">
        <div className="px-2 py-1 border-r border-emerald-300 mwork:border-emerald-700">Acme Corp</div>
        <div className="px-2 py-1 border-r border-emerald-300 mwork:border-emerald-700">Jane Smith</div>
        <div className="px-2 py-1 border-r border-emerald-300 mwork:border-emerald-700">jane@acme.com</div>
        <div className="px-2 py-1 border-r border-emerald-300 mwork:border-emerald-700">Web Redesign</div>
        <div className="px-2 py-1 border-r border-emerald-300 mwork:border-emerald-700 text-blue-500 underline bg-emerald-200/50 mwork:bg-emerald-800/30">Open</div>
        <div className="px-2 py-1 border-r border-emerald-300 mwork:border-emerald-700 text-emerald-600 bg-emerald-200/50 mwork:bg-emerald-800/30">Mar 5, 2:34 PM</div>
        <div className="px-2 py-1 text-purple-500 bg-emerald-200/50 mwork:bg-emerald-800/30">Mar 10, 10 AM</div>
      </div>
    </div>
  );
}

const stageIllustrations = [
  Stage1Illustration,
  Stage2Illustration,
  Stage3Illustration,
  Stage4Illustration,
  Stage5Illustration,
];

/* ================================================================== */
/*  Page component                                                     */
/* ================================================================== */

export default function GwsClientOnboardingPage() {
  return (
    <div>
      {/* -- Hero ---------------------------------------------------- */}
      <section className="bg-linear-to-br from-emerald-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden py-16 md:py-24">
        {/* Decorative blurs */}
        <div className="absolute top-[-80px] left-[-60px] w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] right-[-40px] w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

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
            Client Onboarding Automation
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl">
            New client added to your spreadsheet? Everything else happens
            automatically.
          </p>
        </div>
      </section>

      {/* -- Problem / Solution -------------------------------------- */}
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
                New client signs on. Now you need to create a Drive folder, copy
                a template email, find a meeting slot, update the tracker. 15
                minutes of busywork, every single time &mdash; and you might
                forget a step.
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
                Add one row to your Clients sheet. The automation handles the
                rest: folder structure, welcome email, kickoff meeting, and
                tracker update. All in under 30 seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -- Pipeline Stages ----------------------------------------- */}
      <section className="bg-white mwork:bg-neutral-950 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">
            The pipeline
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

      {/* -- End-to-end timing --------------------------------------- */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-orange/10 mwork:bg-brand-orange/20 border border-brand-orange/30 rounded-xl p-8 text-center">
            <p className="text-neutral-600 mwork:text-neutral-400 mb-2">
              From new row to fully onboarded
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-brand-orange to-akic-gold mb-2">
              ~30 seconds
            </p>
            <p className="text-neutral-500">
              No manual steps. No forgotten tasks.
            </p>
          </div>
        </div>
      </section>

      {/* -- Tech Stack ---------------------------------------------- */}
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

      {/* -- CTA ----------------------------------------------------- */}
      <section className="bg-akic-brown text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Want to automate your client onboarding?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
            Let&apos;s turn your spreadsheet into a full onboarding pipeline
            that runs itself.
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
