import Link from "next/link";
import { Glossary, PlainEnglish, TechDetail, Term } from "@/components/work/CaseStudy";



const tags = [
  { label: "Chrome extension", className: "bg-indigo-500/20 text-indigo-300" },
  { label: "Manifest V3", className: "bg-violet-500/20 text-violet-300" },
  { label: "Gmail workflow", className: "bg-sky-500/20 text-sky-300" },
  { label: "Third-party UI", className: "bg-fuchsia-500/20 text-fuchsia-300" },
] as const;

const overviewFacts = [
  {
    value: "2",
    label: "watchers",
    detail: "One follows Gmail content changes; another notices Gmail-style URL navigation.",
  },
  {
    value: "400 ms",
    label: "update pause",
    detail: "Rapid Gmail changes are grouped before the extension rechecks visible rows.",
  },
  {
    value: "4",
    label: "synced settings",
    detail: "Two time thresholds and two colors follow the user through Chrome sync.",
  },
  {
    value: "24 / 48",
    label: "default thresholds",
    detail: "Unread messages become stale at 24 hours and very stale at 48 until changed.",
  },
] as const;

const stages = [
  {
    number: "01",
    title: "Run only where the tool is useful",
    trigger: "Chrome loads the extension while Gmail is open.",
    work: "The extension limits itself to Gmail and adds a small layer to the page the user already works in.",
    output: "A focused tool that adds inbox age without asking people to move their email process into a new application.",
    failure: "The popup checks that the active tab is Gmail and reports a Chrome error when the page or extension code is unavailable.",
  },
  {
    number: "02",
    title: "Find unread messages in a moving inbox",
    trigger: "Gmail finishes drawing an inbox view or changes the visible rows.",
    work: "The extension looks for several Gmail row shapes and checks whether a message is unread before adding any label.",
    output: "Only visible unread messages become candidates for an age cue, and a row that becomes read loses its old label.",
    failure: "A missing date or unstable part of the page removes an old label instead of leaving misleading information behind.",
  },
  {
    number: "03",
    title: "Read the date carefully before calling something urgent",
    trigger: "An unread row has a date label that could describe when the message arrived.",
    work: "The extension turns Gmail&apos;s many date formats into a safe timestamp, then calculates the message age.",
    output: "The person sees minutes, hours, or days in a compact label beside the message date.",
    failure: "A date that cannot be understood is skipped and any prior label is removed rather than presented as a false urgency signal.",
  },
  {
    number: "04",
    title: "Show a small cue where the decision already happens",
    trigger: "A usable message timestamp is available.",
    work: "The extension applies a normal, stale, or very-stale state based on the user's chosen thresholds and colors.",
    output: "Response age becomes visible in Gmail itself, without asking the team to open a separate dashboard.",
    failure: "Each redraw clears old state before applying current settings, so an old urgency color cannot cling to a changed row.",
  },
  {
    number: "05",
    title: "Follow Gmail as it redraws and navigates",
    trigger: "Gmail loads rows, changes attributes, switches views, or performs internal navigation.",
    work: "Two lightweight watchers schedule a clean recheck after the page has settled, rather than trusting a page-load-only enhancement.",
    output: "The cue follows the inbox as a single-page web app changes around it.",
    failure: "The extension treats every Gmail element as temporary and redraws from the rows currently on screen.",
  },
  {
    number: "06",
    title: "Let the user set the rule without a redeploy",
    trigger: "The extension is installed, settings change, or someone asks for a refresh from the popup.",
    work: "The options page saves two thresholds and two colors, while the open inbox listens for the change and redraws itself.",
    output: "A team can make its own definition of stale without waiting for a new extension version or restarting Chrome.",
    failure: "Storage, tab, and message errors are checked and shown rather than being mistaken for a successful update.",
  },
] as const;

const stack = [
  {
    role: "Runtime and packaging",
    tools: "Chrome Extension Manifest V3 and service worker",
    why: "The extension model separates lifecycle defaults from code that runs inside Gmail.",
  },
  {
    role: "Target application",
    tools: "Gmail content script and injected CSS",
    why: "The tool improves a workflow inside a web application the client does not own or control.",
  },
  {
    role: "UI resilience",
    tools: "DOM selectors, ARIA hints, computed-style fallback, MutationObserver",
    why: "No one Gmail selector is treated as permanent, so the code has several ways to recognize a row and its unread state.",
  },
  {
    role: "Preference storage",
    tools: "chrome.storage.sync and storage-change events",
    why: "The urgency policy follows the user across Chrome sessions and updates the open inbox without a manual reload.",
  },
  {
    role: "User controls",
    tools: "Popup messages and options page",
    why: "Users get a manual refresh and a place to set urgency rules without cluttering Gmail.",
  },
  {
    role: "Distribution status",
    tools: "Manifest, icons, unpacked-install guide, Chrome Web Store preparation",
    why: "The project is ready for local installation and future review, but it is not represented as a live Chrome Web Store release.",
  },
] as const;

const safeguards = [
  {
    title: "No repeated work during a busy inbox",
    detail:
      "A 400-millisecond pause groups rapid page changes, a processing guard blocks overlap, and a Set prevents duplicate work when selectors find the same row.",
  },
  {
    title: "Labels behave predictably",
    detail:
      "The extension checks for an existing timer before adding one, removes it once a message is read, and clears labels before a full settings or route redraw.",
  },
  {
    title: "Dates are not guessed",
    detail:
      "Invalid, future, and unknown Gmail dates are not silently converted into bad urgency signals. The row is skipped or clearly marked while diagnostics remain available.",
  },
  {
    title: "The extension asks for a narrow scope",
    detail:
      "It targets mail.google.com, checks the active tab before sending a popup command, and checks Chrome error conditions on storage, tabs, and content-script messages.",
  },
  {
    title: "Release status stays candid",
    detail:
      "There is Manifest V3 packaging, icons, and installation guidance, but no live Chrome Web Store release is claimed. The documented listing is a future step.",
  },
] as const;

const beforeAfter = [
  {
    before: "People scan a long inbox and mentally estimate whether unread messages have been waiting for minutes, hours, or days.",
    after: "A small inline age label makes the waiting time visible where the next action is chosen.",
  },
  {
    before: "A browser addition works only after refresh, then disappears as the host application redraws or navigates.",
    after: "Content and URL watchers reapply the cue as Gmail changes views while cleanup prevents old labels from accumulating.",
  },
  {
    before: "One fixed threshold suits one person but not every inbox routine.",
    after: "Two thresholds and two colors are saved in Chrome sync and applied to an open inbox when settings change.",
  },
  {
    before: "A local demo can be mistaken for a released browser product.",
    after: "The project clearly separates a working unpacked extension from a future Chrome Web Store listing.",
  },
] as const;

const businessApplications = [
  "Add a lightweight operational layer to CRM, ticketing, dispatch, scheduling, or portal software your team uses but does not control.",
  "Turn an implicit rule such as response age, escalation window, or review priority into a clear cue in the existing workflow.",
  "Deliver browser-based tooling without creating a parallel dashboard that people must remember to open.",
  "Plan reliable extension work around host-page changes, navigation, performance, permissions, configuration, and a practical distribution path.",
] as const;

const glossary = [
  {
    term: "ARIA",
    definition: "Accessible labels and roles that help assistive technology understand a web interface.",
  },
  {
    term: "Chrome sync storage",
    definition: "Chrome-managed settings that can follow a signed-in user across browsers.",
  },
  {
    term: "Content script",
    definition: "Extension code that runs inside a permitted web page such as Gmail.",
  },
  {
    term: "DOM",
    definition: "The browser's live representation of the page elements currently on screen.",
  },
  {
    term: "Manifest V3",
    definition: "Chrome's current extension packaging and permission model.",
  },
  {
    term: "MutationObserver",
    definition: "A browser feature that notices changes to a web page's elements.",
  },
  {
    term: "Non-reentrant guard",
    definition: "A check that prevents a new process from starting while the prior one is still running.",
  },
  {
    term: "Selector",
    definition: "A rule used to locate matching elements in a web page.",
  },
] as const;

export default function GmailInboxTimerPage() {
  return (
    <div>
      <section className="section relative overflow-hidden bg-linear-to-br from-indigo-950 via-violet-950 to-neutral-950 text-white">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-violet-400/15 blur-3xl" />
        <div className="container-narrow relative">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
            </svg>
            Back to Work Samples
          </Link>
          <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag.label} className={`tag ${tag.className}`}>
                {tag.label}
              </span>
            ))}
          </div>
          <h1 className="mb-6 text-white">Make response age visible inside Gmail, even though you do not control Gmail</h1>
          <p className="mb-4 max-w-3xl text-xl text-neutral-200">
            This is a smaller-scope tool than the other projects: a focused Chrome extension that shows how long unread email has been
            waiting. Its value is in building dependable workflow tooling on top of a third-party web application that can redraw itself at
            any time.
          </p>
          <p className="mb-8 max-w-3xl text-lg text-indigo-100/80">
            It does not claim a live Chrome Web Store release. It is a working, locally installable extension with an honest path toward
            future distribution.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#workflow" className="btn-primary">
              See the workflow{" "}
              <span className="ml-2" aria-hidden="true">
                ↓
              </span>
            </a>
            <Link href="/contact" className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:text-white">
              Discuss a project like this
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700 mwork:text-indigo-400">At a glance</p>
            <h2 className="mb-3 text-neutral-900 mwork:text-white">A small enhancement with real operating constraints</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              The visible cue is compact. The work behind it manages Gmail&apos;s changing page structure, user settings, and a clear release
              boundary.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewFacts.map((fact) => (
              <article key={fact.label} className="card p-6 md:p-7">
                <p className="mb-3 text-4xl font-bold text-indigo-700 mwork:text-indigo-400">{fact.value}</p>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900 mwork:text-white">{fact.label}</h3>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">{fact.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-red-200 bg-red-50 p-7 mwork:border-red-900 mwork:bg-red-950/30">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-red-700 mwork:text-red-300">The problem</p>
            <h2 className="mb-4 text-2xl text-red-950 mwork:text-red-200">
              Useful Gmail improvements are hard when Gmail controls the page.
            </h2>
            <p className="text-red-900/80 mwork:text-red-100/80">
              Gmail can redraw the inbox, change its internal{" "}
              <Term definition="The browser representation of the page elements currently on screen.">page structure</Term>, and display
              dates in several formats. A fragile add-on is worse than no add-on because it gives people false confidence.
            </p>
          </article>
          <article className="rounded-2xl border border-indigo-200 bg-indigo-50 p-7 mwork:border-indigo-900 mwork:bg-indigo-950/30">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700 mwork:text-indigo-300">The approach</p>
            <h2 className="mb-4 text-2xl text-indigo-950 mwork:text-indigo-200">Add one cue, but treat the host page as unreliable.</h2>
            <p className="text-indigo-900/80 mwork:text-indigo-100/80">
              The extension uses alternate ways to find rows and unread state, carefully reads date text, redraws after Gmail changes, and
              lets the user set the urgency rule.
            </p>
          </article>
        </div>
      </section>

      <section id="workflow" className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700 mwork:text-indigo-400">How it works</p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">A reliable browser layer around a fast-changing inbox</h2>
            <p className="mx-auto text-neutral-600 mwork:text-neutral-400">
              The workflow remains local to the browser, but it needs the same care around state, performance, and maintenance as a larger
              automation.
            </p>
          </div>
          <div className="space-y-5">
            {stages.map((stage) => (
              <article key={stage.number} className="card grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-bold tracking-wider text-indigo-700 mwork:bg-indigo-900/40 mwork:text-indigo-300">
                  {stage.number}
                </div>
                <div>
                  <h3 className="mb-5 text-2xl text-neutral-900 mwork:text-white">{stage.title}</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-neutral-500">Starts when</p>
                      <p className="text-sm text-neutral-700 mwork:text-neutral-300">{stage.trigger}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-neutral-500">What happens</p>
                      <p className="text-sm text-neutral-700 mwork:text-neutral-300">{stage.work}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-indigo-700 mwork:text-indigo-400">You get</p>
                      <p className="text-sm text-neutral-700 mwork:text-neutral-300">{stage.output}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-700 mwork:text-amber-400">If it fails</p>
                      <p className="text-sm text-neutral-700 mwork:text-neutral-300">{stage.failure}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="What this means for the people using Gmail">
            <p>
              Instead of mentally calculating whether an unread message has been waiting too long, your team sees a quiet, configurable cue
              at the exact point where it decides what to do next.
            </p>
          </PlainEnglish>
          <TechDetail label="How the extension recognizes the right Gmail rows">
            <p>
              The Manifest V3 extension is scoped only to <code>mail.google.com</code>. The content script checks Gmail-specific table and
              role-based row selectors, then detects unread state through classes, ARIA labels, and computed font-weight fallbacks.
            </p>
            <p>
              A per-pass <code>Set</code> deduplicates elements when selectors overlap. Individually guarded DOM queries prevent an unstable
              Gmail subtree from crashing a full pass, and rows with no usable date have any existing timer removed.
            </p>
          </TechDetail>
          <TechDetail label="How timestamp parsing avoids bad urgency signals">
            <p>
              The timestamp parser handles detailed dates, month/day forms, time-only labels, slashed dates, <code>Yesterday</code>,
              expected-by text, and relative timestamps such as days or weeks ago.
            </p>
            <p>
              It corrects AM/PM boundaries, accounts for dates that would otherwise fall in the future, and returns no timestamp when it
              cannot safely interpret a value. Invalid or future dates are represented explicitly; parser diagnostics preserve the exact
              path when Gmail changes a format.
            </p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700 mwork:text-indigo-400">
              How the pieces fit together
            </p>
            <h2 className="mb-3 text-neutral-900 mwork:text-white">Purpose-built for a web app outside your control</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              This is not a Gmail replacement. It is a maintainable enhancement layer that keeps people in the environment they already
              know.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stack.map((item) => (
              <article key={item.role} className="card p-6 md:p-7">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-700 mwork:text-indigo-400">{item.role}</p>
                <h3 className="mb-3 text-xl text-neutral-900 mwork:text-white">{item.tools}</h3>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">{item.why}</p>
              </article>
            ))}
          </div>
          <PlainEnglish title="Why the scope is intentionally narrow">
            <p>
              A smaller tool can still solve a meaningful workflow problem when it is designed around the place people actually work. The
              engineering challenge is not the size of the label; it is keeping that label correct when the host product changes.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-indigo-50 mwork:bg-indigo-950/20">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700 mwork:text-indigo-400">Safeguards</p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">The hard part is keeping the enhancement well behaved</h2>
            <p className="mx-auto text-neutral-600 mwork:text-neutral-400">
              Browser tooling shares a rendering environment with the application it enhances. Every unnecessary scan, stale label, or broad
              permission can erode trust.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {safeguards.map((item, index) => (
              <article
                key={item.title}
                className="rounded-xl border border-indigo-200 bg-white p-6 md:p-7 mwork:border-indigo-900 mwork:bg-neutral-900"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 mwork:bg-indigo-900/40 mwork:text-indigo-300">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-xl text-neutral-900 mwork:text-white">{item.title}</h3>
                <p className="text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
              </article>
            ))}
          </div>
          <TechDetail label="How the extension stays responsive during Gmail changes">
            <p>
              The main <code>MutationObserver</code> debounces Gmail changes for 400 milliseconds. A non-reentrant <code>isProcessing</code>{" "}
              guard prevents scans from overlapping.
            </p>
            <p>
              Separate URL-change detection notices Gmail navigation. When the route changes, it clears old labels and schedules a clean
              reprocess after Gmail has time to render the next view. Before each redraw, stale-state classes and inline background color
              are removed.
            </p>
          </TechDetail>
          <TechDetail label="How preferences and on-demand refresh work">
            <p>
              On installation, the service worker seeds defaults. The options UI validates numeric thresholds and saves the stale and
              very-stale thresholds plus two colors to <code>chrome.storage.sync</code>.
            </p>
            <p>
              The content script listens for storage changes, removes prior labels, merges the new configuration, and redraws. The popup
              opens options or requests refresh from the active Gmail tab; storage reads, writes, tab queries, and messages check{" "}
              <code>chrome.runtime.lastError</code>.
            </p>
          </TechDetail>
          <PlainEnglish title="What keeps a small extension trustworthy">
            <p>
              The extension limits what it touches, does not claim a store release that does not exist, and rechecks its work whenever Gmail
              changes the ground beneath it. That is how a compact tool stays reliable enough to use every day.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700 mwork:text-indigo-400">What it replaced</p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">From mental inbox arithmetic to a visible response-age cue</h2>
            <p className="mx-auto text-neutral-600 mwork:text-neutral-400">
              This project makes no invented time-saved or inbox-volume claim. The value is a small contextual tool that makes a team rule
              visible without requiring a process change.
            </p>
          </div>
          <div className="space-y-4">
            {beforeAfter.map((item) => (
              <article
                key={item.before}
                className="grid overflow-hidden rounded-xl border border-neutral-200 mwork:border-neutral-800 md:grid-cols-2"
              >
                <div className="bg-red-50 p-6 md:p-7 mwork:bg-red-950/20">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-red-700 mwork:text-red-400">Before</p>
                  <p className="text-red-950/80 mwork:text-red-100/80">{item.before}</p>
                </div>
                <div className="bg-indigo-50 p-6 md:p-7 mwork:bg-indigo-950/20">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-700 mwork:text-indigo-400">With this approach</p>
                  <p className="text-indigo-950/80 mwork:text-indigo-100/80">{item.after}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="rounded-2xl border border-neutral-200 bg-white p-7 mwork:border-neutral-800 mwork:bg-neutral-950 md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700 mwork:text-indigo-400">
              What this means for your business
            </p>
            <h2 className="mb-5 text-neutral-900 mwork:text-white">Reliable browser tools for the web apps your team already uses</h2>
            <p className="mb-7 text-neutral-600 mwork:text-neutral-400">
              The transferable value is knowing how to add a dependable operational cue to a third-party interface while respecting
              performance, user settings, platform constraints, and a practical shipping path.
            </p>
            <ul className="space-y-4">
              {businessApplications.map((item) => (
                <li key={item} className="flex gap-3 text-neutral-700 mwork:text-neutral-300">
                  <span className="text-indigo-600 mwork:text-indigo-400" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Glossary items={[...glossary]} />

      <section className="section bg-akic-brown text-white">
        <div className="container-narrow text-center">
          <h2 className="mb-4 text-white">Want the web apps your team uses to work more like your team works?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-neutral-200">
            We can identify the workflow signals people are tracking by hand and build the right browser-based tool around them.
          </p>
          <Link href="/contact" className="btn-primary">
            Discuss a project like this{" "}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
