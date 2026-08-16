import type { EducationItem, ExternalLink } from "./types";

export const profile = {
  name: "Aseem Kishore",
  label: "Content Strategy & Editorial Operations Leader",
  supportingLabel: "Digital Publishing Founder | AI & Product Builder",
  headline: "I build content systems, digital publications, and AI-powered products.",
  location: "Clarksville, Maryland",
  locationDetail:
    "Based between the Baltimore and Washington, D.C. metropolitan areas. Experienced remote operator and distributed-team manager.",
  email: "akishore@akinternetconsulting.com",
  siteUrl: "https://aseemkishore.com",
  photo: "/images/aseem-kishore.jpg",
  photoAlt: "Aseem Kishore",
  availability:
    "Open to remote senior leadership, strategy, and selected advisory opportunities.",
  heroSummary:
    "For nearly two decades, I have built and operated technology publications, led distributed teams of writers and editors, grown audiences to millions of monthly readers, and developed the editorial systems that make quality content scalable. Today, I also build AI-assisted workflows and SaaS products at the intersection of content, technology, and business.",
  professionalSummary: [
    "I started publishing technology guides in 2007 and later operated the work full time through AK Internet Consulting. The job was never only writing. It was deciding what each publication should cover, recruiting and managing contributors, designing workflows, and connecting editorial choices to audience and revenue results.",
    "Search, analytics, and content lifecycle work sat alongside editing and quality control. I used performance data to tell the difference between a weak idea, weak execution, poor distribution, and content that simply needed an update.",
    "More recently I have applied the same systems thinking to AI-assisted research, editorial workflows, and product development, including PositionTracker, a SaaS dashboard for organizing and analyzing stock and options positions. AI can accelerate research, production, analysis, and distribution. Human judgment remains responsible for original thinking, accuracy, editorial point of view, and quality.",
  ],
  currentFocus:
    "I am currently interested in remote senior leadership and strategy opportunities involving content, editorial operations, AI-enabled workflows, knowledge systems, digital publishing, and product-oriented content.",
  careerFocus:
    "I am exploring remote senior leadership and strategy roles where content, editorial operations, AI, technology, and measurable business outcomes intersect. I am particularly interested in organizations building useful products, serving meaningful audiences, or navigating the transition from traditional search and publishing to AI-enabled discovery.",
  transferableOutcomes:
    "My publishing career has required me to connect content decisions directly to measurable audience and revenue outcomes. More recently, building PositionTracker has expanded that perspective into SaaS product acquisition, engagement, subscriptions, and user workflows.",
  aiPosition:
    "AI should accelerate research, production, analysis, and distribution, while human judgment remains responsible for original thinking, accuracy, editorial point of view, and quality.",
  leadershipPhilosophy:
    "The best content organizations combine a clear point of view, strong editorial judgment, useful systems, and honest performance analysis. Technology can accelerate the work, but it cannot replace responsibility for what gets published and why.",
  community: {
    title: "Community",
    body: "For the past several years, I have volunteered with Meals on Wheels in Maryland, delivering meals to older and disabled neighbors. The experience has reinforced that practical assistance and personal connection often matter equally: helping with an immediate need while making sure someone knows they have not been forgotten.",
  },
  personal:
    "Outside of work I spend time with family, follow markets, and stay curious about new tools. I still like taking things apart — software, workflows, and the occasional workout plan — to see how they can work better.",
  education: [
    {
      institution: "Emory University",
      fields: ["Computer Science", "Mathematics"],
    },
  ] satisfies EducationItem[],
  targetRoles: [
    "Content Strategy Leadership",
    "Editorial and Content Operations",
    "AI Content and AI Search",
    "Knowledge and Customer Education",
    "Technical Content",
    "Product-Oriented Content and AI Programs",
  ],
  consultingAreas: [
    "Content strategy",
    "Editorial operations",
    "SEO and AI-search readiness",
    "WordPress publishing systems",
    "Content audits",
    "AI-assisted workflows",
    "Digital publishing",
    "Product strategy",
  ],
} as const;

export const links = {
  linkedin: {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aseemkishore",
    event: "linkedin_click",
  },
  muckrack: {
    id: "muckrack",
    label: "Muck Rack",
    href: "https://muckrack.com/aseem-kishore",
    event: "muckrack_click",
  },
  email: {
    id: "email",
    label: "Email",
    href: "mailto:akishore@akinternetconsulting.com",
    event: "contact_click",
  },
  resume: {
    id: "resume",
    label: "Résumé",
    href: "/resume/Aseem-Kishore-Resume.pdf",
    event: "resume_download",
  },
  akic: {
    id: "akic",
    label: "AK Internet Consulting",
    href: "https://akinternetconsulting.com",
    event: "akic_click",
  },
  positionTracker: {
    id: "position-tracker",
    label: "PositionTracker",
    href: "https://positiontracker.trading",
    event: "positiontracker_click",
  },
} satisfies Record<string, ExternalLink>;

export const authorArchives: ExternalLink[] = [
  {
    id: "ott-archive",
    label: "Online Tech Tips author archive",
    href: "https://www.online-tech-tips.com/author/akishoreott/",
    event: "writing_sample_click",
  },
  {
    id: "hdg-archive",
    label: "Help Desk Geek author archive",
    href: "https://helpdeskgeek.com/author/akishorehdg/",
    event: "writing_sample_click",
  },
  {
    id: "tbrt-archive",
    label: "The Back Room Tech author archive",
    href: "https://thebackroomtech.com/author/akishoretbrt/",
    event: "writing_sample_click",
  },
  {
    id: "stm-archive",
    label: "Switching to Mac author archive",
    href: "https://www.switchingtomac.com/author/akishorestm/",
    event: "writing_sample_click",
  },
];
