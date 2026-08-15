type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHero({ eyebrow, title, description }: Props) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400">{eyebrow}</p>
      ) : null}
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">{title}</h1>
      {description ? <p className="mt-5 text-lg leading-relaxed text-zinc-400">{description}</p> : null}
    </header>
  );
}
