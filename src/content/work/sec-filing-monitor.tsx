import Link from "next/link";
import { ActionsRunHistory } from "@/components/work/OpsVisuals";
import {
  MonitorSchedule,
  MonitorCadence,
  RawFilingSample,
  HighlightsSample,
  DataFlowDiagram,
  XPostAnatomy,
  PublishGates,
} from "@/components/work/MonitorVisuals";
import { Glossary, PlainEnglish, TechDetail, Term } from "@/components/work/CaseStudy";



const heroTags = [
  { label: "SEC EDGAR", className: "bg-amber-300/20 text-amber-100" },
  { label: "Private server", className: "bg-yellow-300/20 text-yellow-100" },
  { label: "DeepSeek V4-pro", className: "bg-orange-300/20 text-orange-100" },
  { label: "Git-backed record", className: "bg-lime-300/15 text-lime-100" },
];

const atAGlance = [
  {
    value: "10",
    label: "filing types watched",
    detail: "Seven core forms, two late-filing notices, and Form 4 through its own intake path.",
  },
  {
    value: "30 min",
    label: "median gap between data commits",
    detail: "Measured across 237 monitor-written data commits from 27 July to 7 August 2026.",
  },
  {
    value: "2x",
    label: "weekday highlights runs",
    detail: "The digest still runs on GitHub Actions at 07:30 and 13:30 UTC on weekdays.",
  },
  {
    value: "6 / 10",
    label: "minimum relevance score",
    detail: "Only analysis that clears the defined usefulness threshold enters the curated feed.",
  },
] as const;

const workflowStages = [
  {
    number: "01",
    title: "Keep watch on a dedicated server",
    summary:
      "The live filing monitor runs on a small private server every hour, with a second pass at half past the hour. GitHub Actions still runs the separate Daily SEC Highlights digest twice each weekday.",
    result:
      "The main collection work has dependable, always-on capacity while the daily briefing keeps its visible GitHub Actions run history.",
    failure:
      "Each monitor run resets to the latest main branch and takes a lock, so overlapping runs wait their turn rather than collide.",
  },
  {
    number: "02",
    title: "Read the latest filings with care",
    summary:
      "The system checks the official SEC source for recent activity, using a short one-day window so it catches new items without repeatedly digging through old history.",
    result:
      "Each candidate arrives with the company, filing type, filing identifier, and a route back to the original document.",
    failure:
      "A temporary source problem retries carefully and then skips safely instead of turning one issue into a broken monitoring day.",
  },
  {
    number: "03",
    title: "Remove obvious noise before it costs money",
    summary:
      "Rules sort the incoming filings before any AI analysis begins. The system favors the forms and companies that are more likely to matter to the reader.",
    result:
      "The queue is smaller, more useful, and easier to explain than a raw stream of regulatory submissions.",
    failure:
      "A Form 4 must represent at least $50,000 in transaction value, and a temporary price-data issue can send a late filing back for a later check.",
  },
  {
    number: "04",
    title: "Remember what was seen and what needs another look",
    summary:
      "The monitor records a filing after it finds it. It does not repeat work, but it can revisit a filing that was intentionally held for better timing.",
    result:
      "The repository holds a clear record of when the system first found a material filing and what happened next.",
    failure:
      "Missing documents and temporary analysis problems remain visible as exceptions instead of being mistaken for completed work.",
  },
  {
    number: "05",
    title: "Pull the evidence that actually explains the filing",
    summary:
      "Before summarizing, the monitor finds the important document sections and relevant financial facts. It avoids sending every page of every document to an AI model.",
    result:
      "The explanation is tied to filing evidence, with room for market context when it is available.",
    failure:
      "When source text or price context is missing, the monitor says so rather than inventing a confident story.",
  },
  {
    number: "06",
    title: "Write a concise analysis and keep the old path ready",
    summary:
      "DeepSeek V4-pro receives a prepared evidence packet through the Vercel AI Gateway and returns a structured, reader-facing explanation.",
    result:
      "Readers get a score, direction, tags, risks, and concise sections that are consistent enough to scan.",
    failure:
      "A kill switch can return analysis to the prior Claude Sonnet/Haiku routing, while sampled filings compare old and new output before the new model is trusted.",
  },
  {
    number: "07",
    title: "Store the result, then let delivery read it",
    summary:
      "The runners commit Markdown and JSON results directly to the repository. Separate services read those files: the dashboard sends alerts and digest emails, while a publishing service makes eligible public posts.",
    result:
      "Collection stays focused on accurate research, while each delivery service stays focused on its own audience.",
    failure:
      "Empty, low-relevance, or unusable runs finish quietly; the highlights path has a fallback when its model response is not usable.",
  },
] as const;

const architecture = [
  {
    role: "Collection",
    tools: "Dedicated private server and Python 3.11",
    why: "The live filing monitor runs on its own small, always-on machine, so collection does not depend on a hosted workflow window.",
  },
  {
    role: "Source",
    tools: "SEC EDGAR feeds, search, submissions, and archives",
    why: "The workflow starts with the authoritative public filing record and keeps a direct route back to it.",
  },
  {
    role: "Context",
    tools: "Session-aware market-data adapter",
    why: "Price movement is presented as available context, never guessed when the source cannot provide it.",
  },
  {
    role: "Analysis",
    tools: "DeepSeek V4-pro through Vercel AI Gateway",
    why: "The filing analysis produces predictable fields instead of an unstructured paragraph that a later system must decode.",
  },
  {
    role: "Memory",
    tools: "Git as a data store: versioned JSON and Markdown",
    why: "Both runners commit their results directly into the repository, preserving what they saw, what they decided, and a full history of each change.",
  },
  {
    role: "Delivery",
    tools: "Separate dashboard product and publishing service",
    why: "The monitor itself sends nothing: it commits results, then separate services turn them into emails and public posts.",
  },
] as const;

const safeguards = [
  {
    title: "Respect for the public source",
    text: "The monitor identifies itself, pauses between requests, limits the search depth, and reuses company information already collected during the run.",
  },
  {
    title: "No repeated analysis",
    text: "A durable record stops the same filing from being analyzed over and over. Only intentionally deferred items return to the queue.",
  },
  {
    title: "Cost gates before AI work",
    text: "Form rules, issuer filters, priority checks, a Form 4 threshold, and a per-run cap reduce the queue before model spend begins.",
  },
  {
    title: "Measured model changes",
    text: "The previous Claude route stays warm behind a kill switch while sampled filings compare it with DeepSeek before a full cutover is trusted.",
  },
  {
    title: "Independent failure detection",
    text: "After each server run, a heartbeat reaches the separate dashboard. Its watchdog emails if the signal is stale for more than nine hours, so a different machine notices a silent failure.",
  },
  {
    title: "Recoverable failures stay recoverable",
    text: "The system distinguishes a known low-value item from a temporary provider or source problem, so it can skip one and revisit the other.",
  },
] as const;

const beforeAfter = [
  {
    before: "Opening EDGAR, searching issuers, reading long filings, and trying to remember what has already been reviewed.",
    after: "A scheduled shortlist with source links, form-aware rules, and a durable record of every filing decision.",
  },
  {
    before: "An inbox of routine notices where material changes compete with everything else.",
    after: "A filtered feed with urgency cues, watchlist priority, and a separate daily highlights layer.",
  },
  {
    before: "One broad AI prompt for every document, with unclear support for numbers or market commentary.",
    after: "Evidence selection, financial-fact extraction, bounded analysis, and explicit unavailable states for missing context.",
  },
  {
    before: "One system trying to collect filings, decide what matters, and send every message.",
    after: "A private server collects and commits research; separate services read that record to deliver emails and public posts.",
  },
] as const;

const businessApplications = [
  "Supplier, competitor, regulatory, or grant watches that must separate urgent changes from updates that can wait.",
  "Sales intelligence that tracks named accounts, ranks new signals, and gives a team only the items worth acting on.",
  "Compliance and policy monitoring that remembers a notice has been delivered instead of repeating it every time a job runs.",
  "Executive briefings that combine authoritative documents with focused AI explanations and clear links back to evidence.",
  "Recurring research where a repository and GitHub Actions are a better fit than a new service to host and maintain.",
] as const;

const glossaryItems = [
  {
    term: "GitHub Actions",
    definition: "A repository service that can run scheduled tasks and keep a record of each run.",
  },
  {
    term: "SEC EDGAR",
    definition: "The SEC public database of company filings and related filing documents.",
  },
  {
    term: "DeepSeek V4-pro",
    definition: "The pinned AI model used for the filing-analysis step in this system.",
  },
  {
    term: "AI gateway",
    definition: "A managed layer that sends an AI request to a chosen model and records how it was used.",
  },
  {
    term: "Kill switch",
    definition: "A configuration control that immediately returns a system to its prior, known-good path.",
  },
  {
    term: "Shadow mode",
    definition: "Running and measuring an experimental system without letting it control production decisions.",
  },
  {
    term: "Heartbeat",
    definition: "A short success signal sent after a job runs, so another system can notice if it stops arriving.",
  },
  {
    term: "systemd",
    definition: "The Linux service manager used here to keep the earnings experiment running continuously.",
  },
  {
    term: "Git as a data store",
    definition: "Using version-controlled files as the durable record, with a timestamped history of each change.",
  },
  {
    term: "Git delivery bus",
    definition: "Using committed files as the hand-off point between separate applications.",
  },
  {
    term: "Labelled automated account",
    definition: "An account publicly marked as automated, so readers know posts are generated without review.",
  },
  {
    term: "Key-value store",
    definition: "A small database that remembers one saved value for each unique item.",
  },
  {
    term: "OAuth application",
    definition: "A separately registered connection that lets one application act through a specific account.",
  },
  {
    term: "User-Agent",
    definition: "A request label that tells a public website which software is asking for information.",
  },
  {
    term: "CIK",
    definition: "The SEC identifier used to reliably distinguish one filing company from another.",
  },
  {
    term: "Form 4",
    definition: "A filing that reports certain insider buying or selling activity.",
  },
  {
    term: "Deduplication",
    definition: "A check that prevents the same item from being handled more than once.",
  },
  {
    term: "Atomic replacement",
    definition: "Saving a complete new record in one switch, so an interrupted update does not leave a half-written file.",
  },
  {
    term: "Inline XBRL",
    definition: "Structured financial facts embedded in many SEC filings for more reliable number extraction.",
  },
  {
    term: "Structured response",
    definition: "A predictable set of fields that software can validate and present consistently.",
  },
  {
    term: "Retry with backoff",
    definition: "Trying a temporary failure again after a measured wait rather than sending requests repeatedly.",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function SecFilingMonitorPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-amber-950 via-yellow-950 to-stone-950 py-16 text-white md:py-24">
        <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-12 h-96 w-96 rounded-full bg-yellow-300/15 blur-3xl" />
        <div className="container-narrow relative z-10">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-2 text-sm text-amber-100 transition-colors hover:text-white"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Work Samples
          </Link>

          <div className="mb-6 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${tag.className}`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <h1 className="mb-5 text-4xl font-heading font-bold tracking-tight md:text-6xl">
            SEC Filing Monitor
          </h1>
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-amber-50/90 md:text-xl">
            <p>
              Important SEC filings reach a useful shortlist instead of disappearing in a flood of routine updates.
              A dedicated private server runs the live monitor throughout the day, while GitHub Actions keeps the separate weekday highlights digest on schedule.
            </p>
            <p>
              It reads <Term definition="The SEC public database of company filings and filing documents.">SEC EDGAR</Term>, filters what is worth attention, checks the source evidence, and asks{" "}
              <Term definition="The pinned AI model used for the filing-analysis step in this system.">DeepSeek V4-pro</Term>{" "}
              for a concise explanation only when the filing is relevant.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Discuss a project like this
              <ArrowIcon />
            </Link>
            <a
              href="https://positiontracker.trading/sec-filings"
              target="_blank"
              rel="noopener"
              className="btn-secondary inline-flex items-center gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              View the live filing feed
              <ArrowIcon />
            </a>
          </div>
          <p className="mt-5 text-sm text-amber-100/80">
            Browse public form hubs directly:{" "}
            <a
              href="https://positiontracker.trading/sec-filings/form/8-K"
              target="_blank"
              rel="noopener"
              className="underline decoration-amber-200/50 underline-offset-4 hover:text-white"
            >
              Form 8-K
            </a>
            {" · "}
            <a
              href="https://positiontracker.trading/sec-filings/form/4"
              target="_blank"
              rel="noopener"
              className="underline decoration-amber-200/50 underline-offset-4 hover:text-white"
            >
              Form 4 insider filings
            </a>
            {" · "}
            <a
              href="https://positiontracker.trading/congress-trades"
              target="_blank"
              rel="noopener"
              className="underline decoration-amber-200/50 underline-offset-4 hover:text-white"
            >
              Congressional stock trades
            </a>
          </p>
        </div>
      </section>

      <section className="section bg-akic-cream mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="tag mb-3">At a glance</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">
              Monitoring tuned for useful signals
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((item) => (
              <article
                key={item.label}
                className="card border-amber-200/80 bg-white p-6 md:p-7 mwork:border-amber-900/60 mwork:bg-neutral-950"
              >
                <p className="text-4xl font-heading font-bold text-brand-orange">{item.value}</p>
                <h3 className="mt-2 font-heading text-lg font-bold text-akic-brown mwork:text-akic-cream">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 mwork:text-neutral-400">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-red-200 bg-red-50 p-7 mwork:border-red-900/70 mwork:bg-red-950/30">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-red-700 mwork:text-red-300">
              The problem
            </p>
            <h2 className="text-2xl font-heading font-bold text-red-950 mwork:text-red-100">
              The filing that matters is rarely the easiest one to spot.
            </h2>
            <p className="mt-4 leading-relaxed text-red-950/80 mwork:text-red-100/80">
              A person has to identify the company, understand the form, locate the source document, and judge
              whether the timing changes the story. Repeating that work by hand is slow, inconsistent, and easy to
              interrupt.
            </p>
          </article>

          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-7 mwork:border-amber-900/70 mwork:bg-amber-950/30">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-amber-700 mwork:text-amber-300">
              The answer
            </p>
            <h2 className="text-2xl font-heading font-bold text-amber-950 mwork:text-amber-100">
              Let the rules decide what deserves attention before AI explains it.
            </h2>
            <p className="mt-4 leading-relaxed text-amber-950/80 mwork:text-amber-100/80">
              This workflow collects politely, remembers what it saw, applies clear relevance rules, and uses{" "}
              <Term definition="A check that prevents the same item from being handled or delivered more than once.">
                deduplication
              </Term>{" "}
              before it produces a short explanation. It is selective by design, not an expensive summary machine.
            </p>
          </article>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="tag mb-3">How it works</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream md:text-4xl">
              Seven decisions turn a filing stream into a useful alert
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              The system does not automate judgment away. It reserves attention and AI spending for the items that
              meet clear, inspectable rules.
            </p>
          </div>

          <div className="space-y-6">
            {workflowStages.map((stage) => (
              <article
                key={stage.number}
                className="card grid gap-6 border-neutral-200 bg-white p-6 md:grid-cols-[88px_1fr] md:p-8 mwork:border-neutral-700 mwork:bg-neutral-950"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 font-heading text-xl font-bold text-amber-950">
                  {stage.number}
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-akic-brown mwork:text-akic-cream">
                    {stage.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-neutral-700 mwork:text-neutral-300">{stage.summary}</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">
                        What your team gets
                      </p>
                      <p className="mt-1 leading-relaxed text-neutral-700 mwork:text-neutral-300">{stage.result}</p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-5 mwork:bg-amber-950/30">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700 mwork:text-amber-300">
                        If something goes wrong
                      </p>
                      <p className="mt-1 leading-relaxed text-amber-950/80 mwork:text-amber-100/80">
                        {stage.failure}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <MonitorSchedule />

          <TechDetail label="The actual schedule and run controls">
            <p>
              The live filing monitor runs on a dedicated private server every hour, with a second pass at half past
              the hour. The separate <code>daily-highlights.yml</code> workflow still runs on GitHub Actions at{" "}
              <code>0 7,13 * * 1-5</code>, twice each weekday.
            </p>
            <p>
              The earlier <code>sec-monitor.yml</code> workflow is disabled, not deleted: it is deliberately retained
              as a one-command rollback path if the server fails. On the server, each run resets hard to the latest
              main branch and takes a lock file, so overlapping runs queue rather than collide.
            </p>
            <p>
              A second server cron grades the previous day&apos;s experimental earnings-detection runs at 09:20 UTC and
              commits a dated report card. A long-running <code>systemd</code> service runs the earnings fast-lane
              race in shadow mode: it measures which source reports earnings first, but does not drive production.
            </p>
          </TechDetail>

          <TechDetail label="How the SEC intake stays bounded and respectful">
            <p>
              The monitor reads current feeds and full-text search with an identifiable <code>User-Agent</code>,
              request pacing, a one-day lookback, and in-run issuer-submission caching. Each form search stops at
              30 pages of 100 results, so pagination cannot expand without limit.
            </p>
            <p>
              Request failures use retry and backoff. A failed issuer-submission lookup returns an empty result for
              that item instead of crashing the whole run.
            </p>
          </TechDetail>

          <TechDetail label="The form rules, state file, and timing logic">
            <p>
              The core allowlist is <code>10-K</code>, <code>10-Q</code>, <code>8-K</code>, <code>13D</code>,
              <code>13G</code>, <code>S-1</code>, <code>S-4</code>, <code>NT 10-K</code>, and <code>NT 10-Q</code>.
              Form 4 enters through a dedicated search path. Fund, ETF, trust, and similar issuer patterns can be
              removed; the monitor resolves CIK-to-ticker context; and CIK-aware watchlist items receive a verified
              priority boost that can bypass broad market-cap filtering.
            </p>
            <p>
              <code>processed_filings.json</code> stores filing IDs, statuses, first-seen and last-checked
              timestamps, scores, and selected context. It uses write-and-replace updates so a partial state file is
              not left behind. Terminal items stay out of the next queue, while deferred items return after the
              15-minute market-reaction hold. A document that cannot be retrieved is recorded as failed; transient
              analysis-provider problems remain retryable for a later scheduled run.
            </p>
            <p>
              Form 4 needs a transaction value of at least $50,000 before analysis, and significant buys receive a
              higher priority. A non-priority late filing is deferred instead of discarded when price context is
              temporarily unavailable.
            </p>
          </TechDetail>

          <TechDetail label="What reaches each model and how the change is controlled">
            <p>
              The evidence step locates a primary document, selects relevant earnings exhibits, removes noisy HTML,
              detects 8-K item signals, and extracts authoritative inline XBRL facts where present. It budgets long
              documents before analysis and will not create a speculative summary without document content. When
              price data is unavailable, the prompt requires that explicit state rather than an inferred reaction.
            </p>
            <p>
              Filing analysis uses the pinned <code>DeepSeek V4-pro</code> model through the Vercel AI Gateway. An
              environment-variable kill switch returns it to the previous Claude Sonnet/Haiku routing, and a sampling
              rate can run both paths side by side to measure output quality before the switch is trusted. Model IDs
              are pinned constants rather than runtime aliases, so a provider cannot silently change the output model.
            </p>
            <p>
              Only a valid analysis scoring at least <code>6</code> joins the filing feed. The twice-daily weekday
              highlights workflow calls Claude Haiku directly for synthesis and keeps a one-hour prompt cache. It
              deduplicates same-issuer entries, groups them by urgency, and keeps only a bounded recent generated
              digest history.
            </p>
          </TechDetail>

          <PlainEnglish title="What this looks like in practice">
            <p>
              You get a live system that watches continuously, ignores most of the noise, and brings forward the
              filings that deserve a closer look. It keeps the original evidence close to the explanation, so the
              output is useful without becoming a black box.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="tag mb-3">Input and output</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">
              From raw filing to a finding you can act on
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              A filing arrives as thousands of characters of boilerplate with nothing that says whether it matters.
              The output is a scored, tagged, one-sentence finding that makes the next reading decision faster.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500 mwork:text-neutral-400">
              These are two separate real examples: a public Costco filing as it arrives, and a real day&apos;s digest.
              This personal research tool is not investment advice; the underlying filings remain the authoritative source.
            </p>
          </div>
          <div className="space-y-8">
            <RawFilingSample />
            <HighlightsSample />
          </div>
        </div>
      </section>

      <section className="section bg-akic-cream mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="tag mb-3">Automated public posting</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">
              Publishing in public
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-700 mwork:text-neutral-300">
              The monitor stops after it writes a result to Git. Two entirely separate applications then read that
              record: one turns it into email, and one turns eligible findings into public posts. Neither needs to
              know the other exists.
            </p>
            <p className="mt-3 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              Adding public posting meant changing none of the monitor&apos;s code. Each piece can fail, be rewritten, or
              be switched off without disturbing the others.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
            <div className="max-w-3xl">
              <p className="leading-relaxed text-neutral-700 mwork:text-neutral-300">
                Eligible filings appear as long-form, single posts rather than reply threads: one filing, one
                readable update. The account is clearly labelled as automated, so posting can happen without a human
                approval step. The author&apos;s personal account follows a different standard: its posts are drafted for
                manual review.
              </p>
              <p className="mt-3 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                That difference matches automation to accountability. The bot also uses its own separate
                <Term definition="A separately registered connection that lets one application act through a specific account.">
                  X application
                </Term>, so a mistake or compromise in one account cannot post as the other.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500 mwork:text-neutral-400">
                This labelled automated filings account posts public-record filings. It is not investment advice.
              </p>
            </div>
            <div>
              <p className="mb-4 text-sm leading-relaxed text-neutral-600 mwork:text-neutral-400">
                This shows how one automated filing update is structured for a reader scanning the public feed.
              </p>
              <XPostAnatomy />
            </div>
          </div>

          <div className="mt-12">
            <p className="mb-4 max-w-3xl leading-relaxed text-neutral-700 mwork:text-neutral-300">
              The publishing service checks its eligibility rules every 15 minutes. This visual shows the full
              checklist before anything is allowed to post.
            </p>
            <PublishGates />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-heading text-2xl font-bold text-akic-brown mwork:text-akic-cream">
                One event is not always one filing
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-700 mwork:text-neutral-300">
                The most important judgment is deliberately asymmetric. An issuer may split one earnings release
                across several filings, such as a press release followed by a separate slide deck. In that case,
                only the highest-scoring filing for that company and quarter posts, so the same result is not
                announced twice from thinner source material.
              </p>
              <p className="mt-3 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                Insider transactions are treated differently. If five officers file on the same day, those are five
                genuine events, not one duplicate. Combining them would look safe but would silently drop four real
                posts. Deduplication only works after deciding what counts as one event.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-akic-brown mwork:text-akic-cream">
                Never a dead link, never silence
              </h3>
              <p className="mt-3 leading-relaxed text-neutral-700 mwork:text-neutral-300">
                A post links to its dashboard analysis only when that page is live. A brand-new filing can arrive
                before the separate dashboard has made its page, so a missing page waits one cycle while the filing
                is fresh. After that, the post goes out without the link rather than disappearing.
              </p>
              <p className="mt-3 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                A timeout, server error, or rate limit does not prove the page is missing, so the service posts
                rather than guessing. The plain rule is simple: never tweet a dead link, but never go silent either.
              </p>
            </div>
          </div>

          <TechDetail label="How the publishing service keeps posting independent and safe">
            <p>
              Every 15 minutes, the publishing service reads <code>generated_posts.md</code> from the Git repository
              over HTTPS. It does not contact the monitor&apos;s server. Git is the delivery bus: the monitor writes the
              record and stops, while the email and public-post services independently decide how to read it.
            </p>
            <p>
              Eligible updates are composed as one long-form X post, up to 4,000 characters, rather than a reply
              thread. The labelled automated filings account has its own credentials and its own X application,
              separate from the author&apos;s personal account. Its publication state lives in a key-value store for
              about three days, deliberately longer than the 24-hour eligibility window, so a rerun cannot repost a
              filing.
            </p>
            <p>
              Earnings deduplication keys on company and quarter, retaining the highest-scoring filing. It is
              intentionally not applied to insider transactions. For a dashboard permalink, a 404 on a filing under
              two hours old delays publication by one cycle; after two hours it posts without the link. Other errors
              are inconclusive, so publication proceeds. The dashboard creates its analysis pages on its own
              five-minute schedule.
            </p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="tag mb-3">How the pieces fit together</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">
              A small operating footprint with a deep decision process
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              Each layer has one clear job. The result is simple for the business to operate and detailed enough to
              explain why a particular filing did or did not become a finding.
            </p>
          </div>
          <DataFlowDiagram />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {architecture.map((item) => (
              <article key={item.role} className="card border-neutral-200 p-6 md:p-7 mwork:border-neutral-700">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-orange">{item.role}</p>
                <h3 className="mt-2 font-heading text-xl font-bold text-akic-brown mwork:text-akic-cream">
                  {item.tools}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-600 mwork:text-neutral-400">{item.why}</p>
              </article>
            ))}
          </div>

          <PlainEnglish title="Why this architecture matters">
            <p>
              The monitor itself sends nothing. It writes a versioned research record, then independent services turn
              that record into email and public posts. That separation makes every part easier to inspect, change, and
              recover.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-amber-50 mwork:bg-amber-950/20">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="tag mb-3">Automations and safeguards</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">
              The controls protect the source, your attention, and the budget
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              Good automation is not just a fast path. It should know when to wait, stop, retry, and avoid spending
              time on work that will not help the reader. Its saved state uses{" "}
              <Term definition="Saving a complete new record in one switch so an interrupted update does not leave a half-written file.">
                atomic replacement
              </Term>{" "}
              when it updates the filing memory.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {safeguards.map((item) => (
              <article
                key={item.title}
                className="card border-amber-200 bg-white p-6 md:p-7 mwork:border-amber-900/70 mwork:bg-neutral-950"
              >
                <div className="flex items-center gap-3 text-amber-600 mwork:text-amber-300">
                  <CheckIcon />
                  <h3 className="font-heading text-lg font-bold text-akic-brown mwork:text-akic-cream">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            <p className="leading-relaxed text-neutral-600 mwork:text-neutral-400">
              The filing monitor has its own measured production cadence: 237 data commits from 27 July to 7 August
              2026, a median 31 minutes apart, around 23 per weekday and only two to three per weekend day. The
              quieter weekend pattern is intentional.
            </p>
          </div>
          <MonitorCadence />
          <div className="mt-10 max-w-3xl">
            <p className="leading-relaxed text-neutral-600 mwork:text-neutral-400">
              The GitHub Actions visual below is for Daily SEC Highlights specifically, not the filing monitor. From
              8 June to 7 August 2026, the digest ran 92 scheduled times: 85 succeeded, for a 92.4% success rate.
              All seven failures clustered in its first two weeks while the new schedule was debugged, followed by a
              long clean stretch.
            </p>
          </div>
          <ActionsRunHistory />

          <PlainEnglish title="The business safeguard">
            <p>
              You do not pay for an AI summary of every filing, and you do not need to worry that a brief outage will
              silently turn into a broken process. The system has a record, a limit, and a next step for each outcome.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <div className="mb-10 max-w-3xl">
            <p className="tag mb-3">What it replaces</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">
              From reactive browsing to an accountable monitoring system
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              The value is not an invented alert count. It is a repeatable way to see a meaningful change once, with
              the right supporting evidence and without paying for irrelevant analysis.
            </p>
          </div>
          <div className="space-y-4">
            {beforeAfter.map((item) => (
              <article
                key={item.before}
                className="grid overflow-hidden rounded-xl border border-neutral-200 md:grid-cols-2 mwork:border-neutral-700"
              >
                <div className="bg-neutral-100 p-6 md:p-7 mwork:bg-neutral-900">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">Before</p>
                  <p className="mt-2 leading-relaxed text-neutral-700 mwork:text-neutral-300">{item.before}</p>
                </div>
                <div className="bg-amber-50 p-6 md:p-7 mwork:bg-amber-950/25">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">After</p>
                  <p className="mt-2 leading-relaxed text-amber-950/80 mwork:text-amber-100/80">{item.after}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-akic-cream mwork:bg-neutral-900">
        <div className="container-narrow">
          <p className="tag mb-3">What this means for your business</p>
          <h2 className="max-w-3xl text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">
            Your important external signals can be monitored with the same care
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {businessApplications.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-white p-6 shadow-sm mwork:bg-neutral-950">
                <span className="mt-0.5 text-brand-orange">
                  <ArrowIcon />
                </span>
                <p className="leading-relaxed text-neutral-700 mwork:text-neutral-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Glossary items={glossaryItems} />

      <section className="section bg-akic-brown text-white">
        <div className="container-narrow text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-orange-200">
            Automate the signal, not the noise
          </p>
          <h2 className="text-3xl font-heading font-bold md:text-4xl">
            Need a monitoring workflow that explains what changed and why it matters?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-neutral-200">
            I can design a low-maintenance monitoring system around your sources, watchlists, approval rules, and
            delivery channel without turning every update into an expensive AI request.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex items-center gap-2">
            Discuss your monitoring project
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </div>
  );
}
