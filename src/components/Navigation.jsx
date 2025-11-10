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
    <header className="fixed inset-x-0 top-4 z-40 flex flex-col items-center gap-3 px-3 sm:top-6 sm:px-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400 sm:text-xs">
        RB, étudiant en quête d'un BTS CIEL
      </span>
      <nav className="flex w-full max-w-3xl items-center justify-center rounded-full border border-slate-800/70 bg-slate-950/70 px-2 py-1.5 backdrop-blur-xl shadow-lg sm:px-4">
        <div className="flex w-full flex-wrap items-center justify-center gap-1 overflow-x-auto px-1 text-[11px] sm:gap-3 sm:text-xs md:text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "relative inline-flex min-w-[110px] items-center justify-center rounded-full px-3 py-2 font-semibold uppercase tracking-wide whitespace-nowrap transition sm:min-w-0 sm:px-4",
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

