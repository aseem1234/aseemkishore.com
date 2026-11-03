import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import CaseStudyCard from "@/components/CaseStudyCard";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { caseStudies } from "@/data/case-studies";
import {
  automationSections,
  consultingOffers,
  getConsultingOffer,
} from "@/data/consulting";
import { breadcrumbJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return consultingOffers.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = getConsultingOffer(slug);
  if (!offer) return {};
  return {
    title: offer.name,
    description: offer.description,
    alternates: { canonical: `/consulting/${slug}` },
    openGraph: {
      title: offer.name,
      description: offer.description,
      url: `/consulting/${slug}`,
    },
    twitter: { title: offer.name, description: offer.description },
  };
}
export default async function ConsultingOfferPage({ params }: Props) {
  const { slug } = await params;
  const offer = getConsultingOffer(slug);
  if (!offer) notFound();
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Consulting", path: "/consulting" },
          { name: offer.name, path: `/consulting/${slug}` },
        ])}
      />
      <Link href="/consulting" className="text-sm text-blue-400">
        ← All consulting
      </Link>
      <div className="mt-8">
        <PageHero
          eyebrow={offer.name}
          title={offer.title}
          description={offer.intro}
        />
      </div>
      <p className="mt-6 max-w-3xl text-zinc-400">{offer.helps}</p>
      <div className="mt-8">
        <ButtonLink
          href={`mailto:hello@aseemkishore.com?subject=${encodeURIComponent(`${offer.name} inquiry`)}`}
          event="consulting_inquiry"
        >
          Discuss your project
        </ButtonLink>
      </div>
      {slug === "ai-automation" ? (
        <>
          <nav
            aria-label="Automation services"
            className="mt-14 flex flex-wrap gap-3 border-y border-zinc-800 py-6"
          >
            {automationSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-md border border-zinc-700 px-4 py-3 text-sm text-zinc-200 hover:border-blue-400"
              >
                {section.title}
              </a>
            ))}
          </nav>
          {automationSections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="consulting-section grid gap-8 border-b border-zinc-800 py-14 md:grid-cols-[1fr_2fr]"
            >
              <div>
                <p className="font-mono text-xs text-blue-400">0{index + 1}</p>
                <h2 className="mt-4 text-3xl font-semibold text-zinc-100">
                  {section.title}
                </h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-zinc-300">
                  {section.intro}
                </p>
                <ul className="mt-6 list-disc space-y-3 pl-5 text-zinc-400">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  href={`/work/${section.example}`}
                  className="mt-7 inline-block text-blue-400 hover:text-blue-300"
                >
                  {section.exampleLabel} →
                </Link>
              </div>
            </section>
          ))}
        </>
      ) : (
        <section className="mt-16 grid gap-10 border-y border-zinc-800 py-12 md:grid-cols-[1fr_2fr]">
          <h2 className="text-3xl font-semibold text-zinc-100">
            What we can work on
          </h2>
          <ul className="list-disc space-y-4 pl-5 text-lg leading-relaxed text-zinc-400">
            {offer.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-zinc-100">
          What you leave with
        </h2>
        <ul className="mt-7 grid gap-4 md:grid-cols-3">
          {offer.deliverables.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-zinc-400">
          Each engagement is scoped to the project. Deliverables, access,
          timing, pricing and follow-up support are agreed before work starts.
        </p>
      </section>
      <section className="mt-20">
        <h2 className="text-3xl font-semibold text-zinc-100">Relevant work</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {offer.work
            .map((workSlug) =>
              caseStudies.find((study) => study.slug === workSlug),
            )
            .filter((study) => study !== undefined)
            .map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
        </div>
      </section>
      <section className="mt-20 border-t border-zinc-800 pt-12">
        <h2 className="text-3xl font-semibold text-zinc-100">
          Tell me what needs to work better.
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Share your current process and the outcome you want. We will map the
          constraints, choose a useful first step and agree how to judge the
          result.
        </p>
        <div className="mt-7">
          <ButtonLink href="/contact" event="consulting_inquiry">
            Start a conversation
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-zinc-400">
          Need WordPress maintenance or a technical support session?{" "}
          <a
            href="https://akcomputerservices.com/services"
            className="text-blue-400"
          >
            Visit AK Computer Services →
          </a>
        </p>
      </section>
    </div>
  );
}
