import Link from "next/link";
import { Glossary, PlainEnglish, TechDetail, Term } from "@/components/work/CaseStudy";



const tags = [
  { label: "Laravel 8", className: "bg-emerald-500/20 text-emerald-300" },
  { label: "Content operations", className: "bg-teal-500/20 text-teal-300" },
  { label: "WordPress + Trello", className: "bg-cyan-500/20 text-cyan-300" },
  { label: "Payment logic", className: "bg-amber-500/20 text-amber-300" },
] as const;

const overviewFacts = [
  {
    value: "5",
    label: "configured web properties",
    detail: "The analytics work spans five configured view and property pairs.",
  },
  {
    value: "4",
    label: "reporting windows",
    detail: "Traffic is kept for 30, 90, 180, and 365-day windows.",
  },
  {
    value: "Hourly",
    label: "editorial refresh",
    detail: "Trello work is refreshed on a regular schedule rather than only when someone remembers.",
  },
  {
    value: "1 min",
    label: "publishing check",
    detail: "The scheduler selects no more than one eligible WordPress publication at a time.",
  },
] as const;

const stages = [
  {
    number: "01",
    title: "Start with the records the team already uses",
    trigger: "The scheduled Sheets refresh reads the configured current, prior-month, and historical source tabs.",
    work: "It finds the author, submission date, title, and linked Trello card needed to connect the rest of the work.",
    output: "A traceable candidate record that can be matched to an article instead of treated as an isolated spreadsheet row.",
    failure: "A missing or unrecognized card is recorded for follow-up while the rest of the payment run continues.",
  },
  {
    number: "02",
    title: "Find the document and count the work correctly",
    trigger: "A valid Trello card is available for the article.",
    work: "The system finds the linked Google Doc, reads its content, and calculates the word count from the document itself.",
    output: "A local article record stores the author, card, document, title, date, and computed word count together.",
    failure: "If the document cannot be found, the item becomes an operations notification instead of an invented pay record.",
  },
  {
    number: "03",
    title: "Apply the pay rule that was true for that month",
    trigger: "Article records and Trello labels are refreshed, or an administrator starts a refresh.",
    work: "The dashboard connects labels, article-specific exceptions, monthly rates, salary snapshots, and qualifying premiums.",
    output: "A payout view can explain the agreed rate, count, salary, and bonus behind each amount.",
    failure: "Duplicate bonus records are prevented and an authorized administrator can correct a specific article rate.",
  },
  {
    number: "04",
    title: "Publish one ready article at a time",
    trigger: "Trello refreshes identify eligible work, then the one-minute publishing scheduler selects one record that is ready.",
    work: "The publisher checks credentials, converts the Google Doc, processes images, uploads media, creates the WordPress post, and maps the author.",
    output: "The record keeps the external post ID, status, timestamp, notes, and an operation log for that publishing session.",
    failure: "Known errors are categorized, image uploads retry, stuck work recovers, and repeated alerts are suppressed.",
  },
  {
    number: "05",
    title: "Connect published work to its performance history",
    trigger: "Daily analytics refreshes run at noon Eastern and post-tracker refreshes run every three hours.",
    work: "The dashboard collects website totals and post measures, then attaches newly found URLs to the matching WordPress post and author.",
    output: "A team can compare content performance over the 30-, 90-, 180-, and 365-day views.",
    failure: "Analytics errors retry on a limit, and bad post URLs are classified rather than quietly accepted as real articles.",
  },
] as const;

const stack = [
  {
    role: "Application core",
    tools: "Laravel 8, PHP, Eloquent, controllers, Blade",
    why: "One application holds the workflow records, protected payment views, and operational routes.",
  },
  {
    role: "Editorial intake",
    tools: "Google Sheets, Trello boards, cards, labels, members",
    why: "The automation works with the planning tools editors already use.",
  },
  {
    role: "Document source",
    tools: "Google Docs API",
    why: "The actual document supplies both the word count and the source for publishing.",
  },
  {
    role: "Publishing target",
    tools: "WordPress REST API and protected AJAX endpoints",
    why: "The system can create posts, upload media, map authors, refresh status, and verify credentials.",
  },
  {
    role: "Measurement",
    tools: "Analytics Reporting API, GA4 Data API, local traffic history",
    why: "Both analytics paths keep historical and newer reporting data available during a platform change.",
  },
  {
    role: "State and operations",
    tools: "MySQL, Redis, Laravel Scheduler, queued jobs, schedule monitoring",
    why: "Saved facts, visible progress, background work, and monitored schedules turn connected tools into an operating system.",
  },
] as const;

const safeguards = [
  {
    title: "Old months stay true",
    detail:
      "Monthly per-word rates and fixed salaries are saved as snapshots. A post-specific rate can override the general monthly rate without rewriting history.",
  },
  {
    title: "A stalled run does not stay invisible",
    detail:
      "The Sheets refresh records progress in Redis, and a five-minute watcher can clear work that exceeded the configured stuck threshold.",
  },
  {
    title: "External calls are paced",
    detail:
      "Trello has three retry attempts, analytics retries are capped, and document or media calls include waits rather than becoming an uncontrolled request storm.",
  },
  {
    title: "Publishing does not race itself",
    detail:
      "The one-minute publisher selects a single record, keeps a heartbeat while working, and resets scheduled records left active for more than 60 minutes.",
  },
  {
    title: "Exceptions reach the right person",
    detail:
      "Missing documents, revoked access, bad credentials, and publisher errors become saved alerts and notifications, with 24-hour duplicate suppression for recurring failures.",
  },
] as const;

const beforeAfter = [
  {
    before: "Sheets, Trello cards, Docs, and WordPress records must be manually compared before paying or publishing.",
    after: "One article record joins the author, card, document, date, word count, labels, rate rules, and publishing status.",
  },
  {
    before: "A later rate change can blur what was agreed for earlier work.",
    after: "Monthly rate and salary snapshots plus stored bonuses give every reporting period a defensible baseline.",
  },
  {
    before: "A publishing problem leaves people guessing whether the document, image, credentials, or target site failed.",
    after: "Status, error records, heartbeat recovery, notes, logs, and notifications make the exception visible and diagnosable.",
  },
  {
    before: "Traffic reporting lives apart from editorial history.",
    after: "Post identity, author, publication timing, and analytics history are kept together for follow-up.",
  },
] as const;

const businessApplications = [
  "Reconcile work orders, deliverables, and compensation across an agency or contractor network.",
  "Build a controlled publishing or approval process that connects a planning board to the content system your team already uses.",
  "Preserve historical commission, fee, or rate agreements when operating rules change over time.",
  "Make recurring external-system failures visible through status and targeted notifications instead of spreadsheet detective work.",
] as const;

const glossary = [
  {
    term: "API",
    definition: "A controlled way for software systems to request and exchange information.",
  },
  {
    term: "GA4 Data API",
    definition: "The Google Analytics 4 connection used to request current analytics data.",
  },
  {
    term: "Google Analytics Reporting API",
    definition: "A legacy Google Analytics connection used for historical reporting data.",
  },
  {
    term: "Redis",
    definition: "A fast temporary data store used here to track job progress and recovery state.",
  },
  {
    term: "REST API",
    definition: "A common web interface that lets software create, read, or update information.",
  },
  {
    term: "Snapshot",
    definition: "A saved version of a value that protects what was true at a particular time.",
  },
  {
    term: "Trello",
    definition: "A visual work-management tool built around boards, lists, cards, and labels.",
  },
  {
    term: "Upsert",
    definition: "Save a record by creating it when absent or updating it when it already exists.",
  },
  {
    term: "WordPress CLI",
    definition: "A command-line tool for checking and managing WordPress installations.",
  },
] as const;

export default function AuthorDashboardPage() {
  return (
    <div>
      <section className="section relative overflow-hidden bg-linear-to-br from-emerald-950 via-teal-950 to-neutral-950 text-white">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-teal-400/15 blur-3xl" />
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
          <h1 className="mb-6 text-white">Writer payments that calculate correctly, even when the systems do not talk to each other</h1>
          <p className="mb-4 max-w-3xl text-xl text-neutral-200">
            This content-operations dashboard connects Google Sheets, Trello, Google Docs, WordPress, analytics, and payment rules into one
            traceable workflow. It replaces manual cross-checking with a record that shows where every article and amount came from.
          </p>
          <p className="mb-8 max-w-3xl text-lg text-emerald-100/80">
            The key protection: old months are not silently recalculated after a writer rate changes.
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 mwork:text-emerald-400">At a glance</p>
            <h2 className="mb-3 text-neutral-900 mwork:text-white">Built to reconcile, not just report</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              The system connects source data, human workflow, payment rules, publishing, and performance history in one operating record.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewFacts.map((fact) => (
              <article key={fact.label} className="card p-6 md:p-7">
                <p className="mb-3 text-4xl font-bold text-emerald-700 mwork:text-emerald-400">{fact.value}</p>
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
            <h2 className="mb-4 text-2xl text-red-950 mwork:text-red-200">A payment decision can depend on four disconnected places.</h2>
            <p className="text-red-900/80 mwork:text-red-100/80">
              One name variation, missing document, changed rate, or half-finished publication can turn ordinary editorial work into manual
              reconciliation and payment risk.
            </p>
          </article>
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 mwork:border-emerald-900 mwork:bg-emerald-950/30">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 mwork:text-emerald-300">The approach</p>
            <h2 className="mb-4 text-2xl text-emerald-950 mwork:text-emerald-200">Build one record that can explain itself.</h2>
            <p className="text-emerald-900/80 mwork:text-emerald-100/80">
              The dashboard builds a{" "}
              <Term definition="A saved history that shows where a record and its changes came from.">local audit trail</Term> from the
              tools people already use, automates the repetitive joins, and leaves room for human judgment where it matters.
            </p>
          </article>
        </div>
      </section>

      <section id="workflow" className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700 mwork:text-teal-400">How it works</p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">From editorial source to payment, publication, and performance</h2>
            <p className="mx-auto text-neutral-600 mwork:text-neutral-400">
              Each stage has an input, a saved result, and a clear exception path.
            </p>
          </div>
          <div className="space-y-5">
            {stages.map((stage) => (
              <article key={stage.number} className="card grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-bold tracking-wider text-emerald-700 mwork:bg-emerald-900/40 mwork:text-emerald-300">
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
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-700 mwork:text-emerald-400">You get</p>
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
          <PlainEnglish title="The business result">
            <p>
              The team does not have to choose between trusting a spreadsheet and manually opening every outside system. A payment or
              publishing decision can point back to the source data and the rule that produced it.
            </p>
          </PlainEnglish>
          <TechDetail label="How the reconciliation finds the right article">
            <p>
              The daily flow connects Google Sheets, Trello cards, Google Docs content, and local <code>UserArticle</code> records. It reads
              configured Raw Data and historical tabs, applies author aliases, finds the Trello card, and uses three HTTP retry attempts
              plus a delayed second lookup when a card is not returned initially.
            </p>
            <p>
              The importer searches Trello card actions and attachments for a Google Docs URL. It recursively reads paragraphs, tables, and
              table-of-contents content before storing the computed word count.
            </p>
            <p>
              It first-or-new upserts a <code>UserArticle</code> using the author and Trello card as identity, saving the document
              identifier, title, submitted date, and word count. Missing or unknown cards are recorded as errors; missing Docs are collected
              for an operations notification.
            </p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 mwork:text-emerald-400">
              How pay stays correct
            </p>
            <h2 className="mb-3 text-neutral-900 mwork:text-white">The rate for an old month stays the rate for that old month.</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              That matters whenever compensation changes, someone earns a premium, or an individual article needs an exception.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stack.map((item) => (
              <article key={item.role} className="card p-6 md:p-7">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mwork:text-emerald-400">{item.role}</p>
                <h3 className="mb-3 text-xl text-neutral-900 mwork:text-white">{item.tools}</h3>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">{item.why}</p>
              </article>
            ))}
          </div>
          <TechDetail label="How monthly compensation is preserved">
            <p>
              The payment logic supports monthly per-word and fixed-salary snapshots. An article-level rate override can replace the monthly
              rate for a specific post, while stored salary and bonus records protect a past period from the current profile changes.
            </p>
            <p>
              Trello labels are mirrored to local tables and reconciled with article-label links. The rules include configured $10 and $20
              article bonuses, a separate hourly job that can add a $0.02 premium for qualifying labels, and monthly consistency and
              double-quota bonus records.
            </p>
            <p>
              The bonus command uses first-or-create checks before inserting a monthly record. Authorized administrators can correct a
              single post rate through a protected route.
            </p>
          </TechDetail>
          <PlainEnglish title="Why this is different from a live spreadsheet formula">
            <p>
              A current rate change should help calculate future work, not quietly alter what the business owed someone last month. Saving
              the monthly agreement makes each payout reviewable and defensible later.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-emerald-50 mwork:bg-emerald-950/20">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 mwork:text-emerald-400">
              Automations and safeguards
            </p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">Automation with an operational memory</h2>
            <p className="mx-auto text-neutral-600 mwork:text-neutral-400">
              The important work is not merely making calls between tools. It is knowing what has happened, recovering when work stalls, and
              notifying people about exceptions.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {safeguards.map((item, index) => (
              <article
                key={item.title}
                className="rounded-xl border border-emerald-200 bg-white p-6 md:p-7 mwork:border-emerald-900 mwork:bg-neutral-900"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 mwork:bg-emerald-900/40 mwork:text-emerald-300">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-xl text-neutral-900 mwork:text-white">{item.title}</h3>
                <p className="text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
              </article>
            ))}
          </div>
          <TechDetail label="How publishing avoids overlap and recovers from hangs">
            <p>
              Content operations include hourly Trello refreshes and one-at-a-time publishing runs every minute. The publisher validates
              Google Docs and WordPress access, converts the document to HTML, processes images, uploads media, creates the post through the
              WordPress REST API, and attempts to set the mapped author.
            </p>
            <p>
              It retains post ID, posted status, timestamp, publisher notes, and an operation log. Known errors include missing document,
              bad WordPress credentials, and API error; image-upload loops retry up to five times.
            </p>
            <p>
              A selected record is marked as active and receives a publish heartbeat. Scheduled records left processing for more than 60
              minutes are reset, while repeat alert messages are suppressed for 24 hours.
            </p>
          </TechDetail>
          <TechDetail label="How analytics and job progress are kept recoverable">
            <p>
              Traffic data comes from both the Google Analytics Reporting API and the GA4 Data API across five configured properties. The
              system stores website totals, daily history, page views, unique views, engagement time, and rate data over 30, 90, 180, and
              365 days.
            </p>
            <p>
              Analytics wrappers catch exceptions, wait 30 seconds, and retry up to two times. A WordPress lookup fills cached post and
              author data when a new URL appears, while invalid post URLs are explicitly classified.
            </p>
            <p>
              Scheduled work has overlap controls, retry behavior, missing-document notifications, and Redis tracking for sync progress and
              stalled-job recovery. The Sheets refresh sets in-progress and timestamp keys; a five-minute watcher clears a process beyond
              its stuck threshold.
            </p>
          </TechDetail>
          <PlainEnglish title="What protects the team on a busy day">
            <p>
              The system does not treat a scheduled job as magic. It remembers active work, limits duplicate publishing, retries selected
              problems, names the error when it cannot continue, and gives someone a way to investigate before the issue spreads.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 mwork:text-emerald-400">What it replaced</p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">From cross-tool detective work to a controlled operating record</h2>
            <p className="mx-auto text-neutral-600 mwork:text-neutral-400">
              No time-saved claim is invented here. The gain is fewer manual joins, clearer exception ownership, and a stronger basis for
              payment and publishing decisions.
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
                <div className="bg-emerald-50 p-6 md:p-7 mwork:bg-emerald-950/20">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mwork:text-emerald-400">
                    With this approach
                  </p>
                  <p className="text-emerald-950/80 mwork:text-emerald-100/80">{item.after}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="rounded-2xl border border-neutral-200 bg-white p-7 mwork:border-neutral-800 mwork:bg-neutral-950 md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 mwork:text-emerald-400">
              What this means for your business
            </p>
            <h2 className="mb-5 text-neutral-900 mwork:text-white">Reconcile, preserve, and act.</h2>
            <p className="mb-7 text-neutral-600 mwork:text-neutral-400">
              Your tools may not be Trello and WordPress. This pattern still applies whenever a human workflow, a financial rule, and
              several outside systems must agree on the same record.
            </p>
            <ul className="space-y-4">
              {businessApplications.map((item) => (
                <li key={item} className="flex gap-3 text-neutral-700 mwork:text-neutral-300">
                  <span className="text-emerald-600 mwork:text-emerald-400" aria-hidden="true">
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
          <h2 className="mb-4 text-white">Need your operations tools to agree with each other?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-neutral-200">
            We can map the handoffs creating manual work, payment risk, or publishing uncertainty and design the right level of automation
            around them.
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
