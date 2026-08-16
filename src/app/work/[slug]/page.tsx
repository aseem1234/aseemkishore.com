import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { getPublication } from "@/data/publications";
import { breadcrumbJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.subtitle,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-zinc-50">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-zinc-400">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.title, path: `/work/${study.slug}` },
        ])}
      />
      <Link
        href="/work"
        className="text-sm text-zinc-500 transition-colors hover:text-blue-400"
      >
        ← All work
      </Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-blue-400">Case study</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
        {study.title}
      </h1>
      <p className="mt-4 text-lg text-zinc-400">{study.subtitle}</p>

      <Block title="Context">
        <p>{study.context}</p>
      </Block>
      <Block title="Challenge">
        <p>{study.challenge}</p>
      </Block>
      <Block title="My role">
        <p>{study.role}</p>
      </Block>
      <Block title="Strategy">
        <ul className="list-disc space-y-2 pl-5">
          {study.strategy.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Block>
      <Block title="Execution">
        <ul className="list-disc space-y-2 pl-5">
          {study.execution.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Block>
      <Block title="Systems and workflows">
        <ul className="list-disc space-y-2 pl-5">
          {study.systems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Block>
      <Block title="Results">
        <ul className="list-disc space-y-2 pl-5">
          {study.results.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Block>
      <Block title="Lessons">
        <ul className="list-disc space-y-2 pl-5">
          {study.lessons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Block>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-50">Relevant skills</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {study.skills.map((skill) => (
            <li key={skill} className="rounded-md bg-zinc-800 px-2.5 py-1 text-sm text-zinc-300">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {study.relatedSlugs.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-50">Related work</h2>
          <ul className="mt-4 space-y-2">
            {study.relatedSlugs.map((related) => {
              const publication = getPublication(related);
              return (
                <li key={related}>
                  <Link
                    href={`/projects/${related}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {publication?.name ?? related}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {study.links.length > 0 ? (
        <div className="mt-12 flex flex-wrap gap-3">
          {study.links.map((link) => (
            <ButtonLink key={link.id} href={link.href} variant="secondary" event={link.event}>
              {link.label}
            </ButtonLink>
          ))}
        </div>
      ) : null}
    </article>
  );
}
