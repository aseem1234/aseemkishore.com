import ButtonLink from "@/components/ButtonLink";

type Props = {
  title: string;
  description: string;
};

export default function CtaBand({ title, description }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-6 py-12 text-center sm:px-12">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-50">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/resume/Aseem-Kishore-Resume.pdf" event="resume_download">
            View Résumé
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact Me
          </ButtonLink>
          <ButtonLink
            href="https://www.linkedin.com/in/aseemkishore"
            variant="ghost"
            event="linkedin_click"
          >
            LinkedIn
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
