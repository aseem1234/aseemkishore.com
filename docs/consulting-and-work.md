# Consulting, work and app continuity

The site leads with consulting while preserving the existing dark identity, writing, career, résumé and app content. These marketing routes render on the server from static data.

## Routes and data

- `/consulting`: overview, process and project inquiry.
- `/consulting/content-seo-aeo-strategy`: content audits, search/AEO and refresh priorities.
- `/consulting/editorial-operations`: editorial workflows, ownership and review.
- `/consulting/ai-automation`: four permanent section IDs: `workflow-automation`, `email-crm`, `apps-and-internal-tools`, `setup-and-training`.
- `/work` and `/work/[slug]`: four existing case studies plus 17 migrated public narratives. `src/data/case-studies.ts` remains the combined catalog; `src/data/imported-case-studies.ts` supplies imported summaries. `src/content/work/` retains full narratives and imports server-only visuals from `src/components/work/`.
- `/tools` is labeled Apps & Tools in navigation. No app routes were renamed.

The AI Content Pipeline narrative documents an earlier four-property draft-delivery implementation. A visible note links to the updated five-property publishing overview. Its historical architecture is not a statement that current publishing always requires a manual release.

Legacy work-index fragments `fmp-dashboard`, `sec-filing-monitor` and `tbrt-content-automation` have compatible targets. The latter identifies the AI Content Pipeline in the old published index, not a new inferred case study. New links point directly to final case URLs.

## Boundaries

WordPress care, troubleshooting and Google Workspace support belong at AK Computer Services. Corporate media/advertising belongs at AK Internet Consulting. Consulting contact uses the existing email path; scope, timing and price are agreed per project rather than presented as a fixed availability promise.

Narratives were imported from published AKIC marketing pages. Position Tracker screenshots are the published demo/sample-data assets; no private execution records or dashboard credentials are included. Migration styles and the explicit `mwork` dark variant are scoped to `.migrated-work`; Tailwind v4 remains in place.

## Verification and release

Run `npm test`, `npm run lint` and `npm run build`. Migration coverage checks all 17 narrative renderers, the 21-case catalog, final links and four distinct service sections. Browser-check the consulting paths and historical fragments at desktop/mobile widths.

Preserve Fast Coin Flip’s marketing, press, privacy, `/c` shared-link encoding, OG handler, association JSON, `/flip/` media and API configuration. Existing hermetic app tests remain required. A physical iPhone/App Clip handoff is a separate device check.

Release this site and verify the final URLs before activating incoming AKIC redirects. `main` auto-deploys, so an unmerged release-candidate PR remains a production hold.
