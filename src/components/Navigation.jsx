import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/projets", label: "Projets" },
  { to: "/competences", label: "Compétences" },
  { to: "/contact", label: "Contact" }
];

export default function Navigation() {
  return (
    <header className="fixed inset-x-0 top-6 z-40 flex flex-col items-center gap-3 px-4">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
        RB, étudiant en quête d'un BTS CIEL
      </span>
      <nav className="flex w-full max-w-3xl items-center justify-center rounded-full border border-slate-800/70 bg-slate-950/60 px-4 py-2 backdrop-blur-xl">
        <div className="flex flex-1 justify-center gap-1 sm:gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "relative inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition sm:px-4 sm:text-sm",
                  isActive ? "text-primary" : "text-slate-300 hover:text-primary"
                ].join(" ")
              }
              end={link.to === "/"}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

