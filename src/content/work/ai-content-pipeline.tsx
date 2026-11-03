import Link from "next/link";
import { Glossary, PlainEnglish, TechDetail, Term } from "@/components/work/CaseStudy";
import { VisualQueueMock, WordPressDraftMock } from "@/components/work/OpsVisuals";

const heroTags = [
  "Four properties",
  "Draft-only delivery",
  "Playwright + Sharp",
  "Human publication",
];
const atAGlance = [
  {
    value: "4",
    label: "configured WordPress properties",
    detail: "One shared system with separate rules, prompts, visual policies, and topics for each property.",
  },
  {
    value: "9",
    label: "controlled workflow stages",
    detail: "A clear path from discovery through draft delivery, with a separate final release step.",
  },
  {
    value: "2",
    label: "browser tooling generations",
    detail: "The current code uses Playwright and Sharp; the earlier single-property codebase used Puppeteer.",
  },
  {
    value: "0",
    label: "automatic live publishes",
    detail: "The delivery workflow creates a WordPress draft and stops for a person to review and publish.",
  },
] as const;
const workflowStages = [
  {
    number: "01",
    title: "Discover ideas for the right property",
    summary:
      "The workflow starts with a chosen property and gathers possible article ideas from its configured public sources. A marketing site, an editorial site, and a niche property can each start from different signals.",
    result:
      "A focused pool of candidate ideas that fits the property instead of one generic list for every site.",
    failure:
      "Rate limits and temporary network problems retry with measured waits, so one unavailable source does not turn into a blind writing run.",
  },
  {
    number: "02",
    title: "Remove titles the site already owns",
    summary:
      "Before a new idea enters the queue, its title is compared with stored article titles. This happens before the writing work begins, not after a finished draft has already used time and budget.",
    result:
      "A cleaner editorial queue with fewer repeated angles and less cleanup for editors.",
    failure:
      "The title check happens again before insertion, so the process does not rely on a single AI instruction to avoid duplicates.",
  },
  {
    number: "03",
    title: "Build a research brief",
    summary:
      "An approved idea becomes a focused brief with evidence, audience fit, keywords, and the intended article angle. A thin trend signal is not treated as publication-ready research.",
    result:
      "The writer begins with prepared context and the right instructions for that property.",
    failure:
      "Research is a separate stage, so it can be inspected or fixed without throwing away later work that has not started.",
  },
  {
    number: "04",
    title: "Create a draft, not a finished promise",
    summary:
      "The writer uses the research packet, site voice, and article type to make a draft. The draft carries its own title, slug, category, and review state so an editor can see what is being proposed.",
    result:
      "A reviewable article candidate rather than an untracked block of generated text.",
    failure:
      "Invalid or cut-off output is rejected and recoverable model problems have limited retry behavior.",
  },
  {
    number: "05",
    title: "Review the writing before visual work begins",
    summary:
      "Humanization, fact checking, and review sit between drafting and visual production. A successful draft does not automatically earn the right to take the next step.",
    result:
      "The visual and delivery work receives content that has passed the defined quality gates.",
    failure:
      "Malformed review output leaves the article in a reviewable state; it does not grant a false pass.",
  },
  {
    number: "06",
    title: "Plan each visual as a specific task",
    summary:
      "The draft describes the visual it needs in structured instructions, including where to go, what to show, and whether a person needs to sign in. That turns visual work into a clear request instead of a vague handoff.",
    result:
      "A planned visual queue that ties an image to a real product moment and a defined article need.",
    failure:
      "Each property decides whether a missing visual blocks delivery or creates a warning, so the policy is explicit.",
  },
  {
    number: "07",
    title: "Produce and check image assets",
    summary:
      "The current system uses a browser and image-processing tools to make or capture approved visuals. It records whether each request passed or failed instead of assuming every image was created.",
    result:
      "Article assets with known output state, quality settings, and a record of what belongs where.",
    failure:
      "A failed capture remains visible in the queue and can stop or warn the next step according to the selected property policy.",
  },
  {
    number: "08",
    title: "Send a complete article to WordPress as a draft",
    summary:
      "The delivery check confirms the article fields, links, visual state, and image placeholders before the WordPress handoff. It then creates or updates a draft, never a live post.",
    result:
      "A prepared WordPress draft that an editor can inspect in the normal CMS workflow.",
    failure:
      "Existing slug and title matches are checked before creating another post, and unresolved visual placeholders block normal delivery.",
  },
  {
    number: "09",
    title: "Keep the final release in human hands",
    summary:
      "Going live is a separate, manually started workflow. It is not a side effect of writing, visual production, or draft delivery.",
    result:
      "A person reviews the draft and makes the public publishing decision.",
    failure:
      "A problem on one property stays contained; concurrency controls also prevent active work from being canceled by another run.",
  },
] as const;
const architecture = [
  {
    role: "Property controls",
    tools: "Four configuration folders, prompts, style guides, topics, and workflow toggles",
    why: "Each property keeps its own editorial rules while the shared engine stays maintainable.",
  },
  {
    role: "Editorial work",
    tools: "Discovery, research, writing, fact checking, and review",
    why: "Each content decision is visible as a stage, not hidden inside one all-or-nothing writing task.",
  },
  {
    role: "Visual work",
    tools: "Structured markers, capture recipes, Playwright, and Sharp",
    why: "Images are planned, produced, and checked against a clear article requirement.",
  },
  {
    role: "WordPress delivery",
    tools: "Media upload, placeholder mapping, post lookup, and draft delivery",
    why: "One boundary owns CMS details so the rest of the pipeline does not need to improvise them.",
  },
  {
    role: "Operations",
    tools: "GitHub Actions inputs, dependencies, concurrency rules, and isolated stage commands",
    why: "An operator can choose a property, inspect a failed stage, and restart deliberately without operating a separate workflow service.",
  },
] as const;
const safeguards = [
  {
    title: "Duplicate protection in more than one place",
    text: "Candidate titles are compared with stored articles during analysis, checked again before queue insertion, and checked in WordPress before delivery.",
  },
  {
    title: "Draft is the default state",
    text: "The writer marks content as a draft, the delivery adapter sends a draft status, and only a separate manual workflow can take a post live.",
  },
  {
    title: "Review is a real dependency",
    text: "Research, writing, humanization, fact checking, and review must clear their checks before visual production continues.",
  },
  {
    title: "Missing visuals have a visible outcome",
    text: "The visual queue stores passed and failed capture states, allowing each property to block delivery or show a policy-based warning.",
  },
  {
    title: "Retries are finite and progress is recorded",
    text: "Temporary network and model problems have limited retry paths, while article states make it clear what succeeded and what needs attention.",
  },
  {
    title: "Each property keeps its own voice",
    text: "Sources, prompts, topics, style, thresholds, and visual policies are configured per property rather than flattened into one generic set of rules.",
  },
] as const;
const beforeAfter = [
  {
    before: "A content idea lives in browser tabs, notes, and an editor memory.",
    after: "Signals enter a configured, duplicate-checked queue with a visible approval state.",
  },
  {
    before: "Research, drafting, screenshots, and upload are separate handoffs with unclear ownership.",
    after: "Each stage has a name, a dependency, a retry boundary, and a stored outcome.",
  },
  {
    before: "A generic image can be attached late, or a missing visual can surface after review.",
    after: "Structured visual requirements and pass-or-fail capture states make completeness checkable before delivery.",
  },
  {
    before: "A writing automation can accidentally connect a draft to a public release.",
    after: "WordPress receives a draft and a distinct manually dispatched workflow is required to take anything live.",
  },
] as const;
const businessOutcomes = [
  "One shared engine can support several editorial properties without four disconnected automation stacks.",
  "Editors spend their time on judgment, accuracy, and voice instead of repetitive CMS preparation.",
  "The system can resume from a known broken stage, preserving work that has already passed its checks.",
  "Visual quality becomes part of the content contract rather than a best-effort task at the end of production.",
  "A human always reviews and publishes, even when the repeatable production work is automated.",
] as const;
const glossaryItems = [
  {
    term: "Configuration",
    definition: "A set of property-specific rules and settings that changes behavior without copying the whole system.",
  },
  {
    term: "Stored-title deduplication",
    definition: "Comparing a proposed article title with titles already saved to avoid repeated subjects.",
  },
  {
    term: "Workflow stage",
    definition: "A named step with a defined input, result, and failure outcome.",
  },
  {
    term: "Structured marker",
    definition: "Data that describes a required visual in fields a person or system can follow consistently.",
  },
  {
    term: "Capture recipe",
    definition: "Saved instructions for reaching and verifying a particular screen or product state.",
  },
  {
    term: "Playwright",
    definition: "A browser automation tool used here for rendered-image work and authenticated session capture.",
  },
  {
    term: "Sharp",
    definition: "An image-processing tool used in the current codebase to prepare image assets.",
  },
  {
    term: "Puppeteer",
    definition: "The browser automation tool used by the earlier single-property implementation, not the current one.",
  },
  {
    term: "WordPress REST API",
    definition: "The WordPress interface that lets software create or update posts and upload media.",
  },
  {
    term: "Slug",
    definition: "The readable URL name used to identify a WordPress post.",
  },
  {
    term: "GitHub Actions",
    definition: "A repository service that can run selected workflow steps and retain a record of each run.",
  },
  {
    term: "Concurrency control",
    definition: "A rule that prevents overlapping work from competing to change the same item.",
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
export default function AIContentPipelinePage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden bg-linear-to-br from-[#25103d] via-[#4a1f6f] to-[#7b357d] py-16 text-white md:py-24">
        <div className="absolute -left-24 top-4 h-72 w-72 rounded-full bg-fuchsia-400/25 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-violet-200/20 blur-3xl" />
        <div className="container-wide relative">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-100 transition hover:text-white"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Work Samples
          </Link>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {heroTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-fuchsia-200">
                AI Content Pipeline
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                A content system that writes a draft and stops.
              </h1>
              <div className="mt-6 max-w-3xl space-y-5 text-lg leading-8 text-violet-100 md:text-xl">
                <p>
                  One shared system helps four WordPress properties find ideas, prepare research, create drafts,
                  plan visuals, and deliver a complete CMS draft. It writes a draft and stops. A person reviews and
                  publishes.
                </p>
                <p>
                  The production rules use{" "}
                  <Term definition="Property-specific settings that change behavior without copying the whole system.">
                    configuration
                  </Term>{" "}
                  per property, so your sites can keep their own voice and review standards without requiring four
                  separate automation stacks.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#workflow"
                  className="btn-primary border-0 bg-white text-[#4a1f6f] hover:bg-violet-100"
                >
                  Follow the workflow
                  <ArrowIcon />
                </a>
                <Link
                  href="/contact"
                  className="btn-secondary border-white/35 bg-white/5 text-white hover:border-white hover:bg-white/10"
                >
                  Discuss an editorial system
                </Link>
              </div>
            </div>
            <aside className="rounded-2xl border border-white/20 bg-black/15 p-6 shadow-2xl backdrop-blur-sm md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-200">
                Current implementation
              </p>
              <p className="mt-4 text-lg font-semibold leading-7 text-white">
                The current multi-property code uses Playwright and Sharp for rendered visuals and image work.
              </p>
              <p className="mt-4 text-sm leading-6 text-violet-100">
                The earlier single-property codebase used Puppeteer for its browser-rendered image stage. The
                distinction matters because this page describes the current system accurately while retaining its
                production lineage.
              </p>
            </aside>
          </div>
        </div>
      </section>
      <section className="section bg-background mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="tag mb-3">At a glance</p>
            <h2 className="text-3xl font-heading font-bold text-akic-brown mwork:text-akic-cream">
              Repeatable production with a clear human finish
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((item) => (
              <article key={item.label} className="card p-6 md:p-7">
                <p className="font-mono text-4xl font-bold tabular-nums text-[#6d2a85] mwork:text-fuchsia-300">
                  {item.value}
                </p>
                <h3 className="mt-2 font-heading text-lg font-bold text-foreground">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section border-y border-border bg-card/40">
        <div className="container-narrow">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6d2a85] mwork:text-fuchsia-300">
            The problem
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Content operations break when every handoff is informal
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              Useful content needs more than a writing prompt. Someone must decide which ideas deserve attention,
              what the site already covers, whether research supports the angle, which visuals prove the point, and
              whether the CMS version is ready for review.
            </p>
            <p>
              The shortcut is to collect a topic, ask a model to write, and publish. That shortcut becomes cleanup
              when titles repeat, output is incomplete, visuals are missing, or an unreviewed claim reaches a live
              page.
            </p>
            <p>
              This system standardizes repeatable work while keeping editorial judgment and public release where
              they belong: with people.
            </p>
          </div>
        </div>
      </section>
      <section id="workflow" className="section bg-background mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6d2a85] mwork:text-fuchsia-300">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Nine controlled steps from a topic signal to a WordPress draft
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Every{" "}
              <Term definition="A named step with a defined input, result, and failure outcome.">
                workflow stage
              </Term>{" "}
              produces something useful, leaves a visible outcome, and gives the next step a clear reason to
              continue. The final public release stays separate from this production flow.
            </p>
          </div>
          <div className="mt-12 space-y-6">
            {workflowStages.map((stage) => (
              <article
                key={stage.number}
                className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:grid-cols-[92px_minmax(0,1fr)] md:p-8"
              >
                <div>
                  <p className="font-mono text-2xl font-bold text-[#6d2a85] mwork:text-fuchsia-300">
                    {stage.number}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{stage.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{stage.summary}</p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-border bg-background/70 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d2a85] mwork:text-fuchsia-300">
                        What it produces
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{stage.result}</p>
                    </div>
                    <div className="rounded-xl border border-violet-200 bg-violet-50/70 p-5 mwork:border-violet-950 mwork:bg-violet-950/20">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d2a85] mwork:text-fuchsia-300">
                        If it cannot continue
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{stage.failure}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <TechDetail label="The configurable multi-property controls">
            <p>
              A manual <code>GitHub Actions</code> workflow selects a site identifier, optional post identifier,
              content type, screenshot platform, and starting stage. Each property has its own pipeline, prompts,
              style guide, site rules, and topic configuration rather than being hard-coded into one blog flow.
            </p>
            <p>
              The selected starting stage lets an operator resume deliberately instead of rerunning the whole chain.
              The content queue holds explicit states such as pending approval and reviewing before delivery can
              proceed; pool limits and review-score thresholds prevent a noisy discovery burst from becoming an
              unbounded writing run.
            </p>
          </TechDetail>
          <TechDetail label="The research, draft, and review mechanics">
            <p>
              Discovery adapters collect configured public signals from sources such as search suggestions, community
              discussion, launch activity, and news-style feeds. Normalized lowercased titles and existing database
              articles are supplied to the idea-analysis prompt, then checked again before insertion.
            </p>
            <p>
              Research, writing, humanization, fact checking, and review are independently addressable jobs. HTTP
              collection honors <code>retry-after</code> rate-limit instructions and uses exponential delay for
              transient failures. The writing prompt receives property voice and article-type instructions with its
              research context.
            </p>
            <p>
              The writer persists a front-matter draft, validates output, rejects invalid or truncated results, and
              uses bounded retry behavior. Numeric review scores are validated before they can change state. A
              property can enable multi-model review while retaining a structured fallback path.
            </p>
          </TechDetail>
          <TechDetail label="What a visual marker and visual queue actually contain">
            <p>
              Screenshot markers are structured data for the platform, view, site, authentication expectation,
              recipe, entry URL, and target description. Utilities retain navigation recipes, focus selectors, and
              verification hints for reusable states such as search, settings, and filtered views.
            </p>
            <p>
              A session-capture utility opens a visible Playwright context, waits for a real operator login, confirms
              the session, and only then saves reusable state. The visual queue records passed and failed capture
              states, allowing a property policy to block delivery or issue a warning when an image is missing.
            </p>
          </TechDetail>

          <VisualQueueMock />

          <TechDetail label="Current image tooling, CMS delivery, and the final release boundary">
            <p>
              The current generalized repository uses <code>Playwright</code> for rendered-image work and
              <code>Sharp</code> for image-processing support. It can search visual references, use model-assisted
              selection, and produce controlled assets. Bounded workers record outcomes rather than assuming every
              visual request completed.
            </p>
            <p>
              The earlier single-property codebase used <code>Puppeteer</code> to launch headless Chromium, set a
              1200-by-630 viewport, wait for network idle, capture a PNG, and return a safe fallback if rendering
              failed. That is the predecessor, not the current browser runtime.
            </p>
            <p>
              Before WordPress delivery, the pre-publish check verifies required fields, visual manifest state,
              unresolved screenshot placeholders, and link health. The WordPress REST adapter uploads media, maps
              placeholders into content blocks, checks existing posts by slug or title, and explicitly sends draft
              status. A separate manually dispatched go-live workflow owns public publication.
            </p>
          </TechDetail>
          <PlainEnglish title="What the flow means for an editor">
            <p>
              You start with a better queue, receive a prepared article draft with its visual needs understood, and
              see any missing work before the CMS handoff. The automation speeds up production without pretending
              that a first draft is ready for public release.
            </p>
          </PlainEnglish>
        </div>
      </section>
      <section className="section border-y border-border bg-[#f8f2fa] mwork:bg-[#211525]">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6d2a85] mwork:text-fuchsia-300">
              How the pieces fit together
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One shared engine with separate editorial rules
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Shared operations make the system easier to maintain. Property-level rules protect the differences that
              make each site useful to its own audience.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {architecture.map((layer) => (
              <article key={layer.role} className="card p-6 md:p-7">
                <p className="text-xs font-bold tracking-[0.16em] text-[#6d2a85] mwork:text-fuchsia-300">
                  {layer.role}
                </p>
                <h3 className="mt-3 text-xl font-bold tracking-tight">{layer.tools}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{layer.why}</p>
              </article>
            ))}
          </div>
          <PlainEnglish title="Why a shared engine helps">
            <p>
              You can support more than one site without losing the distinct voice and publishing rules that each one
              needs. A change to shared reliability work benefits every property, while an editorial decision stays
              local to the site it belongs to.
            </p>
          </PlainEnglish>
        </div>
      </section>
      <section className="section bg-background mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6d2a85] mwork:text-fuchsia-300">
                Automations and safeguards
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Automation that knows where to stop
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The system earns autonomy only for repeatable work. Originality, quality, visual completeness, and
              public release all have an explicit check rather than an assumption. A{" "}
              <Term definition="Data fields that describe a needed visual in a form people and software can follow.">
                structured marker
              </Term>{" "}
              makes every visual request specific before production starts.
              </p>
            </div>
            <div className="grid gap-4">
              {safeguards.map((safeguard) => (
                <article key={safeguard.title} className="rounded-2xl border border-border bg-card p-6 md:p-7">
                  <div className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ead8ef] text-[#6d2a85] mwork:bg-fuchsia-300/15 mwork:text-fuchsia-200">
                      <CheckIcon />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{safeguard.title}</h3>
                      <p className="mt-2 leading-7 text-muted-foreground">{safeguard.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <PlainEnglish title="The safety posture">
            <p>
              The workflow writes a draft and stops. A person reviews and publishes. That boundary is not a slogan:
              it is enforced by separate delivery and go-live paths, with checks before either one can move forward.
            </p>
          </PlainEnglish>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
            This is where an editor sees the work: present in WordPress, but still waiting as a draft for human
            review.
          </p>
          <WordPressDraftMock />
        </div>
      </section>
      <section className="section border-y border-border bg-card/40">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6d2a85] mwork:text-fuchsia-300">
              What it replaces
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From disconnected tasks to a dependable editorial operating system
            </h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <div className="grid border-b border-border bg-muted/45 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground md:grid-cols-2 md:px-8">
              <span>Before</span>
              <span className="mt-3 md:mt-0">After</span>
            </div>
            {beforeAfter.map((row) => (
              <div key={row.before} className="grid border-b border-border last:border-b-0 md:grid-cols-2">
                <div className="bg-card px-6 py-6 md:px-8 md:py-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground md:hidden">
                    Before
                  </p>
                  <p className="mt-2 leading-7 text-muted-foreground md:mt-0">{row.before}</p>
                </div>
                <div className="border-t border-border bg-background px-6 py-6 md:border-l md:border-t-0 md:px-8 md:py-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6d2a85] mwork:text-fuchsia-300 md:hidden">
                    After
                  </p>
                  <p className="mt-2 leading-7 text-foreground md:mt-0">{row.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-background mwork:bg-neutral-950">
        <div className="container-narrow">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6d2a85] mwork:text-fuchsia-300">
            What this means for your business
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            More editorial output without a lower editorial bar
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            The value is not simply faster article generation. It is a repeatable production capability that makes
            the right work easier to review, troubleshoot, and extend across properties while keeping final judgment
            where it belongs.
          </p>
          <ul className="mt-8 space-y-4">
            {businessOutcomes.map((outcome) => (
              <li key={outcome} className="flex gap-4 rounded-xl border border-border bg-card p-6 md:p-7">
                <span className="mt-1 font-bold text-[#6d2a85] mwork:text-fuchsia-300" aria-hidden="true">
                  <ArrowIcon />
                </span>
                <span className="leading-7 text-muted-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Glossary items={glossaryItems} />
      <section className="section bg-akic-brown text-white">
        <div className="container-narrow text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-fuchsia-200">Build with control</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Need a content pipeline that helps your team move faster without removing review?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-akic-cream/90">
            AK Internet Consulting designs practical content automation around the controls your team actually needs:
            review states, visual checks, recoverable stages, and a deliberate public release decision.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Start a conversation
              <ArrowIcon />
            </Link>
            <Link href="/work" className="btn-secondary">
              Explore more work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
