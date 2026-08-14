/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050914",
          900: "#0a0f24",
          800: "#0f1633",
          700: "#161f45",
        },
        brand: {
          50: "#eef4ff",
          100: "#dbe7ff",
          200: "#b3cdff",
          300: "#7fa8ff",
          400: "#4d7fff",
          500: "#2f5cff",
          600: "#1f42e6",
          700: "#1833b3",
          800: "#142880",
          900: "#101d59",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        magenta: {
          400: "#e879f9",
          500: "#d946ef",
        },
        accent: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
      },
      backgroundImage: {
        "digivora-gradient": "linear-gradient(90deg, #2f5cff 0%, #8b5cf6 45%, #d946ef 100%)",
        "digivora-radial": "radial-gradient(circle at 30% 20%, rgba(47,92,255,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.3), transparent 45%), radial-gradient(circle at 60% 80%, rgba(217,70,239,0.25), transparent 45%)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        glow: "glow 2.5s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "fade-in": "fade-in 0.5s ease-out",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
};
