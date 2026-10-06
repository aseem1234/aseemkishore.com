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

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <Block title={title}>
      <ul className="list-disc space-y-2 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Block>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const summary = study.summary;
  const hasNarrative = Boolean(study.context || study.challenge || study.strategy);

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

      {study.chips ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {study.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-md border border-zinc-700 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.12em] text-zinc-400"
            >
              {chip}
            </li>
          ))}
        </ul>
      ) : null}

      {summary ? (
        <>
          <Block title="Problem">
            <p>{summary.problem}</p>
          </Block>
          <Block title={summary.didHeading}>
            <ul className="list-disc space-y-2 pl-5">
              {summary.did.map((item) => (
                <li key={item.text}>
                  {item.lead ? <strong className="text-zinc-200">{item.lead} </strong> : null}
                  {item.text}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Results">
            <ul className="list-disc space-y-2 pl-5">
              {summary.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {summary.resultsNote ? <p className="text-sm text-zinc-500">{summary.resultsNote}</p> : null}
          </Block>
          {summary.relatedEssay ? (
            <Block title="Related essay">
              <p>
                <Link
                  href={summary.relatedEssay.href}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {summary.relatedEssay.label}
                </Link>
              </p>
            </Block>
          ) : null}
          {summary.stack ? (
            <Block title="Stack">
              <p>{summary.stack}</p>
            </Block>
          ) : null}
        </>
      ) : null}

      {summary && hasNarrative ? (
        <h2 className="mt-16 border-t border-zinc-800 pt-10 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Full narrative
        </h2>
      ) : null}

      {study.context ? (
        <Block title="Context">
          <p>{study.context}</p>
        </Block>
      ) : null}
      {study.challenge ? (
        <Block title="Challenge">
          <p>{study.challenge}</p>
        </Block>
      ) : null}
      {study.role ? (
        <Block title="My role">
          <p>{study.role}</p>
        </Block>
      ) : null}
      <ListBlock title="Strategy" items={study.strategy} />
      <ListBlock title="Execution" items={study.execution} />
      <ListBlock title="Systems and workflows" items={study.systems} />
      {summary ? null : <ListBlock title="Results" items={study.results} />}
      <ListBlock title="Lessons" items={study.lessons} />

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
