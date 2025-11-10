import { motion } from "framer-motion";
import SkillsSection from "../components/Skills";

export default function SkillsPage() {
  return (
    <div className="space-y-14">
      <motion.section
        className="rounded-3xl border border-slate-800/60 bg-slate-900/70 p-10 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold md:text-5xl">Compétences & méthodologie</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Des infrastructures sécurisées aux interfaces immersives, j’oriente mes missions autour de la
          fiabilité, de la traçabilité et de l’expérience utilisateur. Voici une vision détaillée de mes forces.
        </p>
      </motion.section>

      <SkillsSection />
    </div>
  );
}

