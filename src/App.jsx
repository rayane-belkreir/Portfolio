import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import SkillsPage from "./pages/Skills";
import ContactPage from "./pages/Contact";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!isLoaded && <Loader key="global-loader" />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={isLoaded ? "opacity-100" : "pointer-events-none opacity-0"}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/competences" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </motion.div>
    </div>
  );
}

