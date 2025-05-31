import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Londrina Solid", "sans-serif"],
        londrina: ["Londrina Solid", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config 