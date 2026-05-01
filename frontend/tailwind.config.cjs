/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class', // we always run dark
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0A0A0A',
          800: '#121212',
          700: '#1A1A1A',
        },
        glass: 'rgba(255, 255, 255, 0.03)',
        border: 'rgba(255, 255, 255, 0.06)',
        primary: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};