import type { ReactNode } from "react";

/**
 * Vector visuals for the automation case studies.
 *
 * Two kinds of thing live in this file, and the distinction matters:
 *
 *  - `ActionsRunHistory` and `CronSchedule` render REAL data read from the
 *    repository's GitHub Actions history and workflow files. Their captions say
 *    so, and the numbers must not be edited by hand to look better.
 *  - `WordPressDraftMock` and `VisualQueueMock` are drawn illustrations with
 *    invented placeholder content, and are labelled as illustrations.
 *
 * Server-component safe: no hooks, no client directives.
 */

export function FrameShell({
  title,
  note,
  real,
  children,
}: {
  title: string;
  note: string;
  real: boolean;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 min-w-0">
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md mwork:border-neutral-800 mwork:bg-neutral-900">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-100 px-4 py-2.5 mwork:border-neutral-800 mwork:bg-neutral-800/60">
          <span className="truncate text-xs font-medium text-neutral-600 mwork:text-neutral-300">
            {title}
          </span>
          <span
            className={`flex-none rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${
              real
                ? "bg-akic-green/10 text-akic-green ring-akic-green/30 mwork:bg-akic-green/20"
                : "bg-neutral-200/70 text-neutral-500 ring-neutral-300 mwork:bg-neutral-700/60 mwork:text-neutral-400 mwork:ring-neutral-600"
            }`}
          >
            {real ? "Real data" : "Illustration"}
          </span>
        </div>
        <div className="p-4 md:p-5">{children}</div>
      </div>
      <figcaption className="mt-2.5 text-xs leading-relaxed text-neutral-500 mwork:text-neutral-400">
        {note}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ *
 * REAL DATA — read from the sec-filing-monitor Actions history.
 * 92 scheduled runs of the Daily SEC Highlights workflow between
 * 2026-06-08 and 2026-08-07; 85 succeeded (92.4%). The failures cluster
 * in the first two weeks and then stop, which is the honest story:
 * a rocky start that was debugged into a steady run.
 * ------------------------------------------------------------------ */
const RUN_SEQUENCE =
  "SSSSFSFFSFSFSSSFSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSFSSSSSSSSSSSSSSSSSSSSSSSSSSS".split(
    "",
  );

export function ActionsRunHistory() {
  const total = RUN_SEQUENCE.length;
  const ok = RUN_SEQUENCE.filter((c) => c === "S").length;
  const failed = total - ok;

  return (
    <FrameShell
      real
      title="Scheduled run history — Daily SEC Highlights"
      note="Real run history read from the repository's GitHub Actions log, 8 June to 7 August 2026. Each square is one scheduled run, oldest at the left. The failures cluster in the first fortnight and then stop, which is what debugging a new schedule actually looks like."
    >
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          { v: String(total), l: "scheduled runs" },
          { v: String(ok), l: "succeeded" },
          { v: `${((ok / total) * 100).toFixed(1)}%`, l: "success rate" },
        ].map((s) => (
          <div key={s.l} className="min-w-0">
            <div className="text-xl font-bold tabular-nums text-neutral-900 mwork:text-neutral-100">
              {s.v}
            </div>
            <div className="text-[11px] leading-tight text-neutral-500 mwork:text-neutral-400">
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1" role="img" aria-label={`${total} scheduled runs, ${ok} succeeded and ${failed} failed, oldest first`}>
        {RUN_SEQUENCE.map((c, i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 flex-none rounded-sm ${
              c === "S"
                ? "bg-akic-green/80 mwork:bg-akic-green/70"
                : "bg-red-500/80 mwork:bg-red-500/70"
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-neutral-500 mwork:text-neutral-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-akic-green/80" /> succeeded
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-red-500/80" /> failed ({failed})
        </span>
      </div>
    </FrameShell>
  );
}

/* ------------------------------------------------------------------ *
 * ILLUSTRATIONS — invented placeholder content.
 * ------------------------------------------------------------------ */

export function WordPressDraftMock() {
  const rows = [
    { t: "How seasonal demand shifts affect small-batch pricing", d: "Draft", when: "2 min ago", img: true },
    { t: "A practical guide to reading a supplier contract", d: "Draft", when: "18 min ago", img: true },
    { t: "Five questions to ask before switching platforms", d: "Draft", when: "1 hr ago", img: false },
    { t: "What changed in shipping rules this quarter", d: "Draft", when: "3 hr ago", img: true },
    { t: "Choosing between a marketplace and your own store", d: "Draft", when: "5 hr ago", img: true },
  ];
  return (
    <FrameShell
      real={false}
      title="Drafts awaiting review"
      note="Illustration with invented article titles. The real system writes into the site's own drafts list and stops there: nothing is published until a person opens it, reads it, and presses publish."
    >
      <div className="divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 mwork:divide-neutral-700 mwork:border-neutral-700">
        <div className="hidden bg-neutral-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500 sm:flex sm:gap-3 mwork:bg-neutral-800/60 mwork:text-neutral-400">
          <span className="flex-1">Title</span>
          <span className="w-20 flex-none">Image</span>
          <span className="w-16 flex-none">Status</span>
          <span className="w-20 flex-none">Created</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.t}
            className="flex flex-col gap-1.5 bg-white px-3.5 py-3 sm:flex-row sm:items-center sm:gap-3 mwork:bg-neutral-900"
          >
            <span className="min-w-0 flex-1 truncate text-xs font-medium text-neutral-800 mwork:text-neutral-200">
              {r.t}
            </span>
            <span className="w-20 flex-none">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
                  r.img
                    ? "bg-akic-green/10 text-akic-green ring-akic-green/30 mwork:bg-akic-green/20"
                    : "bg-brand-orange/10 text-brand-orange ring-brand-orange/30 mwork:bg-brand-orange/20"
                }`}
              >
                {r.img ? "attached" : "pending"}
              </span>
            </span>
            <span className="w-16 flex-none text-[11px] font-semibold text-neutral-500 mwork:text-neutral-400">
              {r.d}
            </span>
            <span className="w-20 flex-none text-[11px] text-neutral-400">{r.when}</span>
          </div>
        ))}
      </div>
    </FrameShell>
  );
}

export function VisualQueueMock() {
  const shots = [
    { label: "Signed-out landing view", state: "passed", kind: "landing" },
    { label: "Pricing comparison table", state: "passed", kind: "table" },
    { label: "Signed-in workspace", state: "failed", kind: "none" },
    { label: "Mobile navigation", state: "passed", kind: "mobile" },
  ] as const;

  return (
    <FrameShell
      real={false}
      title="Visual capture queue"
      note="Illustration. The thumbnails are drawn wireframes, not real captures. Each article can ask for specific screenshots by describing the platform, the view, and whether a sign-in is expected. Captures that fail are recorded rather than ignored, so a missing image can either warn or hold the article back depending on that property's policy."
    >
      <div className="grid gap-2.5 sm:grid-cols-2">
        {shots.map((s) => {
          const ok = s.state === "passed";
          return (
            <div
              key={s.label}
              className="min-w-0 rounded-lg border border-neutral-200 bg-white p-3 mwork:border-neutral-700 mwork:bg-neutral-900"
            >
              <div
                className={`mb-2.5 h-24 overflow-hidden rounded border ${
                  ok
                    ? "border-neutral-200 bg-white mwork:border-neutral-700 mwork:bg-neutral-800"
                    : "flex items-center justify-center border-dashed border-red-400/50 bg-red-500/5"
                }`}
              >
                {s.kind === "landing" && (
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-1 border-b border-neutral-200 px-2 py-1.5 mwork:border-neutral-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                      <div className="h-1 w-6 rounded bg-neutral-300 mwork:bg-neutral-600" />
                      <div className="ml-auto flex gap-1">
                        <div className="h-1 w-4 rounded bg-neutral-200 mwork:bg-neutral-700" />
                        <div className="h-1 w-4 rounded bg-neutral-200 mwork:bg-neutral-700" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-3">
                      <div className="h-1.5 w-3/4 rounded bg-neutral-400 mwork:bg-neutral-500" />
                      <div className="h-1 w-1/2 rounded bg-neutral-200 mwork:bg-neutral-700" />
                      <div className="mt-0.5 h-2.5 w-10 rounded bg-brand-orange/70" />
                    </div>
                  </div>
                )}
                {s.kind === "table" && (
                  <div className="flex h-full flex-col gap-1 p-2">
                    <div className="mb-0.5 h-1 w-1/3 rounded bg-neutral-400 mwork:bg-neutral-500" />
                    <div className="grid flex-1 grid-cols-3 gap-1">
                      {[0, 1, 2].map((c) => (
                        <div
                          key={c}
                          className={`flex flex-col gap-1 rounded p-1 ${
                            c === 1
                              ? "bg-brand-orange/15 ring-1 ring-brand-orange/40"
                              : "bg-neutral-100 mwork:bg-neutral-700/50"
                          }`}
                        >
                          <div className="h-1 w-full rounded bg-neutral-300 mwork:bg-neutral-600" />
                          <div className="h-1 w-2/3 rounded bg-neutral-200 mwork:bg-neutral-700" />
                          <div className="h-1 w-full rounded bg-neutral-200 mwork:bg-neutral-700" />
                          <div className="h-1 w-1/2 rounded bg-neutral-200 mwork:bg-neutral-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {s.kind === "mobile" && (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex h-[88%] w-12 flex-col rounded-md border border-neutral-300 bg-white p-1 mwork:border-neutral-600 mwork:bg-neutral-900">
                      <div className="mx-auto mb-1 h-0.5 w-3 rounded bg-neutral-300 mwork:bg-neutral-600" />
                      <div className="flex items-center gap-0.5 border-b border-neutral-200 pb-1 mwork:border-neutral-700">
                        <div className="h-1 w-1 rounded-sm bg-brand-orange" />
                        <div className="ml-auto flex flex-col gap-[1.5px]">
                          <div className="h-[1.5px] w-2.5 rounded bg-neutral-400 mwork:bg-neutral-500" />
                          <div className="h-[1.5px] w-2.5 rounded bg-neutral-400 mwork:bg-neutral-500" />
                          <div className="h-[1.5px] w-2.5 rounded bg-neutral-400 mwork:bg-neutral-500" />
                        </div>
                      </div>
                      <div className="mt-1 flex flex-col gap-1">
                        <div className="h-1 w-full rounded bg-neutral-200 mwork:bg-neutral-700" />
                        <div className="h-1 w-4/5 rounded bg-neutral-200 mwork:bg-neutral-700" />
                        <div className="h-1 w-full rounded bg-neutral-200 mwork:bg-neutral-700" />
                      </div>
                    </div>
                  </div>
                )}
                {s.kind === "none" && (
                  <div className="flex flex-col items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-6 w-6 text-red-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
                    </svg>
                    <span className="text-[10px] font-medium text-red-500">sign-in expired</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-xs font-medium text-neutral-800 mwork:text-neutral-200">
                  {s.label}
                </span>
                <span
                  className={`flex-none rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
                    ok
                      ? "bg-akic-green/10 text-akic-green ring-akic-green/30 mwork:bg-akic-green/20"
                      : "bg-red-500/10 text-red-600 ring-red-500/30 mwork:bg-red-500/20 mwork:text-red-400"
                  }`}
                >
                  {s.state}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </FrameShell>
  );
}
