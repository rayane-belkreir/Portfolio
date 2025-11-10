import nodemailer from "nodemailer";

const hasSMTP =
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS;

let transporter;
if (hasSMTP) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { name, email, subject, message } = req.body || {};

  if (![name, email, subject, message].every(Boolean)) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  let infoMessage = "";

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.CONTACT_TO || process.env.SMTP_USER,
        subject: `Portfolio Contact: ${subject}`,
        html: `<p><strong>Nom:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Sujet:</strong> ${subject}</p>
               <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>`,
      });
    } catch (error) {
      console.error("Erreur SMTP (Vercel):", error);
      infoMessage = "Email non envoyé (problème SMTP).";
    }
  } else {
    infoMessage = "Email non envoyé (SMTP non configuré).";
  }

  return res.status(200).json({ success: true, info: infoMessage });
}
