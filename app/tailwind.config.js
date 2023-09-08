/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: "'Poppins', sans-serif",
        que: "'Quiel', sans-serif",
        abs: "'Italiana', serif",
        sor: "'Sora', sans-serif",
      }
    },
  },
  plugins: [],
}

