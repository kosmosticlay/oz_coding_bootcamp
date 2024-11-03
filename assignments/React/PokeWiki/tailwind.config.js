/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cartoon: ["Anton SC", "sans-serif"],
        korean: ["Jua", "sans-serif"],
      },
    },
  },
  plugins: [],
};
