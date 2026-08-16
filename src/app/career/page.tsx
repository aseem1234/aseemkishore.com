import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ProofPoints from "@/components/ProofPoints";
import { profile } from "@/data/profile";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Career Profile",
  description:
    "Career profile for remote senior leadership and strategy roles in content, editorial operations, AI, and product-oriented publishing.",
  alternates: { canonical: "/career" },
};

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Career", path: "/career" },
        ])}
      />
      <PageHero
        eyebrow="Career profile"
        title="Remote senior leadership at the intersection of content, operations, and AI"
        description={profile.careerFocus}
      />

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/resume/Aseem-Kishore-Resume.pdf" event="resume_download">
          Download Résumé
        </ButtonLink>
        <ButtonLink href="/experience" variant="secondary">
          Full experience
        </ButtonLink>
        <ButtonLink href="/writing" variant="secondary">
          Writing portfolio
        </ButtonLink>
        <ButtonLink
          href="https://www.linkedin.com/in/aseemkishore"
          variant="ghost"
          event="linkedin_click"
        >
          LinkedIn
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact
        </ButtonLink>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Summary</h2>
        <p className="mt-4 leading-relaxed text-zinc-400">{profile.heroSummary}</p>
        <p className="mt-4 leading-relaxed text-zinc-400">{profile.transferableOutcomes}</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Target areas</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {profile.targetRoles.map((role) => (
            <li
              key={role}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-zinc-300"
            >
              {role}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Work arrangement</h2>
        <p className="mt-4 leading-relaxed text-zinc-400">
          {profile.locationDetail} {profile.availability}
        </p>
      </section>

      <div className="-mx-6 mt-8">
        <ProofPoints />
      </div>
    </div>
  );
}
