import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        'accent-custom': 'var(--accent-color)',
        'static-custom': 'var(--static-color)',
        'warning-custom': 'var(--color-warning)',
      },
    },
  },
  plugins: [],
} satisfies Config;
