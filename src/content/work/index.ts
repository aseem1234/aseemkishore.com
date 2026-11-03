import type { ComponentType } from "react";

const loaders: Partial<Record<string, () => Promise<{ default: ComponentType }>>> = {
  "admin-cost-dashboard": () => import("./admin-cost-dashboard"),
  "ai-content-pipeline": () => import("./ai-content-pipeline"),
  "author-dashboard": () => import("./author-dashboard"),
  "autonomous-email-responder": () => import("./autonomous-email-responder"),
  "content-orchestrator": () => import("./content-orchestrator"),
  "gmail-inbox-timer": () => import("./gmail-inbox-timer"),
  "gws-client-onboarding": () => import("./gws-client-onboarding"),
  "gws-inbox-triage": () => import("./gws-inbox-triage"),
  "gws-report-automation": () => import("./gws-report-automation"),
  "gws-workspace-health-check": () => import("./gws-workspace-health-check"),
  "portfolio-dashboard": () => import("./portfolio-dashboard"),
  "sec-filing-monitor": () => import("./sec-filing-monitor"),
  "site-monitoring-suite": () => import("./site-monitoring-suite"),
  "skills-api": () => import("./skills-api"),
  "social-posts-dashboard": () => import("./social-posts-dashboard"),
  "tax-prep-workspace": () => import("./tax-prep-workspace"),
  "wordpress-theme-system": () => import("./wordpress-theme-system"),
};

export async function getWorkNarrative(slug: string) {
  const load = loaders[slug];
  return load ? (await load()).default : null;
}
