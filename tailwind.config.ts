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
          DEFAULT: "#c1272d",
          dark: "#a11f24",
          light: "#e53935",
        },
        secondary: {
          DEFAULT: "#1a1a1a",
          light: "#333333",
        },
        accent: {
          blue: "#1976d2",
          green: "#388e3c",
          orange: "#f57c00",
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
              color: "#c1272d",
              "&:hover": {
                color: "#a11f24",
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
