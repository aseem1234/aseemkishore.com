import Link from "next/link";
import { Glossary, PlainEnglish, TechDetail, Term } from "@/components/work/CaseStudy";



type Fact = { value: string; label: string; detail: string };
type WorkflowStep = {
  step: string;
  title: string;
  summary: string;
  output: string;
  failure: string;
};
type ArchitectureItem = {
  title: string;
  tools: string;
  description: string;
  reason: string;
};
type Safeguard = { title: string; text: string };
type Comparison = { before: string; after: string };

const heroTags = ["Overnight operations", "Cost controls", "Visible failures", "AI-assisted"] as const;

const atAGlance: Fact[] = [
  {
    value: "3",
    label: "start decisions",
    detail: "GO, SKIP, or FATAL before expensive AI work can begin.",
  },
  {
    value: "7",
    label: "read-only checks",
    detail: "Four publishing properties and three refresh properties are checked first.",
  },
  {
    value: "3.5h",
    label: "maximum run time",
    detail: "The entire overnight run has one firm outer time limit.",
  },
  {
    value: "3",
    label: "maximum attempts",
    detail: "Recovery is bounded instead of turning into open-ended retrying.",
  },
];

const workflow: WorkflowStep[] = [
  {
    step: "01",
    title: "Give one run clear ownership",
    summary:
      "A scheduled overnight controller starts the job and makes sure another copy cannot work on the same queue at the same time. That prevents competing changes and gives the team one clear record for the night.",
    output: "One accountable run with a dated log and a single owner for the work window.",
    failure:
      "Missing setup or an unavailable lock stops the run. The system will not work around the controls that keep jobs from overlapping.",
  },
  {
    step: "02",
    title: "Check whether there is healthy, worthwhile work before spending money",
    summary:
      "Before any expensive AI call, the system checks access, queue status, available daily capacity, and the health of seven connected work areas. It then returns GO, SKIP, or FATAL.",
    output: "A deliberate start, no-work, or stop decision that a business operator can understand.",
    failure:
      "A broken safety dependency, failed sign-in, or no viable workstream blocks the expensive path. One unhealthy property can be set aside while the healthy work continues.",
  },
  {
    step: "03",
    title: "Work from the review queue, not from a blank canvas",
    summary:
      "Only a GO decision reaches the work plan. The system starts from work already in the review queue, respects daily limits, carries forward approved unfinished items, and uses inexpensive checks before image work or other higher-cost tasks.",
    output: "A short, prioritized plan for work that is eligible and worth doing tonight.",
    failure:
      "If a low-cost prerequisite check fails, the item is held before expensive work begins. A temporary read problem does not incorrectly erase the possibility that needed work exists.",
  },
  {
    step: "04",
    title: "Make progress inside fixed time and spending limits",
    summary:
      "The controller limits the entire run to 3.5 hours and no more than three attempts. It records state-changing work as it happens, watches for repeated early errors, and only changes providers for recognized infrastructure problems.",
    output: "Bounded progress with a reliable point to resume from if the night ends early.",
    failure:
      "Editorial, quality, or publishing problems do not prompt a costly provider switch. If time or attempts run out, unfinished work remains visible instead of being forced through.",
  },
  {
    step: "05",
    title: "Prove the outcome and notify a person",
    summary:
      "A quality check reviews work before and after publishing. The run must leave the required report evidence and send its summary; outside monitoring also receives a heartbeat that says the system is alive.",
    output: "A quality-gated result with a durable record and an operator-facing summary or failure message.",
    failure:
      "A missing report is treated as failure, not as success by silence. Terminal failures and missing evidence enter an explicit notification-and-heartbeat path.",
  },
];

const architecture: ArchitectureItem[] = [
  {
    title: "Schedule and single ownership",
    tools: "Cron · Bash · flock",
    description: "A daily overnight controller owns the work window and prevents a second run from changing the same queue.",
    reason: "One owner avoids conflicting work and makes the status of the night easy to explain.",
  },
  {
    title: "Readiness before cost",
    tools: "Shell precheck · health checks · read-only data queries",
    description: "A first pass checks access, connection health, queues, and daily capacity without changing content.",
    reason: "The system can decide whether to spend money from facts, before an AI model is asked to do anything.",
  },
  {
    title: "Controlled AI work",
    tools: "Account-authenticated Claude runner · classified fallback",
    description: "The AI runner is reachable only after approval, with token-metered fallback keys removed from its environment.",
    reason: "Premium model capacity cannot become the automatic first step for every scheduled night.",
  },
  {
    title: "Quality and remembered state",
    tools: "Python quality checks · JSON ledger · structured logs",
    description: "A dated record captures each state-changing action, while quality checks cover links, anchors, images, formatting, and the published result.",
    reason: "The next attempt knows what has already happened instead of guessing or repeating work.",
  },
  {
    title: "Notifications and outside observation",
    tools: "Transactional email · heartbeat endpoint · monitor snapshots",
    description: "The controller sends summaries and terminal-failure messages while separate monitoring receives status snapshots.",
    reason: "A quiet morning cannot be mistaken for a successful run when a job actually stopped.",
  },
];

const safeguards: Safeguard[] = [
  {
    title: "No expensive start without a real check",
    text: "The executable precheck runs before the AI command. If the check is missing or cannot run, that is a FATAL condition, so the expensive path cannot accidentally bypass the gate.",
  },
  {
    title: "Three visible outcomes",
    text: "GO starts eligible work. SKIP reports that no work is needed and sends a healthy heartbeat. FATAL blocks the run and starts the alert path.",
  },
  {
    title: "Cheapest proof first",
    text: "The plan begins with queue state and low-cost checks. It does not inspect images or reopen broad content work until the practical prerequisites pass.",
  },
  {
    title: "Daily capacity and carryover are respected",
    text: "Per-property publishing and refresh limits are read before action. Approved unfinished work is carried forward as known state instead of being rediscovered by another AI pass.",
  },
  {
    title: "Retries are limited and failures can isolate themselves",
    text: "Actions have retry limits, a property can trip a hard-failure breaker, and broad repeated failures stop the portfolio rather than multiplying bad actions.",
  },
  {
    title: "A terminal problem has an explicit alert path",
    text: "Terminal failures call the failure-email helper. If notification itself cannot be delivered, the controller logs that failure clearly rather than pretending the operator was informed.",
  },
];

const beforeAfter: Comparison[] = [
  {
    before: "An overnight job can start simply because a timer fired, even when nothing is eligible, capacity is gone, or a dependency is unhealthy.",
    after: "A tier-0 precheck records GO, SKIP, or FATAL before the AI-capable runner is allowed to begin.",
  },
  {
    before: "An AI service can spend time revisiting completed work, looking at assets too early, or retrying without an overall limit.",
    after: "The plan proves work is necessary with low-cost checks first, while the controller enforces attempt and time budgets.",
  },
  {
    before: "A failed overnight run may be discovered only after someone investigates an unexplained lack of output.",
    after: "Precheck failure, exhausted attempts, and missing report evidence each have defined notification and heartbeat behavior.",
  },
  {
    before: "A partial run can leave staff unsure what was approved, published, or still waiting for attention.",
    after: "A dated daily ledger records state changes as they happen, creating a precise resume point and a reliable record.",
  },
];

const businessValue = [
  "Avoid paying for AI work on nights when there is nothing worthwhile to do.",
  "Treat a no-work night as a useful, visible result rather than an unexplained absence of output.",
  "Keep viable work moving when one connected property has a problem, instead of throwing away the whole run.",
  "Know the system has a hard stop on time and retries rather than a hidden open-ended bill.",
  "Receive an explicit failure signal when a terminal path occurs, so silence cannot masquerade as success.",
] as const;

const glossaryItems = [
  {
    term: "Daily ledger",
    definition: "A dated record of the work the system changed, so a later attempt can resume safely.",
  },
  {
    term: "FATAL",
    definition: "A precheck result that stops the run because a required safety or operating condition failed.",
  },
  {
    term: "flock lock",
    definition: "A file-based rule that allows only one copy of the controller to work on a queue at a time.",
  },
  {
    term: "GO",
    definition: "A precheck result that says healthy, eligible work exists and the bounded run may begin.",
  },
  {
    term: "Heartbeat",
    definition: "A small status signal sent to outside monitoring to show that the controller completed its expected path.",
  },
  {
    term: "JSON",
    definition: "A structured text format used here to keep a dated record of actions and run state.",
  },
  {
    term: "Read-only probe",
    definition: "A check that looks at service health or queue data without changing content or starting costly work.",
  },
  {
    term: "SKIP",
    definition: "A healthy precheck result that says there is no eligible work to do tonight.",
  },
  {
    term: "Tier-0 precheck",
    definition: "The first, low-cost safety check that decides whether an AI run should start at all.",
  },
  {
    term: "Cron",
    definition: "A scheduler on a server that starts a task at a planned time.",
  },
  {
    term: "Quality gate",
    definition: "A required check that work must pass before it can move to the next stage.",
  },
  {
    term: "Review queue",
    definition: "The prioritized list of work that has been prepared for the system to consider.",
  },
  {
    term: "Provider fallback",
    definition: "A backup service that may be used only for specified infrastructure problems.",
  },
];

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function StatusDecisionDiagram() {
  const decisions = [
    { state: "GO", detail: "healthy work is ready", tone: "border-emerald-300/40 bg-emerald-400/10 text-emerald-100" },
    { state: "SKIP", detail: "nothing worth spending on", tone: "border-purple-300/40 bg-purple-400/10 text-purple-100" },
    { state: "FATAL", detail: "stop and notify", tone: "border-fuchsia-300/40 bg-fuchsia-400/10 text-fuchsia-100" },
  ] as const;

  return (
    <div className="grid gap-3">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-purple-200">Before the AI call</p>
      {decisions.map((item) => (
        <div key={item.state} className={`rounded-xl border px-4 py-3 ${item.tone}`}>
          <span className="text-sm font-bold">{item.state}</span>
          <span className="ml-3 text-sm">{item.detail}</span>
        </div>
      ))}
    </div>
  );
}

export default function ContentOrchestratorPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-purple-950 to-fuchsia-950 py-16 text-white md:py-24">
        <div className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="container-narrow relative z-10">
          <Link href="/work" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-purple-100 transition hover:text-white">
            <Icon path="M19 12H5m6 6-6-6 6-6" className="h-4 w-4" />
            Back to Work Samples
          </Link>
          <div className="mb-6 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <span key={tag} className="tag border border-purple-300/30 bg-purple-300/10 text-purple-100">{tag}</span>
            ))}
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-200">Deep-dive case study</p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">It checks whether work is worth doing before it spends a dollar.</h1>
          <div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-purple-50 md:text-xl">
            <p>This overnight content system does not start with an expensive AI call. It checks whether there is healthy, worthwhile work first, respects daily capacity, and stops after a fixed time and number of attempts.</p>
            <p>It also cannot fail silently. A terminal problem or missing report evidence triggers an explicit notification and heartbeat path, so your team does not have to guess what happened overnight.</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary gap-2">
              Discuss a project like this
              <Icon path="M5 12h14m-6-6 6 6-6 6" className="h-4 w-4" />
            </Link>
            <a href="#safeguards" className="btn-secondary gap-2 border-white/25 bg-white/10 text-white hover:border-purple-200 hover:text-purple-100">
              See the cost controls
              <Icon path="M5 12h14m-6-6 6 6-6 6" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 mwork:text-purple-300">At a glance</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">A system with visible limits before it begins</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((item) => (
              <article key={item.label} className="card border-purple-100 bg-purple-50/50 p-6 md:p-7 mwork:border-purple-950 mwork:bg-slate-900">
                <p className="font-heading text-4xl font-bold text-purple-800 mwork:text-fuchsia-300">{item.value}</p>
                <h3 className="mt-2 font-semibold text-slate-950 mwork:text-white">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 mwork:text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-narrow grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 mwork:text-purple-300">The problem</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Unattended AI can waste money and leave you guessing.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-slate-700 mwork:text-slate-300">
            <p>Starting an AI job just because a timer fires is not a business process. There may be no approved work, no remaining capacity, or a connected system may already be unhealthy.</p>
            <p>The second worry is quiet failure. When there is no morning update, your team should not have to reverse-engineer whether the queue was empty, a service was unavailable, the model stalled, or the report never happened.</p>
            <p>This design solves both problems outside the AI prompt. It uses clear checks, hard limits, recorded state, and defined notifications so the automation behaves like an accountable operating process.</p>
            <PlainEnglish title="The business rule">
              <p>Do not spend on AI until the system can show there is useful work to do. If it stops, tell someone clearly rather than making silence look normal.</p>
            </PlainEnglish>
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 mwork:text-purple-300">How it works</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">A practical sequence that earns the right to run</h2>
            <p className="mt-4 text-slate-700 mwork:text-slate-300">Every step answers a simple question: should this system continue, and what evidence will show the team what happened?</p>
          </div>
          <div className="space-y-6">
            {workflow.map((item) => (
              <article key={item.step} className="card overflow-hidden border-slate-200 mwork:border-slate-800">
                <div className="grid gap-6 p-6 md:grid-cols-[5.5rem_1fr] md:p-8">
                  <div>
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-purple-700 to-fuchsia-600 font-heading text-lg font-bold text-white">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-slate-950 mwork:text-white">{item.title}</h3>
                    <p className="mt-3 text-slate-700 mwork:text-slate-300">{item.summary}</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-700 mwork:text-purple-300">Produces</p>
                        <p className="mt-1 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.output}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-700 mwork:text-purple-300">If something goes wrong</p>
                        <p className="mt-1 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.failure}</p>
                      </div>
                    </div>
                    {item.step === "01" && (
                      <TechDetail label="How overlapping runs are prevented">
                        <p>The daily cron invocation starts a shell runner on the dedicated automation machine. It loads its environment, takes an exclusive <code>flock</code> lock, and records a dated log.</p>
                        <p>A second invocation exits rather than competing for the queue. The same lock prevents daytime refill work from overlapping the core run; missing configuration or lock failure is terminal.</p>
                      </TechDetail>
                    )}
                    {item.step === "02" && (
                      <TechDetail label="The tier-0 check and its seven data probes">
                        <p>Before the agent invocation, the read-only precheck verifies required local tools, validates dashboard access, probes all configured databases with constrained retries, reads queue state, and calculates remaining daily publishing and refresh capacity.</p>
                        <p>It checks four publishing properties and three refresh properties. The result is <code>GO</code>, <code>SKIP</code>, or <code>FATAL</code>; one failed property can be excluded without discarding viable work elsewhere.</p>
                      </TechDetail>
                    )}
                    {item.step === "04" && (
                      <TechDetail label="The controller budget and recovery boundaries">
                        <p>The runner removes token-metered API-key fallbacks, applies a 3.5-hour outer budget, and caps the run at three attempts. It watches for early stagnant errors and changes providers only for classified infrastructure failures.</p>
                        <p>Editorial, quality, and publishing failures do not switch providers. The persisted date-based ledger records state-changing actions so a later attempt can resume from known state.</p>
                      </TechDetail>
                    )}
                    {item.step === "05" && (
                      <TechDetail label="What turns a quiet run into an explicit failure">
                        <p>A Python quality-control pass checks articles before and after publishing. The prompt must produce a standalone report sentinel only after its summary email is accepted, while the runner posts a heartbeat for independent observation.</p>
                        <p>If the report sentinel is absent, the runner enters the failure-email path rather than accepting a quiet exit as success. Terminal paths call the failure-email helper and log notification-delivery problems explicitly.</p>
                      </TechDetail>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="What the night looks like to an operator">
            <p>You get one of three understandable outcomes: work began because it was justified, no work was needed, or a problem stopped the run and triggered a defined alert. There is no mystery charge for an empty queue.</p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-purple-50 mwork:bg-slate-900">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-2xl bg-linear-to-br from-slate-950 via-purple-950 to-fuchsia-950 p-6 text-white md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-fuchsia-200">The decision comes first</p>
            <h2 className="mt-3 text-3xl text-white">The controller may decide that doing nothing is correct.</h2>
            <p className="mt-4 text-purple-100/80">SKIP is a healthy outcome when there is no eligible work. FATAL is a visible stop when a required condition is broken.</p>
            <div className="mt-7"><StatusDecisionDiagram /></div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 mwork:text-purple-300">How the pieces fit together</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Deterministic controls surround the AI work</h2>
            <p className="mt-4 text-slate-700 mwork:text-slate-300">The AI runner has a defined place in a wider operating system. Separate components decide readiness, keep state, check quality, and prove that the run reached an outcome.</p>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {architecture.map((item) => (
                <article key={item.title} className="card border-purple-100 bg-white p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-950">
                  <h3 className="font-heading text-xl font-bold text-slate-950 mwork:text-white">{item.title}</h3>
                  <p className="mt-3 font-mono text-xs leading-5 text-purple-700 mwork:text-purple-300">{item.tools}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.description}</p>
                  <div className="mt-5 border-t border-purple-100 pt-4 mwork:border-slate-800">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 mwork:text-slate-400">Why it matters</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.reason}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="safeguards" className="section bg-white mwork:bg-slate-950">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 mwork:text-purple-300">Automations and safeguards</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">The cost controls are part of the product, not an afterthought</h2>
            <p className="mt-4 text-slate-700 mwork:text-slate-300">The system checks for value before spending, caps its own time and recovery, and proves that a finished-looking run actually left the evidence an operator needs.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {safeguards.map((item) => (
              <article key={item.title} className="card border-slate-200 p-6 md:p-7 mwork:border-slate-800">
                <div className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-800 mwork:bg-purple-950 mwork:text-purple-200">
                    <Icon path="m5 12 4 4L19 6" className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-950 mwork:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-purple-100 mwork:border-slate-800">
            <div className="grid grid-cols-[6.5rem_1fr] bg-purple-100/70 text-xs font-bold uppercase tracking-[0.16em] text-purple-900 mwork:bg-purple-950/40 mwork:text-purple-100">
              <p className="px-5 py-4">Decision</p>
              <p className="border-l border-purple-100 px-5 py-4 mwork:border-slate-800">What the team can expect</p>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] border-t border-purple-100 bg-white text-sm mwork:border-slate-800 mwork:bg-slate-950">
              <p className="px-5 py-5 font-semibold text-emerald-700 mwork:text-emerald-300">GO</p>
              <p className="border-l border-purple-100 px-5 py-5 text-slate-700 mwork:border-slate-800 mwork:text-slate-300">
                Eligible work is ready, so the controlled run starts within its 3.5-hour and three-attempt limits.
              </p>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] border-t border-purple-100 bg-white text-sm mwork:border-slate-800 mwork:bg-slate-950">
              <p className="px-5 py-5 font-semibold text-purple-700 mwork:text-purple-300">SKIP</p>
              <p className="border-l border-purple-100 px-5 py-5 text-slate-700 mwork:border-slate-800 mwork:text-slate-300">
                There is no worthwhile work tonight. The system reports that result and sends a healthy heartbeat without paying for AI work.
              </p>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] border-t border-purple-100 bg-white text-sm mwork:border-slate-800 mwork:bg-slate-950">
              <p className="px-5 py-5 font-semibold text-fuchsia-700 mwork:text-fuchsia-300">FATAL</p>
              <p className="border-l border-purple-100 px-5 py-5 text-slate-700 mwork:border-slate-800 mwork:text-slate-300">
                A required safety condition failed. The run stops before expensive work and uses the explicit notification path.
              </p>
            </div>
          </div>
          <PlainEnglish title="The guardrail in one sentence">
            <p>The automation must prove that a task is worth doing, stay within its budget, and leave either evidence of success or an explicit alert. It cannot quietly run forever or quietly disappear.</p>
          </PlainEnglish>
          <p className="mt-6 text-sm text-slate-600 mwork:text-slate-400">
            In other words, the budget is enforced by the operating system around the AI work,
            not by asking the model to spend carefully after the fact.
          </p>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 mwork:text-purple-300">What it replaces</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">From hoping an overnight task behaved to knowing its state</h2>
          </div>
          <div className="space-y-5">
            {beforeAfter.map((item) => (
              <article key={item.before} className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-2 mwork:border-slate-800 mwork:bg-slate-950">
                <div className="p-6 md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 mwork:text-slate-400">Before</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.before}</p>
                </div>
                <div className="border-t border-purple-100 bg-purple-50/70 p-6 md:border-l md:border-t-0 md:p-7 mwork:border-slate-800 mwork:bg-purple-950/20">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-700 mwork:text-purple-300">After</p>
                  <p className="mt-3 text-sm leading-6 text-slate-800 mwork:text-purple-100">{item.after}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-600 mwork:text-slate-400">
            The system uses a <Term definition="A fixed total time limit for the entire run, not just one task.">wall-clock budget</Term>, a persisted <Term definition="A saved record that tells the next run what was already changed.">daily ledger</Term>, and <Term definition="A monitoring signal that confirms the controller reached an expected endpoint.">heartbeats</Term> to make overnight work observable.
          </p>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-narrow">
          <div className="grid gap-10 rounded-3xl border border-purple-100 bg-purple-50 p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10 mwork:border-purple-950 mwork:bg-purple-950/20">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-purple-700 mwork:text-purple-300">What this means for your business</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white">AI work can be unattended without being unaccountable.</h2>
            </div>
            <ul className="space-y-4">
              {businessValue.map((item) => (
                <li key={item} className="flex gap-3 text-slate-800 mwork:text-slate-100">
                  <span className="mt-0.5 text-fuchsia-700 mwork:text-fuchsia-300"><Icon path="m5 12 4 4L19 6" className="h-5 w-5" /></span>
                  <span className="text-sm leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Glossary items={[...glossaryItems]} />

      <section className="section bg-akic-brown text-akic-cream">
        <div className="container-narrow text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-akic-gold">Build for the quiet hours</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight md:text-4xl">Need automation that controls cost and tells you when it fails?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-akic-cream/85">AK Internet Consulting designs AI operations around explicit gates, finite budgets, durable state, and failure paths a real team can operate.</p>
          <div className="mt-8">
            <Link href="/contact" className="btn-secondary gap-2">
              Talk through your workflow
              <Icon path="M5 12h14m-6-6 6 6-6 6" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
