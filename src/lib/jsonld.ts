import { authorArchives, links, profile } from "@/data/profile";
import { publications } from "@/data/publications";
import type { WritingSample } from "@/data/types";
import { absoluteUrl, siteUrl } from "@/lib/site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    url: siteUrl,
    image: absoluteUrl(profile.photo),
    jobTitle: profile.label,
    description: profile.heroSummary,
    email: profile.email,
    homeLocation: {
      "@type": "Place",
      name: profile.location,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Emory University",
    },
    knowsAbout: [
      "Content strategy",
      "Editorial operations",
      "Digital publishing",
      "SEO",
      "AI search",
      "Content operations",
      "SaaS product development",
    ],
    sameAs: [
      links.linkedin.href,
      links.muckrack.href,
      links.akic.href,
      ...authorArchives.map((item) => item.href),
    ],
    founder: publications
      .filter((item) => item.kind === "publication" || item.kind === "company")
      .map((item) => ({
        "@type": "Organization",
        name: item.name,
        url: item.url,
      })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: profile.name,
    url: siteUrl,
    description:
      "Aseem Kishore is a content strategy and editorial operations leader who has built technology publications reaching millions of monthly readers and now develops AI-assisted workflows and SaaS products.",
    publisher: { "@id": `${siteUrl}/#person` },
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: siteUrl,
    name: `${profile.name} | Content Strategy, Editorial Operations & AI`,
    mainEntity: { "@id": `${siteUrl}/#person` },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function writingJsonLd(sample: WritingSample) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: sample.title,
    url: sample.url,
    datePublished: sample.date,
    description: sample.description,
    author: { "@id": `${siteUrl}/#person` },
    publisher: {
      "@type": "Organization",
      name: sample.publication,
    },
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data);
}
