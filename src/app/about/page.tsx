import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Portrait from "@/components/Portrait";
import { earlyCareerSummary } from "@/data/experience";
import { profile } from "@/data/profile";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Aseem Kishore — content strategy and editorial operations leader, digital publishing founder, and builder of AI-assisted workflows and products.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <Portrait variant="page" priority />
        <PageHero
          eyebrow="About"
          title="A career across technology, content, and product"
          description="I work where publishing, editorial judgment, and software meet. The through-line is building systems that help people understand something clearly and act on it."
        />
      </div>

      <section className="mt-14 space-y-5 leading-relaxed text-zinc-400">
        <p>
          I studied Computer Science and Mathematics at Emory University, then spent the first part of my career in technical roles. {earlyCareerSummary}
        </p>
        <p>
          In 2007 I started writing down the technology problems I was already solving at work. That side project became Online Tech Tips, then a network of audience-specific publications. In 2010 I began operating the work full time through AK Internet Consulting. The job became editorial strategy, team leadership, search, analytics, monetization, and the WordPress systems underneath high-traffic sites.
        </p>
        <p>
          I recruited and managed a distributed group of writers and editors, set standards, and stayed close enough to the writing to edit and to publish under my own name. The network reached approximately 7–8 million monthly pageviews at its peak and now holds more than 4,500 technology articles across five publications.
        </p>
        <p>
          Search and distribution changed more than once. So did advertising and social referral. The useful habit was the same: look at performance, decide whether the idea, the execution, or the channel had failed, and then update, prune, or double down. {profile.aiPosition}
        </p>
        <p>
          That same habit is now in product work. I am building PositionTracker, a SaaS dashboard for stock and options positions, directing the product and implementing it with AI-assisted development. I am not a licensed financial adviser, and I do not present the product as institutional portfolio management.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-100">Leadership</h2>
        <p className="mt-4 leading-relaxed text-zinc-400">{profile.leadershipPhilosophy}</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-100">{profile.community.title}</h2>
        <p className="mt-4 leading-relaxed text-zinc-400">{profile.community.body}</p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-100">Personal</h2>
        <p className="mt-4 leading-relaxed text-zinc-400">{profile.personal}</p>
        <p className="mt-4 leading-relaxed text-zinc-400">{profile.locationDetail}</p>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <ButtonLink href="/experience">Experience</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Work
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact
        </ButtonLink>
      </div>
    </div>
  );
}
