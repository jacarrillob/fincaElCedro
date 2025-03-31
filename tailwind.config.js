/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green':'#065f46',
        'white':'#fafafa',
        'gray': '#6a6a6a',
        'gray-200': '#e5e7eb',
        'black': '#0a0a0a'
      }
    },
  },
  plugins: [],
}