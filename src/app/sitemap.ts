import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { publications } from "@/data/publications";
import { siteUrl } from "@/lib/site";
import { getThoughtSitemapEntries } from "@/lib/thoughts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const thoughtEntries = await getThoughtSitemapEntries(siteUrl);

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    })),
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      lastModified: new Date(),
    })),
    ...thoughtEntries,
    ...publications.map((item) => ({
      url: `${siteUrl}/projects/${item.slug}`,
      lastModified: new Date(),
    })),
  ];
}
