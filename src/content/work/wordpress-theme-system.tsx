import Link from "next/link";
import { Glossary, PlainEnglish, TechDetail, Term } from "@/components/work/CaseStudy";



type Fact = { value: string; label: string; detail: string };
type WorkflowStep = {
  number: string;
  title: string;
  trigger: string;
  action: string;
  output: string;
  failure: string;
};
type StackItem = { role: string; tool: string; detail: string };

const heroTags = ["WordPress", "Shared themes", "Gulp", "Staged releases"] as const;

const facts: Fact[] = [
  {
    value: "4+",
    label: "child-theme deployments",
    detail: "Documented theme variants share one common base rather than starting over.",
  },
  {
    value: "1",
    label: "shared parent layer",
    detail: "The common setup, modules, widgets, and platform behavior live once.",
  },
  {
    value: "2",
    label: "asset build paths",
    detail: "Styles and browser code are prepared before a release moves outward.",
  },
  {
    value: "Staged",
    label: "release path",
    detail: "The documented process tests theme changes before production.",
  },
];

const workflow: WorkflowStep[] = [
  {
    number: "01",
    title: "Put the shared basics in one place",
    trigger: "A capability should work consistently across the site network.",
    action: "The shared theme provides the common setup for navigation, images, widgets, site options, redirects, and assets.",
    output: "Every property begins with the same dependable foundation instead of a copied starter theme.",
    failure: "A fix belongs in one reviewed code path, so it can be released to the properties that depend on it.",
  },
  {
    number: "02",
    title: "Let each property keep what makes it distinct",
    trigger: "A publication needs its own layout, search behavior, content module, or brand treatment.",
    action:
      "The property-specific theme replaces only the design and behavior it owns while retaining the shared platform work beneath it.",
    output: "A site can change its editorial experience without paying to fork the whole platform.",
    failure: "If a compressed asset is not available, the theme can fall back to the readable source version.",
  },
  {
    number: "03",
    title: "Build a lighter page before visitors see it",
    trigger: "A page request reaches WordPress, or a developer prepares theme files.",
    action:
      "The system selects prepared files in production and gives modern properties local fonts, early font loading, delayed theme scripts, and image sizes suited to the design.",
    output: "Each property gets a more predictable page-loading path without relearning the same performance lessons.",
    failure: "Build errors are surfaced without stopping the ongoing development watch process.",
  },
  {
    number: "04",
    title: "Release the same change through a clear gate",
    trigger: "A theme update is ready for review.",
    action:
      "The workflow builds the assets, sends the necessary files to a staging site, tests there, then promotes the confirmed change to production.",
    output: "The team has a documented route with exclusions, a preview mode, and post-release checks.",
    failure: "A bad change is more likely to be caught in staging, before it reaches live readers.",
  },
];

const stack: StackItem[] = [
  {
    role: "Shared foundation",
    tool: "AKIC parent theme",
    detail: "Centralizes WordPress setup, shared modules, menus, widgets, site options, redirect routes, and common asset hooks.",
  },
  {
    role: "Local experience",
    tool: "Child themes",
    detail: "Own the templates, assets, widgets, search behavior, and editorial presentation that should vary by property.",
  },
  {
    role: "Build process",
    tool: "Gulp, PostCSS, cssnano, and Terser",
    detail: "Prepares compact styles and scripts before release while retaining useful JavaScript names for maintenance.",
  },
  {
    role: "Search presentation",
    tool: "Theme SEO modules",
    detail: "Adds structured search information plus canonical, social, robot, image-priority, and layout-stability behavior.",
  },
  {
    role: "Business controls",
    tool: "Site options and ad widget",
    detail:
      "Advertising client, slot, format, sizing, and placement choices stay configurable instead of being copied into every post template.",
  },
  {
    role: "Release path",
    tool: "rsync and WordPress CLI",
    detail: "Moves files through staging and production, then checks cache and active-theme state after release.",
  },
];

const safeguards = [
  {
    title: "One shared source of truth",
    detail: "Common behavior is not copied into every property, so a platform correction is made once instead of repeated site by site.",
  },
  {
    title: "Selective replacements",
    detail:
      "A child theme removes only the inherited style or script it intentionally replaces, rather than discarding the whole shared layer.",
  },
  {
    title: "Build errors stay visible",
    detail:
      "The build watches styles and scripts, creates prepared files, and keeps the watch process running when an error needs attention.",
  },
  {
    title: "Search information without duplicates",
    detail:
      "A property can provide its own search markup while the competing plugin output is turned off, preventing two conflicting versions of the same information.",
  },
  {
    title: "A repeatable release routine",
    detail:
      "The deployment guide supports previewing the change, excluding development files, testing staging, and verifying WordPress after release.",
  },
] as const;

const comparison = [
  {
    before: "Theme setup, helpers, and fixes are copied across separate codebases.",
    after: "One shared layer supplies reusable platform behavior to every child theme.",
  },
  {
    before: "A brand refresh risks hand-editing the same shared template across several sites.",
    after: "A child theme owns its design and assets while retaining the common foundation.",
  },
  {
    before: "Performance work becomes a fresh set of page edits for every redesign.",
    after: "Font loading, delayed scripts, image sizing, and file preparation are built into the system.",
  },
  {
    before: "A release is a manual sequence with unclear scope and few checks.",
    after: "A build, staging, transfer, and verification route makes the change set explicit.",
  },
] as const;

const businessOutcomes = [
  "Fix a common bug once and ship the correction to every site that shares the platform, instead of fixing the same bug four times.",
  "Launch a distinct property or editorial look without rebuilding the common WordPress plumbing.",
  "Keep advertising controls visible and configurable instead of hiding them in one-off post templates.",
  "Make performance and search practices repeatable parts of delivery, not a checklist rebuilt for every redesign.",
  "Give a small web team a practical control point before a shared change reaches live traffic.",
] as const;

const glossary = [
  {
    term: "Child theme",
    definition: "A property-specific layer that changes selected behavior while keeping the shared theme beneath it.",
  },
  {
    term: "CSS",
    definition: "The rules that control the visual styling of a web page.",
  },
  {
    term: "Gulp",
    definition: "A tool that automates repetitive preparation work for website files.",
  },
  {
    term: "JSON-LD",
    definition: "A structured format that helps search engines understand the purpose of a page.",
  },
  {
    term: "Parent theme",
    definition: "The shared WordPress foundation used by several distinct property themes.",
  },
  {
    term: "PostCSS and cssnano",
    definition: "Tools that process and reduce stylesheet files for delivery.",
  },
  {
    term: "rsync",
    definition: "A file-transfer tool that copies only the changes needed for a release.",
  },
  {
    term: "Terser",
    definition: "A tool that reduces JavaScript file size before a site release.",
  },
  { term: "WOFF2", definition: "A compact web-font format used by browsers." },
  {
    term: "WordPress CLI",
    definition: "A command-line tool for checking and managing a WordPress installation.",
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

function LayerDiagram() {
  const layers = [
    {
      label: "Child theme: design, templates, and property modules",
      tone: "bg-cyan-500/15 border-cyan-400/30 text-cyan-100",
    },
    {
      label: "Parent theme: shared setup, widgets, options, and redirects",
      tone: "bg-blue-500/15 border-blue-400/30 text-blue-100",
    },
    {
      label: "WordPress: content, media, users, and plugins",
      tone: "bg-slate-700/70 border-slate-500 text-slate-200",
    },
  ] as const;
  return (
    <div className="space-y-3">
      {layers.map((layer) => (
        <div key={layer.label} className={`rounded-xl border px-4 py-3 text-sm font-medium ${layer.tone}`}>
          {layer.label}
        </div>
      ))}
    </div>
  );
}

export default function WordPressThemeSystemPage() {
  return (
    <div>
      <section className="section relative overflow-hidden bg-linear-to-br from-blue-950 via-slate-950 to-cyan-950 text-white">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="container-narrow relative z-10">
          <Link href="/work" className="mb-8 inline-flex items-center gap-1 text-sm text-blue-100/70 hover:text-white">
            <BackIcon /> Back to Work Samples
          </Link>
          <div className="mb-6 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <span key={tag} className="tag bg-cyan-400/15 text-cyan-100 ring-1 ring-inset ring-cyan-200/20">
                {tag}
              </span>
            ))}
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">WordPress platform engineering</p>
          <h1 className="mb-6 max-w-4xl">Fix it once. Improve every site that shares the foundation.</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
            This WordPress system keeps several content properties distinct without making each one its own maintenance problem. The shared
            foundation handles the repeated work, while each property keeps control of the experience readers see.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-100/80">
            The practical benefit is simple: a common bug can be fixed once and released everywhere it applies, rather than repaired four
            times in four different themes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary gap-2">
              Discuss a project like this <ArrowIcon />
            </Link>
            <a
              href="#architecture"
              className="btn-secondary gap-2 border-white/25 bg-white/10 text-white hover:border-cyan-200 hover:text-cyan-100"
            >
              See how it fits together <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">At a glance</p>
            <h2 className="text-neutral-900 mwork:text-white">Shared maintenance becomes an advantage</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <article key={fact.label} className="card p-6 md:p-7">
                <p className="text-3xl font-bold text-blue-700 mwork:text-cyan-300">{fact.value}</p>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900 mwork:text-white">{fact.label}</h3>
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
            <h2 className="text-neutral-900 mwork:text-white">Multiple sites should not mean multiple versions of the same work.</h2>
            <p className="mt-5 text-neutral-700 mwork:text-neutral-300">
              A portfolio needs consistent navigation, media handling, widgets, site settings, redirects, advertising controls, and release
              routines. Copying that basic plumbing into every theme makes every improvement slower and every release harder to trust.
            </p>
            <p className="mt-4 text-neutral-700 mwork:text-neutral-300">
              The design separates the work that should compound from the work that should differ. The{" "}
              <Term definition="The shared WordPress foundation used by several property-specific themes.">parent theme</Term> is the stable
              platform; each child theme focuses on its own publication and brand.
            </p>
          </div>
          <aside className="rounded-2xl border border-blue-200 bg-blue-50 p-6 md:p-7 mwork:border-cyan-900/70 mwork:bg-cyan-950/20">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 mwork:text-cyan-300">The design rule</p>
            <p className="mt-4 text-2xl font-semibold leading-snug text-blue-950 mwork:text-white">
              Standardize the platform. Localize the reader experience.
            </p>
            <p className="mt-4 text-sm text-blue-900/80 mwork:text-cyan-100/70">
              That boundary lets a shared fix travel widely without forcing every site to look or work the same way.
            </p>
          </aside>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">How it works</p>
            <h2 className="text-neutral-900 mwork:text-white">A reusable foundation with room for each property</h2>
            <p className="mt-4 text-neutral-700 mwork:text-neutral-300">
              The system makes the common work dependable, then lets each property change only the pieces that need to feel local.
            </p>
          </div>
          <div className="mt-12 space-y-6">
            {workflow.map((step) => (
              <article key={step.number} className="card overflow-hidden">
                <div className="grid gap-6 p-6 md:grid-cols-[5.5rem_1fr] md:p-8">
                  <div>
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-sm font-bold tracking-wider text-white mwork:bg-cyan-400 mwork:text-slate-950">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mwork:text-white">{step.title}</h3>
                    <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">Starts when</dt>
                        <dd className="mt-1 text-sm text-neutral-700 mwork:text-neutral-300">{step.trigger}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">What happens</dt>
                        <dd className="mt-1 text-sm text-neutral-700 mwork:text-neutral-300">{step.action}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">You get</dt>
                        <dd className="mt-1 text-sm text-neutral-700 mwork:text-neutral-300">{step.output}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">If it fails</dt>
                        <dd className="mt-1 text-sm text-neutral-700 mwork:text-neutral-300">{step.failure}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="What this means for a site owner">
            <p>
              Maintenance work accumulates instead of repeating. You can invest in the shared layer knowing that every property using it
              benefits, while individual brands retain their own look and editorial choices.
            </p>
          </PlainEnglish>
          <TechDetail label="What the shared layer actually owns">
            <p>
              The shared parent theme centralizes menus, image support and common image sizes, sidebars, widgets, site options, redirect
              tooling, REST redirect routes, and common asset hooks. It gives every child a common base class rather than a copied starter
              theme.
            </p>
            <p>
              Child themes replace only property-specific behavior: templates, assets, widgets, search behavior, editorial modules,
              dedicated image sizes, and their own SEO class. They selectively dequeue inherited assets only when deliberately replacing
              them.
            </p>
          </TechDetail>
        </div>
      </section>

      <section id="architecture" className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-2xl bg-linear-to-br from-slate-950 to-blue-950 p-6 text-white md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">How the pieces fit together</p>
            <h2 className="mt-3 text-3xl text-white">A child inherits the platform, not the limitations.</h2>
            <p className="mt-4 text-slate-300">
              A child can replace selected styles, scripts, search behavior, widgets, and SEO policy while keeping the common capabilities
              that should remain consistent.
            </p>
            <div className="mt-7">
              <LayerDiagram />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">Architecture and tool stack</p>
            <h2 className="text-neutral-900 mwork:text-white">Each layer has a clear job</h2>
            <div className="mt-7 divide-y divide-neutral-200 border-y border-neutral-200 mwork:divide-neutral-800 mwork:border-neutral-800">
              {stack.map((item) => (
                <article key={item.role} className="grid gap-2 py-5 md:grid-cols-[9rem_1fr]">
                  <div>
                    <p className="text-sm font-semibold text-blue-700 mwork:text-cyan-300">{item.role}</p>
                    <p className="mt-1 text-sm font-medium text-neutral-900 mwork:text-white">{item.tool}</p>
                  </div>
                  <p className="text-sm text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="container-narrow">
          <TechDetail label="How files are prepared for a faster page">
            <p>
              Modern child themes self-host fonts, preload critical <code>WOFF2</code> files, defer theme JavaScript, and define
              property-specific image sizes. In production, the system chooses minified files when debug mode is off.
            </p>
            <p>
              The shared Gulp workflow minifies CSS with <code>PostCSS</code> and <code>cssnano</code>, and JavaScript with{" "}
              <code>Terser</code>. Terser mangling is disabled so JavaScript names remain readable; <code>plumber</code> and desktop
              notifications keep watch tasks alive when an error occurs.
            </p>
          </TechDetail>
          <PlainEnglish title="Why this matters to readers and editors">
            <p>
              Faster, more stable pages and a consistent publishing foundation do not depend on someone remembering a long checklist for
              every property. The system makes those good defaults part of normal delivery.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">Safeguards</p>
            <h2 className="text-neutral-900 mwork:text-white">The shared layer stays safe to maintain and release</h2>
            <p className="mt-4 text-neutral-700 mwork:text-neutral-300">
              Reuse only pays off when the team can understand it, test it, and release it with sensible boundaries.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {safeguards.map((item) => (
              <article key={item.title} className="card p-6 md:p-7">
                <div className="flex gap-3">
                  <span className="text-blue-700 mwork:text-cyan-300">
                    <CheckIcon />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mwork:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 mwork:text-neutral-400">{item.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <TechDetail label="How search markup avoids competing answers">
            <p>
              Modern child themes generate <code>JSON-LD</code> structured data and manage Open Graph, Twitter card, canonical, robot, and
              image-priority behavior. They explicitly disable competing plugin schema output so the page does not publish duplicate
              structured markup.
            </p>
            <p>
              This also includes layout-shift defenses in the SEO layer. The technical decision protects how search engines interpret a page
              without requiring editors to make the same configuration choice on every article.
            </p>
          </TechDetail>
          <TechDetail label="How the documented release path works">
            <p>
              The documented path is build, <code>rsync</code> to staging, test, then production. It can exclude source-control and
              dependency folders, supports a dry run before any files change, and transfers required parent and child updates together.
            </p>
            <p>
              After release, WordPress CLI checks cache and active-theme state. The staging checkpoint is the control point that catches a
              bad release before it reaches a live property.
            </p>
          </TechDetail>
          <PlainEnglish title="The operational payoff">
            <p>
              Shared work does not have to mean risky work. The release routine gives a small team a repeatable way to see what is changing,
              test it, and confirm that the site is in the expected state afterward.
            </p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">What it replaced</p>
            <h2 className="text-neutral-900 mwork:text-white">From a collection of sites to a maintainable system</h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 mwork:border-neutral-800">
            <div className="grid grid-cols-2 bg-neutral-100 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500 mwork:bg-neutral-900 mwork:text-neutral-400">
              <p className="px-5 py-4">Without the shared system</p>
              <p className="border-l border-neutral-200 px-5 py-4 mwork:border-neutral-800">With the shared system</p>
            </div>
            {comparison.map((row) => (
              <div
                key={row.before}
                className="grid grid-cols-2 border-t border-neutral-200 bg-white text-sm mwork:border-neutral-800 mwork:bg-neutral-950"
              >
                <p className="px-5 py-5 text-neutral-600 mwork:text-neutral-400">{row.before}</p>
                <p className="border-l border-neutral-200 px-5 py-5 font-medium text-neutral-900 mwork:border-neutral-800 mwork:text-white">
                  {row.after}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-blue-50 mwork:bg-cyan-950/20">
        <div className="container-narrow">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-orange">What this means for your business</p>
          <h2 className="text-neutral-900 mwork:text-white">Build the operating model, not just the next website.</h2>
          <div className="mt-8 grid gap-4">
            {businessOutcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex gap-3 rounded-xl border border-blue-100 bg-white p-6 md:p-7 mwork:border-cyan-900/70 mwork:bg-neutral-900"
              >
                <span className="text-blue-700 mwork:text-cyan-300">
                  <CheckIcon />
                </span>
                <p className="text-neutral-700 mwork:text-neutral-300">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Glossary items={[...glossary]} />

      <section className="section bg-akic-brown text-white">
        <div className="container-narrow text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-akic-gold">Make the next improvement compound</p>
          <h2 className="mt-3 text-white">Need a web platform that gets easier to maintain as it grows?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-neutral-200">
            AK Internet Consulting can help you define the shared layer, protect the property-level differences that matter, and give your
            team a safer path from change to release.
          </p>
          <Link href="/contact" className="btn-primary mt-8 gap-2">
            Discuss a project like this <ArrowIcon />
          </Link>
        </div>
      </section>
    </div>
  );
}
