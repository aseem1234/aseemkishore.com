import type { ReactNode } from "react";

/**
 * Illustrative, vector-based UI mockups for the tax-preparation case study.
 *
 * This project processed the owner's real personal and business tax returns, so
 * no genuine screenshot can be published. Everything here is drawn with markup
 * and SVG using invented placeholder values, and every frame is labelled as an
 * illustration so a reader can never mistake it for real return data.
 *
 * Server-component safe: no hooks, no client directives.
 */

/** Browser-style frame that labels its contents as a drawn illustration. */
export function MockFrame({
  title,
  children,
  note = "Illustration — placeholder data, not real return figures",
}: {
  title: string;
  children: ReactNode;
  note?: string;
}) {
  return (
    <figure className="my-8 min-w-0">
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md mwork:border-neutral-800 mwork:bg-neutral-900">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-100 px-4 py-2.5 mwork:border-neutral-800 mwork:bg-neutral-800/60">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 mwork:bg-neutral-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 mwork:bg-neutral-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 mwork:bg-neutral-600" />
          <span className="ml-2 truncate text-xs font-medium text-neutral-500 mwork:text-neutral-400">
            {title}
          </span>
        </div>
        <div className="p-4 md:p-5">{children}</div>
      </div>
      <figcaption className="mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed text-neutral-500 mwork:text-neutral-400">
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 flex-none text-brand-orange">
          <path fillRule="evenodd" d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span>{note}</span>
      </figcaption>
    </figure>
  );
}

const STATUS: Record<string, string> = {
  confirmed:
    "bg-akic-green/10 text-akic-green mwork:bg-akic-green/20 ring-akic-green/30",
  review:
    "bg-brand-orange/10 text-brand-orange mwork:bg-brand-orange/20 ring-brand-orange/30",
  edited:
    "bg-blue-500/10 text-blue-600 mwork:bg-blue-500/20 mwork:text-blue-400 ring-blue-500/30",
};

function StatusPill({ kind, label }: { kind: keyof typeof STATUS; label: string }) {
  return (
    <span
      className={`inline-flex flex-none items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${STATUS[kind]}`}
    >
      {label}
    </span>
  );
}

/**
 * The review screen: a document on the left, the values pulled out of it on the
 * right, each carrying a confidence score and a review state.
 */
export function FactReviewMock() {
  const facts: {
    label: string;
      value: string;
    conf: string;
    kind: keyof typeof STATUS;
    status: string;
  }[] = [
    { label: "Wages, tips, other comp.", value: "$100,000.00", conf: "0.98", kind: "confirmed", status: "Confirmed" },
    { label: "Federal income tax withheld", value: "$20,000.00", conf: "0.97", kind: "confirmed", status: "Confirmed" },
    { label: "Social security wages", value: "$100,000.00", conf: "0.95", kind: "confirmed", status: "Confirmed" },
    { label: "State wages", value: "$100,000.00", conf: "0.71", kind: "review", status: "Needs review" },
    { label: "Employer state ID", value: "00-0000000", conf: "0.64", kind: "edited", status: "Edited" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      {/* left: the source document */}
      <div className="min-w-0 rounded-lg border border-neutral-200 bg-neutral-50 p-3 mwork:border-neutral-700 mwork:bg-neutral-800/50">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="truncate text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mwork:text-neutral-400">
            Source document
          </span>
          <span className="flex-none text-[11px] text-neutral-400">p. 1 of 2</span>
        </div>
        <div className="rounded border border-neutral-200 bg-white p-3 mwork:border-neutral-700 mwork:bg-neutral-900">
          <div className="mb-2 h-2 w-2/3 rounded bg-neutral-300 mwork:bg-neutral-600" />
          <div className="mb-3 h-1.5 w-1/3 rounded bg-neutral-200 mwork:bg-neutral-700" />
          {/* highlighted field being extracted */}
          <div className="mb-1.5 rounded bg-brand-orange/15 px-1.5 py-1 ring-1 ring-brand-orange/40">
            <div className="h-1.5 w-4/5 rounded bg-brand-orange/50" />
          </div>
          {[
            "w-full", "w-11/12", "w-3/4", "w-full", "w-2/3", "w-5/6",
          ].map((w, i) => (
            <div key={i} className={`mb-1.5 h-1.5 rounded bg-neutral-200 mwork:bg-neutral-700 ${w}`} />
          ))}
        </div>
      </div>

      {/* right: extracted values */}
      <div className="min-w-0">
        <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mwork:text-neutral-400">
            Extracted values
          </span>
          <span className="text-[11px] text-neutral-400">5 found · 1 needs review</span>
        </div>
        <div className="divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 mwork:divide-neutral-700 mwork:border-neutral-700">
          {facts.map((f) => (
            <div key={f.label} className="flex items-center gap-2.5 bg-white px-3 py-2.5 mwork:bg-neutral-900">
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium text-neutral-800 mwork:text-neutral-200">
                  {f.label}
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-[11px] tabular-nums text-neutral-500 mwork:text-neutral-400">
                    {f.value}
                  </span>
                  <span className="text-[11px] text-neutral-400">conf {f.conf}</span>
                </div>
              </div>
              <StatusPill kind={f.kind} label={f.status} />
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          <span className="rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white">
            Confirm all
          </span>
          <span className="rounded-md border border-neutral-300 px-2.5 py-1 text-[11px] font-semibold text-neutral-600 mwork:border-neutral-600 mwork:text-neutral-300">
            Ask AI to re-check
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * A single filed return PDF being cut into its component forms, each with the
 * page range it occupies in the original document.
 */
export function ReturnSplitMock() {
  const forms = [
    { name: "Main return form", pages: "1–5", state: "confirmed", label: "Done" },
    { name: "Business income", pages: "6–9", state: "confirmed", label: "Done" },
    { name: "Depreciation", pages: "10–12", state: "confirmed", label: "Done" },
    { name: "State return", pages: "13–18", state: "review", label: "Running" },
    { name: "Partner statement", pages: "19–21", state: "review", label: "Queued" },
  ] as const;

  return (
    <div className="grid items-center gap-4 md:grid-cols-[minmax(0,0.42fr)_auto_minmax(0,1fr)]">
      {/* the single uploaded return */}
      <div className="min-w-0">
        <div className="relative mx-auto max-w-[160px]">
          <div className="absolute -right-1.5 -top-1.5 h-full w-full rounded-lg border border-neutral-300 bg-neutral-100 mwork:border-neutral-700 mwork:bg-neutral-800" />
          <div className="relative rounded-lg border border-neutral-300 bg-white p-3 shadow-sm mwork:border-neutral-700 mwork:bg-neutral-900">
            <div className="mb-2 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4 flex-none text-brand-orange">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
              </svg>
              <span className="text-[11px] font-semibold leading-tight text-neutral-700 mwork:text-neutral-300">
                Prior-year return
              </span>
            </div>
            {["w-full","w-5/6","w-full","w-2/3","w-11/12","w-3/4","w-full"].map((w, i) => (
              <div key={i} className={`mb-1.5 h-1.5 rounded bg-neutral-200 mwork:bg-neutral-700 ${w}`} />
            ))}
            <div className="mt-2 text-center text-[11px] font-medium text-neutral-500 mwork:text-neutral-400">
              21 pages in one file
            </div>
          </div>
        </div>
      </div>

      {/* arrow: right on desktop, down on mobile */}
      <div className="flex items-center justify-center text-neutral-400 mwork:text-neutral-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-6 w-6 rotate-90 md:rotate-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
        </svg>
      </div>

      {/* the separated forms */}
      <div className="min-w-0 space-y-1.5">
        {forms.map((f) => (
          <div
            key={f.name}
            className="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 mwork:border-neutral-700 mwork:bg-neutral-900"
          >
            <span className="flex-none rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-neutral-600 mwork:bg-neutral-800 mwork:text-neutral-300">
              {f.pages}
            </span>
            <span className="min-w-0 flex-1 text-xs font-medium leading-snug text-neutral-800 mwork:text-neutral-200">
              {f.name}
            </span>
            <StatusPill kind={f.state} label={f.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The readiness board: which forms this year's filing appears to need, and
 * whether the supporting paperwork has actually arrived yet.
 */
export function FilingReadinessMock() {
  const rows = [
    { form: "Main personal return", status: "ready", note: "All supporting values present" },
    { form: "Business return", status: "ready", note: "All supporting values present" },
    { form: "Investment income schedule", status: "partial", note: "2 of 3 brokerage statements in" },
    { form: "Home office worksheet", status: "missing", note: "No supporting document uploaded" },
    { form: "Foreign asset disclosure", status: "n/a", note: "Not applicable this year" },
  ] as const;

  const chip: Record<string, string> = {
    ready: "bg-akic-green/10 text-akic-green ring-akic-green/30 mwork:bg-akic-green/20",
    partial: "bg-brand-orange/10 text-brand-orange ring-brand-orange/30 mwork:bg-brand-orange/20",
    missing: "bg-red-500/10 text-red-600 ring-red-500/30 mwork:bg-red-500/20 mwork:text-red-400",
    "n/a": "bg-neutral-200/70 text-neutral-500 ring-neutral-300 mwork:bg-neutral-700/60 mwork:text-neutral-400 mwork:ring-neutral-600",
  };
  const wording: Record<string, string> = {
    ready: "Ready",
    partial: "Partial",
    missing: "Missing",
    "n/a": "Not applicable",
  };

  return (
    <div className="divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 mwork:divide-neutral-700 mwork:border-neutral-700">
      {rows.map((r) => (
        <div
          key={r.form}
          className="flex flex-col gap-1.5 bg-white px-3.5 py-3 sm:flex-row sm:items-center sm:gap-3 mwork:bg-neutral-900"
        >
          <span className="min-w-0 flex-1 text-xs font-medium text-neutral-800 mwork:text-neutral-200">
            {r.form}
          </span>
          <span className="min-w-0 flex-1 text-[11px] text-neutral-500 mwork:text-neutral-400">
            {r.note}
          </span>
          <span
            className={`inline-flex w-fit flex-none items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${chip[r.status]}`}
          >
            {wording[r.status]}
          </span>
        </div>
      ))}
    </div>
  );
}

/** The end-to-end flow, as numbered stages with a plain-language subtitle. */
export function PipelineFlow() {
  const stages = [
    { n: "01", t: "Upload", d: "A statement, form, or a whole prior-year return goes in." },
    { n: "02", t: "Identify", d: "The system works out what the document is and which year it belongs to." },
    { n: "03", t: "Separate", d: "A bundled return is cut into its individual forms by page range." },
    { n: "04", t: "Read", d: "Each form is read on its own, so values are pulled from a small document." },
    { n: "05", t: "Review", d: "Every value carries a confidence score and waits for a person." },
    { n: "06", t: "Compare", d: "Last year's filing is checked against this year's paperwork." },
    { n: "07", t: "Collect", d: "Blank official forms are fetched and attached to what is needed." },
  ];
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((s) => (
        <div
          key={s.n}
          className="min-w-0 rounded-lg border border-neutral-200 bg-white p-3.5 mwork:border-neutral-700 mwork:bg-neutral-900"
        >
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
              {s.n}
            </span>
            <span className="truncate text-xs font-semibold text-neutral-900 mwork:text-neutral-100">
              {s.t}
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-neutral-600 mwork:text-neutral-400">
            {s.d}
          </p>
        </div>
      ))}
    </div>
  );
}
