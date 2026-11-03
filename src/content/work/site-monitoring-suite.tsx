import Link from "next/link";
import { Glossary, PlainEnglish, TechDetail, Term } from "@/components/work/CaseStudy";



const atAGlance = [
  {
    label: "Portfolio scope",
    value: "5 WordPress properties",
    detail: "One site registry keeps every check pointed at the right property.",
  },
  {
    label: "Two ways to check",
    value: "Dashboard + Telegram",
    detail: "Use the web view for detail and chat for a quick answer away from your desk.",
  },
  {
    label: "Hosting connection",
    value: "Rocket.net API",
    detail: "Hosting facts are converted into consistent, readable site information.",
  },
  {
    label: "Quick health check",
    value: "5-second default",
    detail: "Each request returns a status, response time, or useful error message.",
  },
] as const;

const workflowSteps = [
  {
    number: "01",
    title: "Ask once for the hosting facts you need",
    trigger: "You open a portfolio, site, or supporting view in the dashboard.",
    action: "The system signs in to the host when needed, then gathers the facts for the property you selected.",
    output:
      "You see a consistent view of the site, its domain, its software, backup position, certificate position, storage, and recent activity.",
    failure: "If one piece is unavailable, the rest of the view can still give you useful context.",
  },
  {
    number: "02",
    title: "Turn separate reports into one usable picture",
    trigger: "You choose a reporting period for a site.",
    action:
      "The dashboard asks for traffic, content-delivery, bandwidth, and security-event information separately, then combines the answers it received.",
    output: "You can inspect the signals that arrived instead of losing the whole screen to one weak data source.",
    failure: "A missing measure is safely shown as unavailable or zero while the other measures remain visible.",
  },
  {
    number: "03",
    title: "Get an answer from chat when you are away from the dashboard",
    trigger: "You choose a site in Telegram or type one of the available commands.",
    action:
      "The bot checks the selected property and returns a compact answer for reachability, current audience activity, traffic, or top pages.",
    output: "Routine questions can be answered from a phone without finding the right browser tab first.",
    failure: "A problem with one site is shown in that site result; a full sign-in problem gets a clear operator-facing message.",
  },
  {
    number: "04",
    title: "Refresh the answer without filling chat with copies",
    trigger: "You tap a Telegram refresh button.",
    action: "The bot updates the answer already in the conversation when it can, rather than posting the same answer again.",
    output: "The chat stays compact enough to scan during an operational check.",
    failure: "If Telegram cannot update the old message, the bot sends one new answer and closes the waiting indicator.",
  },
] as const;

const coverage = [
  {
    title: "Hosting and site inventory",
    detail: "Confirm which sites and domains are present, along with WordPress and PHP versions and storage information.",
    tone: "border-rose-200 bg-rose-50 text-rose-950 mwork:border-rose-900 mwork:bg-rose-950/30 mwork:text-rose-100",
  },
  {
    title: "Software changes",
    detail:
      "See plugins and themes, their versions, active state, and available updates without treating every technical detail as a separate login.",
    tone: "border-orange-200 bg-orange-50 text-orange-950 mwork:border-orange-900 mwork:bg-orange-950/30 mwork:text-orange-100",
  },
  {
    title: "Backups and certificates",
    detail: "Review automatic and manual backup records plus complete, in-progress, or failed states alongside certificate information.",
    tone: "border-amber-200 bg-amber-50 text-amber-950 mwork:border-amber-900 mwork:bg-amber-950/30 mwork:text-amber-100",
  },
  {
    title: "Traffic and edge activity",
    detail: "Bring recent requests, content delivery, bandwidth, and security-event context into the same site conversation.",
    tone: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-950 mwork:border-fuchsia-900 mwork:bg-fuchsia-950/30 mwork:text-fuchsia-100",
  },
  {
    title: "On-demand audience and health checks",
    detail: "Ask the bot whether a site responds, what is happening now, how traffic compares, and which pages lead.",
    tone: "border-red-200 bg-red-50 text-red-950 mwork:border-red-900 mwork:bg-red-950/30 mwork:text-red-100",
  },
] as const;

const commandGroups = [
  {
    title: "Find your way around",
    commands: ["/help", "/sites", "/up"],
    detail: "See the command list, the registered sites, or whether the bot itself is available.",
  },
  {
    title: "See what visitors are doing",
    commands: ["/realtime [site]", "/traffic [site]", "/top [site]"],
    detail: "Check active visitors and pages, compare sessions with a seven-day baseline, or see the leading pages for a selected site.",
  },
  {
    title: "Check whether a site answers",
    commands: ["/status [site]"],
    detail: "Check one site or the whole registry and receive its response status, timing, and failure reason when available.",
  },
] as const;

const stack = [
  {
    role: "Operator experience",
    tools: "Next.js dashboard, server routes, SWR, Recharts, Telegram Bot API",
    why: "One surface supports deeper review; the other supports a fast operational question.",
  },
  {
    role: "Hosting connection",
    tools: "Rocket.net API, typed normalizers, cached provider authentication",
    why: "Provider-specific responses become stable application information before they reach a screen.",
  },
  {
    role: "Site and audience signals",
    tools: "HTTP probes, GA4 Data API, static multi-site registry",
    why: "Every interface uses the same short site identifiers and selection logic.",
  },
  {
    role: "Runtime and quality",
    tools: "TypeScript, Vercel functions, Vitest, ESLint",
    why: "Small, testable modules keep command handling, formatting, health checks, and webhook behavior maintainable.",
  },
] as const;

const safeguards = [
  {
    title: "A limited retry, not endless guessing",
    detail:
      "The host connection gets one clean second attempt after an authorization problem. It does not keep retrying until the user is left waiting.",
  },
  {
    title: "One missing number does not hide the others",
    detail: "Reporting sources settle independently, so a weak security or delivery report does not make a site look completely unknown.",
  },
  {
    title: "Only authorized chat requests are accepted",
    detail:
      "The bot verifies a secret header and operator allowlist, and it handles typed commands and button presses through the same path.",
  },
  {
    title: "Chat stays readable during refreshes",
    detail:
      "An unchanged answer counts as success. Old messages that cannot be edited get one fresh reply instead of a trail of duplicates.",
  },
  {
    title: "The alerting boundary is honest",
    detail:
      "Today this is an on-demand, chat-driven checking tool. Proactive alerts are a planned next layer, not a feature claimed by the committed bot.",
  },
] as const;

const beforeAfter = [
  {
    before: "Hosting facts, backup position, software changes, and audience signals are split across provider screens.",
    after: "The available operations information is organized around the one site you are investigating.",
  },
  {
    before: "A quick health question means opening a browser and locating the right property.",
    after: "A Telegram command or site button asks for the same property by its short identifier.",
  },
  {
    before: "Refreshing chat results can create a hard-to-read stream of repeated updates.",
    after: "The existing result is updated when possible, with a single fallback reply when it is not.",
  },
  {
    before: "One unavailable report can make a monitoring page appear completely broken.",
    after: "Successful report streams remain useful even when another upstream source is unavailable.",
  },
] as const;

const businessUses = [
  "Give a managed WordPress portfolio one dependable operations view across several properties.",
  "Answer routine availability and audience questions from a phone while an owner is away from a desk.",
  "Start with useful on-demand checks, then introduce proactive alerts only after the team agrees on thresholds and ownership.",
  "Share operational context without sharing raw hosting credentials with everyone who needs an answer.",
] as const;

const glossary = [
  {
    term: "API",
    definition: "A controlled way for two software systems to request and exchange information.",
  },
  {
    term: "Cached authentication",
    definition: "A temporary sign-in session reused so the host is not asked to log in every time.",
  },
  {
    term: "CDN",
    definition: "A network that delivers site files from locations closer to visitors.",
  },
  {
    term: "GA4",
    definition: "Google Analytics 4, a system for measuring site visitors and their activity.",
  },
  {
    term: "HTTP probe",
    definition: "A quick request that checks whether a web address responds and how long it takes.",
  },
  {
    term: "Promise.allSettled",
    definition: "A JavaScript pattern that collects every result, including failures, without stopping early.",
  },
  {
    term: "WAF",
    definition: "A web application firewall that records or blocks suspicious web requests.",
  },
  {
    term: "Webhook",
    definition: "A secure endpoint that receives an event from another service, such as Telegram.",
  },
] as const;

export default function SiteMonitoringSuitePage() {
  return (
    <div>
      <section className="section relative overflow-hidden bg-linear-to-br from-rose-950 via-neutral-900 to-red-950 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute -right-12 top-8 h-72 w-72 rounded-full bg-rose-500/30 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
        </div>
        <div className="container-narrow relative">
          <Link href="/work" className="mb-8 inline-flex items-center gap-2 text-neutral-300 hover:text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work Samples
          </Link>
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="tag bg-rose-400/15 text-rose-200">Monitoring</span>
            <span className="tag bg-red-400/15 text-red-200">WordPress operations</span>
            <span className="tag bg-orange-400/15 text-orange-200">Telegram</span>
            <span className="tag bg-white/10 text-white">TypeScript</span>
          </div>
          <h1 className="mb-6 text-white">Know what is happening across your sites without living in dashboards</h1>
          <p className="mb-4 max-w-3xl text-xl text-neutral-200">
            This five-property WordPress monitoring suite puts the facts needed for a decision in one place. The host{" "}
            <Term definition="A controlled way for two software systems to request and exchange information.">API</Term> supplies detail in
            the dashboard, while Telegram provides an on-demand answer when you need it quickly.
          </p>
          <p className="mb-8 max-w-3xl text-lg text-neutral-300">
            It is deliberately a chat-driven checking tool today, not an invented alerting platform. That gives the team a reliable first
            layer before deciding what should truly interrupt someone.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#workflow" className="btn-primary bg-rose-600 hover:bg-rose-500 focus:ring-rose-400">
              See how it works{" "}
              <span className="ml-2" aria-hidden="true">
                ↓
              </span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
            >
              Discuss a project like this
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">At a glance</p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">A practical way to check the portfolio</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              The job is simple: make the current operational picture easier to find and safer to trust.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((item) => (
              <article key={item.label} className="card p-6 md:p-7">
                <p className="mb-3 text-sm font-medium text-rose-700 mwork:text-rose-300">{item.label}</p>
                <p className="mb-2 text-xl font-bold text-neutral-900 mwork:text-white">{item.value}</p>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow grid gap-8 md:grid-cols-2 md:gap-12">
          <article className="rounded-2xl border border-rose-200 bg-rose-50 p-7 mwork:border-rose-900 mwork:bg-rose-950/30">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">The problem</p>
            <h2 className="mb-4 text-2xl text-rose-950 mwork:text-rose-100">Site operations get fragmented fast</h2>
            <p className="text-rose-900 mwork:text-rose-100">
              Hosting status, software updates, backups, and visitor activity do not naturally arrive in one place. When someone is away
              from a desk, even a quick question can mean too many tabs and logins.
            </p>
          </article>
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 mwork:border-emerald-900 mwork:bg-emerald-950/30">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 mwork:text-emerald-300">The approach</p>
            <h2 className="mb-4 text-2xl text-emerald-950 mwork:text-emerald-100">Use each surface for the work it does best</h2>
            <p className="text-emerald-900 mwork:text-emerald-100">
              The dashboard holds the deeper picture. Telegram handles the short, on-demand questions that matter in the middle of a busy
              day.
            </p>
          </article>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">What you can check</p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">The facts are organized around the site in front of you</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              You do not have to remember which provider screen owns which part of the answer.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coverage.map((item) => (
              <article key={item.title} className={`rounded-2xl border p-6 md:p-7 ${item.tone}`}>
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-85">{item.detail}</p>
              </article>
            ))}
          </div>
          <TechDetail label="How the hosting connection stays useful">
            <p>
              The host <code>API</code> integration normalizes site, domain, plugin, theme, backup, SSL-state, storage, and reporting data
              into a consistent application model. Sensitive delivery fields are masked before a browser receives them.
            </p>
            <p>
              Authentication is cached at module scope until shortly before it expires. After an authorization failure, the client clears
              the cached session, signs in again, and retries the original provider request once; a second failure is returned rather than
              retried indefinitely.
            </p>
            <p>
              Plugin and theme calls retain active state, versions, and available updates. The plugin view intentionally filters drop-in
              plugins, and the backup view keeps manual and automatic records plus complete, in-progress, and failed states.
            </p>
          </TechDetail>
        </div>
      </section>

      <section id="workflow" className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">How it works</p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">From a question to a clear answer</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              Each step makes it clear what starts the work, what you receive, and what happens when a dependency is not available.
            </p>
          </div>
          <div className="space-y-5">
            {workflowSteps.map((step) => (
              <article key={step.number} className="card grid gap-5 p-6 md:grid-cols-[auto_1fr] md:gap-7 md:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-600 text-lg font-bold text-white shadow-sm">
                  {step.number}
                </div>
                <div>
                  <h3 className="mb-4 text-xl text-neutral-900 mwork:text-white">{step.title}</h3>
                  <dl className="grid gap-3 text-sm sm:grid-cols-[7rem_1fr]">
                    <dt className="font-semibold text-neutral-900 mwork:text-white">Starts when</dt>
                    <dd className="text-neutral-600 mwork:text-neutral-400">{step.trigger}</dd>
                    <dt className="font-semibold text-neutral-900 mwork:text-white">What happens</dt>
                    <dd className="text-neutral-600 mwork:text-neutral-400">{step.action}</dd>
                    <dt className="font-semibold text-neutral-900 mwork:text-white">You get</dt>
                    <dd className="text-neutral-600 mwork:text-neutral-400">{step.output}</dd>
                    <dt className="font-semibold text-rose-700 mwork:text-rose-300">If it cannot</dt>
                    <dd className="text-neutral-600 mwork:text-neutral-400">{step.failure}</dd>
                  </dl>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="What this means in practice">
            <p>
              Instead of deciding whether a site is healthy from scattered clues, your team gets a focused answer with the surrounding
              context needed to act. A weak upstream service does not erase the information that did arrive.
            </p>
          </PlainEnglish>
          <TechDetail label="How partial reporting stays visible">
            <p>
              The reporting route uses <code>Promise.allSettled</code> for total requests, CDN requests, bandwidth, and WAF events. Each
              result can complete or fail independently, so one failing metric stream does not break the view.
            </p>
            <p>
              Failed streams resolve to safe zero-value fallbacks while successful streams remain chartable. When available, the WAF result
              also respects a larger total reported by the provider.
            </p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">
              Telegram command surface
            </p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">Seven commands for the questions people actually ask</h2>
            <p className="mb-6 text-neutral-600 mwork:text-neutral-400">
              The bot keeps typed commands and button choices on one path, so the mobile experience does not become a second, fragile
              implementation.
            </p>
            <div className="space-y-4">
              {commandGroups.map((group) => (
                <article key={group.title} className="rounded-2xl border border-neutral-200 p-6 md:p-7 mwork:border-neutral-800">
                  <h3 className="mb-3 text-lg text-neutral-900 mwork:text-white">{group.title}</h3>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {group.commands.map((command) => (
                      <code
                        key={command}
                        className="rounded bg-rose-50 px-2.5 py-1 text-sm font-semibold text-rose-800 mwork:bg-rose-950/50 mwork:text-rose-200"
                      >
                        {command}
                      </code>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 mwork:text-neutral-400">{group.detail}</p>
                </article>
              ))}
            </div>
            <TechDetail label="What the bot does on each request">
              <p>
                The implemented commands are <code>/help</code>, <code>/sites</code>, <code>/up</code>, <code>/realtime</code>,{" "}
                <code>/status</code>, <code>/traffic</code>, and <code>/top</code>. Typed commands and callback data are normalized into one
                command context before dispatch.
              </p>
              <p>
                HTTP health probes follow redirects, use a five-second default timeout, and return structured latency, status, and error
                data instead of throwing. Analytics commands add active users, top pages, traffic against a rolling seven-day baseline, and
                top content across the same five-site registry.
              </p>
            </TechDetail>
          </div>
          <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-7 mwork:border-amber-900 mwork:bg-amber-950/30">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-amber-800 mwork:text-amber-200">Current boundary</p>
            <h3 className="mb-4 text-2xl text-amber-950 mwork:text-amber-100">On-demand checks today. Proactive alerts later.</h3>
            <p className="mb-4 text-amber-950/80 mwork:text-amber-100/80">
              The committed bot has no cron handlers, alert thresholds, persistent alert state, or durable alert deduplication. It answers
              when an operator asks.
            </p>
            <p className="text-sm text-amber-950/80 mwork:text-amber-100/80">
              A proactive layer is planned only as a next phase, after the team agrees on the signals, escalation rules, suppression
              windows, and ownership that deserve an interruption.
            </p>
          </aside>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">
              How the pieces fit together
            </p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">Technology chosen for clear operational jobs</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              The technical choices exist to make the everyday experience more reliable, not to collect logos.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {stack.map((group) => (
              <article key={group.role} className="card p-6 md:p-7">
                <p className="mb-2 text-sm font-semibold text-rose-700 mwork:text-rose-300">{group.role}</p>
                <h3 className="mb-3 text-lg text-neutral-900 mwork:text-white">{group.tools}</h3>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">{group.why}</p>
              </article>
            ))}
          </div>
          <PlainEnglish title="Why two interfaces are better than one">
            <p>
              Your team gets a detailed place to investigate and a quick place to ask. Neither one has to pretend to solve every monitoring
              moment.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">Safeguards</p>
            <h2 className="mb-4 text-neutral-900 mwork:text-white">Useful answers need deliberate failure behavior</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              The implementation protects the current phase and states plainly what is intentionally not built yet.
            </p>
          </div>
          <div className="space-y-4">
            {safeguards.map((item, index) => (
              <article key={item.title} className="card flex gap-5 p-6 md:p-7">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-800 mwork:bg-rose-950/50 mwork:text-rose-200">
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-2 text-lg text-neutral-900 mwork:text-white">{item.title}</h3>
                  <p className="text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="The important operational promise">
            <p>
              The system does not pretend that every dependency will always answer. It makes the failure understandable, protects the good
              information, and avoids claiming an alerting capability that is not present.
            </p>
          </PlainEnglish>
          <TechDetail label="How chat refresh and access controls work">
            <p>
              The Telegram webhook checks its secret header and operator allowlist, removes a bot suffix from typed commands, and treats
              button callbacks like typed input. Responses use MarkdownV2 formatting with site pickers and refresh controls.
            </p>
            <p>
              On refresh, the bot edits the existing answer first. An unchanged message is treated as success; an old or deleted message
              receives one new reply. The callback spinner is answered even when a non-critical edit path has a problem.
            </p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-wide grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">What it replaced</p>
            <h2 className="mb-5 text-neutral-900 mwork:text-white">Less searching, more informed checks</h2>
            <div className="space-y-4">
              {beforeAfter.map((item) => (
                <article
                  key={item.before}
                  className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 mwork:border-neutral-800 mwork:bg-neutral-950 sm:grid-cols-2"
                >
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">Before</p>
                    <p className="text-sm text-neutral-700 mwork:text-neutral-300">{item.before}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-rose-700 mwork:text-rose-300">
                      With this approach
                    </p>
                    <p className="text-sm text-neutral-700 mwork:text-neutral-300">{item.after}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">
              What this means for your business
            </p>
            <h2 className="mb-5 text-neutral-900 mwork:text-white">A monitoring pattern people will actually use</h2>
            <div className="rounded-2xl bg-neutral-900 p-7 text-neutral-100">
              <ul className="space-y-4">
                {businessUses.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 text-rose-300" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Glossary items={[...glossary]} />

      <section className="section bg-akic-brown text-white">
        <div className="container-narrow text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-akic-cream">Need clearer site operations?</p>
          <h2 className="mb-5 text-white">Build the right check first, then the right alerting layer.</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-akic-cream">
            Start with the questions your team asks today. We can map the information, interfaces, safeguards, and future escalation rules
            that make those answers dependable.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-akic-brown transition-colors hover:bg-akic-cream"
          >
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
