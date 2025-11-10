import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaCompress, FaExpand, FaTimes } from "react-icons/fa";

const FALLBACK_IMAGE = "https://dummyimage.com/1600x1200/0f172a/6366f1&text=Aperçu+indisponible";
const EXTENSION_ATTEMPTS = ["PNG", "jpg", "JPG", "jpeg", "JPEG"];

export default function ProjectModal({ project, onClose }) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const gallery = useMemo(() => {
    if (!project?.gallery?.length) {
      return project?.thumbnail ? [project.thumbnail] : [];
    }
    return project.gallery;
  }, [project]);

  const total = gallery.length;

  useEffect(() => {
    setCurrent(0);
    setIsFullscreen(false);
  }, [project]);

  const goNext = () => {
    if (total === 0) return;
    setCurrent((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    if (total === 0) return;
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const handleImageError = (event) => {
    const img = event.currentTarget;
    const original = img.dataset.originalPath;
    if (!original) {
      img.dataset.originalPath = img.getAttribute("data-original-path") || "";
    }
    const basePath = img.dataset.originalPath;

    if (!basePath) {
      img.src = FALLBACK_IMAGE;
      return;
    }

    const attemptIndex = parseInt(img.dataset.attempt || "0", 10);
    const lastDot = basePath.lastIndexOf(".");

    if (lastDot > -1 && attemptIndex < EXTENSION_ATTEMPTS.length) {
      const nextSrc = `${basePath.substring(0, lastDot)}.${EXTENSION_ATTEMPTS[attemptIndex]}`;
      img.dataset.attempt = String(attemptIndex + 1);
      img.dataset.originalPath = basePath;
      img.src = encodeURI(nextSrc);
    } else {
      img.src = FALLBACK_IMAGE;
    }
  };

  const currentSrc = gallery[current] || "";
  const encodedCurrentSrc = currentSrc ? encodeURI(currentSrc) : "";

  useEffect(() => {
    if (currentSrc) {
      console.log("Galerie image", { original: currentSrc, encoded: encodedCurrentSrc });
    }
  }, [currentSrc, encodedCurrentSrc]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative mx-auto flex w-[94vw] max-w-7xl flex-col overflow-hidden rounded-3xl bg-slate-900 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 210, damping: 22 }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-slate-800 p-2 text-slate-200 transition hover:bg-slate-700"
                aria-label="Fermer la fenêtre"
              >
                <FaTimes />
              </button>

              <div className="grid gap-12 p-10 xl:grid-cols-[0.7fr_1.3fr] xl:items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-slate-100">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                      Outils & technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {total > 0 ? (
                    <div className="relative flex max-h-[820px] min-h-[520px] items-center justify-center overflow-hidden rounded-2xl border border-slate-600 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-900/70">
                      <motion.img
                        key={encodedCurrentSrc}
                        src={encodedCurrentSrc}
                        alt={`${project.title} - slide ${current + 1}`}
                        className="mx-auto block max-h-[760px] w-auto rounded-2xl bg-slate-900/20 object-contain p-6 shadow-inner"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        data-original-path={currentSrc}
                        data-attempt="0"
                        onError={handleImageError}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 shadow-inner" />
                      <button
                        onClick={() => setIsFullscreen(true)}
                        className="absolute right-6 top-6 rounded-full bg-slate-900/80 p-3 text-slate-200 shadow-lg transition hover:bg-primary/80"
                        aria-label="Agrandir"
                      >
                        <FaExpand />
                      </button>

                      {total > 1 && (
                        <>
                          <button
                            onClick={goPrev}
                            disabled={current === 0}
                            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 p-3 text-slate-200 shadow-md transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Précédent"
                          >
                            <FaChevronLeft />
                          </button>
                          <button
                            onClick={goNext}
                            disabled={current === total - 1}
                            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/70 p-3 text-slate-200 shadow-md transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Suivant"
                          >
                            <FaChevronRight />
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 text-sm text-slate-400">
                      Aucun visuel disponible pour le moment.
                    </div>
                  )}

                  {total > 1 ? (
                    <div className="mx-auto flex max-w-[520px] justify-center gap-2">
                      {gallery.map((image, idx) => (
                        <button
                          key={image}
                          onClick={() => setCurrent(idx)}
                          className={`h-2.5 flex-1 rounded-full transition ${
                            idx === current ? "bg-primary" : "bg-slate-700 hover:bg-slate-500"
                          }`}
                          aria-label={`Aller au visuel ${idx + 1}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-500">
                      Slide unique
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isFullscreen && currentSrc && (
              <motion.div
                className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFullscreen(false)}
              >
                <div
                  className="relative flex max-h-[95vh] max-w-[95vw] cursor-zoom-out items-center justify-center"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute right-6 top-6 rounded-full bg-slate-800/80 p-3 text-slate-200 transition hover:bg-primary/80"
                    aria-label="Réduire"
                  >
                    <FaCompress />
                  </button>
                  {total > 1 && (
                    <>
                      <button
                        onClick={goPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-4 text-slate-200 transition hover:bg-primary/80"
                        aria-label="Précédent"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={goNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-4 text-slate-200 transition hover:bg-primary/80"
                        aria-label="Suivant"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                  <img
                    src={encodedCurrentSrc}
                    alt={`${project.title} - slide ${current + 1}`}
                    className="max-h-[95vh] w-auto max-w-[95vw] rounded-3xl border border-white/10 object-contain shadow-2xl"
                    data-original-path={currentSrc}
                    data-attempt="0"
                    onError={handleImageError}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

