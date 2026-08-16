export type AnalyticsEvent =
  | "resume_download"
  | "contact_click"
  | "linkedin_click"
  | "muckrack_click"
  | "positiontracker_click"
  | "akic_click"
  | "project_view"
  | "writing_sample_click"
  | "case_study_view";

export function trackEvent(event: AnalyticsEvent | string, extra?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const va = (window as Window & { va?: (type: string, name: string, data?: Record<string, string>) => void }).va;
  va?.("event", event, extra);
}
