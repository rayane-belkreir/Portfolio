import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiGrid, FiLayers, FiChevronRight } from "react-icons/fi";
import ProjectModal from "./ProjectModal";
import SectionHeading from "./SectionHeading";
import { projectCategories, projects } from "../data/projects";

const listVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" }
  }
};

export default function Projects() {
  const [category, setCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (category === "Tous") return projects;
    return projects.filter((project) => project.category === category);
  }, [category]);

  return (
    <section id="projects" className="relative space-y-10">
      <div className="overflow-hidden rounded-3xl bg-slate-900/80">
        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <SectionHeading
              title="Panorama des projets"
              subtitle="Passez en revue l’ensemble des études de cas d’un seul coup d’œil, puis plongez dans les galeries interactives."
            />
          </div>
          <div className="rounded-2xl border border-primary/40 bg-primary/10 px-6 py-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-primary">
              <FiGrid />
              Vue condensée
            </div>
            <p className="mt-2">Structure quadrillée, badges de compétences et accès direct aux visuels haute définition.</p>
          </div>
        </div>
        <div className="border-t border-slate-800/70 bg-slate-950/30 px-6 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {projectCategories.map((cat) => {
              const active = category === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  whileTap={{ scale: 0.94 }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-primary text-white shadow-glow"
                      : "border border-slate-700/70 bg-slate-900/60 text-slate-300 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-slate-900/70 shadow-[0_30px_80px_rgba(76,87,255,0.16)]"
      >
        <table className="w-full table-fixed border-collapse text-left">
          <thead className="bg-slate-900/85 text-[11px] uppercase tracking-[0.3em] text-slate-400">
            <tr>
              <th className="border-r border-slate-800/45 px-8 py-5">Projet</th>
              <th className="border-r border-slate-800/45 px-8 py-5">Description</th>
              <th className="border-r border-slate-800/45 px-8 py-5 text-center">Compétences clés</th>
              <th className="px-8 py-5 text-center">Aperçu</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <motion.tr
                key={project.id}
                layout
                whileHover={{ scale: 1.01, translateY: -2 }}
                className="border-t border-slate-800/45 bg-transparent transition-colors duration-300 hover:bg-slate-900/60"
              >
                <td className="border-r border-slate-800/45 px-8 py-6 align-middle">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/45 via-primary/25 to-primary/10 text-[13px] font-semibold tracking-[0.18em] text-white shadow-[0_15px_32px_rgba(76,87,255,0.3)]">
                      <span className="relative z-10 leading-none">{String(index + 1).padStart(2, "0")}</span>
                      <span className="pointer-events-none absolute inset-0 rounded-full border border-primary/65" />
                      <span className="pointer-events-none absolute inset-0 rounded-full blur-md bg-primary/20 opacity-80" />
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[9px] uppercase tracking-[0.45em] text-primary/75">{project.category}</span>
                      <h3 className="text-[14px] font-semibold text-white">
                        <span className="block max-w-[175px] leading-tight">{project.title}</span>
                      </h3>
                    </div>
                  </div>
                </td>
                <td className="border-r border-slate-800/45 px-8 py-6 align-middle">
                  <p className="mx-auto max-w-[320px] text-sm leading-relaxed text-slate-300">
                    {project.fullDescription ?? project.description}
                  </p>
                </td>
                <td className="border-r border-slate-800/45 px-8 py-6 align-middle">
                  <div className="flex h-full items-center justify-center">
                    <div className="flex max-w-[220px] flex-wrap items-center justify-center gap-2 text-center">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 align-middle">
                  <div className="flex justify-center">
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      whileTap={{ scale: 0.94 }}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary/90 px-6 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-primary"
                    >
                      Voir
                      <FiChevronRight className="transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

