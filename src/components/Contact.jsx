import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const defaultForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateField = (name, value) => {
    let error = "";
    if (!value) error = "Champ requis";
    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Adresse e-mail invalide";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = Object.entries(formData).every(([name, value]) => validateField(name, value));
    if (!isFormValid) return;

    setStatus("loading");
    setStatusMessage("");
    try {
      const response = await axios.post("/api/contact", formData);
      setStatus("success");
      if (response.data?.info) {
        setStatusMessage(response.data.info);
      } else {
        setStatusMessage("Merci ! Votre message a bien été envoyé. Je vous réponds sous 48h.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage("Une erreur est survenue. Merci de réessayer plus tard ou d’utiliser le contact direct.");
    }
  };

  return (
    <section id="contact" className="relative">
      <SectionHeading
        title="Contact & collaboration"
        subtitle="Prêt(e) à imaginer ensemble la prochaine infrastructure ou application sécurisée ? Partagez vos idées : je vous réponds sous 48h."
      />

      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl bg-slate-900/70 p-8 shadow-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Nom complet"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormField
              label="Adresse e-mail"
              name="email"
              type="email"
              placeholder="nom@exemple.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          <FormField
            label="Objet"
            name="subject"
            placeholder="Sujet du message"
            value={formData.subject}
            onChange={handleChange}
            error={errors.subject}
          />
          <FormField
            as="textarea"
            label="Message"
            name="message"
            placeholder="Expliquez-moi votre besoin, vos contraintes, vos objectifs..."
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
          />

          <motion.button
            type="submit"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90"
            whileTap={{ scale: 0.96 }}
            disabled={status === "loading"}
          >
            <FaPaperPlane />
            {status === "loading" ? "Envoi en cours..." : "Envoyer"}
          </motion.button>

          {status === "success" && (
            <p className="text-sm font-semibold text-emerald-400">{statusMessage}</p>
          )}
          {status === "error" && (
            <p className="text-sm font-semibold text-rose-400">{statusMessage}</p>
          )}
        </motion.form>

        <motion.div
          className="space-y-6 rounded-3xl bg-slate-900/40 p-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold text-slate-100">Informations directes</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <p>Email : rayanebelkreir1@gmail.com</p>
            <p>Basé à Marseille</p>
          </div>
          <div className="flex gap-4">
            <SocialLink
              href="https://www.linkedin.com/in/rayane-belkreir/"
              icon={<FaLinkedin className="h-5 w-5" />}
              label="LinkedIn"
            />
            <SocialLink
              href="https://github.com/rayane-belkreir"
              icon={<FaGithub className="h-5 w-5" />}
              label="GitHub"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FormField({ as = "input", label, error, ...props }) {
  const Component = as;
  return (
    <label className="block text-sm font-semibold text-slate-200">
      {label}
      <Component
        className={`mt-2 w-full rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 ${
          error ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/20" : ""
        }`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-rose-400">{error}</span>}
    </label>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener"
      className="flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-primary/40 hover:text-primary"
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.35)" }}
      whileTap={{ scale: 0.97 }}
    >
      {icon}
      {label}
    </motion.a>
  );
}

