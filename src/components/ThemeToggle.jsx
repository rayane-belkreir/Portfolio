import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/50 bg-slate-900/70 text-slate-100 shadow-lg backdrop-blur-xl transition hover:border-primary hover:text-primary"
      whileTap={{ scale: 0.88 }}
      aria-label="Basculer le thème"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </motion.div>
    </motion.button>
  );
}

