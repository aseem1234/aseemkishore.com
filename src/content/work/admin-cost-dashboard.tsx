import Link from "next/link";



const costCategories = [
  {
    name: "AI Services",
    color: "bg-purple-500",
    textColor: "text-purple-500",
    bgLight: "bg-purple-50 mwork:bg-purple-900/20",
    services: ["Anthropic (Claude)", "OpenAI (GPT)"],
    tracking: "API usage: input tokens, output tokens, cost per model",
  },
  {
    name: "Infrastructure",
    color: "bg-blue-500",
    textColor: "text-blue-500",
    bgLight: "bg-blue-50 mwork:bg-blue-900/20",
    services: ["Vercel", "Neon PostgreSQL", "Clerk", "Resend"],
    tracking: "Functions, bandwidth, compute hours, storage",
  },
  {
    name: "Data Providers",
    color: "bg-green-500",
    textColor: "text-green-500",
    bgLight: "bg-green-50 mwork:bg-green-900/20",
    services: ["Financial Modeling Prep", "Polygon.io"],
    tracking: "API call quotas, subscription tiers",
  },
  {
    name: "Developer Tools",
    color: "bg-amber-500",
    textColor: "text-amber-500",
    bgLight: "bg-amber-50 mwork:bg-amber-900/20",
    services: ["GitHub Actions", "Sentry", "Cursor IDE"],
    tracking: "CI/CD minutes, error events, licenses",
  },
  {
    name: "Payments",
    color: "bg-red-500",
    textColor: "text-red-500",
    bgLight: "bg-red-50 mwork:bg-red-900/20",
    services: ["Stripe"],
    tracking: "Transaction fees, revenue, MRR/ARR",
  },
];

const integrations = [
  { name: "Vercel", type: "API", description: "Usage breakdown with tiered pricing calculations" },
  { name: "Anthropic", type: "API", description: "Org-level usage with Claude Code filtering" },
  { name: "OpenAI", type: "API", description: "Daily cost aggregation by model" },
  { name: "Stripe", type: "API", description: "Revenue, fees, MRR/ARR from subscriptions" },
  { name: "Neon", type: "API", description: "Compute hours, storage, data transfer" },
  { name: "GitHub", type: "API", description: "Actions minutes by runner type" },
  { name: "Sentry", type: "API", description: "Event counts and quota tracking" },
  { name: "Clerk", type: "Manual", description: "Fixed monthly auth service cost" },
  { name: "FMP", type: "Manual", description: "Stock data API subscription" },
  { name: "Polygon", type: "Manual", description: "Options data subscription" },
  { name: "Cursor", type: "Manual", description: "IDE license" },
  { name: "Resend", type: "Manual", description: "Email service" },
  { name: "PDFShift", type: "Manual", description: "PDF generation" },
];

const dashboardFeatures = [
  {
    title: "Real-Time Summary",
    description: "Total costs, revenue, net profit, and margin at a glance",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Category Breakdown",
    description: "Visual pie chart showing cost distribution by category",
    icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
  },
  {
    title: "Service Cards",
    description: "Individual cost display with detailed metadata per service",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    title: "Historical Trends",
    description: "Line charts showing costs and revenue over 3-12 months",
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
  },
  {
    title: "Manual Cost Entry",
    description: "Add/edit fixed monthly subscriptions with notes",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  },
  {
    title: "Auto-Fetch Cron",
    description: "Daily automated cost fetching at 00:05 UTC",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function AdminCostDashboard() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-linear-to-br from-emerald-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container-narrow relative">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work Samples
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="tag bg-emerald-500/20 text-emerald-400">Dashboard</span>
            <span className="tag bg-blue-500/20 text-blue-400">SaaS</span>
            <span className="tag bg-purple-500/20 text-purple-400">Operations</span>
          </div>

          <h1 className="text-white mb-6">Admin Cost Dashboard</h1>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl">
            A unified operations dashboard that tracks all costs associated with running
            a SaaS product — from AI services to infrastructure to payment processing fees.
          </p>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-red-50 mwork:bg-red-950/30 rounded-xl p-6 md:p-8 border border-red-200 mwork:border-red-900">
              <div className="w-12 h-12 rounded-xl bg-red-100 mwork:bg-red-900/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600 mwork:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-900 mwork:text-red-300 mb-3">The Problem</h3>
              <ul className="space-y-2 text-red-800 mwork:text-red-200">
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  Running a SaaS requires 10-15+ vendor subscriptions
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  Costs scattered across billing portals and invoices
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  Hard to see total operational costs at a glance
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  No easy way to compare costs vs revenue
                </li>
              </ul>
            </div>

            <div className="bg-green-50 mwork:bg-green-950/30 rounded-xl p-6 md:p-8 border border-green-200 mwork:border-green-900">
              <div className="w-12 h-12 rounded-xl bg-green-100 mwork:bg-green-900/50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 mwork:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mwork:text-green-300 mb-3">The Solution</h3>
              <ul className="space-y-2 text-green-800 mwork:text-green-200">
                <li className="flex gap-2">
                  <span className="text-green-500">•</span>
                  One dashboard for all 13+ vendor costs
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">•</span>
                  Automatic API fetching for supported services
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">•</span>
                  Color-coded categories for quick understanding
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">•</span>
                  Revenue vs costs with profit margin calculation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Categories */}
      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-neutral-900 mwork:text-white mb-4">5 Cost Categories</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              Every expense is categorized for clear visibility into where money goes.
            </p>
          </div>

          <div className="space-y-4">
            {costCategories.map((category) => (
              <div
                key={category.name}
                className={`${category.bgLight} rounded-xl p-6 border border-neutral-200 mwork:border-neutral-700`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-4 h-4 rounded-full ${category.color} mt-1 flex-shrink-0`} />
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className={`font-bold ${category.textColor}`}>{category.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.services.map((service) => (
                          <span
                            key={service}
                            className="text-xs bg-white mwork:bg-neutral-800 px-2 py-1 rounded-full text-neutral-600 mwork:text-neutral-400"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 mwork:text-neutral-400">{category.tracking}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-neutral-900 mwork:text-white mb-4">13+ Vendor Integrations</h2>
            <p className="text-neutral-600 mwork:text-neutral-400">
              API-enabled services fetch automatically; others support manual entry.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="bg-neutral-50 mwork:bg-neutral-900 rounded-xl p-5 border border-neutral-200 mwork:border-neutral-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-neutral-900 mwork:text-white">{integration.name}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      integration.type === "API"
                        ? "bg-green-100 mwork:bg-green-900/50 text-green-700 mwork:text-green-300"
                        : "bg-neutral-200 mwork:bg-neutral-700 text-neutral-600 mwork:text-neutral-400"
                    }`}
                  >
                    {integration.type}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-neutral-900 mwork:text-white mb-4">Dashboard Features</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardFeatures.map((feature) => (
              <div key={feature.title} className="bg-white mwork:bg-neutral-800 rounded-xl p-6 border border-neutral-200 mwork:border-neutral-700">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 mwork:text-white mb-2">{feature.title}</h4>
                <p className="text-neutral-600 mwork:text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-neutral-900 mwork:text-white mb-4">How Data Flows</h2>
          </div>

          <div className="bg-neutral-50 mwork:bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-200 mwork:border-neutral-700">
            <div className="grid gap-6 items-center md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-3 lg:gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 mwork:text-white mb-1">Daily Cron</h4>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">00:05 UTC trigger</p>
              </div>

              <div className="hidden md:flex justify-center">
                <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 mwork:text-white mb-1">API Fetch</h4>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">7 parallel requests</p>
              </div>

              <div className="hidden md:flex justify-center">
                <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 mwork:text-white mb-1">Database</h4>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">Neon PostgreSQL</p>
              </div>

              <div className="hidden md:flex justify-center">
                <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 mwork:text-white mb-1">Dashboard</h4>
                <p className="text-sm text-neutral-600 mwork:text-neutral-400">Next.js + Recharts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section bg-neutral-50 mwork:bg-neutral-900">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-neutral-900 mwork:text-white mb-4">Tech Stack</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Next.js 14", category: "Framework", description: "App Router with TypeScript" },
              { name: "Tailwind CSS", category: "Styling", description: "Dark mode, responsive design" },
              { name: "Recharts", category: "Charts", description: "Trend visualization" },
              { name: "Neon", category: "Database", description: "Serverless PostgreSQL" },
              { name: "Vercel", category: "Hosting", description: "Deployment + cron jobs" },
              { name: "Stripe SDK", category: "Integration", description: "Revenue tracking" },
              { name: "TypeScript", category: "Language", description: "Type-safe throughout" },
              { name: "React 18", category: "UI", description: "Server components" },
            ].map((tech) => (
              <div key={tech.name} className="bg-white mwork:bg-neutral-800 rounded-xl p-5 border border-neutral-200 mwork:border-neutral-700">
                <span className="text-xs font-medium text-brand-orange uppercase tracking-wide">{tech.category}</span>
                <h4 className="font-semibold text-neutral-900 mwork:text-white mt-1">{tech.name}</h4>
                <p className="text-sm text-neutral-500 mwork:text-neutral-400 mt-1">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="section bg-white mwork:bg-neutral-950">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-neutral-900 mwork:text-white mb-4">Business Value</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Financial Clarity",
                description: "Know exactly where every dollar goes. No more spreadsheet chaos.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Profitability Tracking",
                description: "See revenue vs costs instantly. Know your margins in real-time.",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                title: "Vendor Optimization",
                description: "Identify which services drive costs. Negotiate or replace intelligently.",
                icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
              },
              {
                title: "Historical Analysis",
                description: "Track trends over months. Budget better with real data.",
                icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
              },
            ].map((value) => (
              <div key={value.title} className="bg-brand-orange/5 mwork:bg-brand-orange/10 rounded-xl p-6 border border-brand-orange/20">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 mwork:text-white mb-2">{value.title}</h4>
                <p className="text-neutral-600 mwork:text-neutral-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-akic-brown text-white">
        <div className="container-narrow text-center">
          <h2 className="text-white mb-4">Need cost visibility?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            I can build custom dashboards that consolidate your vendor costs, track revenue,
            and give you the financial clarity you need to run your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Let&apos;s Talk
            </Link>
            <Link href="/work" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20">
              View More Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
