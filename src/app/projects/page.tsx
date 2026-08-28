import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import { publications } from "@/data/publications";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Publications, products, and ventures built by Aseem Kishore, including the technology publishing network and PositionTracker.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <PageHero
        eyebrow="Projects"
        title="Publications and products"
        description="The same portfolio as Work, kept at this URL so existing links continue to resolve. Case studies live under Work."
      />
      <div className="mt-8">
        <ButtonLink href="/work" variant="secondary">
          View the case studies
        </ButtonLink>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publications.map((item) => (
          <ProjectCard key={item.slug} post={item} />
        ))}
      </div>
    </div>
  );
}
