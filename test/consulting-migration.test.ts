import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { caseStudies } from "../src/data/case-studies";
import { automationSections, consultingOffers } from "../src/data/consulting";
import { importedCaseStudies } from "../src/data/imported-case-studies";
import { getWorkNarrative } from "../src/content/work";

const migratedSlugs = [
  "admin-cost-dashboard", "ai-content-pipeline", "author-dashboard", "autonomous-email-responder",
  "content-orchestrator", "gmail-inbox-timer", "gws-client-onboarding", "gws-inbox-triage",
  "gws-report-automation", "gws-workspace-health-check", "portfolio-dashboard", "sec-filing-monitor",
  "site-monitoring-suite", "skills-api", "social-posts-dashboard", "tax-prep-workspace", "wordpress-theme-system",
];

test("all 17 migration targets join the original four without collisions", () => {
  assert.deepEqual(importedCaseStudies.map(({ slug }) => slug).sort(), migratedSlugs.toSorted());
  assert.equal(caseStudies.length, 21);
  for (const slug of ["publishing-portfolio", "editorial-operations", "search-and-adaptation", "position-tracker"]) {
    assert.ok(caseStudies.some((study) => study.slug === slug));
  }
  assert.equal(new Set(caseStudies.map(({ slug }) => slug)).size, 21);
});

test("each migrated target resolves a substantive server-rendered narrative and final links", async () => {
  for (const slug of migratedSlugs) {
    const Narrative = await getWorkNarrative(slug);
    assert.ok(Narrative, slug);
    const html = renderToStaticMarkup(createElement(Narrative));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, slug);
    assert.ok(html.length > 10000, `${slug}: preserve full narrative`);
    assert.doesNotMatch(html, /href="(?:https:\/\/akinternetconsulting.com)?\/work-samples/);
    assert.doesNotMatch(html, /<main\b/, `${slug}: no nested main landmark`);
  }
  assert.equal(await getWorkNarrative("not-a-real-case"), null);
});

test("four legacy AI-service destinations contain distinct useful sections and valid examples", () => {
  assert.deepEqual(automationSections.map(({ id }) => id), ["workflow-automation", "email-crm", "apps-and-internal-tools", "setup-and-training"]);
  for (const section of automationSections) {
    assert.ok(section.intro.length > 100);
    assert.ok(section.items.length >= 4);
    assert.ok(caseStudies.some(({ slug }) => slug === section.example));
  }
  for (const offer of consultingOffers) {
    assert.ok(offer.work.every((slug) => caseStudies.some((study) => study.slug === slug)));
  }
});

test("verified legacy work-index fragments survive", async () => {
  const source = await readFile(new URL("../src/app/work/page.tsx", import.meta.url), "utf8");
  assert.match(source, /portfolio-dashboard.*fmp-dashboard/);
  assert.match(source, /tbrt-content-automation/);
  assert.ok(importedCaseStudies.some(({ slug }) => slug === "sec-filing-monitor"));
});

test("every imported custom palette utility has a declared Tailwind v4 token", async () => {
  const { readdir } = await import("node:fs/promises");
  const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
  const tokens = new Set<string>();
  for (const dir of ["../src/content/work/", "../src/components/work/"]) {
    const url = new URL(dir, import.meta.url);
    for (const name of await readdir(url)) {
      if (!name.endsWith(".tsx")) continue;
      const source = await readFile(new URL(name, url), "utf8");
      for (const match of source.matchAll(/(?:bg|text|border|from|via|to|ring)-(akic-[a-z-]+|brand-[a-z-]+)/g)) tokens.add(match[1]);
    }
  }
  for (const token of tokens) assert.ok(css.includes(`--color-${token}:`), `Missing palette token: ${token}`);
});
