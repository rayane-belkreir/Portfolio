import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const FALLBACK_CARD_IMAGE = "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80";

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.65,
      ease: "easeOut"
    }
  })
};

export default function ProjectCard({ project, index, onOpenModal }) {
  const [hasError, setHasError] = useState(false);

  const preview = useMemo(() => {
    if (hasError) return FALLBACK_CARD_IMAGE;
    return project.thumbnail || project.gallery?.[0] || FALLBACK_CARD_IMAGE;
  }, [hasError, project.thumbnail, project.gallery]);

  const previewUrl = useMemo(() => (preview ? encodeURI(preview) : FALLBACK_CARD_IMAGE), [preview]);

  return (
    <motion.article
      layout
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      className="group relative flex h-full w-full max-w-[360px] flex-col overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/80 p-[2px]"
    >
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(24px-2px)]">
        <div className="relative h-44 w-full overflow-hidden rounded-t-[calc(24px-2px)]">
          <img
            src={previewUrl}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            onError={() => setHasError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/20 to-transparent" />
          {project.category && (
            <span className="absolute left-4 top-4 rounded-full bg-[#050810]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {project.category}
            </span>
          )}
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-4 p-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{project.tools.length} outils</p>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>
          </div>
        </div>

        <div className="relative z-10 space-y-4 p-6 pt-0">
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition group-hover:border-primary group-hover:bg-primary/20"
              >
                {tool}
              </span>
            ))}
          </div>

          <motion.button
            onClick={() => onOpenModal(project)}
            whileTap={{ scale: 0.96 }}
            className="group/button inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary/90 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary"
          >
            Voir la galerie
            <span className="transition-transform group-hover/button:translate-x-1">→</span>
          </motion.button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100 group-hover:shadow-[0_20px_45px_rgba(76,87,255,0.25)]" />
    </motion.article>
  );
}

