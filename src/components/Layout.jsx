import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const pageVariants = {
  initial: { opacity: 0, y: 28, scale: 0.995 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.995,
    transition: { duration: 0.35, ease: "easeInOut" }
  }
};

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050810] text-slate-100">
      <ScrollToTop />
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-40 md:px-10 lg:px-16"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

