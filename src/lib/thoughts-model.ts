import sanitizeHtml from "sanitize-html";

export type ThoughtPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "tech" | "markets";
  tags: string[];
  contentHtml: string;
  heroImage?: { url: string; alt: string };
  video?: { url: string; poster: string };
  updatedAt: string;
};

export class ThoughtsError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export const THOUGHTS_TAG = "thoughts";
export const THOUGHTS_PAGE_SIZE = 12;
export const MAX_POST_BYTES = 1_100_000;

export function validateSlug(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.length > 120 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ||
    value === "media"
  ) {
    throw new ThoughtsError(
      400,
      "slug must be 1–120 lowercase letters, numbers or hyphens; media is reserved.",
    );
  }
  return value;
}

function object(
  value: unknown,
  fields: string[],
  label: string,
): Record<string, unknown> {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    Object.keys(value).some((key) => !fields.includes(key))
  ) {
    throw new ThoughtsError(
      400,
      `${label} must be an object with only documented fields.`,
    );
  }
  return value as Record<string, unknown>;
}

function text(
  value: unknown,
  label: string,
  max: number,
  allowEmpty = false,
): string {
  if (
    typeof value !== "string" ||
    value.length > max ||
    (!allowEmpty && !value.trim())
  ) {
    throw new ThoughtsError(
      400,
      `${label} must be ${allowEmpty ? "0" : "1"}–${max} characters.`,
    );
  }
  return value.trim();
}

export function httpsUrl(value: unknown, label: string): string {
  const result = text(value, label, 2048);
  try {
    const url = new URL(result);
    if (url.protocol === "https:" && !url.username && !url.password)
      return result;
  } catch {
    /* Validation error below also covers malformed URLs. */
  }
  throw new ThoughtsError(
    400,
    `${label} must be an absolute HTTPS URL without credentials.`,
  );
}

function mediaSrc(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (/^\/(?!\/)/.test(value)) return value;
  try {
    return httpsUrl(value, "media URL");
  } catch {
    return undefined;
  }
}

export function sanitizeThoughtHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "strong",
      "em",
      "figure",
      "img",
      "figcaption",
      "table",
      "caption",
      "colgroup",
      "col",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "video",
      "source",
      "code",
      "pre",
      "br",
      "hr",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      video: [
        "src",
        "poster",
        "controls",
        "preload",
        "playsinline",
        "muted",
        "loop",
      ],
      source: ["src", "type"],
      th: ["scope", "colspan", "rowspan"],
      td: ["colspan", "rowspan"],
      col: ["span"],
      ol: ["start"],
      code: ["class"],
    },
    allowedClasses: { code: ["language-*"] },
    allowedSchemes: ["https", "http", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tag, attrs) => ({
        tagName: "a",
        attribs: {
          ...attrs,
          ...(attrs.target === "_blank" ? { rel: "noopener noreferrer" } : {}),
        },
      }),
      img: (_tag, attrs) => {
        const src = mediaSrc(attrs.src);
        return {
          tagName: "img",
          attribs: {
            ...attrs,
            src: src ?? "",
            loading: "lazy",
            alt: attrs.alt ?? "",
          },
        };
      },
      video: (_tag, attrs) => ({
        tagName: "video",
        attribs: {
          ...attrs,
          src: mediaSrc(attrs.src) ?? "",
          poster: mediaSrc(attrs.poster) ?? "",
          controls: "",
          preload: "metadata",
          playsinline: "",
        },
      }),
      source: (_tag, attrs) => ({
        tagName: "source",
        attribs: {
          src: mediaSrc(attrs.src) ?? "",
          type: "video/mp4",
        },
      }),
    },
    exclusiveFilter: (frame) =>
      (frame.tag === "img" || frame.tag === "source") && !frame.attribs.src,
  });
}

export function validateThought(
  input: unknown,
  now = new Date(),
): { post: ThoughtPost; update: boolean } {
  const body = object(
    input,
    [
      "slug",
      "title",
      "excerpt",
      "date",
      "category",
      "tags",
      "contentHtml",
      "heroImage",
      "video",
      "update",
    ],
    "body",
  );
  const date = text(body.date, "date", 40);
  const match =
    /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.exec(
      date,
    );
  if (
    !match ||
    !Number.isFinite(Date.parse(date)) ||
    Number(match[2]) < 1 ||
    Number(match[2]) > 12 ||
    Number(match[3]) < 1 ||
    Number(match[3]) >
      new Date(Date.UTC(Number(match[1]), Number(match[2]), 0)).getUTCDate() ||
    Number(date.slice(11, 13)) > 23
  ) {
    throw new ThoughtsError(
      400,
      "date must be a valid ISO timestamp with an explicit offset or Z.",
    );
  }
  if (body.category !== "tech" && body.category !== "markets") {
    throw new ThoughtsError(400, 'category must be "tech" or "markets".');
  }
  if (!Array.isArray(body.tags) || body.tags.length > 20) {
    throw new ThoughtsError(
      400,
      "tags must be an array of at most 20 strings.",
    );
  }
  const tags = body.tags.map((tag) => text(tag, "tag", 60));
  if (new Set(tags).size !== tags.length)
    throw new ThoughtsError(400, "tags must be unique.");
  if (body.update !== undefined && typeof body.update !== "boolean") {
    throw new ThoughtsError(400, "update must be a boolean.");
  }
  const contentHtml = sanitizeThoughtHtml(
    text(body.contentHtml, "contentHtml", 1_000_000),
  );
  if (
    !sanitizeHtml(contentHtml, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim() &&
    !/<(?:img|video|table)\b/.test(contentHtml)
  ) {
    throw new ThoughtsError(
      400,
      "contentHtml must contain content after sanitizing.",
    );
  }
  const post: ThoughtPost = {
    slug: validateSlug(body.slug),
    title: text(body.title, "title", 200),
    excerpt: text(body.excerpt, "excerpt", 1000),
    date,
    category: body.category,
    tags,
    contentHtml,
    updatedAt: now.toISOString(),
  };
  if (body.heroImage !== undefined && body.heroImage !== null) {
    const image = object(body.heroImage, ["url", "alt"], "heroImage");
    post.heroImage = {
      url: httpsUrl(image.url, "heroImage.url"),
      alt: text(image.alt, "heroImage.alt", 500, true),
    };
  }
  if (body.video !== undefined && body.video !== null) {
    const video = object(body.video, ["url", "poster"], "video");
    post.video = {
      url: httpsUrl(video.url, "video.url"),
      poster: httpsUrl(video.poster, "video.poster"),
    };
  }
  return { post, update: body.update === true };
}

export function thoughtPage(
  posts: ThoughtPost[],
  page: number,
  limit = THOUGHTS_PAGE_SIZE,
) {
  const total = posts.length;
  return {
    posts: posts.slice((page - 1) * limit, page * limit),
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export function formatThoughtDate(
  value: string,
  month: "long" | "short" = "long",
) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
    timeZone: "UTC",
  });
}
