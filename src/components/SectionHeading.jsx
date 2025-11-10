import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle }) {
  return (
    <motion.div
      className="mb-10 flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-slate-300">{subtitle}</p>}
      <div className="h-1 w-16 rounded-full bg-primary/80" />
    </motion.div>
  );
}

