/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        primary: "#6366f1",
        secondary: "#22d3ee",
        surface: "#0f172a",
        surfaceLight: "rgba(15, 23, 42, 0.85)",
        glow: "rgba(99, 102, 241, 0.45)"
      },
      boxShadow: {
        glow: "0 0 30px rgba(99, 102, 241, 0.35)"
      }
    }
  },
  plugins: []
};

