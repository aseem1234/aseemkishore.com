import Link from "next/link";
import {
  Glossary,
  PlainEnglish,
  TechDetail,
  Term,
} from "@/components/work/CaseStudy";



const atAGlance = [
  {
    value: "60",
    label: "small backend jobs",
    detail: "Separate services for data, writing, visuals, delivery, recovery, and scheduled work.",
  },
  {
    value: "6",
    label: "job families",
    detail: "Each family has one clear responsibility instead of one oversized AI instruction.",
  },
  {
    value: "2×",
    label: "image capture scale",
    detail: "Charts are produced at high resolution before they reach an email or post.",
  },
  {
    value: "90 days",
    label: "duplicate-post protection",
    detail: "A recovery request can run again without quietly creating a second social post.",
  },
] as const;

const endpointGroups = [
  {
    count: "19",
    title: "Data collection",
    summary: "Gets market and source information into a clean, repeatable format.",
    examples: "Financial data, market status, movers, options, earnings, books, news, and screens.",
  },
  {
    count: "10",
    title: "Writing support",
    summary: "Turns prepared inputs into briefs, posts, articles, checks, and revisions.",
    examples: "Briefs, posts, articles, fact checks, extraction, refresh, and shortening.",
  },
  {
    count: "5",
    title: "Charts and media",
    summary: "Creates visual assets and makes sure they are available when needed.",
    examples: "Chart creation, image upload, chart reads, media selection, and mirror cleanup.",
  },
  {
    count: "8",
    title: "Delivery and publishing",
    summary: "Packages reviewed work for email and controlled social delivery.",
    examples: "Email, delivery status, social posting, LinkedIn setup, post lists, and retries.",
  },
  {
    count: "14",
    title: "Memory and recovery",
    summary: "Remembers what happened so repeat runs stay safe and interrupted work can resume.",
    examples: "Stored history, approvals, recovery research, promotion, and social recovery.",
  },
  {
    count: "4",
    title: "Scheduled routines",
    summary: "Runs routine checks and maintenance without an AI session staying open.",
    examples: "Congress, model guard, scout watcher, and SEC publication schedules.",
  },
] as const;

const workflow = [
  {
    step: "01",
    title: "Ask for one bounded job",
    trigger: "A content workflow or a timed routine requests one specific task.",
    action: "The system accepts a small request with a clear purpose instead of asking one model to run an entire business process.",
    output: "A reliable handoff that is easy to check and reuse.",
    failure: "Requests without the right access stop before they can affect the workflow.",
  },
  {
    step: "02",
    title: "Collect facts before asking for judgment",
    trigger: "A draft needs market numbers, a source record, queue information, or a screen result.",
    action: "Purpose-built software gets the known information and puts it into a consistent shape.",
    output: "Prepared facts for a writer or visual builder, without spending premium AI time on routine collection.",
    failure: "Unsupported requests and temporary source limits return a clear error rather than an invented answer.",
  },
  {
    step: "03",
    title: "Use AI where language adds value",
    trigger: "A prepared idea needs a brief, draft, or editorial pass.",
    action: "The writing service receives the facts first, then creates the language work that benefits from judgment and synthesis.",
    output: "A draft with its supporting context already prepared.",
    failure: "If the preferred writing service is unavailable, a planned backup route and alert state make the issue visible.",
  },
  {
    step: "04",
    title: "Turn a chart plan into a ready-to-use image",
    trigger: "A content package needs a market, timeline, ranking, or performance visual.",
    action: "The backend builds the image from a structured plan, rather than asking the AI to recreate design code each time.",
    output: "A dependable image link for the finished package.",
    failure: "A rendering or image-host issue is caught and reported instead of leaving a broken image behind.",
  },
  {
    step: "05",
    title: "Send the review package through a controlled lane",
    trigger: "Content and supporting assets are ready for a person to review or a controlled publishing action.",
    action: "The server prepares the email, keeps delivery addresses under system control, and records the review action needed next.",
    output: "A consistent review package with its delivery trail attached.",
    failure: "When immediate sending cannot finish, the package enters a scheduled retry path instead of disappearing.",
  },
  {
    step: "06",
    title: "Remember, protect, and resume",
    trigger: "A task repeats, delivery retries, or a paused recovery needs to continue.",
    action: "Private storage records progress and reserves work before it starts, so competing runs cannot quietly overlap.",
    output: "A safe record of what is complete, waiting, or ready to recover.",
    failure: "An exact repeat can return the earlier result; conflicting content is stopped before it creates a second outcome.",
  },
] as const;

const architecture = [
  {
    title: "Facts in",
    tools: "Known-source data services",
    value: "Your team gets prepared facts instead of paying an AI model to repeat research and formatting.",
  },
  {
    title: "Words when needed",
    tools: "Server-side writing service",
    value: "Lower-cost drafting is used for the language task, after the supporting work is already done.",
  },
  {
    title: "Visuals on demand",
    tools: "Chart builder and image service",
    value: "Branded visual output follows the same design rules every time and arrives with an explicit failure path.",
  },
  {
    title: "Delivery under control",
    tools: "Server-owned email and retry queue",
    value: "The software, not a model response, controls where review packages go and how a missed send returns.",
  },
  {
    title: "Memory that survives a retry",
    tools: "Private storage and safe updates",
    value: "A second attempt continues the work instead of blindly repeating its public-facing effects.",
  },
  {
    title: "Routine work on a timetable",
    tools: "Vercel serverless and scheduled routes",
    value: "Watchers, checks, and recovery jobs run as services instead of depending on a chat session staying active.",
  },
] as const;

const safeguards = [
  {
    title: "Known operations only",
    summary: "Data requests are limited to supported jobs, so the system stays predictable and easier to diagnose.",
  },
  {
    title: "A clean image path",
    summary: "Each visual gets its own workspace while the system safely reuses the expensive browser process behind it.",
  },
  {
    title: "Delivery addresses stay with the system",
    summary: "A caller cannot silently redirect a review package to an unapproved address.",
  },
  {
    title: "Missed sends have a next step",
    summary: "A delivery that cannot complete now is recorded for the scheduled retry service.",
  },
  {
    title: "Two runs cannot overwrite each other",
    summary: "Conditional saves and short-lived reservations protect work that arrives at the same time.",
  },
  {
    title: "A repeat recovery does not post twice",
    summary: "A stable recovery slot recognizes the same request and rejects different content trying to use that slot.",
  },
] as const;

const beforeAfter = [
  {
    before: "An expensive AI model repeatedly gathers data, formats it, builds a chart, sends email, and tries to remember its last run.",
    after: "The model focuses on selecting and explaining; small services handle the repeatable jobs around it.",
  },
  {
    before: "A content package can fail late, leaving an image missing or delivery status unclear.",
    after: "Images and email have defined creation, hosting, and recovery paths with visible errors.",
  },
  {
    before: "A retry can create another email or social post because the earlier attempt has no durable record.",
    after: "Private records and protected reservations let the system continue safely after a disruption.",
  },
  {
    before: "A model instruction tries to govern addresses, markup, timing, and recovery through natural-language rules.",
    after: "The backend owns those operational rules in code at the delivery boundary.",
  },
] as const;

const businessValue = [
  "Reserve premium AI time for interpretation, choices, and writing—not repetitive data movement.",
  "Reuse one dependable set of data, visual, delivery, storage, and recovery capabilities across new workflows.",
  "Give your team a clear trail when something needs another attempt instead of hoping the AI remembers what happened.",
  "Keep content generation and approval separate, so a useful draft is not automatically a public outcome.",
] as const;

const glossary = [
  { term: "Allowlist", definition: "A named list of approved actions the system may perform." },
  { term: "API endpoint", definition: "A small address a program calls to request one specific job." },
  { term: "Chromium", definition: "The browser engine used here to capture a finished chart image." },
  { term: "Compare-and-set", definition: "A save that succeeds only when the record has not changed unexpectedly." },
  { term: "Idempotent", definition: "Safe to repeat because the same request does not create a second result." },
  { term: "Private blob storage", definition: "Protected file-like storage for records that must persist between runs." },
  { term: "Rate limit", definition: "A source-imposed cap on how quickly requests may be made." },
  { term: "Serverless", definition: "Small hosted backend services that run only when work arrives." },
  { term: "TTL reservation", definition: "A temporary claim that expires automatically after a set period." },
  { term: "Vercel Cron", definition: "A scheduled trigger that starts a backend route at planned times." },
] as const;

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function SkillsApiPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-800 to-blue-950 py-16 text-white md:py-24">
        <div className="absolute -left-28 top-10 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="container-narrow relative z-10">
          <Link href="/work" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-200 transition hover:text-white">
            <Icon path="M19 12H5m6 6-6-6 6-6" className="h-4 w-4" />
            Back to Work Samples
          </Link>
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="tag border border-blue-300/30 bg-blue-300/10 text-blue-100">Vercel serverless</span>
            <span className="tag border border-orange-300/30 bg-orange-300/10 text-orange-100">Cost architecture</span>
            <span className="tag border border-white/20 bg-white/10 text-white">Financial data</span>
            <span className="tag border border-white/20 bg-white/10 text-white">Reliable delivery</span>
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-200">Deep-dive case study</p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Let the highly paid specialist do the specialist work.
          </h1>
          <div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-slate-100 md:text-xl">
            <p>
              Think of an expensive AI model as a highly paid specialist. You would not ask that person to spend the day filing documents, copying numbers, or checking whether an email sent. This backend takes over those jobs so the specialist can focus on judgment and clear communication.
            </p>
            <p>
              The result is lower-cost AI work and fewer fragile handoffs. Data, charts, delivery, and recovery follow repeatable rules, while AI is used where its reasoning is actually worth paying for.
            </p>
          </div>
          <div className="mt-9">
            <Link href="/contact" className="btn-primary">
              Discuss a project like this
              <Icon path="M5 12h14m-6-6 6 6-6 6" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 mwork:text-orange-300">At a glance</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">A shared operations desk for AI-assisted work.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((item) => (
              <article key={item.label} className="card border-slate-200 bg-slate-50 p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-900">
                <p className="font-heading text-4xl font-bold text-orange-700 mwork:text-orange-300">{item.value}</p>
                <h3 className="mt-2 font-semibold text-slate-950 mwork:text-white">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 mwork:text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 mwork:text-orange-300">The problem</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">AI is valuable. Filing and data entry are not.</h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700 mwork:text-slate-300">
              <p>
                Many AI workflows begin as one giant instruction: find the facts, calculate the numbers, draft the copy, make the visual, send the email, and remember what happened last time. That puts costly reasoning on chores that ordinary software does more consistently.
              </p>
              <p>
                It also makes one missed handoff expensive. A bad source request, a missing image, or a repeat click can turn into rework, uncertainty, or duplicate communication for your team.
              </p>
              <p>
                This system gives every repeatable job a home. The AI receives prepared inputs and returns to the part where human-like judgment matters.
              </p>
            </div>
          </div>
          <PlainEnglish title="What this changes for your budget">
            <p>Instead of paying premium AI time for the same mechanical steps on every run, you pay once to make those steps dependable. The expensive model is reserved for selecting, explaining, and shaping the final message.</p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 mwork:text-orange-300">How the work is divided</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Sixty small services, grouped around real operational jobs.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700 mwork:text-slate-300">
              Each group does one kind of work well. That makes it easier to improve one part without making the whole workflow riskier.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {endpointGroups.map((group) => (
              <article key={group.title} className="card border-slate-200 p-6 md:p-7 mwork:border-slate-800">
                <div className="flex items-start gap-4">
                  <span className="font-heading text-4xl font-bold text-orange-700 mwork:text-orange-300">{group.count}</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-950 mwork:text-white">{group.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700 mwork:text-slate-300">{group.summary}</p>
                  </div>
                </div>
                <p className="mt-5 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600 mwork:border-slate-800 mwork:text-slate-300">{group.examples}</p>
              </article>
            ))}
          </div>
          <TechDetail label="The complete endpoint inventory">
            <p>The 60 routes are grouped as 19 market and source-data routes, 10 writing and editorial routes, 5 charts and media routes, 8 delivery and publishing routes, 14 state and recovery routes, and 4 operational scheduler routes.</p>
            <p>The operational set includes Congress, model guard, scout watcher, and SEC publication schedules. The route directory is a shared internal product surface for composable skills, not a single content generator.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 mwork:text-orange-300">How it works</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">A dependable path from request to review package.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700 mwork:text-slate-300">
              The workflow puts repeatable steps in{" "}
              <Term definition="Hosted backend services that run when a request or scheduled job arrives.">
                serverless
              </Term>{" "}
              software and keeps the AI focused on language and judgment.
            </p>
          </div>
          <div className="space-y-6">
            {workflow.map((item) => (
              <article key={item.step} className="card overflow-hidden border-slate-200 bg-white mwork:border-slate-800 mwork:bg-slate-950">
                <div className="grid gap-6 p-6 md:grid-cols-[88px_1fr] md:p-8">
                  <div>
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-slate-700 to-orange-600 font-heading text-lg font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-slate-950 mwork:text-white">{item.title}</h3>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700 mwork:text-orange-300">When</p>
                        <p className="mt-1 text-sm leading-6 text-slate-700 mwork:text-slate-300">
                          {item.trigger}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700 mwork:text-orange-300">What happens</p>
                        <p className="mt-1 text-sm leading-6 text-slate-700 mwork:text-slate-300">
                          {item.action}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700 mwork:text-orange-300">Your result</p>
                        <p className="mt-1 text-sm leading-6 text-slate-700 mwork:text-slate-300">
                          {item.output}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700 mwork:text-orange-300">If something goes wrong</p>
                        <p className="mt-1 text-sm leading-6 text-slate-700 mwork:text-slate-300">
                          {item.failure}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="The practical payoff">
            <p>Your team gets a workflow with understandable stages and useful failure messages. The AI is not being asked to act as researcher, designer, email system, database, and scheduler at the same time.</p>
          </PlainEnglish>
          <TechDetail label="How data, writing, and chart rendering work">
            <p>The financial-data adapter maps named <code>allowlisted</code> operations to supported upstream endpoints rather than accepting arbitrary upstream paths. It normalizes output and uses bounded handling for temporary rate-limit responses; unsupported operations and exhausted retries return explicit errors.</p>
            <p>The server-side writer can use a lower-cost model path, verify a limited set of tickers in parallel, bound concurrency for function and provider limits, and fall back to a configured model while recording a bounded alert state.</p>
            <p>For images, a chart route builds trusted structured HTML from a chart object and captures PNGs through Chromium at <code>2x</code> scale. Warm browser instances are reused safely per function instance, each capture receives an isolated page that closes during cleanup, browser failures get a controlled reconnect retry, and image-host failures return a route error instead of a missing asset URL.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-wide">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 mwork:text-orange-300">How the pieces fit together</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Every layer has a clear job.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {architecture.map((item) => (
              <article key={item.title} className="card border-slate-200 p-6 md:p-7 mwork:border-slate-800">
                <p className="text-sm font-semibold text-orange-700 mwork:text-orange-300">{item.tools}</p>
                <h3 className="mt-3 font-heading text-xl font-bold text-slate-950 mwork:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.value}</p>
              </article>
            ))}
          </div>
          <TechDetail label="The implementation choices behind the layers">
            <p>Data adapters use source-specific routes and bounded retries. The visual layer uses a structured chart builder, Chromium, PNG hosting, optional warming, and image mirroring. Transactional delivery uses Resend with server-owned recipient policy and a retry queue.</p>
            <p>State utilities use Private Blob, KV, ETag compare-and-set updates, and TTL-backed reservations. Recurring watchers, retry jobs, content routines, and model guard checks run through Vercel serverless routes and Vercel Cron rather than an agent loop.</p>
          </TechDetail>
          <TechDetail label="How scheduled routines stay scheduled">
            <p>
              Four operational scheduler routes run the Congress, model guard,
              scout watcher, and SEC publication schedules. Across the system,
              eight scheduled routes handle routine execution, retries, and
              guardrails.
            </p>
            <p>
              <Term definition="A scheduled trigger that starts a backend route at planned times.">
                Vercel Cron
              </Term>{" "}
              starts the scheduled routes. This keeps recurring checks, recovery
              work, and publication routines in infrastructure rather than
              relying on a conversational agent to remain active.
            </p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 mwork:text-orange-300">Safeguards</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Built to stop common failures before they become business problems.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {safeguards.map((item) => (
              <article key={item.title} className="card border-slate-200 bg-white p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-950">
                <div className="flex gap-4">
                  <span className="mt-0.5 text-orange-700 mwork:text-orange-300">
                    <Icon path="m5 12 4 4L19 6" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-950 mwork:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700 mwork:text-slate-300">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="Why safeguards matter">
            <p>A retry should be reassuring, not risky. These rules protect your time, your sender reputation, and your public channels when a provider is slow, a process restarts, or two jobs arrive together.</p>
          </PlainEnglish>
          <TechDetail label="Delivery, state, and social-recovery controls">
            <p>The email route builds and sanitizes messages server-side, enforces configured sender and recipient policy instead of trusting caller input, registers structured posts for review actions, and queues a message for a scheduled retry route when direct delivery remains unavailable after its own retry behavior.</p>
            <p>State utilities distinguish a missing record from an unavailable read. Private Blob updates use ETag compare-and-set handling, while create-only records and TTL-backed keys protect repeated calls. Social recovery derives stable date and payload identities for a slot with a 90-day idempotency window: exact repeats return persisted output, while conflicting content for that slot returns a conflict.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 mwork:text-orange-300">What it replaces</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">From one long AI checklist to reusable operational support.</h2>
          </div>
          <div className="space-y-5">
            {beforeAfter.map((item) => (
              <article key={item.before} className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 md:grid-cols-2 mwork:border-slate-800 mwork:bg-slate-900">
                <div className="p-6 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 mwork:text-slate-400">
                    Before
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-700 mwork:text-slate-300">
                    {item.before}
                  </p>
                </div>
                <div className="border-t border-orange-100 bg-orange-50/70 p-6 md:border-l md:border-t-0 md:p-7 mwork:border-slate-800 mwork:bg-orange-950/20">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-700 mwork:text-orange-300">
                    After
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-800 mwork:text-orange-100">
                    {item.after}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-narrow">
          <div className="grid gap-10 rounded-3xl border border-orange-100 bg-orange-50 p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10 mwork:border-orange-950 mwork:bg-orange-950/20">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 mwork:text-orange-300">What this means for your business</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white">Better AI economics start with better boundaries.</h2>
            </div>
            <ul className="space-y-4">
              {businessValue.map((item) => (
                <li key={item} className="flex gap-3 text-slate-800 mwork:text-slate-100">
                  <span className="mt-0.5 text-orange-700 mwork:text-orange-300">
                    <Icon path="m5 12 4 4L19 6" className="h-5 w-5" />
                  </span>
                  <span className="text-sm leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Glossary items={[...glossary]} />

      <section className="section bg-akic-brown text-akic-cream">
        <div className="container-narrow text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-akic-gold">Architect for repeatability</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight md:text-4xl">Ready to move repetitive AI work into dependable infrastructure?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-akic-cream/85">
            AK Internet Consulting designs AI systems where models handle
            judgment and dedicated services handle data, state, delivery, and
            recovery.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-secondary">
              Discuss your system
              <Icon path="M5 12h14m-6-6 6 6-6 6" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
