export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-zinc-950">
      <main className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Aseem Kishore
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Founder of{" "}
          <a
            href="https://akinternetconsulting.com"
            className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
          >
            AK Internet Consulting
          </a>
          . Writer, tech enthusiast, investor.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SiteCard
            name="Online Tech Tips"
            url="https://www.online-tech-tips.com"
          />
          <SiteCard
            name="Help Desk Geek"
            url="https://helpdeskgeek.com"
          />
          <SiteCard
            name="The Back Room Tech"
            url="https://www.thebackroomtech.com"
          />
        </div>

        <div className="flex gap-3 text-sm text-zinc-500 dark:text-zinc-500">
          <SiteCard
            name="Switching to Mac"
            url="https://switchingtomac.com"
          />
          <SiteCard
            name="Xbox Advisor"
            url="https://xboxadvisor.com"
          />
        </div>

        <p className="mt-8 text-sm text-zinc-400 dark:text-zinc-600">
          More coming soon.
        </p>
      </main>
    </div>
  );
}

function SiteCard({ name, url }: { name: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
    >
      {name}
    </a>
  );
}
