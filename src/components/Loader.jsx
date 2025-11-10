import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.12 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: "easeInOut" }
  }
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-slate-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex gap-4">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="h-4 w-4 rounded-full bg-primary"
            variants={dotVariants}
          />
        ))}
      </div>
      <motion.p
        className="mt-6 text-sm uppercase tracking-[0.3em] text-slate-400"
        initial={{ opacity: 0, letterSpacing: "0.8em" }}
        animate={{ opacity: 0.7, letterSpacing: "0.3em" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Chargement
      </motion.p>
    </motion.div>
  );
}

