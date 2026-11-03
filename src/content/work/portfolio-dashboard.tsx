import Link from "next/link";
import { Figure, Glossary, PlainEnglish, TechDetail, Term } from "@/components/work/CaseStudy";



const heroTags = [
  { label: "Portfolio workspace", className: "bg-sky-400/15 text-sky-200" },
  { label: "Live market context", className: "bg-blue-400/15 text-blue-200" },
  { label: "Options tracking", className: "bg-cyan-400/15 text-cyan-200" },
  { label: "Secure integrations", className: "bg-teal-400/15 text-teal-200" },
] as const;

const atAGlance = [
  {
    value: "~230",
    label: "small backend jobs",
    detail: "Around 230 separately deployable backend jobs keep individual responsibilities separate, so one problem does not have to take down the whole product.",
  },
  {
    value: "31",
    label: "scheduled routines",
    detail: "Thirty-one configured schedules keep updates, alerts, research, and housekeeping moving without a visitor leaving a tab open.",
  },
  {
    value: "5",
    label: "outside data sources",
    detail: "Market data, connected accounts, brokerage data, and public filings each have a clear role instead of being mixed together.",
  },
  {
    value: "3",
    label: "places to keep data",
    detail: "Fast temporary state, long-term records, and generated files each use storage designed for that particular job.",
  },
] as const;

const workflowStages = [
  {
    number: "01",
    title: "Open one private workspace",
    trigger: "Someone signs in and opens a portfolio view.",
    action:
      "The product identifies the person, checks which parts of the product they can use, then loads only their saved workspace. If a saved portfolio is not ready yet, the page opens in a clean, usable empty state instead of showing an error.",
    output: "A person lands in the right place with the right level of access, without seeing another account or being blocked by a missing saved result.",
    failure: "If the subscription check is unavailable, access becomes more limited rather than more open. That is safer than accidentally revealing a paid tool.",
  },
  {
    number: "02",
    title: "Bring account and market information together",
    trigger: "The dashboard needs a quote, an account balance, a transaction, a symbol search, or a chart.",
    action:
      "The browser asks PositionTracker, and PositionTracker asks the outside service. It standardizes each response before the screen uses it, so the experience remains consistent even when providers return data in different formats.",
    output: "Prices, holdings, cash, and activity can appear in one familiar layout instead of in a collection of unrelated vendor screens.",
    failure: "The product can use a recent value, label partial information, or show what is unavailable. It does not quietly present a guess as a confirmed live number.",
  },
  {
    number: "03",
    title: "Turn positions into a useful daily view",
    trigger: "New quotes, imported positions, manual entries, or cash changes affect the portfolio summary.",
    action:
      "The dashboard combines quantities, cost basis, cash, option values, and standardized market data. It saves compact totals for faster returns while keeping the underlying position information available for context.",
    output: "The home screen can show total value, day movement, gain or loss, cash, and a clear briefing without forcing the reader to reconcile several tabs.",
    failure:
      "Short waits and retry rules protect the fast-loading summary. When a saved total is not available, the product can calculate or display a clearly newly calculated state rather than pretending an old result is current.",
  },
  {
    number: "04",
    title: "Show option contracts with the right context",
    trigger: "Someone opens an options chain, checks a held contract, or looks at a scenario.",
    action:
      "The product brings contract details, market marks, volume, and risk measures into one view. When a complete market mark is unavailable, it can calculate a clearly labeled estimate from the inputs that are available.",
    output: "A user can distinguish a live market observation from a model estimate and understand the position without hand-building a spreadsheet.",
    failure: "Invalid inputs produce no estimate. Missing bid or ask values stay visibly missing, rather than being filled with a number that looks more certain than it is.",
  },
  {
    number: "05",
    title: "Keep saved views in step across devices",
    trigger: "Someone changes a layout, a tab, or a preference from another browser or device.",
    action: "The screen responds immediately, then saves the change with a version number. Before accepting it, the server checks whether somebody else has already saved something newer.",
    output: "The product feels fast while still protecting newer work from being silently replaced by an older screen.",
    failure:
      "If the saved version is newer, the product can flag the conflict and reload. If a network response disappears after a successful save, the same retry can be safely recognized instead of being treated as a second change.",
  },
  {
    number: "06",
    title: "Prepare useful context before anyone asks",
    trigger: "Timed background routines run during market windows and at planned intervals.",
    action: "The product refreshes selected data, records snapshots, checks filings, prepares notifications, and performs cleanup away from the visitor experience.",
    output: "Opening the dashboard can feel prepared rather than like the first person online has to start every update from scratch.",
    failure: "Each job is bounded and isolated. A temporary provider or storage problem is contained to that job, while the interactive dashboard remains available.",
  },
] as const;

const platformRoles = [
  {
    role: "The screen people use",
    tools: "A fast, focused web interface",
    why: "A responsive interface can handle dense financial information without making the reader move between disconnected tools.",
  },
  {
    role: "The protected application layer",
    tools: "Small protected backend jobs",
    why: "Small server-side jobs keep secrets and sensitive decisions away from the browser while allowing individual features to operate independently.",
  },
  {
    role: "Sign-in and paid access",
    tools: "Identity and paid-feature checks",
    why: "Identity and subscription access are checked on the server, not trusted to a button or a browser setting.",
  },
  {
    role: "Fast and durable records",
    tools: "Fast state and long-term records",
    why: "Fast state, long-term history, and cross-device coordination have distinct homes instead of competing for one storage system.",
  },
  {
    role: "Market, account, and filing inputs",
    tools: "Market, account, and public filing inputs",
    why: "Each source does one defined job, while the product keeps the user experience consistent across them.",
  },
  {
    role: "Research, files, and messages",
    tools: "Assistance, generated files, and messages",
    why: "AI-assisted analysis, generated files, and email delivery can be governed as product features instead of untracked add-ons.",
  },
] as const;

const endpointGroups = [
  {
    count: "18",
    title: "market-data jobs",
    description: "Financial Modeling Prep routes cover quotes, search, history, earnings, technical data, crypto, and after-hours context.",
  },
  {
    count: "13 + 6",
    title: "account-connection jobs",
    description: "Plaid and SnapTrade jobs cover linking, imports, balances, holdings, transactions, reconciliation, and connection status.",
  },
  {
    count: "24",
    title: "AI jobs",
    description: "Portfolio-aware chat, bounded analysis, filing intelligence, and research have separately controlled routes.",
  },
  {
    count: "33",
    title: "background routines",
    description: "Scheduled functions cover snapshots, market updates, filings, notifications, sync work, and cleanup.",
  },
] as const;

const safeguards = [
  {
    title: "Provider keys stay out of the browser",
    description:
      "Outside services are reached through PositionTracker instead of directly from a visitor device. That keeps service credentials private and gives the product one place to validate requests and control who can call what.",
  },
  {
    title: "External work has clear limits",
    description:
      "The product limits repeated requests, saves appropriate recent results, and gives AI features scoped daily limits. Expensive or unreliable outside calls do not get an unlimited invitation to run.",
  },
  {
    title: "Two edits do not quietly erase each other",
    description:
      "Saved tabs and preferences have a clear version check. An older edit can be identified, and a repeat caused by a lost response can be accepted without creating an unwanted duplicate.",
  },
  {
    title: "Incomplete data stays honest",
    description:
      "Provider failures, rate limits, and absent fields are expected. The product uses bounded retries, safe empty results where appropriate, and visible distinctions between live values, cached values, and estimates.",
  },
  {
    title: "Paid tools do not open during an outage",
    description: "If the product cannot confirm access in the deployed environment, it restricts access. This protects paid features rather than granting them by accident.",
  },
  {
    title: "Background work cannot hold up the dashboard",
    description: "Updates and housekeeping run in protected scheduled jobs. The experience a visitor sees does not depend on a browser tab remaining open for maintenance to happen.",
  },
] as const;

const beforeAfter = [
  {
    before: "Jumping between brokers, spreadsheets, market sites, and alerts to form a picture of the day.",
    after: "One private workspace that brings positions, quotes, cash, options, research, and saved views into a consistent working picture.",
  },
  {
    before: "Putting service credentials into browser code and translating every provider response inside the interface.",
    after: "A protected application layer that keeps credentials private, standardizes inputs, and makes provider trouble manageable.",
  },
  {
    before: "Assuming a change saved because the screen updated, even when another device may have changed the same setting.",
    after: "Clear save rules that protect newer work, surface conflicts, and safely handle a repeated request after a network interruption.",
  },
  {
    before: "Reading option chains in one place, calculating scenarios elsewhere, and not knowing whether a number is observed or estimated.",
    after: "A structured contract view that separates market information from guarded theoretical estimates when the market data is incomplete.",
  },
] as const;

const businessApplications = [
  "A customer portal that combines live operational information from several vendors without exposing vendor secrets to customers.",
  "A sales, inventory, or field-service workspace that feels quick to use while keeping shared views safely synchronized across offices and devices.",
  "A subscription product with real server-enforced access levels, checkout workflows, and protected upgrades.",
  "An analytics product that clearly says what is current, what is cached, what is estimated, and what is unavailable.",
  "A recurring intelligence system that prepares useful context before a team logs in rather than making every person wait for background work.",
] as const;

const glossaryItems = [
  {
    term: "API handler",
    definition: "A small server-side job that receives a request and returns the specific result a feature needs.",
  },
  {
    term: "Cache",
    definition: "A short-term saved copy that makes repeat views faster without replacing the durable record.",
  },
  {
    term: "CORS",
    definition: "Browser rules that limit which websites can call another service directly.",
  },
  {
    term: "Cron schedule",
    definition: "A timed instruction that starts a background job at planned intervals.",
  },
  {
    term: "Entitlement",
    definition: "The server-checked record of which features a signed-in person is allowed to use.",
  },
  {
    term: "Fail closed",
    definition: "When confirmation is missing, restrict access rather than accidentally allowing more access.",
  },
  {
    term: "Greeks",
    definition: "Option risk measures that describe how a contract may react to price, time, and volatility changes.",
  },
  {
    term: "Idempotent retry",
    definition: "A repeated request that safely produces the same outcome instead of duplicating a completed action.",
  },
  {
    term: "Optimistic locking",
    definition: "A save check that prevents an older edit from silently replacing a newer one.",
  },
  {
    term: "Serverless function",
    definition: "A small server-side task that runs when needed without maintaining a dedicated always-on server.",
  },
  {
    term: "Black-Scholes",
    definition: "A financial model that estimates an option value from defined market and contract inputs.",
  },
  {
    term: "Postgres database",
    definition: "A structured long-term database for records that need history, search, and reliable uniqueness rules.",
  },
  {
    term: "Proxy route",
    definition: "A first-party server route that safely makes an outside-service request on behalf of the browser.",
  },
  {
    term: "Vercel KV",
    definition: "Fast key-value storage used here for responsive saved state, caches, and coordination.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.55 2.92 8.78 7 10 4.08-1.22 7-5.45 7-10V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 12 1.7 1.7 3.5-3.7" />
    </svg>
  );
}

export default function PortfolioDashboardPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 py-16 text-white md:py-24">
        <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="container-narrow relative z-10">
          <Link href="/work" className="mb-8 inline-flex items-center gap-2 text-sm text-sky-200 transition-colors hover:text-white">
            <span aria-hidden="true">&larr;</span>
            Back to Work Samples
          </Link>
          <div className="mb-6 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <span key={tag.label} className={`rounded-full px-3 py-1 text-xs font-semibold ${tag.className}`}>
                {tag.label}
              </span>
            ))}
          </div>
          <h1 className="mb-5 text-4xl font-heading font-bold tracking-tight md:text-6xl">Financial Portfolio Dashboard</h1>
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-slate-200 md:text-xl">
            <p>A single place to understand accounts, positions, cash, option contracts, research, and what needs attention today.</p>
            <p>PositionTracker turns scattered financial information into a calm working view, while keeping the complicated safeguards behind the scenes.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Discuss a project like this
              <ArrowIcon />
            </Link>
            <a
              href="https://positiontracker.trading"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary inline-flex items-center gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              View the live product
              <ArrowIcon />
            </a>
          </div>
          <Figure
            src="/screenshots/positiontracker-dashboard-overview.jpg"
            alt="PositionTracker public demo showing the Today and After Hours command center with portfolio value, daily change, gain or loss, cash, and a portfolio briefing panel."
            caption="Shown in the product public demo mode: real app code running on sample data — not marketing mockups and not a real client portfolio. The demo banner and navigation are visible in the capture."
            priority
          />
        </div>
      </section>

      <section className="section bg-akic-cream mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="tag mb-3">At a glance</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">A working product with room for real-world complexity</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((item) => (
              <article key={item.label} className="card border-blue-200/70 bg-white p-6 mwork:border-blue-900/70 mwork:bg-neutral-950 md:p-7">
                <p className="text-4xl font-heading font-bold text-brand-orange">{item.value}</p>
                <h3 className="mt-2 font-heading text-lg font-bold text-akic-brown mwork:text-akic-cream">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 mwork:border-red-900/70 mwork:bg-red-950/30 md:p-7">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-red-700 mwork:text-red-300">The problem</p>
            <h2 className="text-2xl font-heading font-bold text-red-900 mwork:text-red-100">Important decisions get spread across too many screens.</h2>
            <p className="mt-4 leading-relaxed text-red-900/80 mwork:text-red-100/80">
              A portfolio can live across brokerages, spreadsheets, quote sites, option chains, filing alerts, and an inbox. Switching between them takes time and makes it harder to tell
              which number is current, missing, or estimated.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 mwork:border-blue-900/70 mwork:bg-blue-950/30 md:p-7">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-blue-700 mwork:text-blue-300">The product answer</p>
            <h2 className="text-2xl font-heading font-bold text-blue-950 mwork:text-blue-100">Give the person making the decision one honest, prepared view.</h2>
            <p className="mt-4 leading-relaxed text-blue-950/80 mwork:text-blue-100/80">
              PositionTracker brings the useful pieces together, labels uncertainty, and protects the work around it. The result is less hunting for context and more confidence in what the
              screen can actually support.
            </p>
          </div>
        </div>
        <div className="container-narrow">
          <Figure
            src="/screenshots/positiontracker-portfolio.jpg"
            alt="PositionTracker public demo positions table grouped by Robinhood, Fidelity, and Crypto and Commodities, with 43 holdings and quote, profit or loss, and value columns."
            caption="The consolidated positions view groups accounts in one workspace while keeping their sources visible. This is public demo mode with synthetic sample data, not real holdings."
          />
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="tag mb-3">How it works</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream md:text-4xl">What happens when you open it</h2>
            <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              The visible experience stays simple because each part of the journey has a clear job and a safe response when something outside the product is slow or incomplete.
            </p>
          </div>
          <div className="space-y-6">
            {workflowStages.map((stage) => (
              <article key={stage.number} className="card grid gap-6 border-neutral-200 bg-white p-6 mwork:border-neutral-700 mwork:bg-neutral-950 md:grid-cols-[88px_1fr] md:p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-950 font-heading text-xl font-bold text-white mwork:bg-blue-800">{stage.number}</div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-akic-brown mwork:text-akic-cream">{stage.title}</h3>
                  <dl className="mt-5 grid gap-4">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">When it starts</dt>
                      <dd className="mt-1 leading-relaxed text-neutral-700 mwork:text-neutral-300">{stage.trigger}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">What it does</dt>
                      <dd className="mt-1 leading-relaxed text-neutral-700 mwork:text-neutral-300">{stage.action}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">What you get</dt>
                      <dd className="mt-1 leading-relaxed text-neutral-700 mwork:text-neutral-300">{stage.output}</dd>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-5 mwork:bg-blue-950/30">
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700 mwork:text-blue-300">When something goes wrong</dt>
                      <dd className="mt-1 leading-relaxed text-blue-950/80 mwork:text-blue-100/80">{stage.failure}</dd>
                    </div>
                  </dl>
                  {stage.number === "02" && (
                    <TechDetail label="How outside data stays under product control">
                      <p>
                        First-party <Term definition="A small server-side job that receives a request and returns a defined result.">API handlers</Term> sit between the browser and Financial
                        Modeling Prep, Polygon, Plaid, SnapTrade, and SEC EDGAR. They validate inputs, attach provider credentials on the server, normalize responses, and control
                        <Term definition="Browser rules that limit which websites can call another service directly.">CORS</Term>.
                      </p>
                      <p>
                        The source has roughly 230 deployable handlers across roughly 648 files under <code>/api</code>. That includes 18 Financial Modeling Prep handlers, 13 Plaid handlers,
                        6 SnapTrade handlers, 24 AI handlers, and 33 cron handlers.
                      </p>
                    </TechDetail>
                  )}
                  {stage.number === "04" && (
                    <TechDetail label="How option estimates avoid pretending to be quotes">
                      <p>
                        The options adapter parses OCC contract symbols and maps bid, ask, last trade, implied volatility, volume, open interest, and available Greeks into a common contract
                        model.
                      </p>
                      <p>
                        Chain pagination is capped at 20 pages. A 429 response can retry up to three times with a delay. When inputs are valid, a shared
                        <Term definition="A financial model that estimates option value from defined market and contract inputs.">Black-Scholes</Term> calculation can produce a theoretical
                        price and delta; invalid or non-finite inputs return <code>null</code> rather than a made-up value.
                      </p>
                    </TechDetail>
                  )}
                  {stage.number === "05" && (
                    <TechDetail label="How cross-device saves stay safe">
                      <p>
                        Tabs and preferences update optimistically, then persist with a revision in Vercel KV. The server compares the incoming revision against the current revision at an
                        explicit boundary before it accepts the update.
                      </p>
                      <p>
                        This is <Term definition="A save check that stops an older edit from silently replacing a newer one.">optimistic locking</Term> paired with an{" "}
                        <Term definition="A repeated request that safely produces the same outcome instead of duplicating a completed action.">idempotent retry</Term>: a matching payload can
                        be recognized as already committed after a response is lost, while a genuinely stale revision returns the server version for conflict handling.
                      </p>
                    </TechDetail>
                  )}
                  {stage.number === "06" && (
                    <TechDetail label="What runs in the background">
                      <p>
                        <code>vercel.json</code> defines 31 configured Vercel Cron schedules. That is separate from the 33 cron-handler routes in the codebase. Schedules cover market-window
                        work, snapshots, brokerage sync, filing intake, notifications, research, and cleanup.
                      </p>
                      <p>
                        The routes authenticate scheduled invocations, keep work bounded, use provider-specific retries, and rely on storage wrappers and durable uniqueness constraints where
                        a repeat insert would be a problem.
                      </p>
                    </TechDetail>
                  )}
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="What that means day to day">
            <p>You get a working view that is ready faster, clearer about uncertainty, and less likely to fail just because one outside service is having a bad moment.</p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="tag mb-3">How the pieces fit together</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">Each tool has a clear job</h2>
            <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              The product does not depend on one oversized system doing everything. It uses focused services for the interface, private decisions, fast state, durable records, incoming data,
              and delivery.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {platformRoles.map((item) => (
              <article key={item.role} className="card border-neutral-200 p-6 mwork:border-neutral-700 md:p-7">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-orange">{item.role}</p>
                <h3 className="mt-2 font-heading text-xl font-bold text-akic-brown mwork:text-akic-cream">{item.tools}</h3>
                <p className="mt-3 leading-relaxed text-neutral-600 mwork:text-neutral-400">{item.why}</p>
              </article>
            ))}
          </div>
          <TechDetail label="The platform breakdown for technical reviewers">
            <p>
              React 19 and a Vite multi-page build provide the interface, styled with Tailwind. Vercel hosts the application and its serverless functions. Vercel KV handles responsive
              application state, rate-limit counters, cached totals, and coordination; Neon serverless Postgres stores positions, snapshots, trades, recommendations, subscribers, and
              operational records. Financial Modeling Prep, Polygon, Plaid, SnapTrade, and SEC EDGAR provide defined market, account, brokerage, and public-filing inputs.
            </p>
            <p>
              Clerk verifies identity. Stripe provides billing information. Resend handles email, Vercel Blob stores generated files, and the Vercel AI SDK supports metered AI requests.
              Database wrappers time out slow calls, retry selected cold-start-style connection failures, and rely on idempotent writes or unique constraints when durability matters.
            </p>
          </TechDetail>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {endpointGroups.map((group) => (
              <article key={group.title} className="rounded-xl border border-blue-200 bg-blue-50 p-6 mwork:border-blue-900/70 mwork:bg-blue-950/30">
                <p className="text-sm font-bold text-blue-700 mwork:text-blue-300">{group.count}</p>
                <h3 className="mt-1 font-heading text-lg font-bold text-blue-950 mwork:text-blue-100">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-950/75 mwork:text-blue-100/75">{group.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-950">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="tag mb-3">Make information easier to scan</p>
              <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">A visual view of the market, not another wall of numbers</h2>
              <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                A market heatmap shows which stocks are moving and gives bigger companies more visual weight. It helps a reader orient themselves before opening a specific chart or position.
              </p>
              <PlainEnglish title="Why the visual layer matters">
                <p>Good reporting does not make people study a table before they know where to look. It gives them an overview, then lets them drill into the details.</p>
              </PlainEnglish>
            </div>
            <Figure
              src="/screenshots/positiontracker-charts.jpg"
              alt="PositionTracker public demo market heatmap with stocks sized by market capitalization and colored by percent change."
              caption="The heatmap offers a fast visual read of market movement. The captured values are synthetic sample data in the public demo mode."
            />
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <Figure
              src="/screenshots/positiontracker-ai-chat.jpg"
              alt="PositionTracker public demo AI assistant panel with a Needs attention portfolio briefing and a conversation history sidebar."
              caption="The AI area frames follow-up questions around the portfolio view. This screen is from the public demo and shows sample data."
            />
            <div>
              <p className="tag mb-3">Put the briefing in context</p>
              <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">AI support that starts from the work already in front of you</h2>
              <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                The assistant is designed to help surface what needs attention and support a follow-up conversation. It sits beside the portfolio context instead of asking a person to move
                their question into an unrelated chat tool.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                Usage controls and separate AI routes make it possible to treat this as a governed product feature, rather than an unlimited hidden cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="tag mb-3">Keep public information useful</p>
              <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">Filings become a readable signal, not another inbox burden</h2>
              <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                SEC filing analysis gives a structured place to review important 10-Q and 8-K updates, read a summary, and subscribe to alerts. The public record is still available, but the
                product reduces the friction of finding and prioritizing it.
              </p>
              <PlainEnglish title="The broader pattern">
                <p>When a team has too much incoming information, the valuable product is not just an alert. It is a repeatable way to decide what deserves attention.</p>
              </PlainEnglish>
            </div>
            <Figure
              src="/screenshots/positiontracker-sec-filings.jpg"
              alt="PositionTracker public demo SEC filings analysis page listing AI-summarized 10-Q and 8-K filings with an email alert signup area."
              caption="The filing view combines a readable summary and alert signup. It is shown in the product public demo with sample data."
            />
          </div>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-950">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <Figure
              src="/screenshots/positiontracker-options.jpg"
              alt="PositionTracker public demo TSLA options chain with calls and puts, strike prices, Greeks, implied volatility, volume, and open interest."
              caption="The options view makes contract detail available in one place. It is a public demo screenshot, so every figure shown is synthetic sample data."
            />
            <div>
              <p className="tag mb-3">Track option contracts with context</p>
              <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">See the contract details that affect a decision</h2>
              <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                The options chain puts calls, puts, strikes, volume, open interest, <Term definition="A market-based estimate of how much an option price may move.">implied volatility</Term>
                , and <Term definition="Option risk measures that describe how a contract may react to price, time, and volatility changes.">Greeks</Term> in one working view. It creates a
                clearer starting point for checking a contract than shifting between a broker screen and a separate calculator.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
                The product keeps real market marks and modeled estimates distinct, so a reader can make an informed judgment about the quality of the information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="tag mb-3">Safeguards that keep the product dependable</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">Useful does not have to mean fragile</h2>
            <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              The hard part of a data-rich product is not only fetching information. It is setting rules for what happens when a provider is slow, a request repeats, an account changes, or a
              paid service cannot be confirmed.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {safeguards.map((item) => (
              <article key={item.title} className="card border-slate-200 bg-white p-6 mwork:border-slate-800 mwork:bg-neutral-950 md:p-7">
                <div className="flex items-center gap-3 text-blue-700 mwork:text-blue-300">
                  <ShieldIcon />
                  <h3 className="font-heading text-lg font-bold text-akic-brown mwork:text-akic-cream">{item.title}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">{item.description}</p>
              </article>
            ))}
          </div>
          <PlainEnglish title="The value of these safeguards">
            <p>
              Your team does not need to understand every rule behind the scenes. They need a product that does not expose secrets, overcharge on repeat work, erase a newer edit, or turn a
              temporary gap into a confident-looking answer.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-akic-cream mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="mb-10 max-w-3xl">
            <p className="tag mb-3">What it replaced</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">Less manual reconciliation. More dependable context.</h2>
            <p className="mt-4 leading-relaxed text-neutral-600 mwork:text-neutral-400">
              No invented time-saved claim is needed. The improvement is a controlled workflow where repeated switching, copy-and-paste, and uncertainty become visible parts of the product
              instead of invisible risks for the person using it.
            </p>
          </div>
          <div className="space-y-4">
            {beforeAfter.map((item) => (
              <article key={item.before} className="grid overflow-hidden rounded-xl border border-neutral-200 mwork:border-neutral-700 md:grid-cols-2">
                <div className="bg-neutral-100 p-6 mwork:bg-neutral-950 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">Before</p>
                  <p className="mt-2 leading-relaxed text-neutral-700 mwork:text-neutral-300">{item.before}</p>
                </div>
                <div className="bg-orange-50 p-6 mwork:bg-orange-950/25 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-orange">After</p>
                  <p className="mt-2 leading-relaxed text-orange-950/80 mwork:text-orange-100/80">{item.after}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <p className="tag mb-3">What this means for your business</p>
          <h2 className="max-w-3xl text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">The reusable pattern is a client-facing system that stays honest under pressure.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {businessApplications.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-akic-cream p-6 shadow-sm mwork:bg-neutral-900 md:p-7">
                <span className="mt-0.5 text-brand-orange">
                  <ArrowIcon />
                </span>
                <p className="leading-relaxed text-neutral-700 mwork:text-neutral-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Glossary items={[...glossaryItems]} />

      <section className="section bg-akic-brown text-white">
        <div className="container-narrow text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-orange-200">Build the layer between your business and its data</p>
          <h2 className="text-3xl font-heading font-bold md:text-4xl">Need a dashboard that does more than display a spreadsheet?</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-neutral-200">
            I can help turn fragmented operational systems into a secure workflow with useful automation, clear safeguards, and an interface your team can trust.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex items-center gap-2">
            Discuss your project
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </div>
  );
}
