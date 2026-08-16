import ButtonLink from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="font-mono text-sm text-blue-400">404</p>
      <h1 className="mt-4 text-4xl font-bold text-zinc-50">Page not found</h1>
      <p className="mt-4 text-zinc-400">
        That URL is not on this site. Experience, work, and writing are good places to start.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Work
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact
        </ButtonLink>
      </div>
    </div>
  );
}
