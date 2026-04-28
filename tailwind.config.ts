import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      colors: {
        neutral: {
          50: 'oklch(98% 0.005 85)',
          100: 'oklch(96% 0.005 85)',
          200: 'oklch(92% 0.008 85)',
          300: 'oklch(85% 0.01 85)',
          400: 'oklch(70% 0.012 85)',
          500: 'oklch(55% 0.015 85)',
          600: 'oklch(42% 0.015 85)',
          700: 'oklch(32% 0.012 85)',
          800: 'oklch(22% 0.01 85)',
          900: 'oklch(15% 0.008 85)',
        },
        teal: {
          50: 'oklch(96% 0.02 195)',
          100: 'oklch(92% 0.04 195)',
          200: 'oklch(85% 0.06 195)',
          300: 'oklch(75% 0.08 195)',
          400: 'oklch(65% 0.1 195)',
          500: 'oklch(55% 0.12 195)',
          600: 'oklch(48% 0.12 195)',
          700: 'oklch(40% 0.1 195)',
          800: 'oklch(32% 0.08 195)',
          900: 'oklch(25% 0.06 195)',
        },
      },
    },
  },
  plugins: [],
};

export default config;
