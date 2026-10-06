import { links } from "./profile";
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "publishing-portfolio",
    title: "Building a Five-Publication Technology Network",
    subtitle: "Five audience-specific desks, one operating system",
    featured: true,
    teaser:
      "How one troubleshooting blog became five audience-specific desks and 6,000+ articles.",
    chips: ["Content strategy", "Portfolio strategy", "Organic growth"],
    summary: {
      problem:
        "I started Online Tech Tips in March 2007 while working in IT. It grew fast, and a single general-interest desk soon couldn’t serve everyone well. Windows troubleshooters, Mac switchers, working sysadmins and gamers want different depth, different vocabulary and different promises. Folding them into one site would have blurred the voice and made the archive harder to manage.",
      didHeading: "What I did",
      did: [
        {
          text: "Launched Help Desk Geek in 2009, then Switching to Mac, The Back Room Tech and Xbox Advisor, each with its own audience and scope, including what it would not cover.",
        },
        {
          text: "Ran the network full time through AK Internet Consulting from May 2010 as Founder & Head of Digital Publishing and Content Operations.",
        },
        {
          text: "Kept one shared quality bar and editing approach across all five, so standards didn’t depend on which site a reader landed on.",
        },
        {
          text: "Tied editorial calendars to search intent and real reader problems instead of chasing keywords for their own sake.",
        },
        {
          text: "Treated the archive as a product: updated, consolidated or retired pages instead of only adding new URLs.",
        },
      ],
      results: [
        "Five technology publications, all still active",
        "About 7–8 million monthly pageviews across the network at peak",
        "6,000+ articles across the network, including 3,000+ I wrote myself",
        "Up to 35 writers/editors at peak",
      ],
    },
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
      "More than 6,000 articles across the network, including 3,000+ I wrote myself.",
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
    title: "Running Editorial Operations for Up to 35 Writers/Editors",
    subtitle: "Up to 35 writers/editors without turning publishing into a factory",
    featured: true,
    teaser:
      "Briefs, review cycles and standards that kept quality steady as the team grew to 35.",
    chips: ["Editorial operations", "Team leadership", "Quality systems"],
    summary: {
      problem:
        "A single-author site can keep its point of view in one person’s head. A network publishing every day across five desks can’t. As the team grew, remote writers brought different research habits and different assumptions about what readers already knew. Volume and quality pulled in opposite directions, and “write it like I would” doesn’t scale.",
      didHeading: "What I built",
      did: [
        {
          lead: "Recruiting and onboarding",
          text: "for a distributed team that reached up to 35 writers/editors at peak.",
        },
        {
          lead: "Content briefs",
          text: "that spell out audience, search intent, angle and what the piece should not try to be.",
        },
        {
          lead: "Review cycles",
          text: "with clear checkpoints and a shared definition of “done,” so editing wasn’t a matter of taste.",
        },
        {
          lead: "Editorial feedback, not just accept/reject:",
          text: "writers got specific notes so they improved over time.",
        },
        {
          lead: "Assignment and update workflows",
          text: "across time zones, including ownership of older articles, not just new ones.",
        },
        {
          lead: "A working-editor role for myself:",
          text: "I kept writing and editing (3,000+ articles under my own name) so standards stayed grounded in the actual work.",
        },
      ],
      results: [
        "Up to 35 writers/editors managed at peak, fully remote",
        "Continuous publishing across five publications from one set of operating habits",
        "6,000+ articles across the network, a library big enough to need governance as well as production",
      ],
    },
    context:
      "A single-author site can hold a point of view in one person’s head. A network that publishes continuously cannot. The work had to become teachable: who writes, what a brief contains, how review works, and what “done” means.",
    challenge:
      "Volume and quality pull in opposite directions. Remote contributors also pull toward inconsistency — different habits, different research depth, different sense of what the reader already knows. The operation needed structure without becoming a content mill.",
    role: "Recruited, managed and edited a distributed team of up to 35 writers/editors. Set standards, assigned work and remained a working editor.",
    strategy: [
      "Hire for judgment and clarity, then teach the publication’s point of view rather than a generic style sheet alone.",
      "Use briefs to lock audience, intent, angle, and what the piece should not try to be.",
      "Keep review cycles short enough to ship and strict enough to catch thin research or muddy structure.",
      "Mentor contributors with direct editorial feedback instead of only accepting or rejecting drafts.",
    ],
    execution: [
      "Recruited and managed up to 35 writers/editors at peak.",
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
    title: "Search, AI Answers and a Staged AI Content Pipeline",
    subtitle:
      "Organic-first content strategy, adapted for AI search, plus a staged AI pipeline that researches, drafts and checks content across several sites.",
    featured: true,
    teaser:
      "Organic-first content strategy, adapted for AI search, plus a staged AI pipeline that researches, drafts and checks content across several sites.",
    chips: ["SEO", "AEO / AI search", "AI content operations"],
    summary: {
      problem:
        "Organic search was always the main way readers found the publications, but a weak result can mean many things: a weak idea, a weak draft, an aging page, a changed results page or a topic we shouldn’t own. Then AI-generated answers started changing how people discover and trust information. Separately, manual research, drafting, screenshots and CMS prep capped how fast a small team could produce review-ready drafts across several sites.",
      didHeading: "What I did",
      did: [
        {
          lead: "Search lifecycle:",
          text: "directed topic selection, audits, refreshes, pruning and internal linking across the portfolio, starting from search intent and a real reader problem.",
        },
        {
          lead: "Performance reviews:",
          text: "read traffic and engagement after publishing to tell demand problems from execution problems, then updated, consolidated or stopped.",
        },
        {
          lead: "AI search (AEO) approach:",
          text: "treat answer engines as a distribution and trust problem. Clear intent, clear entities, accurate steps and a real point of view make a page worth citing; undifferentiated AI pages don’t.",
        },
        {
          lead: "AI content pipeline:",
          text: "designed a staged system that runs discovery → duplicate check → research brief → draft → review and fact-check gates → visuals → WordPress. It produces drafts and stages the work so editorial standards are built into each step.",
        },
      ],
      results: [
        "Search stayed a core acquisition channel through multiple algorithm and distribution shifts; the network reached about 7–8 million monthly pageviews at peak.",
        "Configured for 5 WordPress properties (Online Tech Tips, Help Desk Geek, Switching to Mac, The Back Room Tech and Xbox Advisor) with 9 controlled workflow stages.",
        "About 1,206 articles published automatically so far: 875 through the content automation pipeline and 331 through the content refresh pipeline.",
      ],
      resultsNote:
        "Not claimed: rankings, AI Overview / answer-engine citation counts, traffic lift from the pipeline or current traffic.",
      relatedEssay: {
        label:
          "AI Is Changing Search. Content Leaders Need More Than Another SEO Checklist",
        href: "/thoughts/ai-is-changing-search",
      },
      stack: "WordPress REST API · GitHub Actions · Playwright + Sharp (per the AK Internet Consulting page)",
    },
    skills: [
      "SEO",
      "Analytics",
      "Content lifecycle",
      "Distribution",
      "AEO",
      "GEO",
      "AI search",
      "AI content operations",
    ],
    relatedSlugs: ["online-tech-tips", "help-desk-geek", "the-back-room-tech"],
    links: [
      {
        id: "akic-ai-content-pipeline",
        label: "AI Content Pipeline on AK Internet Consulting",
        href: "https://akinternetconsulting.com/work-samples/ai-content-pipeline",
        event: "akic_click",
      },
    ],
  },
  {
    slug: "position-tracker",
    title: "Building PositionTracker With AI-Assisted Development",
    subtitle: "A SaaS product directed, designed, and iterated with modern AI workflows",
    featured: false,
    kicker: "Product / AI-workflow proof",
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
      "Kept the public claim accurate: this is a live product I built and operate, not a claim of institutional asset management.",
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
