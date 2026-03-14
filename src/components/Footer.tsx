export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-[#0a0a0f]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Aseem Kishore
        </p>
        <div className="flex gap-6 text-sm text-zinc-500">
          <a
            href="https://akinternetconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            AKIC
          </a>
        </div>
      </div>
    </footer>
  );
}
