import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import CapabilityGrid from "@/components/CapabilityGrid";
import CaseStudyCard from "@/components/CaseStudyCard";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Portrait from "@/components/Portrait";
import PublicationCard from "@/components/PublicationCard";
import ProofPoints from "@/components/ProofPoints";
import SectionHeading from "@/components/SectionHeading";
import WritingCard from "@/components/WritingCard";
import TrackedAnchor from "@/components/TrackedAnchor";
import { getFeaturedCaseStudies } from "@/data/case-studies";
import { digitalMarketing } from "@/data/digital-marketing";
import { consultingOffers } from "@/data/consulting";
import { links, profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { getWritingBySlugs } from "@/data/writing";
import { profilePageJsonLd } from "@/lib/jsonld";

const homepageWritingSlugs = [
  "windows-ai-agent-taskbar",
  "sfc-dism-windows-11",
  "fake-chrome-extensions",
  "ubuntu-software-installation",
] as const;

export default function Home() {
  const studies = getFeaturedCaseStudies();
  const featuredWriting = getWritingBySlugs(homepageWritingSlugs);
  const selectedWork = publications.filter((item) => item.featured);

  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <section className="relative px-6 pb-20 pt-24 sm:pt-32">
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="h-72 w-72 rounded-full bg-blue-500/15 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-400">
              {profile.label}
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-50 sm:text-6xl">
              {profile.headline}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
              {profile.heroSupportingLine}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/consulting">Explore consulting</ButtonLink>
              <ButtonLink href="/work" variant="secondary">See selected work</ButtonLink>
            </div>
            <p className="mt-5 text-sm text-zinc-500">
              Or email me at{" "}
              <TrackedAnchor
                href={links.email.href}
                event="contact_click"
                className="text-blue-400 underline-offset-4 hover:text-blue-300 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                {profile.email}
              </TrackedAnchor>
            </p>
          </div>
          <div className="mx-auto lg:mx-0">
            <Portrait variant="hero" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20" aria-label="Consulting areas">
        <div className="grid gap-5 lg:grid-cols-3">
          {consultingOffers.map((offer) => (
            <Link key={offer.slug} href={`/consulting/${offer.slug}`} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-7 transition-colors hover:border-blue-400">
              <h2 className="text-xl font-semibold text-zinc-100">{offer.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">{offer.description}</p>
              <p className="mt-5 text-sm text-blue-400">Explore <span aria-hidden="true">→</span></p>
            </Link>
          ))}
        </div>
      </section>

      <ProofPoints />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Selected work"
          title="Case studies"
          description="How the work was organized, what I decided and what it produced."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="digital-marketing-heading"
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <SectionHeading
          id="digital-marketing-heading"
          eyebrow={digitalMarketing.eyebrow}
          title={digitalMarketing.title}
          description={digitalMarketing.intro}
        />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <h3 className="text-xl font-bold text-zinc-100">{digitalMarketing.howIWorkHeading}</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-zinc-400">
              {digitalMarketing.howIWork.map((item) => (
                <li key={item.lead}>
                  <strong className="text-zinc-200">{item.lead}</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="self-start rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-xl font-bold text-zinc-100">{digitalMarketing.proofHeading}</h3>
            <ul className="mt-4 space-y-2 leading-relaxed text-zinc-400">
              {digitalMarketing.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6">
              <ButtonLink href={digitalMarketing.link.href} variant="ghost">
                {digitalMarketing.link.label} <span aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Portfolio"
          title="Publications and products"
          description="Five technology publications, the company that operates them and PositionTracker."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {selectedWork.map((item) => (
            <PublicationCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Expertise"
          title="What I do"
          description="Five areas that show up across publishing, editorial operations, search, AI and product work."
        />
        <CapabilityGrid />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Background"
          title="Publishing, operations and product in one career"
        />
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-zinc-400">
          {profile.professionalSummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Writing"
          title="Selected writing"
          description="Verified bylined pieces across the publications. The full portfolio lives on the writing page."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredWriting.map((sample) => (
            <WritingCard key={sample.slug} sample={sample} />
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/writing" variant="ghost">
            View the writing portfolio
          </ButtonLink>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-zinc-50">Community</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">{profile.community.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-blue-400">Apps &amp; Tools</p>
          <h2 className="mt-4 text-3xl font-bold text-zinc-50">Small tools. Useful jobs.</h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">Fast Coin Flip brings a quick decision to your iPhone. Explore the app, its press kit and the other tools I build.</p>
          <div className="mt-7 flex flex-wrap gap-4"><ButtonLink href="/tools/flip">Meet Fast Coin Flip</ButtonLink><ButtonLink href="/tools" variant="secondary">Explore my apps and tools</ButtonLink></div>
        </div>
      </section>

      <CtaBand
        consulting
        title="What are you working on?"
        description="Share the content, process or automation problem you want to solve. We can discuss scope and timing from there."
      />
    </>
  );
}
