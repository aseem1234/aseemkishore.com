import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import TrackedAnchor from "@/components/TrackedAnchor";
import { links, profile } from "@/data/profile";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Aseem Kishore about career opportunities, advisory work, partnerships, or interviews.",
  alternates: { canonical: "/contact" },
};

const subjects = [
  { id: "career", label: "Career opportunity", subject: "Career opportunity" },
  { id: "advisory", label: "Advisory or consulting", subject: "Advisory or consulting" },
  { id: "partnership", label: "Partnership", subject: "Partnership" },
  { id: "media", label: "Media or interview", subject: "Media or interview" },
  { id: "general", label: "General message", subject: "Hello" },
] as const;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="How to reach me"
        description="Email is the most reliable path. LinkedIn and Muck Rack are there if you prefer those networks. I do not publish a phone number here."
      />

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={links.email.href} event="contact_click">
          Email me
        </ButtonLink>
        <ButtonLink href={links.linkedin.href} variant="secondary" event="linkedin_click">
          LinkedIn
        </ButtonLink>
        <ButtonLink href={links.muckrack.href} variant="secondary" event="muckrack_click">
          Muck Rack
        </ButtonLink>
        <ButtonLink href={links.resume.href} variant="ghost" event="resume_download">
          Résumé
        </ButtonLink>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">What this is about</h2>
        <p className="mt-3 text-zinc-400">
          Choose a subject and your email app will open with it already filled in.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {subjects.map((item) => (
            <li key={item.id}>
              <TrackedAnchor
                href={`mailto:${profile.email}?subject=${encodeURIComponent(item.subject)}`}
                event="contact_click"
                eventData={{ subject: item.id }}
                className="block rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-zinc-200 transition-colors hover:border-blue-500/50 hover:text-white"
              >
                {item.label}
              </TrackedAnchor>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Also useful</h2>
        <ul className="mt-4 space-y-2 text-zinc-400">
          <li>
            <a href={links.akic.href} className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
              AK Internet Consulting
            </a>
          </li>
          <li>
            <a href={links.positionTracker.href} className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
              PositionTracker
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
