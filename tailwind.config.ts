import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F4C81",    // Deep Navy Blue - 신뢰, 권위
          dark: "#0A3A63",       // Darker Navy
          light: "#1E6CB5",      // Lighter Blue
        },
        secondary: {
          DEFAULT: "#1A1A2E",    // Deep Dark Blue-Black
          light: "#16213E",
        },
        accent: {
          blue: "#3B82F6",       // Research 카테고리
          green: "#10B981",      // Commentary 카테고리
          gold: "#D4AF37",       // Premium/Trust 강조
          teal: "#0D9488",       // 하이라이트
        },
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1a1a1a",
            a: {
              color: "#0F4C81",
              "&:hover": {
                color: "#1E6CB5",
              },
            },
            h1: {
              fontFamily: "Georgia, serif",
              fontWeight: "700",
            },
            h2: {
              fontFamily: "Georgia, serif",
              fontWeight: "600",
            },
            h3: {
              fontFamily: "Georgia, serif",
              fontWeight: "600",
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
