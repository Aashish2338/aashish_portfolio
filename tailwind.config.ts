import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        android: {
          DEFAULT: "#00F2FE",
          light: "#67E8F9",
          dark: "#0891B2",
        },
        cyan: {
          DEFAULT: "#00F2FE",
          glow: "#38BDF8",
          dark: "#0891B2",
          light: "#A5F3FC",
        },
        ink: {
          DEFAULT: "#030712",
          soft: "#060A14",
          slate: "#0B1220",
        },
        paper: "#F8FAFC",
        muted: "#94A3B8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-poppins)", "sans-serif"],
      },
      backgroundImage: {
        "grid-slate":
          "linear-gradient(to right, rgba(0,242,254,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,242,254,0.06) 1px, transparent 1px)",
        "glow-radial":
          "radial-gradient(circle at center, rgba(0,242,254,0.22), transparent 70%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(4deg)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
