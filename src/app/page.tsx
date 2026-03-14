import Link from "next/link";

function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
      {/* Gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
          Aseem Kishore
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Founder, writer, and tech enthusiast building digital media brands.
        </p>
        <div className="mt-4 flex gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            See my work
          </a>
          <Link
            href="/about"
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            About me
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
