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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main-color": "var(--color-main)",
        "secondary-color": "var(--color-secondary)",
        "main-color-bg": "var(--color-main-bg)",
        "section-bg": "var(--color-section-bg)",
        "text-color": "var(--color-text-color)",
        "primary-green": "var(--color-primary-green)",
        "primary-red": "var(--color-primary-red)",
        "primary-gray": "var(--color-primary-gray)",
        stroke: '#E2E8F0',
      },
    },
  },
  plugins: [],
};
export default config;
