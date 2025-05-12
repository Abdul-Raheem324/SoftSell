/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff', // Lighter blue
          DEFAULT: '#0066cc', // Primary blue
          dark: '#004d99', // Darker blue
        },
        secondary: {
          light: '#ff7f50', // Lighter coral
          DEFAULT: '#ff6347', // Coral
          dark: '#e74c3c', // Darker coral
        },
        neutral: {
          lightest: '#f8fafc',
          light: '#f1f5f9',
          DEFAULT: '#e2e8f0',
          dark: '#64748b',
          darkest: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}