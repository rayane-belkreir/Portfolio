import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { skills } from "../data/skills";
import SectionHeading from "./SectionHeading";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export default function Skills() {
  return (
    <section id="skills" className="space-y-10">
      <SectionHeading
        title="Compétences & expertise"
        subtitle="Blend cybersécurité, automatisation et pilotage pour livrer des infrastructures robustes et une expérience utilisateur soignée."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-3xl border border-slate-800/60 bg-slate-900/70 p-6 text-sm text-slate-300 shadow-lg md:p-8"
      >
        <p>
          Chaque note est basée sur des réalisations concrètes : projets en production, audits livrés et support aux
          équipes. Les scores (&ldquo;/100&rdquo;) reflètent le niveau d’autonomie et la valeur ajoutée délivrée sur le terrain.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {skills.map((skill, index) => (
          <motion.article
            key={skill.name}
            className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-950/90 via-slate-900/75 to-slate-900/40 p-7 shadow-xl transition hover:border-primary/60 hover:shadow-[0_25px_60px_rgba(99,102,241,0.18)]"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/80">{skill.name}</p>
                <p className="text-sm text-slate-300">{skill.description}</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-primary">
                <span className="text-3xl font-bold leading-none">{skill.score}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/70">/100</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {skill.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/50 px-3 py-2 text-sm text-slate-200"
                >
                  <FiCheckCircle className="mt-1 h-4 w-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {skill.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

