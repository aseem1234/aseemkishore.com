import type { ThoughtOutline } from "./types";

/**
 * Original essays are drafted for review and are not published
 * as first-person articles until approved.
 */
export const thoughtOutlines: ThoughtOutline[] = [
  {
    slug: "building-content-teams",
    title: "What Nearly Two Decades in Digital Publishing Taught Me About Building Content Teams",
    abstract:
      "A working editor’s view of recruiting contributors, teaching a point of view, and keeping quality intact after the founder is no longer the only writer.",
    outline: [
      "Why a single-author voice does not scale, and what has to become explicit.",
      "Hiring for judgment versus hiring for throughput.",
      "Briefs, review cycles, and the difference between a style guide and a point of view.",
      "How feedback actually improves writers — and when a contributor is not a fit.",
      "What I would keep, and what I would not repeat, in a corporate editorial organization.",
    ],
    draft: true,
  },
  {
    slug: "ai-is-changing-search",
    title: "AI Is Changing Search. Content Leaders Need More Than Another SEO Checklist",
    abstract:
      "Search is becoming an answers layer. The useful response is not more keywords; it is clearer ownership of intent, accuracy, and whether a topic is worth owning.",
    outline: [
      "What actually changed for publishers when answers started appearing above links.",
      "Why intent, entity clarity, and trust matter more than isolated keyword targets.",
      "AEO and GEO as extensions of content strategy, not replacements for it.",
      "How to tell content decay from a distribution shift.",
      "Where AI-assisted production helps, and where it creates undifferentiated pages.",
    ],
    draft: true,
  },
  {
    slug: "content-operations-are-a-system",
    title: "Great Content Operations Are a System, Not a Content Factory",
    abstract:
      "Calendars, briefs, editing, updates, and analytics are one loop. Treating them as separate departments is how quality and performance both drift.",
    outline: [
      "The loop: decide, assign, edit, publish, measure, update or stop.",
      "Why volume targets without lifecycle ownership produce decaying libraries.",
      "Governance as an editorial act: what no longer belongs.",
      "Remote operations only work when the workflow is visible.",
      "How this maps to in-house content teams that do not look like a media company.",
    ],
    draft: true,
  },
  {
    slug: "saas-with-ai-agents",
    title: "What I Learned Building a SaaS Product With AI Coding Agents",
    abstract:
      "Notes from directing PositionTracker with AI-assisted development: speed is real, and so is the need for product judgment, review, and honest scope.",
    outline: [
      "What I asked agents to do, and what I refused to delegate.",
      "Product definition still comes first: workflows, not features in a pile.",
      "Auth, data, billing, and deploy are the product, not chores after the UI.",
      "Testing and reading the diff are the job when generation is cheap.",
      "Why this experience is relevant to content and knowledge systems, not only software.",
    ],
    draft: true,
  },
  {
    slug: "human-editorial-judgment",
    title: "Why Technical Content Still Needs Human Editorial Judgment",
    abstract:
      "AI can draft a plausible how-to. It cannot be accountable for a wrong step, a missing warning, or a publication’s point of view.",
    outline: [
      "The difference between fluent prose and a correct procedure.",
      "Voice is a series of refusals: what we will not oversimplify.",
      "Review systems that assume AI was in the draft, not that it was not.",
      "Accuracy, trust, and the reader who will follow the steps.",
      "A practical standard: humans own the claim; tools own the acceleration.",
    ],
    draft: true,
  },
];
