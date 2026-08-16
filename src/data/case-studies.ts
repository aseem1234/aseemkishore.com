import { links } from "./profile";
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "publishing-portfolio",
    title: "Building a Multi-Publication Technology Network",
    subtitle: "Five audience-specific desks, one operating system",
    featured: true,
    context:
      "I started publishing technology guides in 2007 while working in IT. The first site, Online Tech Tips, grew quickly enough that a single general-interest desk could not serve every reader well.",
    challenge:
      "A consumer troubleshooting audience, Apple users, working IT readers, and later Xbox players do not want the same stories, voice, or calendar. Folding everything into one site would have diluted the point of view. Treating each new topic as a random post would have made the library unmanageable.",
    role: "Founder responsible for positioning, editorial strategy, operations, technology, and business outcomes across the portfolio.",
    strategy: [
      "Give each publication a defined audience and a clear statement of what it will not cover.",
      "Keep a shared quality bar — usefulness, accuracy, and readable structure — while letting voice and depth vary by desk.",
      "Use search intent and reader problems to plan calendars, without turning the sites into keyword factories.",
      "Connect publishing decisions to audience growth, advertising, affiliate programs, and the cost of maintaining a large library.",
    ],
    execution: [
      "Launched Online Tech Tips in 2007, then added Help Desk Geek, Switching to Mac, The Back Room Tech, and later Xbox Advisor.",
      "Wrote heavily in the early years, then shifted toward recruiting contributors and building editorial systems as volume grew.",
      "Operated the work full time from 2010 through AK Internet Consulting.",
      "Maintained WordPress infrastructure capable of supporting high-traffic publishing.",
    ],
    systems: [
      "Per-publication positioning and topic boundaries",
      "Shared briefing, editing, and quality-control patterns",
      "Content inventory and internal-linking practices across a large archive",
      "Analytics review to decide what to expand, update, or stop",
    ],
    results: [
      "Five major technology publications, each with a distinct audience.",
      "Approximately 7–8 million monthly pageviews across the network at its peak.",
      "A portfolio of more than 4,500 technology articles.",
    ],
    lessons: [
      "Audience-specific positioning is an editorial decision, not a branding exercise.",
      "A large archive is an asset only if someone is accountable for quality, updates, and what no longer belongs.",
      "Founder work in publishing includes people, systems, and business results — not only bylines.",
    ],
    skills: [
      "Content strategy",
      "Digital publishing",
      "Audience development",
      "SEO",
      "Editorial leadership",
      "Monetization",
      "Business strategy",
    ],
    relatedSlugs: [
      "online-tech-tips",
      "help-desk-geek",
      "switching-to-mac",
      "the-back-room-tech",
      "xbox-advisor",
    ],
    links: [
      { id: "ott", label: "Online Tech Tips", href: "https://www.online-tech-tips.com" },
      { id: "hdg", label: "Help Desk Geek", href: "https://helpdeskgeek.com" },
      { id: "stm", label: "Switching to Mac", href: "https://www.switchingtomac.com" },
      { id: "tbrt", label: "The Back Room Tech", href: "https://thebackroomtech.com" },
      { id: "xbox", label: "Xbox Advisor", href: "https://xboxadvisor.com" },
    ],
  },
  {
    slug: "editorial-operations",
    title: "Scaling Editorial Operations Across a Distributed Team",
    subtitle: "More than 35 contributors without turning publishing into a factory",
    featured: true,
    context:
      "A single-author site can hold a point of view in one person’s head. A network that publishes continuously cannot. The work had to become teachable: who writes, what a brief contains, how review works, and what “done” means.",
    challenge:
      "Volume and quality pull in opposite directions. Remote contributors also pull toward inconsistency — different habits, different research depth, different sense of what the reader already knows. The operation needed structure without becoming a content mill.",
    role: "Recruited, managed, and edited a distributed group of writers, editors, and contractors. Set standards, assigned work, and remained a working editor.",
    strategy: [
      "Hire for judgment and clarity, then teach the publication’s point of view rather than a generic style sheet alone.",
      "Use briefs to lock audience, intent, angle, and what the piece should not try to be.",
      "Keep review cycles short enough to ship and strict enough to catch thin research or muddy structure.",
      "Mentor contributors with direct editorial feedback instead of only accepting or rejecting drafts.",
    ],
    execution: [
      "Recruited and collaborated with more than 35 writers, editors, and contractors.",
      "Assigned work against calendars that mixed evergreen library-building with timely coverage.",
      "Edited for accuracy, sequence, and voice so a reader could act on the piece.",
      "Balanced speed with quality when news or product changes created real reader demand.",
    ],
    systems: [
      "Content briefs and assignment workflows",
      "Editorial guidelines and review checkpoints",
      "Remote collaboration across time zones",
      "Quality-control and update processes for a living archive",
    ],
    results: [
      "A distributed editorial organization, not a one-person blog with occasional guests.",
      "Consistent publishing across multiple desks from the same operating habits.",
      "A library large enough to require governance, not only production.",
    ],
    lessons: [
      "Standards are how a point of view survives contact with more than one writer.",
      "Mentorship is operational: better briefs and better feedback reduce rework.",
      "Remote work is manageable when the workflow is explicit and the editor stays close to the writing.",
    ],
    skills: [
      "Team leadership",
      "Mentorship",
      "Editorial operations",
      "Workflow design",
      "Contributor management",
      "Quality systems",
    ],
    relatedSlugs: ["ak-internet-consulting", "help-desk-geek", "online-tech-tips"],
    links: [links.akic],
  },
  {
    slug: "search-and-adaptation",
    title: "Adapting Content Strategy for Search and AI",
    subtitle: "Performance, lifecycle, and judgment — not another keyword checklist",
    featured: true,
    context:
      "Organic search has been the primary way readers found the publications. That made SEO unavoidable, but it was never the whole strategy. The useful question was always why a piece performed the way it did.",
    challenge:
      "Search demand, content quality, distribution, and audience behavior can fail independently. A weak ranking can mean a weak idea, a weak draft, a page that aged, a change in the results page, or a topic the publication should not have chased. Later, AI-generated answers changed how people discover and trust information again.",
    role: "Directed topic selection, content investment, audits, updates, and the interpretation of performance data across the portfolio.",
    strategy: [
      "Start from search intent and a real reader problem, then decide whether the publication should own that topic.",
      "Use traffic, rankings, engagement, and revenue signals to distinguish demand issues from execution issues.",
      "Treat the archive as a product: refresh, prune, and internally link instead of only adding new URLs.",
      "Evaluate AI search as a distribution and trust problem, not as a reason to abandon editorial standards.",
    ],
    execution: [
      "Planned calendars around evergreen demand and timely changes that actually affected readers.",
      "Ran content audits to find decay, duplication, and pages that no longer matched current software or search behavior.",
      "Updated and extended successful material rather than replacing it with near-duplicate posts.",
      "Introduced AI-assisted research and production only where human review still owned accuracy and point of view.",
    ],
    systems: [
      "Keyword and intent research tied to editorial calendars",
      "Performance review loops after publication",
      "Content-update and pruning workflows",
      "Internal linking and information architecture across a large library",
    ],
    results: [
      "Search remained a core acquisition channel through multiple algorithm and distribution shifts.",
      "The network reached approximately 7–8 million monthly pageviews at its peak.",
      "Editorial investment could be justified — or withdrawn — with evidence rather than habit.",
    ],
    lessons: [
      "SEO is a distribution method. It does not replace a point of view.",
      "Content decay is normal. Ignoring it is an editorial failure.",
      "AI can speed research and production. It cannot be accountable for what a publication puts in front of a reader.",
    ],
    skills: [
      "SEO",
      "Analytics",
      "Content lifecycle",
      "Distribution",
      "AEO",
      "GEO",
      "AI search",
      "Strategic adaptation",
    ],
    relatedSlugs: ["online-tech-tips", "help-desk-geek", "the-back-room-tech"],
    links: [
      { id: "ott", label: "Online Tech Tips", href: "https://www.online-tech-tips.com" },
      { id: "hdg", label: "Help Desk Geek", href: "https://helpdeskgeek.com" },
    ],
  },
  {
    slug: "position-tracker",
    title: "Building PositionTracker With AI-Assisted Development",
    subtitle: "A SaaS product directed, designed, and iterated with modern AI workflows",
    featured: true,
    context:
      "After years of running publishing systems, I started building PositionTracker: a dashboard for organizing and analyzing stock and options positions. The product came from a practical problem — positions, research, and market context lived in too many places.",
    challenge:
      "Individual investors can see quotes, options chains, filings, and notes in separate tools. Spreadsheets do not keep up. I needed a product that made the book of positions understandable without pretending to be a brokerage or a source of financial advice.",
    role: "Founder. I directed product concept, user workflows, interface design, and implementation using AI-assisted development. I review, test, and decide what ships. I do not claim to have hand-coded every line or to be a senior software engineer.",
    strategy: [
      "Define the job: one place to see positions, context, and the next question a user should ask.",
      "Choose a stack that supports authentication, financial data, a real database, billing, and frequent iteration.",
      "Use AI coding agents to move faster on implementation while keeping humans responsible for product judgment and quality.",
      "Apply publishing lessons: information architecture, clarity, and measurable outcomes.",
    ],
    execution: [
      "Designed workflows and a responsive interface around portfolio and options use cases.",
      "Integrated financial data, Clerk authentication, Neon Postgres, Stripe subscriptions, and Vercel deployment.",
      "Worked through GitHub, pull requests, testing, and release habits rather than treating the app as a one-off prototype.",
      "Kept the public claim accurate: this is a product I am building and operating, not a claim of institutional asset management.",
    ],
    systems: [
      "AI-assisted development with human review",
      "Auth, data, billing, and hosting as first-class product pieces",
      "Subscription plans and user-account workflows",
      "Iterative release on Vercel",
    ],
    results: [
      "A live SaaS product at positiontracker.trading.",
      "A working example of moving from content operations into product operations.",
      "A clearer view of how content, software, and business models inform one another.",
    ],
    lessons: [
      "AI agents change the pace of software work. They do not remove the need for taste, testing, or accountability.",
      "Product work makes publishing instincts more concrete: users either understand the interface or they leave.",
      "The transferable skill is systems: define the job, choose the constraints, measure whether the thing works.",
    ],
    skills: [
      "Product thinking",
      "SaaS",
      "APIs",
      "AI development workflows",
      "User experience",
      "Technical collaboration",
      "Business strategy",
    ],
    relatedSlugs: ["position-tracker"],
    links: [links.positionTracker],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((item) => item.featured);
}
