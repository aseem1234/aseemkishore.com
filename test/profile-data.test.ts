import assert from "node:assert/strict";
import { test } from "node:test";

import { caseStudies } from "../src/data/case-studies";
import { experience } from "../src/data/experience";
import { proofPoints } from "../src/data/metrics";
import { profile } from "../src/data/profile";
import { publications } from "../src/data/publications";
import { thoughtOutlines } from "../src/data/thoughts";
import { writingSamples } from "../src/data/writing";

test("homepage proof points stay qualified and limited", () => {
  assert.equal(proofPoints.length, 5);
  assert.equal(proofPoints.find((item) => item.id === "pageviews")?.value, "7–8M+");
  assert.equal(proofPoints.find((item) => item.id === "contributors")?.value, "35+");
  assert.equal(proofPoints.find((item) => item.id === "articles")?.value, "4,500+");
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

test("thought essays remain drafts", () => {
  assert.ok(thoughtOutlines.length >= 5);
  assert.ok(thoughtOutlines.every((item) => item.draft === true));
});

test("profile does not publish a phone number", () => {
  const serialized = JSON.stringify({ profile, experience, publications });
  assert.doesNotMatch(serialized, /\b\d{3}[-.)]\s*\d{3}[-.\s]\d{4}\b/);
  assert.equal(profile.email, "akishore@akinternetconsulting.com");
});
