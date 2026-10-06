import assert from "node:assert/strict";
import { test } from "node:test";

import { caseStudies } from "../src/data/case-studies";
import { experience } from "../src/data/experience";
import { proofPoints } from "../src/data/metrics";
import { profile } from "../src/data/profile";
import { publications } from "../src/data/publications";
import { digitalMarketing } from "../src/data/digital-marketing";
import { publishedThoughts } from "../src/data/published-thoughts";
import { thoughtOutlines } from "../src/data/thoughts";
import { writingSamples } from "../src/data/writing";

test("homepage proof points stay qualified and limited", () => {
  assert.equal(proofPoints.length, 5);
  assert.equal(proofPoints.find((item) => item.id === "pageviews")?.value, "~7–8M");
  assert.equal(proofPoints.find((item) => item.id === "contributors")?.value, "Up to 35");
  assert.equal(proofPoints.find((item) => item.id === "articles")?.value, "6,000+");
  assert.match(proofPoints.find((item) => item.id === "articles")?.detail ?? "", /3,000/);
  assert.match(proofPoints.find((item) => item.id === "pageviews")?.detail ?? "", /approximately/);
});

test("AKIC title and dates distinguish 2007 publishing from 2010 company", () => {
  const akic = experience.find((role) => role.id === "akic");
  assert.ok(akic);
  assert.equal(akic.title, "Founder & Head of Digital Publishing and Content Operations");
  assert.equal(akic.dates.start, "2010-05");
  assert.match(akic.dates.note ?? "", /2007/);
});

test("publication and case-study slugs are unique", () => {
  const publicationSlugs = publications.map((item) => item.slug);
  const caseSlugs = caseStudies.map((item) => item.slug);
  assert.equal(new Set(publicationSlugs).size, publicationSlugs.length);
  assert.equal(new Set(caseSlugs).size, caseSlugs.length);
});

test("writing samples include multiple publications and required mix", () => {
  const publicationsUsed = new Set(writingSamples.map((item) => item.publication));
  assert.ok(publicationsUsed.size >= 3);
  assert.ok(writingSamples.some((item) => item.category === "Thought Leadership"));
  assert.ok(writingSamples.filter((item) => item.category === "Long-Form Guides").length >= 2);
  assert.ok(writingSamples.filter((item) => item.category === "Technical Education").length >= 2);
  assert.ok(writingSamples.some((item) => item.category === "AI and Search"));
  assert.ok(writingSamples.every((item) => item.url.startsWith("https://")));
  assert.ok(writingSamples.every((item) => item.verification.length > 0));
});

test("remaining thought essays stay outlines and essay #1 is published", () => {
  assert.equal(thoughtOutlines.length, 4);
  assert.ok(thoughtOutlines.every((item) => item.draft === true));
  assert.ok(!thoughtOutlines.some((item) => item.slug === "ai-is-changing-search"));
  assert.ok(publishedThoughts.some((item) => item.slug === "ai-is-changing-search"));
});

test("published essay carries no editorial scaffolding", () => {
  for (const essay of publishedThoughts) {
    assert.doesNotMatch(essay.contentHtml, /Notes for Aseem|\*\*Status|Status:|FIRST DRAFT|delete before publishing/);
    assert.doesNotMatch(essay.contentHtml, /4,500|35\+/);
  }
});

test("site copy never claims the pipeline avoids automatic publishing", () => {
  const serialized = JSON.stringify({ caseStudies, digitalMarketing, publishedThoughts, publications, experience });
  assert.doesNotMatch(
    serialized,
    /0 automatic live publishes|never (?:goes live|auto-?publishes)|always (?:presses|clicks) publish|human always publishes/i,
  );
});

test("search-and-adaptation states the approved pipeline figures", () => {
  const results = caseStudies.find((item) => item.slug === "search-and-adaptation")?.summary?.results.join(" ") ?? "";
  assert.match(results, /5 WordPress properties/);
  assert.match(results, /About 1,206 articles published automatically/);
  assert.match(results, /875 .*331/);
  assert.equal(875 + 331, 1206);
  assert.doesNotMatch(results, /\b4 (?:configured )?WordPress properties/);
});

test("counts use the approved network, personal and team figures", () => {
  const serialized = JSON.stringify({ proofPoints, experience, publications, caseStudies, profile });
  assert.doesNotMatch(serialized, /4,500|more than 35|35\+|7–8M\+/);
  assert.equal(publications.find((item) => item.slug === "help-desk-geek")?.founded, "2009");
});

test("work cards: three featured case studies in A/B/C order with approved slugs", () => {
  assert.deepEqual(
    caseStudies.filter((item) => item.featured).map((item) => item.slug),
    ["publishing-portfolio", "editorial-operations", "search-and-adaptation"],
  );
  for (const study of caseStudies.filter((item) => item.featured)) {
    assert.ok(study.teaser && study.chips && study.summary);
  }
});

test("profile does not publish a phone number", () => {
  const serialized = JSON.stringify({ profile, experience, publications });
  assert.doesNotMatch(serialized, /\b\d{3}[-.)]\s*\d{3}[-.\s]\d{4}\b/);
  assert.equal(profile.email, "hello@aseemkishore.com");
});
