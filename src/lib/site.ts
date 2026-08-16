import { profile } from "@/data/profile";

export const siteUrl = profile.siteUrl;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

export function formatMonthYear(value: string): string {
  const [year, month] = value.split("-");
  if (!month) return year;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDisplayDate(value: string): string {
  if (/^\d{4}$/.test(value)) return value;
  const date = new Date(`${value}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateRange(start: string, end: string | null, precision: "year" | "month"): string {
  const startLabel = precision === "year" ? start.slice(0, 4) : formatMonthYear(start);
  if (!end) return `${startLabel} – Present`;
  const endLabel = precision === "year" ? end.slice(0, 4) : formatMonthYear(end);
  return `${startLabel} – ${endLabel}`;
}
