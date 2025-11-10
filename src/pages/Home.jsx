import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <div className="space-y-20">
      <Hero />

      <section className="grid gap-12 rounded-3xl bg-slate-900/60 p-8 shadow-lg md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Projets mis à l’honneur</h2>
          <p className="text-slate-300">
            Une sélection de projets récents alliant cybersécurité, automatisation et design moderne.
            Parcourez l’intégralité des études de cas pour découvrir la profondeur des missions.
          </p>
          <Link
            to="/projets"
            className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Voir tous les projets →
          </Link>
        </div>
        <div className="grid gap-4">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              className="rounded-2xl border border-slate-800/60 bg-slate-900/70 p-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-sm uppercase tracking-wide text-primary">{project.category}</p>
              <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
              <p className="text-sm text-slate-400">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <motion.div
          className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-slate-100">
            Compétences techniques & humaines
          </h2>
          <p className="mt-3 text-slate-300">
            J’oriente mes projets autour d’un triptyque : sécurité, automatisation et expérience utilisateur.
            Découvrez la cartographie complète de mes compétences.
          </p>
          <Link
            to="/competences"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-primary hover:text-primary"
          >
            Explorer les compétences →
          </Link>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-slate-100">
            Travaillons ensemble
          </h2>
          <p className="mt-3 text-slate-300">
            Une idée de projet, une infrastructure à sécuriser ou une application à concevoir ? Parlons-en.
            Je suis disponible pour des missions en alternance, stage longue durée ou freelance.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Ouvrir le formulaire →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

