import Link from "next/link";
import {
  Glossary,
  PlainEnglish,
  TechDetail,
  Term,
} from "@/components/work/CaseStudy";
import {
  FactReviewMock,
  FilingReadinessMock,
  MockFrame,
  PipelineFlow,
  ReturnSplitMock,
} from "@/components/work/TaxVisuals";



const atAGlance = [
  {
    value: "16",
    label: "serverless route modules",
    detail: "Small hosted backend routes support the dashboard workflow, each with a bounded job.",
  },
  {
    value: "9",
    label: "years of return history",
    detail: "Historical folders cover 2017 through 2025, giving the workflow a useful starting point for comparison.",
  },
  {
    value: "4 / 15 MB",
    label: "document upload ceilings",
    detail: "Individual source documents stop at 4 MB; a complete imported return can be up to 15 MB.",
  },
  {
    value: "300 sec.",
    label: "maximum dashboard run time",
    detail: "The serverless dashboard is configured to allow up to 300 seconds for a request to finish.",
  },
] as const;

const workflowSteps = [
  {
    number: "01",
    title: "Bring in this year's paperwork",
    text: "A person uploads a source document. The dashboard identifies its kind, category, likely year, and a short summary before asking AI to pull out visible facts.",
    detail: "Each individual source-document upload is capped at 4 MB. The original bytes are held with the dashboard document record while processing finishes.",
  },
  {
    number: "02",
    title: "Hold facts for review",
    text: "Each extracted value is stored with a label, source snippet, confidence score, and review state. A reviewer can confirm, dismiss, or edit the value before using it as working information.",
    detail: "Facts start as pending_review. The other available states are confirmed and dismissed; an edited value is also marked as overridden.",
  },
  {
    number: "03",
    title: "Unbundle an earlier return",
    text: "A complete historical PDF is uploaded with a year, a personal or business label, and an entity label. AI identifies where the individual forms start and end.",
    detail: "Imported return files are capped at 15 MB. The child form records point to their parent return instead of copying the original PDF again.",
  },
  {
    number: "04",
    title: "Read one form at a time",
    text: "The system makes a smaller in-memory PDF for each identified page range, then extracts facts from that one form. This keeps the review unit understandable instead of treating a long return as one document.",
    detail: "Page-level extraction retries up to three times, with 0-, 3-, and 10-second waits. A completed parent is processed; a return with failed children is partial.",
  },
  {
    number: "05",
    title: "Compare the old filing with current paperwork",
    text: "The workspace looks at the forms in one selected earlier return alongside current source-document facts. It then describes each likely filing as ready, partial, missing, or not applicable.",
    detail: "This is a document-readiness aid, not a tax calculation, rules engine, or filing decision. It can also suggest an additional filing for review.",
  },
] as const;

const reviewControls = [
  {
    title: "Confidence is visible, not a verdict",
    text: "A model-provided confidence score gives the reviewer a reason to look closely. It does not prove a value is right, and no minimum score automatically blocks a fact.",
  },
  {
    title: "A second pass can challenge the first",
    text: "The dashboard can request a separate AI review pass that compares the existing facts with the document and may propose corrections or new facts.",
  },
  {
    title: "People can change the record",
    text: "A reviewer can confirm, dismiss, or edit individual facts. An edit marks the fact as overridden so the working record shows that it changed.",
  },
  {
    title: "Bulk confirmation stays honest",
    text: "Confirm All is a bulk state change. It marks every non-dismissed fact for one document as confirmed; it does not validate values against the PDF or enforce a confidence threshold.",
  },
] as const;

const architecture = [
  {
    title: "Document workspace",
    value: "Keeps an upload, its classification, processing status, review information, and extracted facts together for a reviewer.",
    tech: "Vercel serverless dashboard + Neon Postgres",
  },
  {
    title: "AI reading tasks",
    value: "Uses different prompts for classification, extraction, review, historical-return splitting, and filing-readiness analysis.",
    tech: "OpenAI Responses API",
  },
  {
    title: "Page-range handling",
    value: "Creates a smaller PDF for each historical child form so the form can be read separately from its parent return.",
    tech: "pdf-lib 1.17",
  },
  {
    title: "Template collection",
    value: "Can fetch a PDF that looks like a form template and attach it to a matching filing for reference.",
    tech: "12 maintained source URLs",
  },
  {
    title: "Earlier local draft engine",
    value: "Separately supports local document handling, deterministic text extraction, draft calculations, and worksheets.",
    tech: "Express 4 + SQLite + Poppler",
  },
  {
    title: "Typed user interface",
    value: "Presents the dashboard workflow as a single place to upload, inspect, split, review, and compare documents.",
    tech: "TypeScript 5.8 + React 19 + Vite 6",
  },
] as const;

const boundaries = [
  {
    title: "Tax judgment remains a human responsibility",
    text: "The workspace organizes documents and highlights what appears to be missing. It does not establish that a return is complete, correct, current, or suitable for filing.",
  },
  {
    title: "Forms are collected, not completed",
    text: "The dashboard can download PDF-like form templates from mapped or user-provided HTTPS URLs, but it does not fill them. The roadmap marks true form filling as not started.",
  },
  {
    title: "A single-operator internal tool",
    text: "This was an internal workspace, not a multi-tenant product. The reviewed routes show no application-level authentication or authorization checks, so the deployed dashboard should not be described as access-controlled.",
  },
  {
    title: "Third-party AI processing is part of the workflow",
    text: "The dashboard sends uploaded PDF bytes to the OpenAI Responses API for document reading. That fact matters whenever sensitive documents are considered.",
  },
] as const;

const businessValue = [
  "A legible queue of documents, extracted working facts, and review states instead of scattered PDFs.",
  "A way to turn one bundled earlier return into the forms that made it up, with each form tied to its page range.",
  "A focused view of filings that the current paperwork appears to support, partially support, or still leave missing.",
  "A human-driven path for high-stakes judgment and filing, with the software doing the preparation work around it.",
] as const;

const glossary = [
  {
    term: "AES-256-GCM",
    definition: "A strong encryption method used for local raw document blobs in the separate draft engine.",
  },
  {
    term: "Confidence score",
    definition: "A model-provided estimate that helps prioritize human review, not a proof of correctness.",
  },
  {
    term: "Fact",
    definition: "One normalized value extracted from a document, such as a labeled field and its working value.",
  },
  {
    term: "Neon Postgres",
    definition: "The hosted PostgreSQL database used by the deployed dashboard implementation.",
  },
  {
    term: "OpenAI Responses API",
    definition: "The AI service the dashboard calls to classify, extract, review, split, and compare documents.",
  },
  {
    term: "Page range",
    definition: "The inclusive span of pages within an imported full return that belongs to one identified form.",
  },
  {
    term: "pdf-lib",
    definition: "A JavaScript PDF library used here to copy a child form page range into a smaller temporary PDF.",
  },
  {
    term: "pending_review",
    definition: "The initial dashboard fact state, meaning a fact awaits review or another explicit state change.",
  },
  {
    term: "Serverless route",
    definition: "A small hosted backend endpoint that runs for a request rather than as a continually running server.",
  },
  {
    term: "Template",
    definition: "A downloaded PDF-like form reference; collection does not prove it is blank, current, official, or correct.",
  },
  {
    term: "Vercel",
    definition: "The hosting platform used for the dashboard serverless routes and their configured maximum duration.",
  },
] as const;

function Icon({ path, className = "h-5 w-5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function TaxPrepWorkspacePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-950 via-teal-900 to-slate-950 py-16 text-white md:py-24">
        <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-teal-300/15 blur-3xl" />
        <div className="container-narrow relative z-10">
          <Link href="/work" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-100 transition hover:text-white">
            <Icon path="M19 12H5m6 6-6-6 6-6" className="h-4 w-4" />
            Back to Work Samples
          </Link>
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="tag border border-emerald-200/30 bg-emerald-200/10 text-emerald-50">Document intelligence</span>
            <span className="tag border border-teal-200/30 bg-teal-200/10 text-teal-50">Human review</span>
            <span className="tag border border-white/20 bg-white/10 text-white">Tax preparation</span>
            <span className="tag border border-white/20 bg-white/10 text-white">Internal workflow</span>
          </div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Deep-dive case study</p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Turn a pile of tax PDFs into a reviewable preparation workspace.
          </h1>
          <div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-emerald-50 md:text-xl">
            <p>
              Tax preparation starts long before a filing screen. This workspace turns uploaded paperwork and earlier returns into a clear working record: what each document is, which values it appears to contain, and what a reviewer still needs to check.
            </p>
            <p>
              It keeps the irreversible step with a person. The software prepares, separates, compares, and surfaces gaps so the human handling the filing can move faster with better context.
            </p>
          </div>
          <div className="mt-9">
            <Link href="/contact" className="btn-primary">
              Discuss a project like this
              <Icon path="M5 12h14m-6-6 6 6-6 6" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">At a glance</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">A preparation desk, not an auto-filing machine.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {atAGlance.map((item) => (
              <article key={item.label} className="card border-slate-200 bg-emerald-50/40 p-6 md:p-7 mwork:border-slate-800 mwork:bg-emerald-950/20">
                <p className="font-heading text-4xl font-bold text-emerald-700 mwork:text-emerald-300">{item.value}</p>
                <h3 className="mt-2 font-semibold text-slate-950 mwork:text-white">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 mwork:text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-narrow">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">The problem</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">The information is there, but it is buried in documents.</h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700 mwork:text-slate-300">
              <p>
                A tax-preparation process may begin with statements, notices, accounting reports, and a long PDF from an earlier filing. Before anyone can make a sound decision, someone has to identify each document, collect the values that matter, and understand how the old return was assembled.
              </p>
              <p>
                That is repetitive work, but it is not trivial work. A reviewer needs enough context to question a value, correct it, and see what it affects without treating an AI response as the final word.
              </p>
              <p>
                This project organizes the preparation layer. It does not replace tax judgment or submit a return.
              </p>
            </div>
          </div>
          <PlainEnglish title="What this changes for the person preparing the filing">
            <p>Instead of reading every PDF from the beginning each time, the reviewer gets a structured starting point: documents grouped by purpose, working facts to inspect, and a list of areas that appear incomplete.</p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">How it works</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">A path from raw PDFs to a focused review queue.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700 mwork:text-slate-300">
              The dashboard uses <Term definition="Small hosted backend endpoints that run when the dashboard requests a specific job.">serverless routes</Term> to keep each stage bounded and inspectable. The sequence below is the primary dashboard workflow.
            </p>
          </div>
          <PipelineFlow />
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">The walkthrough</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Five moments that make a document set usable.</h2>
          </div>
          <div className="space-y-5">
            {workflowSteps.map((step) => (
              <article key={step.number} className="card overflow-hidden border-slate-200 bg-white p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-950">
                <div className="grid gap-5 md:grid-cols-[64px_1fr]">
                  <div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-emerald-700 to-teal-600 font-heading text-sm font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-slate-950 mwork:text-white">{step.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-700 mwork:text-slate-300">{step.text}</p>
                    <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600 mwork:border-slate-800 mwork:text-slate-400">{step.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="The practical payoff">
            <p>The work moves from an unstructured reading task toward a repeatable review process. Each stage leaves the next person something concrete to inspect rather than an undocumented AI conclusion.</p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">Review extracted values</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Let the reviewer see the values before they become working information.</h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-slate-700 mwork:text-slate-300">
                <p>Facts carry their own review state and model-provided confidence score. That makes the system useful as a prioritization tool without pretending that a score settles the question.</p>
                <p>The record can be manually confirmed, dismissed, or edited. A separate AI review pass is also available, but it is still another source of suggested changes rather than an accuracy guarantee.</p>
              </div>
            </div>
            <MockFrame title="Document review"><FactReviewMock /></MockFrame>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {reviewControls.map((item) => (
              <article key={item.title} className="card border-slate-200 bg-emerald-50/40 p-6 md:p-7 mwork:border-slate-800 mwork:bg-emerald-950/20">
                <h3 className="font-heading text-xl font-bold text-slate-950 mwork:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
          <TechDetail label="The fact record and the important limit of Confirm All">
            <p>A dashboard fact includes a document ID, flexible field key, label, JSON value, value type, optional subject, confidence, source snippet, extraction or review source, review status, overridden flag, and timestamps. Unlike the local draft engine, dashboard field keys are open-ended rather than one closed list of types.</p>
            <p><code>Confirm All</code> changes every non-dismissed fact on one document to <code>confirmed</code>. If none remains pending, it marks that document review as confirmed. It does not compare values back to the file and it does not apply a confidence threshold, so it is not a validation step.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">Separate a bundled earlier return</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Make a long PDF understandable one form at a time.</h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-slate-700 mwork:text-slate-300">
                <p>Historical returns often arrive as one file. The workspace asks AI to identify every form boundary, then creates a child record that points to the matching page range inside the imported return.</p>
                <p>Each child form is extracted from a newly copied in-memory PDF. That lets the reviewer work with a clear form-sized unit while retaining the link back to its place in the parent return.</p>
              </div>
            </div>
            <MockFrame title="Prior-year return, separated into forms"><ReturnSplitMock /></MockFrame>
          </div>
          <TechDetail label="The exact page-range behavior">
            <p>Return splitting requires the model to assign every page to a section. For a child document, <code>pdf-lib</code> copies the inclusive saved range, converting the one-indexed range to the zero-indexed indexes the library expects, then sends that mini-PDF to AI for extraction.</p>
            <p>Facts are attributable to the child document and its stored page range, not to a precise page number. The dashboard fact table does not include a per-fact page-number field. Also, a child-document download returns the full parent PDF, not the child-only range.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">What the current filing still needs</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Compare current paperwork with the shape of an earlier filing.</h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-slate-700 mwork:text-slate-300">
                <p>The required-filings analysis considers the child forms in a selected earlier return, top-level facts from current source documents, and selected prior-year summary facts. It gives each candidate a readiness state: ready, partial, missing, or not applicable.</p>
                <p>The result is a preparation checklist for human judgment. It is not a statement that a filing is required, complete, or correct.</p>
              </div>
            </div>
            <MockFrame title="What this year still needs"><FilingReadinessMock /></MockFrame>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              ["ready", "The available working facts appear to support the candidate filing."],
              ["partial", "Some relevant paperwork or values appear to be present, but not all."],
              ["missing", "The analysis found a candidate filing without the supporting current paperwork it expected."],
              ["not_applicable", "The candidate does not appear applicable from the facts included in that analysis."],
            ].map(([state, text]) => (
              <article key={state} className="card border-slate-200 bg-slate-50 p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-900">
                <p className="font-mono text-sm font-bold text-emerald-700 mwork:text-emerald-300">{state}</p>
                <p className="mt-3 text-sm leading-6 text-slate-700 mwork:text-slate-300">{text}</p>
              </article>
            ))}
          </div>
          <TechDetail label="How filing readiness is produced, and where it is limited">
            <p>The dashboard sends bounded prior-return fields and current source-document facts to a text-only OpenAI call, then persists the returned statuses in <code>required_filings</code>. It may also suggest new filings. Context is truncated to limit prompt size.</p>
            <p>Although the API allows a selected return ID, the dashboard client does not provide one and the server defaults to the first matching full prior return. Filing rows are deleted and recreated by tax year, without an entity identifier. This is partial multi-entity support, not safe independent filing management for multiple entities.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">Accounting reports: a deliberately narrow assist</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Treat a report as supporting evidence, not as a live feed.</h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-slate-700 mwork:text-slate-300">
                <p>Business preparation can include accounting reports alongside tax documents. The local draft engine accepts uploaded profit-and-loss reports, balance sheets, and .qbo files read as text, then recognizes those uploads as business documents.</p>
                <p>Its extraction is intentionally small: gross receipts, net income, cash, and retained earnings. These are working facts for review, not a synchronization of a bookkeeping system.</p>
              </div>
            </div>
            <div className="card border-slate-200 bg-white p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-950">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 mwork:text-emerald-300">What the local extractor recognizes</p>
              <div className="mt-5 space-y-3">
                {[
                  ["Profit-and-loss report", "Recognized as a business document; may yield gross receipts and net income."],
                  ["Balance sheet", "Recognized as a business document; may yield cash and retained earnings."],
                  [".qbo file", "Accepted as UTF-8 text by the local extractor, without a dedicated QBO or OFX parser."],
                  ["Human correction", "The reviewer can add context and correct the working values before any filing work continues."],
                ].map(([label, text]) => (
                  <div key={label} className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0 mwork:border-slate-800">
                    <h3 className="font-semibold text-slate-950 mwork:text-white">{label}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-700 mwork:text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <PlainEnglish title="The practical boundary">
            <p>Upload reports when they help the person preparing the return. Do not assume that the workspace is connected to a bookkeeping platform or that it can reconcile report values against another system.</p>
          </PlainEnglish>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">Built-in operating limits</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Make the work bounded before asking a reviewer to trust it.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700 mwork:text-slate-300">The constraints below make the dashboard behavior easier to understand. They are engineering limits, not promises about the quality of tax advice or the completeness of a filing.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="card border-slate-200 bg-slate-50 p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-900">
              <p className="font-heading text-3xl font-bold text-emerald-700 mwork:text-emerald-300">4 MB</p>
              <h3 className="mt-2 font-semibold text-slate-950 mwork:text-white">Source-document limit</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 mwork:text-slate-300">Standalone uploads have a clear ceiling before classification and extraction begin.</p>
            </article>
            <article className="card border-slate-200 bg-slate-50 p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-900">
              <p className="font-heading text-3xl font-bold text-emerald-700 mwork:text-emerald-300">15 MB</p>
              <h3 className="mt-2 font-semibold text-slate-950 mwork:text-white">Historical-return limit</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 mwork:text-slate-300">A full prior return can be imported only within this file-size ceiling.</p>
            </article>
            <article className="card border-slate-200 bg-slate-50 p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-900">
              <p className="font-heading text-3xl font-bold text-emerald-700 mwork:text-emerald-300">10 MB</p>
              <h3 className="mt-2 font-semibold text-slate-950 mwork:text-white">Fetched-template limit</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 mwork:text-slate-300">The template fetcher rejects a PDF-like file larger than this cap.</p>
            </article>
            <article className="card border-slate-200 bg-slate-50 p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-900">
              <p className="font-heading text-3xl font-bold text-emerald-700 mwork:text-emerald-300">0 / 3 / 10</p>
              <h3 className="mt-2 font-semibold text-slate-950 mwork:text-white">Retry waits in seconds</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 mwork:text-slate-300">Only child-form page extraction retries, for at most three attempts in total.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section bg-emerald-50/70 mwork:bg-emerald-950/20">
        <div className="container-narrow">
          <div className="grid gap-10 rounded-3xl border border-emerald-200 bg-white p-7 md:grid-cols-[0.85fr_1.15fr] md:p-10 mwork:border-emerald-900 mwork:bg-slate-950">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">What was done by hand, not by software</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white">Keep the high-stakes step human-led.</h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700 mwork:text-slate-300">
              <p>Two parts were deliberately human-and-AI-in-the-loop. First, a person brought accounting-report data into the preparation work and corrected it where needed. Second, a person navigated a commercial tax-filing product to actually file.</p>
              <p>That is a considered judgment, not a missing feature. Filing taxes is irreversible and high-stakes, so the software should make the person fast and well-prepared rather than take the driver&apos;s seat.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="card border-emerald-200 bg-white p-6 md:p-7 mwork:border-emerald-900 mwork:bg-slate-950">
              <p className="text-sm font-semibold text-emerald-700 mwork:text-emerald-300">Accounting reports</p>
              <h3 className="mt-2 font-heading text-xl font-bold text-slate-950 mwork:text-white">Useful input, brought in with judgment.</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700 mwork:text-slate-300">The local engine accepts uploaded profit-and-loss reports, balance sheets, and .qbo files read as text. It recognizes them as business documents and pattern-extracts only gross receipts, net income, cash, and retained earnings.</p>
            </article>
            <article className="card border-emerald-200 bg-white p-6 md:p-7 mwork:border-emerald-900 mwork:bg-slate-950">
              <p className="text-sm font-semibold text-emerald-700 mwork:text-emerald-300">Commercial filing product</p>
              <h3 className="mt-2 font-heading text-xl font-bold text-slate-950 mwork:text-white">The person makes and submits the filing.</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700 mwork:text-slate-300">No code in this project submits an e-filed return to a tax authority or provider. The workspace stops at preparation and review, leaving the final navigation and filing action with the human operator.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50 mwork:bg-slate-900">
        <div className="container-wide">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">How the pieces fit together</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">One dashboard story, with an earlier local draft engine beside it.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700 mwork:text-slate-300">The repository shows an evolving codebase. The dashboard is the primary story here because the React UI calls its serverless routes; a separate local engine remains useful technical context.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {architecture.map((item) => (
              <article key={item.title} className="card border-slate-200 bg-white p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-950">
                <p className="text-sm font-semibold text-emerald-700 mwork:text-emerald-300">{item.tech}</p>
                <h3 className="mt-3 font-heading text-xl font-bold text-slate-950 mwork:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.value}</p>
              </article>
            ))}
          </div>
          <TechDetail label="Two overlapping implementations are checked in">
            <p>The repository contains two partially overlapping systems rather than one unified runtime. The primary dashboard path uses Vercel serverless handlers, Neon Postgres, PDF bytes stored in Postgres, and direct OpenAI Responses API calls. The React dashboard calls these routes. It uses <code>gpt-4o</code> by default for source classification and extraction, <code>gpt-5-mini</code> for review, and <code>gpt-4o-mini</code> for return splitting and filing-readiness analysis.</p>
            <p>A separate local Express and SQLite draft engine encrypts raw local document blobs with AES-256-GCM, runs deterministic extraction through Poppler tooling, has 24 deterministic fact types, and includes a hard-coded 2025 calculator. It also has 18 hard-coded document requirements and a static registry with 9 official-form entries. Those local capabilities should not be attributed to the deployed dashboard as though they were one implementation.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-white mwork:bg-slate-950">
        <div className="container-narrow">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">Boundaries that matter</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white md:text-4xl">Useful preparation work needs clear limits.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {boundaries.map((item) => (
              <article key={item.title} className="card border-slate-200 bg-slate-50 p-6 md:p-7 mwork:border-slate-800 mwork:bg-slate-900">
                <div className="flex gap-4">
                  <span className="mt-0.5 text-emerald-700 mwork:text-emerald-300">
                    <Icon path="M12 9v4m0 4h.01M10.3 3.9 2.4 17.1A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0Z" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-slate-950 mwork:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700 mwork:text-slate-300">{item.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <PlainEnglish title="A practical rule for sensitive work">
            <p>Use the workspace to prepare a better human review, not to hide uncertainty. When the consequence is a filing, a person should have enough evidence and control to decide what happens next.</p>
          </PlainEnglish>
          <TechDetail label="Storage and template limits, stated precisely">
            <p>On the dashboard path, raw uploaded PDF bytes are stored in a Neon Postgres <code>BYTEA</code> column; child forms reference their parent bytes. The reviewed code has no application-level authentication or authorization, and no application-level dashboard encryption was found. The local engine encrypts only its original raw document blob, not its SQLite database or generated local artifacts.</p>
            <p>The template fetcher follows mapped URLs from 12 sources on IRS, Maryland, and Texas domains or a user-provided HTTPS URL. It accepts a PDF-like response up to 10 MB, but it does not inspect contents to prove a template is blank, official, current, or the right revision. It is a downloader, not a form parser, filler, or filing mechanism.</p>
          </TechDetail>
        </div>
      </section>

      <section className="section bg-emerald-50/70 mwork:bg-emerald-950/20">
        <div className="container-narrow">
          <div className="grid gap-10 rounded-3xl border border-emerald-200 bg-white p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10 mwork:border-emerald-900 mwork:bg-slate-950">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 mwork:text-emerald-300">What this means for the work</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-950 mwork:text-white">Preparation gets structure. The final decision stays visible.</h2>
            </div>
            <ul className="space-y-4">
              {businessValue.map((item) => (
                <li key={item} className="flex gap-3 text-slate-800 mwork:text-slate-100">
                  <span className="mt-0.5 text-emerald-700 mwork:text-emerald-300">
                    <Icon path="m5 12 4 4L19 6" className="h-5 w-5" />
                  </span>
                  <span className="text-sm leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-100/70 p-6 md:p-7 mwork:border-emerald-900 mwork:bg-emerald-950/40">
            <p className="text-sm leading-6 text-emerald-950 mwork:text-emerald-100">This case study describes a neutral tax-preparation workspace for personal and business returns. All interface illustrations use placeholder data and do not represent a real taxpayer, business, employer, institution, or amount.</p>
          </div>
        </div>
      </section>

      <Glossary items={[...glossary]} />

      <section className="section bg-akic-brown text-akic-cream mwork:bg-slate-950">
        <div className="container-narrow text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-akic-gold">Build the preparation layer first</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight md:text-4xl">Need a human-led workflow that makes complex documents easier to act on?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-akic-cream/85 mwork:text-slate-300">AK Internet Consulting designs reviewable AI-assisted systems that help people prepare high-stakes work without taking the decision away from them.</p>
          <div className="mt-8">
            <Link href="/contact" className="btn-secondary">
              Discuss a project like this
              <Icon path="M5 12h14m-6-6 6 6-6 6" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
