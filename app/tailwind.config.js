/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '15px 15px 0 -2px rgb(249 250 251), 15px 15px 0 0 #111827',
      },
      fontFamily: {
        pop: "'Poppins', sans-serif",
        que: "'Quiel', sans-serif",
        abs: "'Italiana', serif",
        sor: "'Sora', sans-serif",
        est: "'Esteban', serif",
      }
    },
  },
  plugins: [],
}

