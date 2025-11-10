import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-800/60 bg-slate-950/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-8 text-sm text-slate-400 md:flex-row md:px-10">
        <p>© {new Date().getFullYear()} Rayane Belkreir. Tous droits réservés.</p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/rayane-belkreir"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-slate-300 transition hover:text-primary"
          >
            <FaGithub />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rayane-belkreir/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-slate-300 transition hover:text-primary"
          >
            <FaLinkedin />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

