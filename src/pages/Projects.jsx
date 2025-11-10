import { motion } from "framer-motion";
import ProjectsSection from "../components/Projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-14">
      <motion.section
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-900/30 p-10 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative z-10 space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">Portfolio projets</p>
          <h1 className="text-4xl font-bold md:text-5xl">Études de cas & réalisations</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Cartographie des projets académiques et personnels, du durcissement d’infrastructures à la
            conception d’expériences interactives. Filtrez par catégorie pour découvrir ceux qui vous intéressent.
          </p>
        </div>
        <motion.div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-primary/25 blur-[120px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </motion.section>

      <ProjectsSection />
    </div>
  );
}

