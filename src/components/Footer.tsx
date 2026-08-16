import Link from "next/link";
import TrackedAnchor from "@/components/TrackedAnchor";
import { links } from "@/data/profile";

const footerNav = [
  { href: "/experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/career", label: "Career" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/tools", label: "Tools" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-[#0a0a0f]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-200">Aseem Kishore</p>
            <p className="mt-2 max-w-sm text-sm text-zinc-500">
              Content strategy and editorial operations. Digital publishing, AI-enabled workflows, and product work.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4 border-t border-zinc-800/80 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Aseem Kishore</p>
          <div className="flex flex-wrap gap-5">
            <TrackedAnchor
              href={links.resume.href}
              event="resume_download"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-400"
            >
              Résumé
            </TrackedAnchor>
            <TrackedAnchor
              href={links.linkedin.href}
              event="linkedin_click"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-400"
            >
              LinkedIn
            </TrackedAnchor>
            <TrackedAnchor
              href={links.muckrack.href}
              event="muckrack_click"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-400"
            >
              Muck Rack
            </TrackedAnchor>
            <TrackedAnchor
              href={links.email.href}
              event="contact_click"
              className="transition-colors hover:text-blue-400"
            >
              Email
            </TrackedAnchor>
          </div>
        </div>
      </div>
    </footer>
  );
}
