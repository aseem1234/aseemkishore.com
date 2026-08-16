import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const lines = [
  "ASEEM KISHORE",
  "Content Strategy & Editorial Operations Leader",
  "Digital Publishing Founder | AI & Product Builder",
  "Clarksville, Maryland  |  hello@aseemkishore.com  |  aseemkishore.com",
  "",
  "SUMMARY",
  "For nearly two decades I have built and operated technology publications, led",
  "distributed teams of writers and editors, grown audiences to millions of monthly",
  "readers, and developed the editorial systems that make quality content scalable.",
  "Today I also build AI-assisted workflows and SaaS products at the intersection of",
  "content, technology, and business.",
  "",
  "SELECTED RESULTS",
  "Since 2007 — Building and operating digital publications.",
  "7-8M+ — Monthly pageviews across the portfolio at its peak (approximate).",
  "35+ — Writers, editors, and contractors recruited and managed.",
  "4,500+ — Technology articles across the portfolio.",
  "5 — Major technology publications built and operated.",
  "",
  "EXPERIENCE",
  "",
  "Founder  |  PositionTracker  |  Sep 2025 - Present",
  "Direct, design, and iterate on a SaaS dashboard for stock and options positions",
  "using AI-assisted development. Product concept, workflows, interface, financial",
  "data, Clerk, Neon Postgres, Stripe, Vercel, and GitHub release habits.",
  "",
  "Founder & Head of Digital Publishing and Content Operations",
  "AK Internet Consulting  |  May 2010 - Present",
  "Publishing activity began in 2007; the company is listed from 2010.",
  "- Built and operated five technology publications.",
  "- Reached approximately 7-8 million monthly pageviews at peak.",
  "- Recruited and led 35+ writers, editors, and contractors.",
  "- Oversaw a library of 4,500+ technology articles.",
  "- Directed editorial strategy, calendars, standards, editing, and QC.",
  "- Used SEO, audience, and revenue data to guide investment.",
  "- Developed advertising, affiliate, and audience programs.",
  "- Managed WordPress infrastructure for high-traffic sites.",
  "- Introduced AI-assisted research, editorial, and development workflows.",
  "",
  "Founder and Editor-in-Chief  |  Online Tech Tips  |  Mar 2007 - Present",
  "Started the flagship publication while working in IT; moved to full-time",
  "operation in 2010. Set the editorial point of view and later the contributor",
  "system that scaled beyond a single author.",
  "",
  "Programmer, Systems Analyst, and Business Analyst  |  Orchid Cellmark",
  "Jun 2008 - Apr 2010  |  Dallas, Texas",
  "",
  "Network Administrator; Programmer and Systems Analyst  |  ReliaGene Technologies",
  "Oct 2003 - May 2008  |  New Orleans, Louisiana",
  "Programming, network administration, systems analysis, business analysis, and IT.",
  "",
  "EDUCATION",
  "Emory University — Computer Science and Mathematics",
  "",
  "SELECTED WRITING",
  "Getting Started with GLM-5 — The Back Room Tech (2026)",
  "Windows 11 AI Agent Taskbar Guide — Help Desk Geek (2026)",
  "Ubuntu 26.04 Software Installation Guide — The Back Room Tech (2026)",
  "Which Search Engine Returns the Most Alarming Results? — Online Tech Tips (2022)",
  "Focus Modes vs Do Not Disturb — Switching to Mac (2026)",
  "",
  "SKILLS",
  "Leadership: content and editorial leadership; distributed-team management;",
  "writer and editor management; mentorship; prioritization.",
  "Content: strategy, calendars, briefs, editing, governance, audits, lifecycle.",
  "Growth: SEO, search intent, analytics, distribution, monetization.",
  "AI: content workflows, research, prompt design, coding agents, AEO/GEO.",
  "Product: WordPress, JavaScript, HTML, CSS, APIs, Vercel, Neon, Clerk, Stripe.",
];

function escapePdf(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPage(pageLines, startY) {
  const commands = ["BT", "/F1 11 Tf", "14 TL", `72 ${startY} Td`];
  for (const [index, line] of pageLines.entries()) {
    const size = index === 0 && startY > 700 ? 18 : 11;
    if (index === 0 && startY > 700) {
      commands.push("/F2 18 Tf");
    } else if (index === 1 && startY > 700) {
      commands.push("/F2 12 Tf");
    } else if (
      [
        "SUMMARY",
        "SELECTED RESULTS",
        "EXPERIENCE",
        "EDUCATION",
        "SELECTED WRITING",
        "SKILLS",
      ].includes(line)
    ) {
      commands.push("/F2 12 Tf");
    } else {
      commands.push("/F1 11 Tf");
    }
    commands.push(`(${escapePdf(line)}) Tj`, "T*");
    void size;
  }
  commands.push("ET");
  return commands.join("\n");
}

const splitAt = lines.findIndex((line, index) => index > 40 && line === "EDUCATION");
const page1 = lines.slice(0, splitAt);
const page2 = lines.slice(splitAt);

const content1 = buildPage(page1, 720);
const content2 = buildPage(page2, 720);

function streamObject(id, content) {
  const body = `stream\n${content}\nendstream`;
  return `${id} 0 obj\n<< /Length ${content.length + 1} >>\n${body}\nendobj\n`;
}

const objects = [
  "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
  "2 0 obj\n<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>\nendobj\n",
  "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>\nendobj\n",
  "4 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 6 0 R /Resources << /Font << /F1 7 0 R /F2 8 0 R >> >> >>\nendobj\n",
  streamObject(5, content1),
  streamObject(6, content2),
  "7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
  "8 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (const object of objects) {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += object;
}
const xrefStart = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let i = 1; i <= objects.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

const out = join(dirname(fileURLToPath(import.meta.url)), "../public/resume/Aseem-Kishore-Resume.pdf");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, pdf);
console.log(`Wrote ${out}`);
