import type { ExperienceRole } from "./types";

export const experience: ExperienceRole[] = [
  {
    id: "position-tracker",
    organization: "PositionTracker",
    title: "Founder",
    location: "Clarksville, Maryland — remote",
    dates: {
      start: "2025-09",
      end: null,
      precision: "month",
    },
    summary:
      "Directing, designing, and iterating on a SaaS dashboard for organizing and analyzing stock and options positions — live at positiontracker.trading — using modern AI-assisted development workflows.",
    bullets: [
      "Defined the product concept, user workflows, and interface for tracking positions, research, and portfolio context in one place.",
      "Integrated financial market data, authentication, a Postgres data store, subscription billing, and a Vercel deployment workflow.",
      "Used AI coding agents to accelerate implementation while remaining responsible for product decisions, review, testing, and release quality.",
      "Applied publishing-era lessons about clarity, information architecture, and measurable outcomes to a SaaS product.",
    ],
  },
  {
    id: "akic",
    organization: "AK Internet Consulting",
    title: "Founder & Head of Digital Publishing and Content Operations",
    location: "Clarksville, Maryland — remote / distributed team",
    dates: {
      start: "2010-05",
      end: null,
      precision: "month",
      note: "Technology publishing began in 2007. AK Internet Consulting as a company is listed from May 2010.",
    },
    summary:
      "Built and operated a portfolio of technology publications, led a distributed editorial organization, and connected content strategy to audience growth and business results.",
    bullets: [
      "Built and operated a portfolio of five technology publications: Online Tech Tips, Help Desk Geek, Switching to Mac, The Back Room Tech, and Xbox Advisor.",
      "Reached approximately 7–8 million monthly pageviews across the network at its peak.",
      "Recruited and led more than 35 writers, editors, and contractors in a distributed environment.",
      "Oversaw a content portfolio exceeding 4,500 technology articles.",
      "Directed editorial strategy, topic selection, publishing calendars, content standards, contributor workflows, editing, and quality control.",
      "Used SEO, audience behavior, content performance, and revenue data to guide investment and iteration.",
      "Developed monetization programs involving advertising, affiliate relationships, and audience growth.",
      "Managed WordPress infrastructure and publishing technology supporting high-traffic websites.",
      "Introduced AI-assisted research, editorial, automation, and development workflows.",
      "Adapted business and content strategy through major changes in search, social distribution, advertising, and AI.",
    ],
  },
  {
    id: "ott-founding",
    organization: "Online Tech Tips",
    title: "Founder and Editor-in-Chief",
    location: "Remote",
    dates: {
      start: "2007-03",
      end: null,
      precision: "month",
      note: "Flagship publication. Operated alongside later sister sites and, from 2010, under AK Internet Consulting.",
    },
    summary:
      "Started a technology publication in 2007 while working in IT, then grew it from a single-author site into the flagship property of a multi-publication network.",
    bullets: [
      "Launched Online Tech Tips in 2007 to document practical technology problems and solutions.",
      "Wrote extensively in the early years, then recruited contributors and built editorial systems as demand grew.",
      "Set the editorial point of view: useful, specific, and readable for people trying to solve a real problem.",
      "Transitioned to operating the publications full time in 2010.",
    ],
  },
  {
    id: "orchid-cellmark",
    organization: "Orchid Cellmark",
    title: "Programmer, Systems Analyst, and Business Analyst",
    location: "Dallas, Texas",
    dates: {
      start: "2008-06",
      end: "2010-04",
      precision: "month",
    },
    summary:
      "Continued technical and analytical work at a DNA-testing laboratory after ReliaGene was acquired, spanning programming, systems analysis, and business analysis.",
    bullets: [
      "Worked across programming, systems analysis, and business analysis while publishing on the side.",
      "Supported internal systems and process work in a regulated laboratory environment.",
    ],
  },
  {
    id: "reliagene",
    organization: "ReliaGene Technologies",
    title: "Network Administrator; Programmer and Systems Analyst",
    location: "New Orleans, Louisiana",
    dates: {
      start: "2003-10",
      end: "2008-05",
      precision: "month",
      note: "Network and systems administration from 2003; programmer and systems/business analyst from 2005.",
    },
    summary:
      "Earlier technical career in network administration, programming, systems analysis, and business analysis at a DNA-testing laboratory.",
    bullets: [
      "Administered networks and systems, including directory services, servers, and network security.",
      "Moved into programming, systems analysis, and business analysis, including reporting and internal tools.",
      "This foundation is why later publishing, product, and AI work could sit next to engineering and operations conversations.",
    ],
  },
];

export const earlyCareerSummary =
  "Earlier professional experience included programming, network administration, systems analysis, business analysis, and IT support. That background still shapes how I work across content, technology, product, engineering, marketing, and operations.";
