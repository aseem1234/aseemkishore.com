import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { publications } from "@/data/publications";
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
    ...publications.map((item) => ({
      url: `${siteUrl}/projects/${item.slug}`,
      lastModified: new Date(),
    })),
  ];
}
