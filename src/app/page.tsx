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
import { getFeaturedCaseStudies } from "@/data/case-studies";
import { profile } from "@/data/profile";
import { publications } from "@/data/publications";
import { getFeaturedWriting } from "@/data/writing";
import { profilePageJsonLd } from "@/lib/jsonld";

export default function Home() {
  const studies = getFeaturedCaseStudies();
  const featuredWriting = getFeaturedWriting().slice(0, 4);
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
            <p className="mt-3 text-lg text-zinc-400">{profile.supportingLabel}</p>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
              {profile.heroSummary}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/experience">View My Experience</ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                Explore Selected Work
              </ButtonLink>
              <ButtonLink href="/resume/Aseem-Kishore-Resume.pdf" variant="secondary" event="resume_download">
                Download Résumé
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Contact Me
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto lg:mx-0">
            <Portrait variant="hero" priority />
          </div>
        </div>
      </section>

      <ProofPoints />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Background"
          title="Publishing, operations, and product in one career"
        />
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-zinc-400">
          {profile.professionalSummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Expertise"
          title="What I do"
          description="Five areas that show up across publishing, editorial operations, search, AI, and product work."
        />
        <CapabilityGrid />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Selected impact"
          title="Case studies"
          description="How the work was organized, what I decided, and what it produced."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          eyebrow="Portfolio"
          title="Publications and products"
          description="Five technology publications, the company that operates them, and PositionTracker."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {selectedWork.map((item) => (
            <PublicationCard key={item.slug} item={item} />
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

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-zinc-50">Current professional focus</h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">{profile.currentFocus}</p>
        </div>
      </section>

      <CtaBand
        title="Let’s talk"
        description="Résumé, LinkedIn, and a direct email are all one click away."
      />
    </>
  );
}
