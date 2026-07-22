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
        brand: {
          navy: "#2B3944",
          blue: "#F0721D",
          sky: "#51ABA8",
          green: "#51ABA8",
          slate: "#2B3944",
          muted: "#60717D",
          soft: "#F4F6F7",
          line: "#DCE3E7",
        },
      },
      boxShadow: {
        soft: "0 18px 48px rgba(43, 57, 68, 0.10)",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "system-ui", "sans-serif"],
        display: ["Roboto", "Arial", "Helvetica", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
