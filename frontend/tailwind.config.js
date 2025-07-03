/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        user: 'var(--color-user)',
        ai: 'var(--color-ai)',
        userBubble: 'var(--color-userBubble)',
        aiBubble: 'var(--color-aiBubble)',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
