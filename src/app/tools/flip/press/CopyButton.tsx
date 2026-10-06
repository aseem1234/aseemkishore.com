"use client";

import { useState } from "react";

type Props = { text: string; label: string };

export default function CopyButton({ text, label }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(area);
        setStatus(ok ? "copied" : "failed");
      } catch {
        setStatus("failed");
      }
    }
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="rounded-lg border border-zinc-600 px-3 py-1.5 text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        {status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" ? `${label} copied` : status === "failed" ? "Copy failed" : ""}
      </span>
    </>
  );
}
