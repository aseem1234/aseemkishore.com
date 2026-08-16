type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
};

export default function SectionHeading({ eyebrow, title, description, id }: Props) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="mt-3 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-lg leading-relaxed text-zinc-400">{description}</p> : null}
    </div>
  );
}
