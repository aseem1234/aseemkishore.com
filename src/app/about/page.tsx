import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Aseem Kishore — founder, writer, tech enthusiast, and investor.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
        About
      </h1>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-100">Professional</h2>
        <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
          <p>
            I&apos;m a tech entrepreneur with over 15 years of experience
            building and growing digital media brands. I founded{" "}
            <a
              href="https://akinternetconsulting.com"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              AK Internet Consulting
            </a>
            , where I help businesses with WordPress maintenance, workflow
            automation, and AI-powered software development.
          </p>
          <p>
            I&apos;ve built a portfolio of technology publications that reach
            millions of readers each month, including{" "}
            <a href="https://www.online-tech-tips.com" className="text-blue-400 hover:text-blue-300 transition-colors">Online Tech Tips</a>,{" "}
            <a href="https://helpdeskgeek.com" className="text-blue-400 hover:text-blue-300 transition-colors">Help Desk Geek</a>,{" "}
            <a href="https://www.thebackroomtech.com" className="text-blue-400 hover:text-blue-300 transition-colors">The Back Room Tech</a>,{" "}
            <a href="https://www.switchingtomac.com" className="text-blue-400 hover:text-blue-300 transition-colors">Switching to Mac</a>, and{" "}
            <a href="https://xboxadvisor.com" className="text-blue-400 hover:text-blue-300 transition-colors">Xbox Advisor</a>.
          </p>
          <p>
            My work sits at the intersection of content, technology, and
            entrepreneurship. I write about tech, build tools with AI, and
            manage the infrastructure that keeps everything running.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-100">Personal</h2>
        <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
          <p>
            Outside of work, I&apos;m a family man, a stock and options
            enthusiast, and a lifelong tinkerer. I enjoy digging into new
            technologies, following the markets, and spending time with my
            family.
          </p>
          <p>
            I&apos;m based in the US and have been working remotely in the
            tech space since long before it was mainstream.
          </p>
        </div>
      </section>
    </div>
  );
}
