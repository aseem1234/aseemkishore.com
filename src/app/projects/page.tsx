import type { Metadata } from "next";
import { getPostsByCategorySlug } from "@/lib/wordpress";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Sites and ventures built by Aseem Kishore.",
};

export default async function ProjectsPage() {
  const projects = await getPostsByCategorySlug("projects", 20);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          Sites and ventures I&apos;ve built and grown.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((post) => (
          <ProjectCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
