export interface WritingRolePick {
  slug: string;
  note: string;
}

export interface WritingRole {
  id: string;
  label: string;
  intro?: string;
  essays?: Array<{ label: string; href: string; note: string }>;
  picks: WritingRolePick[];
}

export const writingRoles: WritingRole[] = [
  {
    id: "content-strategy",
    label: "Content strategy",
    picks: [
      {
        slug: "search-engine-alarming-results",
        note: "Editorial observation, not a how-to; shows point of view.",
      },
      {
        slug: "ubuntu-software-installation",
        note: "Long-form; shows how to structure a complete topic, including when each method is the wrong choice.",
      },
      {
        slug: "save-websites-offline",
        note: "A current-year take on an evergreen topic.",
      },
    ],
  },
  {
    id: "seo-aeo",
    label: "SEO / AEO",
    essays: [
      {
        label: "AI Is Changing Search. Content Leaders Need More Than Another SEO Checklist",
        href: "/thoughts/ai-is-changing-search",
        note: "Essay: how answer engines change the job for content leaders.",
      },
    ],
    picks: [
      {
        slug: "windows-ai-agent-taskbar",
        note: "Fast, intent-matched answer on a new feature; the kind of page answer engines lift.",
      },
      {
        slug: "sfc-dism-windows-11",
        note: "Procedural accuracy plus what the result messages mean, i.e. answer-complete content.",
      },
      {
        slug: "focus-modes-vs-dnd",
        note: "Comparison and decision intent with a clear recommendation.",
      },
      {
        slug: "glm-5-code-generation",
        note: "AI-topic fluency.",
      },
    ],
  },
  {
    id: "editorial-operations",
    label: "Editorial operations",
    picks: [
      {
        slug: "sfc-dism-windows-11",
        note: "Shows the house standard (sequence, warnings, interpretation) that briefs and review cycles enforce.",
      },
      {
        slug: "reddit-flair-guide",
        note: "Completeness across desktop and old Reddit; a good definition-of-done example.",
      },
      {
        slug: "apple-watch-water-lock",
        note: "Reader-problem framing.",
      },
    ],
  },
  {
    id: "growth-content",
    label: "Growth content",
    picks: [
      {
        slug: "save-websites-offline",
        note: "Tools comparison (commercial-investigation intent).",
      },
      {
        slug: "switch-controller-drift",
        note: "Option comparison that helps a reader decide what to do or buy.",
      },
      {
        slug: "focus-modes-vs-dnd",
        note: "Decision-guide format.",
      },
      {
        slug: "search-engine-alarming-results",
        note: "Shareable, distinctive angle.",
      },
    ],
  },
  {
    id: "technical-education",
    label: "Technical education",
    picks: [
      {
        slug: "fake-chrome-extensions",
        note: "Security-minded consumer education.",
      },
      {
        slug: "redact-word-pdf-mac",
        note: "Data-protection accuracy: drawing a black box is not redaction.",
      },
      {
        slug: "sfc-dism-windows-11",
        note: "Step-by-step repair order with interpretation of results.",
      },
      {
        slug: "ubuntu-software-installation",
        note: "Sysadmin-level depth.",
      },
    ],
  },
];
