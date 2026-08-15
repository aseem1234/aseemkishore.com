"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const links = [
  { href: "/experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function linkClass(active: boolean) {
  return `text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 ${
    active
      ? "text-blue-400 underline decoration-2 underline-offset-8"
      : "text-zinc-400 hover:text-zinc-100"
  }`;
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-[#0a0a0f]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-mono text-sm font-semibold tracking-wide text-zinc-100 transition-colors hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
        >
          Aseem Kishore
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(pathname === href || pathname.startsWith(`${href}/`))}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            {open ? (
              <path
                fillRule="evenodd"
                d="M4.22 4.22a.75.75 0 0 1 1.06 0L10 8.94l4.72-4.72a.75.75 0 1 1 1.06 1.06L11.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 5.5A.75.75 0 0 1 2.75 10h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10.25Zm.75 4.75a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75Z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div id={menuId} className="border-t border-zinc-800 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(pathname === href || pathname.startsWith(`${href}/`))}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
