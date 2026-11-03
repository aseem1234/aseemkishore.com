export const consultingOffers = [
  {
    slug: "content-seo-aeo-strategy",
    name: "Content, SEO & AEO strategy",
    title: "Give your content a clear job.",
    description: "Content audits, search and AI-answer discovery, refresh priorities and a plan grounded in your audience and business.",
    intro: "I review what your audience needs, how your existing content serves those needs and where search or AI-answer discovery creates gaps. The work starts with your actual archive, performance data and technical constraints.",
    helps: "For publishers and small teams deciding what to create, improve, consolidate or stop.",
    scope: ["Content inventories and audits: intent, overlap, usefulness and maintenance burden.", "Topic planning and briefs tied to real reader questions, with a clear point of view.", "SEO and AEO readiness: clear entities, source quality, page structure and internal linking.", "Refresh and consolidation priorities, with a measurement plan for the changes."],
    deliverables: ["A prioritized content and search plan", "Actionable briefs and refresh recommendations", "A practical measurement framework"],
    work: ["publishing-portfolio", "search-and-adaptation", "ai-content-pipeline"],
  },
  {
    slug: "editorial-operations",
    name: "Editorial operations",
    title: "Make the publishing process easier to run.",
    description: "Connect briefs, production, review and maintenance into a workable editorial process with clear ownership and handoffs.",
    intro: "A useful publishing process makes judgment easier to apply. I help connect planning, briefs, production, review and maintenance, with responsibilities that fit the team you have.",
    helps: "For publishers and content teams whose work gets stuck between an idea, a draft and a published page.",
    scope: ["Map the current workflow and find unclear ownership, repeated work and slow handoffs.", "Design briefs, assignment patterns, contributor onboarding and review checkpoints.", "Connect production with source verification, quality checks, updates and archive maintenance.", "Use dashboards and automation where they reduce coordination work and preserve editorial control."],
    deliverables: ["A documented editorial workflow", "Briefing, review and handoff templates", "A prioritized implementation backlog"],
    work: ["editorial-operations", "author-dashboard", "content-orchestrator"],
  },
  {
    slug: "ai-automation",
    name: "AI automation & tools",
    title: "Build useful automation around the work you already do.",
    description: "Workflow automation, email and CRM systems, focused apps and internal tools, and hands-on AI setup and training.",
    intro: "I help scope and implement workflows and tools that connect existing systems. We start with the task, the information involved and the decisions that need your control, then build toward a maintainable handoff.",
    helps: "For founders, publishers and small teams with a repeated task or a focused software problem.",
    scope: ["Recurring reports, data transfers, alerts and operational workflows.", "Email and CRM workflows with explicit review and sending rules.", "Focused dashboards, internal tools and AI-assisted application builds.", "AI tool configuration, project instructions, onboarding and practical training."],
    deliverables: ["A scoped workflow and acceptance criteria", "A tested implementation in your systems", "Documentation and a walkthrough"],
    work: ["social-posts-dashboard", "autonomous-email-responder", "portfolio-dashboard"],
  },
] as const;

export const automationSections = [
  {
    id: "workflow-automation",
    title: "Workflow automation",
    intro: "Connect recurring work so information moves through a defined process. A form can create a CRM record, an order can notify the team and a scheduled report can replace another manual spreadsheet export.",
    items: ["Form → CRM or spreadsheet; cross-tool data sync and webhooks", "Scheduled reports, operational alerts and exception handling", "Zapier, Make, n8n or direct APIs and scripts, chosen for the existing setup", "Testing, failure reporting, documented ownership and optional ongoing maintenance"],
    example: "content-orchestrator",
    exampleLabel: "See the Content Orchestrator case study",
  },
  {
    id: "email-crm",
    title: "Email and CRM workflows",
    intro: "Organize inbox-related work, prepare follow-up drafts and connect customer information with appropriate review steps. We agree which actions need approval before anything sends or changes customer records.",
    items: ["Classify and route inquiries, attachments and follow-up tasks", "Prepare context-aware email drafts from an inquiry and its history", "Keep CRM records and next actions in sync with the agreed workflow", "Explicit sending rules, audit trails and useful failure notifications"],
    example: "autonomous-email-responder",
    exampleLabel: "See the draft-only email responder case study",
  },
  {
    id: "apps-and-internal-tools",
    title: "Apps and internal tools",
    intro: "Develop focused dashboards, internal applications and lightweight tools with AI-assisted development. This can be a new workflow, an integration or help bringing a half-built project to a stable handoff.",
    items: ["Dashboards and internal tools with the data and views your team needs", "API integrations, AI-assisted content systems and focused application features", "Clear scope and acceptance criteria before coding; review of architecture and edge cases", "QA, deployment planning, rollback documentation and ownership of code and accounts"],
    example: "portfolio-dashboard",
    exampleLabel: "See the financial portfolio dashboard case study",
  },
  {
    id: "setup-and-training",
    title: "Setup and training",
    intro: "Get hands-on help configuring AI tools and using them for your own projects. Sessions start from your actual workflow and experience level, with live setup and practical examples.",
    items: ["Codex, Claude Code and Cursor configuration for your projects", "Project instructions, permissions and shared team conventions", "Scoping requests, providing context, reviewing output and knowing when to step in", "A written setup guide and handoff, with follow-up needs agreed in the proposal"],
    example: "skills-api",
    exampleLabel: "See a supporting automation backend in practice",
  },
] as const;

export function getConsultingOffer(slug: string) {
  return consultingOffers.find((offer) => offer.slug === slug);
}
