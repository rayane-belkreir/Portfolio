import { motion } from "framer-motion";
import ContactSection from "../components/Contact";

export default function ContactPage() {
  return (
    <div className="space-y-14">
      <motion.section
        className="rounded-3xl border border-slate-800/60 bg-slate-900/70 p-10 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold md:text-5xl">Entrons en contact</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Une infrastructure à sécuriser, une plateforme à concevoir ou un projet pédagogique à mener ?
          Je suis à l’écoute pour co-construire des solutions robustes et élégantes.
        </p>
      </motion.section>

      <ContactSection />
    </div>
  );
}

