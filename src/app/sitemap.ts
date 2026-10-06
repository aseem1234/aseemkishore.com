import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { publications } from "@/data/publications";
import { publishedThoughts } from "@/data/published-thoughts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/experience",
    "/career",
    "/work",
    "/writing",
    "/about",
    "/contact",
    "/resume",
    "/projects",
    "/thoughts",
    "/tools",
    "/tools/flip",
    "/tools/flip/press",
    "/flip-privacy",
    // The bare shared-coin landing page only. Individual coin links carry noindex.
    "/c",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    })),
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      lastModified: new Date(),
    })),
    ...publishedThoughts.map((item) => ({
      url: `${siteUrl}/thoughts/${item.slug}`,
      lastModified: new Date(item.date),
    })),
    ...publications.map((item) => ({
      url: `${siteUrl}/projects/${item.slug}`,
      lastModified: new Date(),
    })),
  ];
}
