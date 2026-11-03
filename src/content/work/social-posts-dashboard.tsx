import Link from "next/link";
import {
  Glossary,
  PlainEnglish,
  TechDetail,
  Term,
} from "@/components/work/CaseStudy";



const atAGlance = [
  {
    label: "Destinations",
    value: "X and LinkedIn",
    detail: "One review queue, with publishing behavior that respects each channel.",
  },
  {
    label: "Human approval",
    value: "Required",
    detail: "Nothing reaches a public account until a person reviews the words and chooses publish.",
  },
  {
    label: "Reliable record",
    value: "Neon-backed",
    detail: "Every post keeps its draft, review, status, error, and confirmed destination history.",
  },
  {
    label: "Scheduled intake",
    value: "Daily sync",
    detail: "A protected routine checks for new source content at 09:00 without blocking the review screen.",
  },
] as const;

const lifecycleStates = [
  {
    state: "pending",
    label: "Ready for a person",
    business: "New content waits in the active review queue. It is a candidate, not an approval.",
    tone: "border-sky-200 bg-sky-50 text-sky-950 mwork:border-sky-900 mwork:bg-sky-950/30 mwork:text-sky-100",
  },
  {
    state: "posting",
    label: "One send in progress",
    business: "The system temporarily gives one publish attempt ownership, so another tab cannot send the same post too.",
    tone: "border-indigo-200 bg-indigo-50 text-indigo-950 mwork:border-indigo-900 mwork:bg-indigo-950/30 mwork:text-indigo-100",
  },
  {
    state: "posted",
    label: "Public outcome confirmed",
    business: "The record changes only after the publisher returns the actual destination link.",
    tone: "border-emerald-200 bg-emerald-50 text-emerald-950 mwork:border-emerald-900 mwork:bg-emerald-950/30 mwork:text-emerald-100",
  },
  {
    state: "failed",
    label: "Needs a careful next step",
    business: "The draft and review work remain available, together with a message explaining what to check before retrying.",
    tone: "border-rose-200 bg-rose-50 text-rose-950 mwork:border-rose-900 mwork:bg-rose-950/30 mwork:text-rose-100",
  },
  {
    state: "skipped",
    label: "Intentionally set aside",
    business: "A person can remove an item from the active queue without losing the record of that decision.",
    tone: "border-slate-200 bg-slate-50 text-slate-950 mwork:border-slate-700 mwork:bg-slate-900 mwork:text-slate-100",
  },
] as const;

const workflow = [
  {
    step: "01",
    title: "Bring new drafts into a working queue",
    trigger: "A daily schedule, a refresh action, or a background check finds source content.",
    action: "The dashboard shows its saved queue first, then looks for new material in the background.",
    result: "Reviewers can keep working even when the content source is slow.",
    failure: "A source problem cannot erase or hide posts already saved for review.",
  },
  {
    step: "02",
    title: "Match incoming content to its existing record",
    trigger: "A source post arrives from the shared content service.",
    action: "The system matches the source item to one durable record and refreshes only what is safe to refresh.",
    result: "One post retains its draft, edits, status, links, and useful context across repeated checks.",
    failure: "A partial source response cannot wipe details that the dashboard already knows.",
  },
  {
    step: "03",
    title: "Let a person make the final edit",
    trigger: "A reviewer opens an item that is ready or needs another attempt.",
    action: "The reviewer can change the proposed copy, check it for the selected channel, and save that review work before any public action starts.",
    result: "The final words are human-owned and survive a refresh or later retry.",
    failure: "An old browser view cannot save over a post that has already moved into an active send.",
  },
  {
    step: "04",
    title: "Claim the send before contacting a public account",
    trigger: "A reviewer presses the publish control.",
    action: "The system checks access and target, then records that one send owns this post before making an outside request.",
    result: "A double-click, second browser, or overlapping sync cannot create a second send.",
    failure: "A competing publish attempt gets a clear conflict instead of releasing duplicate content.",
  },
  {
    step: "05",
    title: "Record success only when there is proof",
    trigger: "The channel publisher replies with a successful destination URL.",
    action: "The dashboard records the URL and time, then promotes the reviewed words into the recorded published copy.",
    result: "A published status means a real public destination was confirmed, not merely that someone clicked a button.",
    failure: "A timeout or server problem is preserved as an uncertain failure and asks the reviewer to verify the account before retrying.",
  },
  {
    step: "06",
    title: "Keep each destination understandable",
    trigger: "A channel callback or companion destination reports an outcome.",
    action: "The system checks the response before recording it and keeps distinct destinations in their own fields.",
    result: "A team can see what happened on X and LinkedIn without confusing a company page, article, or thread.",
    failure: "Unexpected callback data has no shortcut into a confirmed public state.",
  },
] as const;

const ledgerFeatures = [
  {
    title: "One home for each post",
    business: "The same item remains traceable across intake, review, a failed attempt, recovery, and later reporting.",
  },
  {
    title: "Status is not guesswork",
    business: "The dashboard shows what is waiting, sending, confirmed, failed, or intentionally skipped from saved records—not from a temporary browser view.",
  },
  {
    title: "Your reviewed words have a safe lane",
    business: "The review version is protected until a real publish confirmation arrives, so uncertainty cannot overwrite the original record.",
  },
  {
    title: "Changed content gets fresh guidance",
    business: "If draft content changes, the system knows that earlier publishing advice may no longer fit.",
  },
  {
    title: "One package can have several outcomes",
    business: "A company-page post, an article, and a companion thread can each keep their own evidence.",
  },
  {
    title: "Operational follow-through can repeat safely",
    business: "The system records what was already written back to connected operations, avoiding repeated side effects during a retry.",
  },
] as const;

const stackGroups = [
  {
    role: "Review experience",
    tools: "Queue views, channel tabs, category groups, and an edit workspace",
    why: "People see reviewable work and its status before they are asked to take a public action.",
  },
  {
    role: "Durable record",
    tools: "Neon Postgres, typed records, post matching, and status indexes",
    why: "The publishing history remains available when a browser, generator, or remote channel has a temporary problem.",
  },
  {
    role: "Content intake",
    tools: "Shared skills API, protected sync route, content fingerprinting, and a daily schedule",
    why: "Generation stays separate while the dashboard owns review status and publishing evidence.",
  },
  {
    role: "Destination controls",
    tools: "Channel-aware publishing routes, X and LinkedIn flows, and response checks",
    why: "Each network gets the handling it needs without turning every post into an ad hoc manual process.",
  },
] as const;

const safeguards = [
  {
    title: "Only authorized actions can change a post",
    business: "Intake, edit, publish, skip, and external confirmation routes check permission before changing the saved record.",
  },
  {
    title: "Old screens cannot win",
    business: "An action is accepted only when the post is in the right state, preventing an outdated tab from undoing in-progress work.",
  },
  {
    title: "Confirmed posts stay confirmed",
    business: "A late source update cannot quietly put a confirmed public post back into the active queue.",
  },
  {
    title: "Uncertainty is shown, not hidden",
    business: "If a public channel times out or returns a server error, the reviewer keeps the draft and gets a verify-before-retry message.",
  },
  {
    title: "Public destinations are checked",
    business: "The system validates the configured target and key details from external responses before it calls a post successful.",
  },
  {
    title: "Sync does not erase ongoing work",
    business: "A background refresh preserves confirmed, in-progress, reviewed, and enriched information when the incoming source has less detail.",
  },
] as const;

const beforeAfter = [
  {
    before: "AI-generated drafts are scattered across email, chat, and temporary service responses.",
    after: "One durable queue keeps the draft, human edit, status, error, timestamp, and confirmed destination together.",
  },
  {
    before: "A team can approve copy in theory but still lose the exact version that was intended to publish.",
    after: "The reviewed version is stored separately and becomes the recorded published copy only after a confirmed public result.",
  },
  {
    before: "A network timeout leaves people guessing whether they should press publish again.",
    after: "The record retains the review work and tells the reviewer to check the account before a safe retry.",
  },
  {
    before: "Repeated refreshes or extra browser tabs can overwrite decisions or send duplicate content.",
    after: "Protected matching, in-progress claims, and confirmed-state protection make repeat runs safe by design.",
  },
] as const;

const applications = [
  "Founder-led content programs that want AI drafting but retain a human voice and explicit final decision.",
  "Marketing teams posting to several social channels that need one reliable review queue rather than ad hoc handoffs.",
  "Reputation-sensitive or executive communications where publication proof and a clear history matter.",
  "Operations teams that need a calm recovery path after timeouts, stale tabs, source failures, or delayed external responses.",
] as const;

const glossary = [
  { term: "Atomic claim", definition: "One all-or-nothing update that gives a single publish attempt ownership." },
  { term: "Callback", definition: "A message from another service confirming a result or sending an update." },
  { term: "Content hash", definition: "A fingerprint that changes when the underlying draft content changes." },
  { term: "Durable state", definition: "Saved workflow information that remains available after a refresh or crash." },
  { term: "Neon Postgres", definition: "A hosted SQL database used here as the long-lived publishing record." },
  { term: "Post-ID upsert", definition: "A save that creates or updates the same record using its source post identifier." },
  { term: "reviewed_text", definition: "The human-edited version kept apart from the original generated draft." },
  { term: "SHA-256", definition: "A standard method for producing a content fingerprint from text." },
  { term: "Terminal state", definition: "A protected final status that a routine update should not undo." },
  { term: "Vercel Cron", definition: "A scheduled trigger that starts a protected backend route at a planned time." },
] as const;

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function SocialPostsDashboardPage() {
  return (
    <div>
      <section className="section relative overflow-hidden bg-linear-to-br from-sky-950 via-neutral-900 to-blue-950 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute -right-12 top-8 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl" />
          <div className="absolute -bottom-24 left-8 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        </div>
        <div className="container-narrow relative">
          <Link href="/work" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-300 transition hover:text-white">
            <Icon path="M19 12H5m6 6-6-6 6-6" className="h-4 w-4" />
            Back to Work Samples
          </Link>
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="tag bg-sky-400/15 text-sky-200">Human approval</span>
            <span className="tag bg-blue-400/15 text-blue-200">Publishing operations</span>
            <span className="tag bg-indigo-400/15 text-indigo-200">Neon Postgres</span>
            <span className="tag bg-white/10 text-white">X and LinkedIn</span>
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Deep-dive case study</p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            AI can draft. A person still owns the publish button.
          </h1>
          <div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-neutral-100 md:text-xl">
            <p>
              Nothing reaches a public account without a person reviewing it and choosing to publish. This dashboard turns AI-generated candidates into a clear, human-owned queue for X and LinkedIn.
            </p>
            <p>
              It is also built for the uncomfortable moment when a system crashes or times out. A second run cannot send the same thing twice, and an uncertain result tells your team what to verify before they try again.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#workflow" className="btn-primary bg-sky-600 hover:bg-sky-500 focus:ring-sky-400">Follow the publish flow <span aria-hidden="true">↓</span></a>
            <a href="#safeguards" className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20">See the safety checks</a>
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">At a glance</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 mwork:text-white md:text-4xl">A publishing workflow with a memory.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 mwork:text-neutral-400">The dashboard is not the generator. It is the dependable place where a suggested post becomes reviewed, confirmed, and traceable public work.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((item) => (
              <article key={item.label} className="card border-neutral-200 bg-neutral-50 p-6 md:p-7 mwork:border-neutral-800 mwork:bg-neutral-900">
                <p className="text-sm font-semibold text-sky-700 mwork:text-sky-300">{item.label}</p>
                <p className="mt-3 font-heading text-2xl font-bold text-neutral-900 mwork:text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <article className="rounded-2xl border border-rose-200 bg-rose-50 p-7 md:p-8 mwork:border-rose-900 mwork:bg-rose-950/30">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-rose-700 mwork:text-rose-300">The problem</p>
              <h2 className="font-heading text-2xl font-bold text-rose-950 mwork:text-rose-100">Generated does not mean ready to publish.</h2>
              <div className="mt-5 space-y-4 text-rose-900 mwork:text-rose-100">
                <p>A good draft can still lose its review decision in a chat thread or inbox.</p>
                <p>A timeout at the send step creates the worst ambiguity: the post may already be public.</p>
                <p>Multiple tabs, background checks, and external responses can compete to change the same post.</p>
              </div>
            </article>
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 md:p-8 mwork:border-emerald-900 mwork:bg-emerald-950/30">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 mwork:text-emerald-300">The approach</p>
              <h2 className="font-heading text-2xl font-bold text-emerald-950 mwork:text-emerald-100">Separate AI assistance from public permission.</h2>
              <div className="mt-5 space-y-4 text-emerald-900 mwork:text-emerald-100">
                <p>The dashboard keeps an operational record separate from the generator.</p>
                <p>A person edits and explicitly starts a channel-specific publish action.</p>
                <p>The public result counts only when the destination confirms it with a real link.</p>
              </div>
            </article>
          </div>
          <PlainEnglish title="What your team experiences">
            <p>AI can make the first draft faster. Your team still has a calm, visible process for deciding what represents the business publicly—and for knowing exactly what happened when a channel has a problem.</p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">The lifecycle</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 mwork:text-white md:text-4xl">Five saved states make the next action clear.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 mwork:text-neutral-400">
              A post moves through a small set of{" "}
              <Term definition="Saved workflow information that remains available after a refresh or crash.">
                durable states
              </Term>
              . The labels show whether it needs review, has one send underway,
              is confirmed, needs recovery, or was deliberately set aside.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {lifecycleStates.map((item) => (
              <article key={item.state} className={`rounded-2xl border p-6 md:p-7 ${item.tone}`}>
                <code className="inline-block rounded bg-white/60 px-2 py-1 text-sm font-bold mwork:bg-black/20">{item.state}</code>
                <h3 className="mt-4 font-heading text-xl font-bold">{item.label}</h3>
                <p className="mt-3 text-sm leading-6 opacity-90">{item.business}</p>
              </article>
            ))}
          </div>
          <TechDetail label="The exact saved lifecycle and review rule">
            <p>The Neon-backed lifecycle is <code>pending</code>, then <code>posting</code>, then <code>posted</code>, with <code>failed</code> and <code>skipped</code> as durable alternate states. The active publishing backlog uses <code>pending</code>; it does not invent an invisible approval record.</p>
            <p><code>reviewed_text</code> is stored separately from the generated draft. It is promoted to the recorded published copy only after the publisher confirms a destination URL; a confirmed <code>posted</code> record is terminal and later synchronization cannot downgrade it.</p>
            <p>A reviewer can skip a pending item, preserving that local decision unless a later upstream response confirms the item actually published. The saved ledger includes status, created and updated times, sent and posted times, error text, and live destination URLs.</p>
          </TechDetail>
        </div>
      </section>

      <section id="workflow" className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">How it works</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 mwork:text-white md:text-4xl">From draft to confirmed public post.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 mwork:text-neutral-400">Every step spells out who owns the work, what gets saved, and what the system does when a channel does not respond cleanly.</p>
          </div>
          <div className="space-y-6">
            {workflow.map((item) => (
              <article key={item.step} className="card grid gap-6 border-neutral-200 bg-white p-6 md:grid-cols-[72px_1fr] md:p-8 mwork:border-neutral-800 mwork:bg-neutral-950">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 font-heading text-lg font-bold text-white">{item.step}</span>
                <div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-neutral-900 mwork:text-white">{item.title}</h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">When</p>
                      <p className="mt-1 text-sm leading-6 text-neutral-700 mwork:text-neutral-300">
                        {item.trigger}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">What happens</p>
                      <p className="mt-1 text-sm leading-6 text-neutral-700 mwork:text-neutral-300">
                        {item.action}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">Your result</p>
                      <p className="mt-1 text-sm leading-6 text-neutral-700 mwork:text-neutral-300">
                        {item.result}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">If something goes wrong</p>
                      <p className="mt-1 text-sm leading-6 text-neutral-700 mwork:text-neutral-300">
                        {item.failure}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="The important promise">
            <p>The system never treats a button click as proof of publication. It waits for the public destination to confirm success, and it refuses to let a crash or second run silently create the same public post twice.</p>
          </PlainEnglish>
          <TechDetail label="How the dashboard prevents a double-send">
            <p>The publish route confirms authorization, validates the selected target, and atomically changes only <code>pending</code> or <code>failed</code> rows to <code>posting</code> before the outbound request begins. This <Term definition="One all-or-nothing record change that gives a single request ownership.">atomic claim</Term> prevents another browser or concurrent sync from releasing the same draft.</p>
            <p>The exact reviewed copy is passed to the corresponding channel publisher. Before a review save or publish is accepted, the dashboard validates non-empty text and the selected channel character limit. A second publish request receives a conflict. Saving review text accepts only <code>pending</code> or <code>failed</code> rows, and a stale client cannot save into a row that has moved out of a reviewable state.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">The record behind the queue</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 mwork:text-white md:text-4xl">Why a durable ledger changes the operating model.</h2>
              <p className="mt-4 text-lg leading-8 text-neutral-600 mwork:text-neutral-400">A content generator is good at creating candidates. It is not automatically a trustworthy record for editorial decisions, public confirmation, or recovery from a network problem.</p>
              <div className="mt-7 space-y-4">
                {ledgerFeatures.map((feature, index) => (
                  <article key={feature.title} className="card flex gap-5 border-neutral-200 p-6 md:p-7 mwork:border-neutral-800">
                    <span className="font-heading text-xl font-bold text-sky-700 mwork:text-sky-300">0{index + 1}</span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-neutral-900 mwork:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-neutral-600 mwork:text-neutral-400">
                        {feature.business}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <aside className="self-start rounded-2xl border border-sky-200 bg-sky-50 p-7 md:p-8 mwork:border-sky-900 mwork:bg-sky-950/30">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-800 mwork:text-sky-200">What the reviewer sees</p>
              <h3 className="mt-4 font-heading text-2xl font-bold text-sky-950 mwork:text-sky-100">The interface shows state before it makes action easy.</h3>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-sky-950/85 mwork:text-sky-100/85">
                <li>Channel views open from saved records first, then run a background refresh.</li>
                <li>Posts are separated into today, needs publishing, failed, archived or skipped, and published work.</li>
                <li>Each detail view keeps the post status, category, channel, edits, and failure context together.</li>
                <li>Category filters and channel tabs make a mixed pipeline easier to review without changing saved facts.</li>
              </ul>
            </aside>
          </div>
          <TechDetail label="How synchronization preserves the work already done">
            <p>The posts table uses <code>post_id</code> as its primary key. Sync uses post-ID upserts plus a SHA-256 content hash built from the channel and draft payload. The hash invalidates cached publishing-insight fields only when draft text, thread, or article content changes, so advice does not pretend to describe a different draft.</p>
            <p>The update preserves terminal <code>posted</code> records, <code>posting</code> work, saved review work, in-flight research, and non-null enrichment fields when incoming data omits article, media, organization, or publishing information. Writes are batched to the database pool size, and downstream bookkeeping markers and attempt counts make write-back idempotent.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">How the pieces fit together</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 mwork:text-white md:text-4xl">Separate responsibilities make the process easier to trust.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {stackGroups.map((group) => (
              <article key={group.role} className="card border-neutral-200 bg-white p-6 md:p-7 mwork:border-neutral-800 mwork:bg-neutral-950">
                <p className="text-sm font-semibold text-sky-700 mwork:text-sky-300">{group.role}</p>
                <h3 className="mt-3 font-heading text-xl font-bold text-neutral-900 mwork:text-white">{group.tools}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600 mwork:text-neutral-400">{group.why}</p>
              </article>
            ))}
          </div>
          <TechDetail label="The implementation stack behind the review experience">
            <p>The review experience is built with Next.js and React, channel tabs, category groups, and a draft-rewrite workspace. The durable record uses Neon Postgres, a typed ledger model, post-ID upserts, and status indexes.</p>
            <p>Content intake uses the shared skills API, a protected sync route, content hashing, and a Vercel Cron entry that calls the sync route daily at <code>09:00</code>. X and LinkedIn use channel-aware publishing routes with validated callbacks.</p>
          </TechDetail>
        </div>
      </section>

      <section id="safeguards" className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">Safeguards</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 mwork:text-white md:text-4xl">The hard parts are handled before the public post.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 mwork:text-neutral-400">A publish button is the last step, not the first. The software protects reviewed work, prevents duplicated intent, and makes uncertain remote outcomes visible.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {safeguards.map((item) => (
              <article key={item.title} className="card border-neutral-200 p-6 md:p-7 mwork:border-neutral-800">
                <div className="flex gap-4">
                  <span className="mt-0.5 text-sky-700 mwork:text-sky-300">
                    <Icon path="m5 12 4 4L19 6" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-neutral-900 mwork:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600 mwork:text-neutral-400">
                      {item.business}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="Why this is safer">
            <p>If the channel does not answer cleanly, the dashboard does not guess. It keeps the exact review work, marks the attempt as recoverable, and tells the person to verify the destination before attempting another send.</p>
          </PlainEnglish>
          <TechDetail label="Timeouts, callbacks, and channel-specific outcomes">
            <p>The publish route gives the channel publisher room to respond, but a timeout or server-side outcome becomes a recoverable <code>failed</code> record carrying a verify-before-retry message. The reviewed text remains available; the system never silently assumes the post did not publish.</p>
            <p>Callback handling validates the post, channel, destination URL, and timestamp before accepting outside evidence. LinkedIn organization-page publishing is tracked separately from the profile result, while native articles keep their own URL alongside companion-thread outcomes. X single-post mode and LinkedIn publishing each use channel-aware handling. Unexpected callback data has no free path into a published state.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">What it replaces</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 mwork:text-white md:text-4xl">A review process that remembers, recovers, and explains.</h2>
              <div className="mt-7 space-y-5">
                {beforeAfter.map((item) => (
                  <article key={item.before} className="grid gap-5 rounded-2xl border border-neutral-200 bg-white p-6 md:grid-cols-2 md:p-7 mwork:border-neutral-800 mwork:bg-neutral-950">
                    <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500 mwork:text-neutral-400">Before</p><p className="mt-3 text-sm leading-6 text-neutral-700 mwork:text-neutral-300">{item.before}</p></div>
                    <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700 mwork:text-sky-300">After</p><p className="mt-3 text-sm leading-6 text-neutral-700 mwork:text-neutral-300">{item.after}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 mwork:text-sky-300">What this means for your business</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 mwork:text-white md:text-4xl">AI leverage without giving away editorial control.</h2>
              <div className="mt-7 rounded-2xl bg-neutral-900 p-7 text-neutral-100 mwork:bg-neutral-800 md:p-8">
                <ul className="space-y-5">
                  {applications.map((application) => <li key={application} className="flex gap-3"><span className="text-sky-300"><Icon path="m5 12 4 4L19 6" className="h-5 w-5" /></span><span className="text-sm leading-6">{application}</span></li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Glossary items={[...glossary]} />

      <section className="section bg-akic-brown text-white">
        <div className="container-narrow text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-akic-cream">Need an AI-enabled workflow that stays human-owned?</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight md:text-4xl">Build a content approval system your team can trust.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-akic-cream">Turn generation into a clear operating process with durable records, thoughtful recovery, and an explicit human decision before anything goes public.</p>
          <div className="mt-8"><Link href="/contact" className="btn-secondary">Start a conversation<Icon path="M5 12h14m-6-6 6 6-6 6" className="h-4 w-4" /></Link></div>
        </div>
      </section>
    </div>
  );
}
