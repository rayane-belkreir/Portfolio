import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const mailEnabled = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const transporter = mailEnabled
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  : null;

if (transporter) {
  transporter
    .verify()
    .then(() => console.log("SMTP prêt pour l'envoi d'e-mails"))
    .catch((error) => console.warn("Impossible de vérifier la configuration SMTP", error));
} else {
  console.warn("SMTP non configuré : définissez SMTP_HOST, SMTP_USER et SMTP_PASS pour activer l'envoi d'e-mails.");
}

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (![name, email, subject, message].every(Boolean)) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  console.log("Nouveau message de contact :");
  console.table({ name, email, subject, message });

  if (!transporter) {
    return res.status(200).json({ success: true, info: "Email non envoyé (SMTP non configuré)." });
  }

  try {
    await transporter.sendMail({
      from: `Portfolio Rayane <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || "rayanebelkreir1@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Message de ${name} (${email})\n\n${message}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Objet :</strong> ${subject}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email", error);
    res.status(500).json({ error: "Impossible d'envoyer l'e-mail pour le moment." });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});

