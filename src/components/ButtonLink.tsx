import Link from "next/link";
import TrackedAnchor from "@/components/TrackedAnchor";
import type { AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-400",
  secondary:
    "border border-zinc-600 text-zinc-100 hover:border-zinc-400 hover:text-white focus-visible:outline-zinc-300",
  ghost:
    "text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline focus-visible:outline-blue-400",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  event?: AnalyticsEvent | string;
  external?: boolean;
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  event,
  external,
  className = "",
}: Props) {
  const classes = `inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <TrackedAnchor
        href={href}
        event={event}
        className={classes}
        {...(href.startsWith("http") || href.endsWith(".pdf")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </TrackedAnchor>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
