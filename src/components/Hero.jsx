import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const roles = [
  "Étudiant en cybersécurité",
  "Administrateur infrastructure",
  "Passionné d'automatisation",
  "Créateur d'expériences interactives"
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" }
  })
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const categories = Array.from(new Set(projects.map((project) => project.category)));
    const toolSet = new Set(projects.flatMap((project) => project.tools));
    const highlightedTools = Array.from(toolSet).slice(0, 4);

    return {
      totalProjects,
      totalDomains: categories.length,
      highlightedTools
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/30 p-8 md:p-14"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center"
      >
        <div className="space-y-6">
          <motion.span
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            Portfolio interactif 2025
          </motion.span>
          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Rayane Belkreir
          </motion.h1>
          <motion.p
            key={roles[roleIndex]}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-xl font-semibold text-primary md:text-2xl"
          >
            {roles[roleIndex]}
          </motion.p>
          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-lg text-slate-300 md:text-xl"
          >
            J'automatise et sécurise des environnements hybrides (AD, LDAP, réseaux Cisco) tout en créant
            des expériences utilisateurs immersives. Mes projets mettent en scène des stacks complètes,
            de la gouvernance IAM jusqu'à l'observabilité temps réel.
          </motion.p>

          <motion.div
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/projets"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-glow transition-all duration-300 hover:translate-y-[-2px] hover:bg-primary/90"
            >
              Explorer mes projets
              <FaArrowDown className="transition-transform group-hover:translate-y-[2px]" />
            </Link>
            <a
              href="mailto:rayanebelkreir1@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-6 py-3 font-semibold text-slate-200 transition-all hover:border-primary hover:text-primary"
            >
              Me contacter
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto flex h-full w-full max-w-sm flex-col items-center gap-6"
        >
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 via-slate-900/90 to-slate-950/90 p-[3px] shadow-[0_30px_60px_rgba(76,87,255,0.25)] md:h-72 md:w-72">
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-full bg-slate-950/80 text-center">
              <span className="text-4xl font-semibold text-white md:text-5xl">{stats.totalProjects}</span>
              <p className="text-xs uppercase tracking-[0.45em] text-primary/80">Projets</p>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary/70" />
                <span>{stats.totalDomains} domaines</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 px-6">
                {stats.highlightedTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <span className="pointer-events-none absolute inset-0 rounded-full blur-[80px] bg-primary/30" />
          </div>

          <div className="grid w-full gap-3 rounded-3xl border border-slate-800/60 bg-slate-900/70 p-4 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Focus</span>
              <span className="text-primary">Infra & IAM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Automation</span>
              <span className="text-primary">CI/CD · Scripting</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Expérience</span>
              <span className="text-primary">UX · Observabilité</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-[120px]"
      />
    </section>
  );
}

