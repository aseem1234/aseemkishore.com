import Link from "next/link";
import { Glossary, PlainEnglish, TechDetail, Term } from "@/components/work/CaseStudy";



type Fact = { value: string; label: string; detail: string };
type WorkflowStep = {
  number: string;
  title: string;
  summary: string;
  output: string;
  failure: string;
};
type StackItem = { role: string; tool: string; detail: string };
type Safeguard = { title: string; detail: string };
type Comparison = { before: string; after: string };

const heroTags = ["Google Workspace", "Draft-only", "Human review", "AI-assisted"] as const;

const facts: Fact[] = [
  {
    value: "6",
    label: "separate business profiles",
    detail: "Each inbox has its own facts, writing voice, and operating rules.",
  },
  {
    value: "60s",
    label: "default inbox check",
    detail: "A dedicated worker checks each configured inbox on a regular interval.",
  },
  {
    value: "15 min",
    label: "repeat-sender pause",
    detail: "The system avoids preparing repeated replies to the same sender too quickly.",
  },
  {
    value: "Always",
    label: "human sends",
    detail: "Production creates Gmail drafts only. A person must press Send.",
  },
];

const workflow: WorkflowStep[] = [
  {
    number: "01",
    title: "Start with only the emails worth considering",
    summary:
      "A dedicated inbox worker looks for new customer messages that have not already been handled. It leaves out routine system mail, messages your team has labeled, and messages that clearly do not need a reply.",
    output: "A small, relevant list for review instead of every message in the mailbox.",
    failure:
      "If Gmail cannot be read, the worker records the problem and slows down before trying again rather than repeatedly hitting the inbox.",
  },
  {
    number: "02",
    title: "Give each draft the right business context",
    summary:
      "For an eligible message, the system reads the conversation, notices attachments, checks whether the sender was contacted recently, and brings in the facts and tone for that specific business profile.",
    output: "A prepared request that reflects the customer conversation and the correct company guidance.",
    failure:
      "A missing conversation identifier or unreadable message is marked for attention instead of being guessed at.",
  },
  {
    number: "03",
    title: "Ask for a structured recommendation, not free-form behavior",
    summary:
      "The drafting service proposes what the message means, why it reached that conclusion, how confident it is, and a candidate reply. It is told to use the supplied business facts rather than make up an answer.",
    output: "A reviewable recommendation with a draft, reasons, and a confidence signal.",
    failure:
      "Incomplete or invalid answers are rejected. A bad response does not become a customer-facing message.",
  },
  {
    number: "04",
    title: "Turn the recommendation into a Gmail draft",
    summary:
      "Safety rules check confidence, paused or test mode, attachments, sender cooldowns, and any higher-risk mailbox action. In production, the outcome is always a labeled Gmail draft for a person to read and send.",
    output: "A visible draft in the familiar Gmail workflow, ready for human judgment.",
    failure:
      "When the decision is uncertain or the service is paused, it takes the safer path: a reviewable draft rather than an automatic action.",
  },
  {
    number: "05",
    title: "Keep a record and watch the service",
    summary:
      "The system records what happened, adds visible mailbox labels, and checks that the inbox workers are healthy. If a worker fails, it is restarted; if health changes, the operator receives a useful alert.",
    output: "An operating trail that explains what happened to a message and whether the service is healthy.",
    failure:
      "A 15-minute health check sends one incident alert for a real issue and one recovery alert when it is resolved, avoiding repeated noise.",
  },
];

const stack: StackItem[] = [
  {
    role: "Inbox checking",
    tool: "One Python worker per inbox",
    detail: "Separate workers keep each inbox running independently and make the source of a problem clear.",
  },
  {
    role: "Mailbox workspace",
    tool: "Google Workspace Gmail",
    detail: "The service reads conversations, creates Gmail drafts, and uses labels as visible status markers.",
  },
  {
    role: "Drafting assistant",
    tool: "Portable Claude skill",
    detail: "A shared drafting format works across inboxes while each profile supplies its own business knowledge and tone.",
  },
  {
    role: "Business guidance",
    tool: "Separate profile files",
    detail: "Knowledge, voice, and rules stay isolated for every configured site rather than blending into one generic prompt.",
  },
  {
    role: "History and evidence",
    tool: "Gmail labels, audit records, draft snapshots, and SQLite",
    detail: "Several records make the workflow traceable and help prevent the same message from being handled twice.",
  },
  {
    role: "Day-to-day operations",
    tool: "systemd services and timers",
    detail: "The workers restart after a failure and scheduled checks keep watch when no one is looking at the server.",
  },
];

const safeguards: Safeguard[] = [
  {
    title: "A person sends every customer message",
    detail:
      "The production setting is ALWAYS_DRAFT=1. The system can prepare a reply, but it cannot send it. Your team reads, edits, and presses Send.",
  },
  {
    title: "The same email is not handled twice",
    detail:
      "A responder label marks completed work. Future inbox checks exclude that message, so the visible label also acts as the no-repeat marker.",
  },
  {
    title: "Uncertainty goes to review",
    detail:
      "Confidence is a decision gate. Low confidence, a paused service, or test mode shifts the result to a reviewable draft instead of a stronger action.",
  },
  {
    title: "Attachments and rapid repeat contact get extra care",
    detail:
      "Attachment signals and a 15-minute sender cooldown are included in the routing decision, keeping unusual or repetitive exchanges reviewable.",
  },
  {
    title: "Mailbox changes require separate permission",
    detail:
      "Archive, trash, and spam paths are separately controlled. A risky mailbox action is not quietly enabled because the drafting service ran.",
  },
  {
    title: "Problems are visible, not hidden",
    detail:
      "Audit records, worker restarts, and a 15-minute health timer create a clear incident-and-recovery path instead of leaving a failure unnoticed.",
  },
];

const comparison: Comparison[] = [
  {
    before: "A team member reads every inbound thread and starts each reply from a blank compose window.",
    after: "Routine noise is filtered out and a context-aware first draft waits in Gmail for a person to review.",
  },
  {
    before: "Tone and business details depend on memory, scattered documents, or old sent mail.",
    after: "Each profile supplies its own knowledge, voice, and rules every time an eligible message is prepared.",
  },
  {
    before: "A basic rule either acts blindly or offers no useful help at all.",
    after: "Clear mailbox rules, a structured recommendation, confidence gates, and human review work together.",
  },
  {
    before: "A failed inbox automation may be noticed only after a customer reports a missed reply.",
    after: "Labels, audit records, automatic restarts, and incident-and-recovery alerts create an operating trail.",
  },
];

const businessOutcomes = [
  "Reduce first-draft work while keeping the final customer commitment with your team.",
  "Give each brand, business unit, or shared inbox its own facts and writing voice on a common framework.",
  "Start sensitive email work in a low-risk draft-only mode and change policy only after review data supports it.",
  "Give operators a clear answer to what happened to a message and why.",
  "Apply the same review-first pattern to intake, scheduling, quoting, support follow-up, and internal requests.",
] as const;

const glossaryItems = [
  {
    term: "ALWAYS_DRAFT=1",
    definition: "A production setting that forces every proposed reply to be saved as a Gmail draft, never sent automatically.",
  },
  {
    term: "Audit record",
    definition: "A time-stamped record of what the system decided and the action it took.",
  },
  {
    term: "Confidence gate",
    definition: "A minimum certainty level required before the workflow can take a stronger action.",
  },
  {
    term: "Cooldown",
    definition: "A short wait period that prevents repeated handling of the same sender too quickly.",
  },
  {
    term: "Gmail label",
    definition: "A visible Gmail tag used to show message status and prevent repeat handling.",
  },
  {
    term: "JSON",
    definition: "A structured data format that lets software check whether an AI response has every required field.",
  },
  {
    term: "SQLite",
    definition: "A small local database file used to keep operational history and control information.",
  },
  {
    term: "systemd",
    definition: "The Linux service manager that keeps background workers running and schedules health checks.",
  },
  {
    term: "Worker daemon",
    definition: "A background program that stays running and regularly checks one inbox for eligible mail.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
    </svg>
  );
}

function DraftOnlyDiagram() {
  const stages = [
    { label: "Customer email", tone: "border-amber-300/40 bg-amber-400/10 text-amber-100" },
    { label: "Context and safety checks", tone: "border-orange-300/40 bg-orange-400/10 text-orange-100" },
    { label: "Gmail draft", tone: "border-yellow-200/30 bg-yellow-200/10 text-yellow-50" },
    { label: "Human presses Send", tone: "border-white/30 bg-white/10 text-white" },
  ] as const;

  return (
    <div className="grid gap-3">
      {stages.map((stage, index) => (
        <div key={stage.label}>
          <div className={`rounded-xl border px-4 py-3 text-sm font-semibold ${stage.tone}`}>
            <span className="mr-2 text-xs font-bold text-amber-200">0{index + 1}</span>
            {stage.label}
          </div>
          {index < stages.length - 1 && (
            <div className="mx-auto h-5 w-px bg-linear-to-b from-amber-300/70 to-orange-400/20" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function AutonomousEmailResponderPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-amber-950 via-orange-950 to-neutral-950 py-20 text-white md:py-28">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-amber-400/25 blur-3xl" />
        <div className="absolute -bottom-28 -right-16 h-[30rem] w-[30rem] rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-amber-300/70 to-transparent" />
        <div className="container-narrow relative z-10">
          <Link href="/work" className="mb-8 inline-flex items-center gap-1 text-sm text-amber-100/70 hover:text-white">
            <BackIcon />
            Back to Work Samples
          </Link>
          <div className="mb-6 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <span key={tag} className="rounded-full bg-amber-300/15 px-3 py-1 text-xs font-semibold text-amber-100 ring-1 ring-inset ring-amber-100/25">
                {tag}
              </span>
            ))}
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">Flagship automation case study</p>
          <h1 className="mb-6 max-w-4xl text-white">AI writes the draft. Your team always sends the email.</h1>
          <p className="max-w-3xl text-xl leading-relaxed text-orange-50 md:text-2xl">
            This Gmail responder makes ready-to-review customer-reply drafts with the right business context. It never sends a customer email on its own: a human reviews, edits if needed, and presses Send every time.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-amber-100/85 md:text-lg">
            That boundary is enforced in production, not left to a prompt. The service checks whether a message is eligible, validates the draft recommendation, and sends uncertain cases straight to review.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary gap-2">
              Discuss a project like this
              <ArrowIcon />
            </Link>
            <a href="#safeguards" className="btn-secondary gap-2 border-white/25 bg-white/10 text-white hover:border-amber-200 hover:text-amber-100">
              See the guardrails
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-amber-50 mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">At a glance</p>
            <h2>Fast drafts, clear boundaries, and six separate business voices</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <article key={fact.label} className="card p-6 md:p-7">
                <p className="text-3xl font-bold text-orange-700 mwork:text-amber-300">{fact.value}</p>
                <h3 className="mt-2 text-lg font-semibold">{fact.label}</h3>
                <p className="mt-2 text-sm text-neutral-600 mwork:text-neutral-400">{fact.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">The problem</p>
            <h2>Customers deserve a prompt reply. Your team needs control over the promise.</h2>
            <p className="mt-5 text-neutral-700 mwork:text-neutral-300">
              A busy inbox creates a difficult choice. You can answer quickly but risk a rushed, inconsistent response, or you can read every thread carefully and lose time before even writing a first draft.
            </p>
            <p className="mt-4 text-neutral-700 mwork:text-neutral-300">
              The dangerous version of email automation takes the send button away. This design does the useful work before that moment, then deliberately stops at a Gmail draft where the relationship owner makes the final call.
            </p>
            <PlainEnglish title="The promise to your team">
              <p>It can save time on the blank-page problem without ever emailing a customer by itself. Every outbound message still has a named human decision behind it.</p>
            </PlainEnglish>
          </div>
          <aside className="rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 to-orange-100 p-6 md:p-7 mwork:border-amber-900/60 mwork:from-amber-950/30 mwork:to-orange-950/30">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-700 mwork:text-amber-300">The safety posture</p>
            <p className="mt-4 text-2xl font-semibold leading-snug text-orange-950 mwork:text-white">The system may prepare. A person remains responsible for sending.</p>
            <p className="mt-4 text-sm text-orange-900/80 mwork:text-amber-100/70">The production configuration requires draft-only delivery. It is a hard operating rule, not a suggestion.</p>
          </aside>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">How it works</p>
            <h2>From a new email to a draft your team can trust</h2>
            <p className="mt-4 text-neutral-700 mwork:text-neutral-300">
              The system does not hand every raw email to AI. It first removes obvious non-work, adds the right context, asks for a structured recommendation, and only then creates a draft for human review.
            </p>
          </div>
          <div className="mt-12 space-y-6">
            {workflow.map((step) => (
              <article key={step.number} className="card overflow-hidden">
                <div className="grid gap-6 p-6 md:grid-cols-[5.5rem_1fr] md:p-8">
                  <div>
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-700 text-sm font-bold tracking-wider text-white mwork:bg-amber-300 mwork:text-orange-950">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-neutral-700 mwork:text-neutral-300">{step.summary}</p>
                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">Produces</dt>
                        <dd className="mt-1 text-sm text-neutral-700 mwork:text-neutral-300">{step.output}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">If something goes wrong</dt>
                        <dd className="mt-1 text-sm text-neutral-700 mwork:text-neutral-300">{step.failure}</dd>
                      </div>
                    </dl>
                    {step.number === "01" && (
                      <TechDetail label="Exactly how the inbox avoids duplicate or unsuitable work">
                        <p>Each <code>Python</code> watcher runs for one inbox and checks Gmail at its configured interval. The query excludes mail with earlier responder labels before the message is read.</p>
                        <p>Deterministic skip checks also exclude user-labeled mail, configured sender lists and Gmail categories, no-reply traffic, and automated-response headers. Errors are logged; repeated polling failures back off with a capped delay.</p>
                      </TechDetail>
                    )}
                    {step.number === "03" && (
                      <TechDetail label="How the AI response is checked before it can be used">
                        <p>The portable responder skill receives a structured payload and is instructed to use supplied site facts, treat unsent drafts as not-yet-answered, return JSON only, and provide intent, reasons, confidence, citations, and a candidate reply.</p>
                        <p>The watcher validates the envelope and rejects malformed, incomplete, non-finite, or out-of-range values. Provider calls have timeouts, retry attempts, audit records, and fail closed when output is invalid.</p>
                      </TechDetail>
                    )}
                    {step.number === "05" && (
                      <TechDetail label="How the service stays observable after deployment">
                        <p>Decisions write audit events, mailbox labels, and tracked-draft snapshots. <code>systemd</code> restarts a worker after failure and also manages daily digests and the health timer.</p>
                        <p>The timer runs every 15 minutes and checks processes, authorization, disk, load, and queue state. Persistent incident state deduplicates alerts and emits a distinct recovery notification.</p>
                      </TechDetail>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="What the workflow changes">
            <p>Instead of giving AI control of customer correspondence, it gives your team a prepared starting point. The repetitive reading and first-draft work shrink; the relationship judgment stays with people.</p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-2xl bg-linear-to-br from-amber-950 via-orange-950 to-neutral-950 p-6 text-white md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-200">Delivery is deliberately last</p>
            <h2 className="mt-3 text-3xl text-white">The final state is a draft, not an automated send.</h2>
            <p className="mt-4 text-amber-100/80">The system makes inbox work easier to act on without hiding the moment when a person commits to the customer.</p>
            <div className="mt-7"><DraftOnlyDiagram /></div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">How the pieces fit together</p>
            <h2>Separate responsibilities make the inbox easier to operate</h2>
            <p className="mt-4 text-neutral-700 mwork:text-neutral-300">Each layer has one job: watch the inbox, bring the right guidance, prepare a draft, remember what happened, or keep the service healthy.</p>
            <div className="mt-7 divide-y divide-neutral-200 border-y border-neutral-200 mwork:divide-neutral-800 mwork:border-neutral-800">
              {stack.map((item) => (
                <article key={item.role} className="grid gap-2 py-5 md:grid-cols-[10rem_1fr]">
                  <div>
                    <p className="text-sm font-semibold text-orange-700 mwork:text-amber-300">{item.role}</p>
                    <p className="mt-1 text-sm font-medium text-neutral-900 mwork:text-white">{item.tool}</p>
                  </div>
                  <p className="text-sm text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
                </article>
              ))}
            </div>
            <TechDetail label="The separated configuration and operating components">
              <p>Six configured site profiles keep knowledge, voice, and rules files isolated. The shared skill contract accepts JSON, while optional relationship memory is added only for the relevant site.</p>
              <p>State is held across Gmail labels, JSONL audit logs, draft snapshots, and SQLite. Bounded batches and controlled worker shutdown keep the per-inbox long-running processes manageable.</p>
            </TechDetail>
          </div>
        </div>
      </section>

      <section id="safeguards" className="section bg-amber-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">Automations and safeguards</p>
            <h2>What keeps the wrong email from going out?</h2>
            <p className="mt-4 text-neutral-700 mwork:text-neutral-300">
              The answer is not one prompt instruction. Delivery rules, inbox filters, validation, confidence checks, and operational monitoring all work together so a risky or unclear case stays visible for human review.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {safeguards.map((item) => (
              <article key={item.title} className="card p-6 md:p-7">
                <div className="flex gap-3">
                  <span className="text-orange-700 mwork:text-amber-300"><CheckIcon /></span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="The simple safety rule">
            <p>When the system knows less than it should, it does less. It leaves a draft for someone to inspect instead of making a hidden customer-facing decision.</p>
          </PlainEnglish>
          <TechDetail label="The exact production routing rules">
            <p>The production service sets <code>ALWAYS_DRAFT=1</code>, so even a high-confidence response is written as a Gmail draft. The router applies configured confidence thresholds, attachment and cooldown signals, plus pause and dry-run flags before delivery.</p>
            <p>Ignore has its own higher threshold and is downgraded when uncertain, paused, or in dry-run mode. Archive, trash, and spam have separate feature gates; spam becomes trash unless reporting has been explicitly enabled.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">What it replaces</p>
            <h2>From repetitive inbox labor to an auditable review queue</h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 mwork:border-neutral-800">
            <div className="grid grid-cols-2 bg-neutral-100 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500 mwork:bg-neutral-900 mwork:text-neutral-400">
              <p className="px-5 py-4">Manual inbox process</p>
              <p className="border-l border-neutral-200 px-5 py-4 mwork:border-neutral-800">Review-first responder</p>
            </div>
            {comparison.map((row) => (
              <div key={row.before} className="grid grid-cols-2 border-t border-neutral-200 bg-white text-sm mwork:border-neutral-800 mwork:bg-neutral-950">
                <p className="px-5 py-5 text-neutral-600 mwork:text-neutral-400">{row.before}</p>
                <p className="border-l border-neutral-200 px-5 py-5 font-medium text-neutral-900 mwork:border-neutral-800 mwork:text-white">{row.after}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600 mwork:text-neutral-400">
            The point is not to remove people from customer relationships. It is to make their
            review time count by placing the relevant thread, context, draft, and visible status
            in one familiar workspace.
          </p>
          <p className="mt-4 text-sm text-neutral-600 mwork:text-neutral-400">
            That makes the inbox easier to staff across busy periods, while preserving the
            accountability your customers expect. A manager can see the work waiting for review
            instead of wondering whether an automatic system already spoke for the company.
          </p>
          <p className="mt-4 text-sm text-neutral-600 mwork:text-neutral-400">
            The review queue also creates a calmer handoff between staff members. People spend
            their time evaluating a prepared response, not rebuilding the customer story from
            scattered messages and informal notes.
          </p>
          <p className="mt-4 text-sm text-neutral-600 mwork:text-neutral-400">
            The result is practical help without a hidden hand on the send button.
          </p>
        </div>
      </section>

      <section className="section bg-orange-50 mwork:bg-orange-950/20">
        <div className="container-narrow">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">What this means for your business</p>
          <h2>Bring AI into customer operations without handing over control.</h2>
          <div className="mt-8 grid gap-4">
            {businessOutcomes.map((outcome) => (
              <div key={outcome} className="flex gap-3 rounded-xl border border-orange-100 bg-white p-6 mwork:border-orange-900/60 mwork:bg-neutral-900">
                <span className="text-orange-700 mwork:text-amber-300"><CheckIcon /></span>
                <p className="text-neutral-700 mwork:text-neutral-300">{outcome}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-neutral-600 mwork:text-neutral-400">
            The visible labels create <Term definition="A record that shows the status and decision history of a message.">auditability</Term>, while the 15-minute health checks provide <Term definition="A service that detects a problem and tells the operator when it recovers.">operational monitoring</Term> without asking staff to babysit the inbox.
          </p>
        </div>
      </section>

      <Glossary items={[...glossaryItems]} />

      <section className="section bg-akic-brown text-white">
        <div className="container-narrow text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-akic-gold">Build confidence before autonomy</p>
          <h2 className="mt-3 text-white">Want AI to make your inbox faster without making it riskier?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-neutral-200">AK Internet Consulting can design a review-first email workflow around your policies, customer context, approval process, and operating constraints.</p>
          <Link href="/contact" className="btn-primary mt-8 gap-2">
            Discuss a project like this
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </div>
  );
}
