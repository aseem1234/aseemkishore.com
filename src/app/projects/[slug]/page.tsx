import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import { caseStudies } from "@/data/case-studies";
import { getPublication, publications, statusLabels } from "@/data/publications";
import { breadcrumbJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publications.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPublication(slug);
  if (!item) return {};
  return {
    title: item.name,
    description: item.summary,
    alternates: { canonical: `/projects/${item.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const item = getPublication(slug);
  if (!item) notFound();

  const relatedStudies = caseStudies.filter((study) => study.relatedSlugs.includes(item.slug));

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: item.name, path: `/projects/${item.slug}` },
        ])}
      />
      <Link href="/projects" className="text-sm text-zinc-500 transition-colors hover:text-blue-400">
        ← All projects
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">{item.name}</h1>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          {statusLabels[item.status]}
        </span>
      </div>
      <p className="mt-3 text-lg text-zinc-400">{item.role}</p>

      <div className="mt-8 flex flex-wrap gap-6 text-sm text-zinc-400">
        <div>
          <span className="font-mono text-xs text-zinc-600">Founded</span>
          <p className="mt-1 text-zinc-300">{item.founded}</p>
          {item.foundedNote ? <p className="mt-1 text-xs text-zinc-500">{item.foundedNote}</p> : null}
        </div>
        <div>
          <span className="font-mono text-xs text-zinc-600">Website</span>
          <p className="mt-1">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              {item.url.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.tech.map((tech) => (
          <span key={tech} className="rounded-md bg-zinc-800 px-2.5 py-1 font-mono text-xs text-zinc-500">
            {tech}
          </span>
        ))}
      </div>

      <Field title="Overview">{item.summary}</Field>
      <Field title="Intended audience">{item.audience}</Field>
      <Field title="Editorial focus">{item.editorialFocus}</Field>
      <Field title="Content strategy">{item.strategy}</Field>
      {item.scale ? <Field title="Scale">{item.scale}</Field> : null}
      {item.team ? <Field title="Team and workflow">{item.team}</Field> : null}
      <Field title="Business model">{item.businessModel}</Field>
      <Field title="What this demonstrates">{item.demonstrates}</Field>

      {relatedStudies.length > 0 ? (
        <Field title="Related case studies">
          <ul className="space-y-2">
            {relatedStudies.map((study) => (
              <li key={study.slug}>
                <Link href={`/work/${study.slug}`} className="text-blue-400 hover:text-blue-300">
                  {study.title}
                </Link>
              </li>
            ))}
          </ul>
        </Field>
      ) : null}

      <div className="mt-12">
        <ButtonLink
          href={item.url}
          event={item.slug === "position-tracker" ? "positiontracker_click" : "project_view"}
        >
          Visit site →
        </ButtonLink>
      </div>
    </article>
  );
}

function Field({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-zinc-50">{title}</h2>
      <div className="mt-3 leading-relaxed text-zinc-400">{children}</div>
    </section>
  );
}
