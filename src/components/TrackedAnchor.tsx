"use client";

import type { AnalyticsEvent } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event?: AnalyticsEvent | string;
  eventData?: Record<string, string>;
};

export default function TrackedAnchor({
  event,
  eventData,
  onClick,
  ...props
}: Props) {
  return (
    <a
      {...props}
      onClick={(clickEvent) => {
        if (event) trackEvent(event, eventData);
        onClick?.(clickEvent);
      }}
    />
  );
}
