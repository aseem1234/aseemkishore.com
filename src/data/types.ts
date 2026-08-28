export type SkillGroupId =
  | "leadership"
  | "content"
  | "growth"
  | "ai"
  | "product";

export type CapabilityId =
  | "content-strategy"
  | "editorial-operations"
  | "search-distribution"
  | "ai-workflows"
  | "product-technology";

export type WritingCategory =
  | "Thought Leadership"
  | "Long-Form Guides"
  | "Technical Education"
  | "AI and Search"
  | "Product and Markets"
  | "Editorial Leadership";

export type WritingRole = "Author" | "Managing editor" | "Editor";

export type ProjectKind = "publication" | "product" | "company";

export type DatePrecision = "year" | "month";

export interface DateRange {
  start: string;
  end: string | null;
  precision: DatePrecision;
  note?: string;
}

export interface ExternalLink {
  id: string;
  label: string;
  href: string;
  event?: string;
}

export interface ProofPoint {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface SkillGroup {
  id: SkillGroupId;
  title: string;
  items: string[];
}

export interface Capability {
  id: CapabilityId;
  title: string;
  summary: string;
  items: string[];
}

export interface ExperienceRole {
  id: string;
  organization: string;
  title: string;
  location?: string;
  dates: DateRange;
  summary: string;
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  fields: string[];
  note?: string;
}

export interface Publication {
  slug: string;
  name: string;
  kind: ProjectKind;
  url: string;
  founded: string;
  foundedNote?: string;
  status: "active" | "building" | "live";
  audience: string;
  editorialFocus: string;
  role: string;
  summary: string;
  strategy: string;
  scale?: string;
  team?: string;
  businessModel: string;
  demonstrates: string;
  tech: string[];
  featured: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  featured: boolean;
  context: string;
  challenge: string;
  role: string;
  strategy: string[];
  execution: string[];
  systems: string[];
  results: string[];
  lessons: string[];
  skills: string[];
  relatedSlugs: string[];
  links: ExternalLink[];
}

export interface WritingSample {
  slug: string;
  title: string;
  publication: string;
  date: string;
  description: string;
  topic: string;
  format: string;
  role: WritingRole;
  category: WritingCategory;
  url: string;
  verification: string;
  skills: string[];
  featured: boolean;
}

export interface ThoughtOutline {
  slug: string;
  title: string;
  abstract: string;
  outline: string[];
  draft: true;
}
