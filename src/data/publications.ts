import type { Publication } from "./types";

export const statusLabels: Record<Publication["status"], string> = {
  active: "Active",
  building: "Building",
  live: "Live",
};

export const publications: Publication[] = [
  {
    slug: "online-tech-tips",
    name: "Online Tech Tips",
    kind: "publication",
    url: "https://www.online-tech-tips.com",
    founded: "2007",
    status: "active",
    audience:
      "Everyday technology users who need clear, practical guidance on software, devices, online tools, and emerging products.",
    editorialFocus:
      "How-to tutorials, explainers, and reviews that help readers solve a specific problem and get back to work. Coverage includes Windows, online tools, social networks, streaming, and AI.",
    role: "Founder and Editor-in-Chief",
    summary:
      "The flagship publication, started in 2007 while I was still working in IT. It began as a place to document troubleshooting work and became the first property in a multi-publication network.",
    strategy:
      "I treated OTT as a broad consumer-technology desk with a consistent voice: specific, useful, and unwilling to chase every trend. Topic selection mixed evergreen problem-solving with timely coverage when a change actually affected readers. Search intent informed the calendar, but the editorial test was whether the piece would still help someone six months later.",
    scale:
      "Part of a five-publication portfolio that reached approximately 7–8 million monthly pageviews at its peak and now contains more than 4,500 technology articles across the network.",
    team:
      "Grew from a single-author site into a multi-contributor publication with briefs, editing, and quality standards shared across the network.",
    businessModel:
      "Advertising, affiliate relationships, and email audience development, supported by organic search.",
    demonstrates:
      "How a founder can set editorial point of view, then build the systems that let other writers work inside it.",
    tech: ["WordPress", "PHP", "Rocket.net"],
    featured: true,
  },
  {
    slug: "help-desk-geek",
    name: "Help Desk Geek",
    kind: "publication",
    url: "https://helpdeskgeek.com",
    founded: "2008",
    foundedNote:
      "LinkedIn and the AKIC about page use 2008. The existing project record listed 2009.",
    status: "active",
    audience:
      "Readers who want troubleshooting help — technically curious consumers and people doing help-desk style work, not enterprise IT strategy.",
    editorialFocus:
      "Short, actionable fixes for Windows, Office, browsers, accounts, and everyday software failures. The site is built around getting someone unstuck quickly.",
    role: "Founder and Managing Editor",
    summary:
      "The second publication in the network, positioned around troubleshooting rather than general tech curiosity. HDG is where editorial discipline shows up as brevity, sequence, and respect for the reader’s time.",
    strategy:
      "I kept HDG from drifting into gadget news or enterprise architecture. The point of view is: diagnose, try the safest fix first, and explain what the reader is looking at. Content briefs and review cycles mattered here because a wrong step wastes someone’s afternoon.",
    scale:
      "A core property in the network’s 4,500+ article library and a major contributor to peak audience across the portfolio.",
    team:
      "Writers and editors worked from shared troubleshooting standards, with editing focused on accuracy, order of operations, and clarity.",
    businessModel:
      "Search-driven how-to inventory, display advertising, and affiliate relationships around software and tools readers already needed.",
    demonstrates:
      "Editorial governance: what belongs on the site, how a fix should be structured, and how quality is protected at volume.",
    tech: ["WordPress", "PHP", "Rocket.net"],
    featured: true,
  },
  {
    slug: "switching-to-mac",
    name: "Switching to Mac",
    kind: "publication",
    url: "https://www.switchingtomac.com",
    founded: "2010",
    status: "active",
    audience:
      "Apple-focused consumers — people moving from Windows, and existing Mac, iPhone, iPad, and Apple Watch users who want practical guidance.",
    editorialFocus:
      "Tutorials, setup guides, and product explainers across the Apple ecosystem, with extra attention to migration and the details that make Apple software less opaque.",
    role: "Founder and Editor-in-Chief",
    summary:
      "Launched to give Apple coverage its own desk instead of folding it into a general technology site. The name started with migration; the publication grew into ongoing Apple-ecosystem education.",
    strategy:
      "Separate positioning let us write for Apple users without forcing every OTT or HDG article through an Apple lens. Calendars balanced evergreen setup guides with timely coverage when Apple shipped something readers would actually have to live with.",
    scale:
      "One of five major publications in the network, with a distinct audience and contributor bench.",
    team:
      "Contributors who could write clearly about Apple software, reviewed against the same network standards for accuracy and usefulness.",
    businessModel:
      "Organic search, advertising, and affiliate programs relevant to Apple hardware, software, and accessories.",
    demonstrates:
      "Audience-specific editorial strategy: knowing when a topic needs its own publication rather than another category on an existing site.",
    tech: ["WordPress", "PHP", "Rocket.net"],
    featured: true,
  },
  {
    slug: "the-back-room-tech",
    name: "The Back Room Tech",
    kind: "publication",
    url: "https://thebackroomtech.com",
    founded: "2007",
    foundedNote:
      "The publication’s own project record and on-site history use 2007. An AKIC about timeline lists 2010.",
    status: "active",
    audience:
      "Working IT and sysadmin readers — people who keep servers, networks, and internal tools running. Not enterprise strategy, and not consumer gadget coverage.",
    editorialFocus:
      "Hands-on guides for infrastructure, Linux, Windows Server, scripting, virtualization, and the tools that show up in a real back room.",
    role: "Founder and Managing Editor",
    summary:
      "The technical publication in the network. TBRT exists so IT-specific work does not get flattened into consumer how-tos, and so consumer sites do not pretend to be sysadmin desks.",
    strategy:
      "I kept the voice practical and environment-aware: commands, failure modes, and the difference between a lab tip and a production change. That point of view also made it the natural home for later writing about AI coding tools.",
    scale:
      "A specialized desk inside the larger 4,500+ article portfolio, aimed at a narrower and more technical reader.",
    team:
      "Contributors with hands-on technical backgrounds, edited for correctness and for not overselling a procedure.",
    businessModel:
      "Search and referral traffic from IT readers, with advertising and affiliate programs that fit infrastructure and software tools.",
    demonstrates:
      "Knowing which subjects do not fit a consumer publication, and building a separate editorial home instead of diluting both audiences.",
    tech: ["WordPress", "PHP", "Rocket.net"],
    featured: true,
  },
  {
    slug: "xbox-advisor",
    name: "Xbox Advisor",
    kind: "publication",
    url: "https://xboxadvisor.com",
    founded: "2023",
    status: "active",
    audience:
      "Xbox players who want setup help, troubleshooting, hardware guidance, and clear coverage of the games and features they actually use.",
    editorialFocus:
      "Xbox-specific how-tos, reviews, and features — from error codes and accessories to game recommendations — written for players rather than for a general tech audience.",
    role: "Founder and Owner",
    summary:
      "The newest publication in the network. Xbox Advisor extends the same editorial model into gaming: a defined audience, a defined desk, and standards that still apply when the subject is entertainment.",
    strategy:
      "I did not fold Xbox coverage into OTT or HDG. Gaming readers arrive with different intent, and the calendar has to balance evergreen troubleshooting with timely game and platform changes without turning the site into rumor coverage.",
    scale:
      "The fifth major publication in the portfolio, launched after the network’s core editorial systems were already in place.",
    team:
      "Uses the same contributor, briefing, and review patterns as the older sites, adapted to gaming subject matter.",
    businessModel:
      "Advertising and affiliate relationships around games, hardware, and subscriptions, supported by search and regular publishing.",
    demonstrates:
      "That the operating system — positioning, calendars, contributors, and quality control — can be applied to a new vertical without starting from zero.",
    tech: ["WordPress", "PHP", "Rocket.net"],
    featured: true,
  },
  {
    slug: "position-tracker",
    name: "PositionTracker",
    kind: "product",
    url: "https://positiontracker.trading",
    founded: "2025",
    status: "live",
    audience:
      "Individual investors and active traders who want one place to organize stock and options positions, research, and portfolio context.",
    editorialFocus:
      "Not a publication. A SaaS product for position tracking, analysis, and market-context workflows.",
    role: "Founder — product, design, and AI-assisted development",
    summary:
      "A SaaS dashboard for organizing and analyzing stock and options positions. I directed the concept, workflows, interface, and implementation using modern AI-assisted development — I do not claim to have hand-coded every line or to be a senior software engineer.",
    strategy:
      "The product started from a real workflow problem: positions, research, and market context were spread across too many tools. I designed around that job-to-be-done, then chose a stack that could support authentication, financial data, billing, and iteration.",
    team:
      "Founder-led product work with AI coding agents, review, and deployment discipline.",
    businessModel:
      "Subscription plans. Not financial advice, and not a brokerage.",
    demonstrates:
      "Product thinking, technical collaboration, and the ability to move from content systems into SaaS without abandoning judgment about what users actually need.",
    tech: [
      "JavaScript",
      "HTML",
      "CSS",
      "Financial Modeling Prep API",
      "Clerk",
      "Neon Postgres",
      "Vercel",
      "Stripe",
      "GitHub",
    ],
    featured: true,
  },
  {
    slug: "ak-internet-consulting",
    name: "AK Internet Consulting",
    kind: "company",
    url: "https://akinternetconsulting.com",
    founded: "2010",
    foundedNote:
      "Company listed from 2010. Publishing activity began in 2007. An older project record listed 2008.",
    status: "active",
    audience:
      "The operating company behind the publications, plus selected consulting for teams that need publishing, WordPress, workflow, or AI-assisted build help.",
    editorialFocus:
      "Digital publishing and content operations first. Consulting is a supporting offering, not the whole professional identity.",
    role: "Founder & Head of Digital Publishing and Content Operations",
    summary:
      "The company through which I have operated the publication network and, more recently, offered WordPress care, workflow automation, and AI-assisted software work. The consulting catalog should not be mistaken for the full scope of the career.",
    strategy:
      "AKIC exists to run the publications as a business: contributors, infrastructure, monetization, and later AI-enabled production. Advisory work grew out of those operations, not the other way around.",
    scale:
      "Parent organization for five publications, a 35+ contributor bench at peak, and a 4,500+ article library.",
    team:
      "Distributed writers, editors, and contractors, plus vendors for hosting, advertising, and related services.",
    businessModel:
      "Publishing revenue from advertising, affiliates, and audience, with selected project-based consulting.",
    demonstrates:
      "Founder experience that maps to head-of-function work: strategy, people, operations, technology, and P&L-adjacent decisions.",
    tech: ["WordPress", "Next.js", "Claude Code", "Make.com", "n8n"],
    featured: true,
  },
];

export function getPublication(slug: string): Publication | undefined {
  return publications.find((item) => item.slug === slug);
}

export function getFeaturedPublications(): Publication[] {
  return publications.filter((item) => item.featured);
}
