/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        spinOnce: {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "15%": { transform: "translateX(-3px) rotate(2deg)" },
          "65%": { transform: "translateX(3px) rotate(-10deg)" },
          "80%": { transform: "translateX(-3px) rotate(5deg)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "spin-once": "spinOnce 1.8s ease-in-out",
        "shake-perm": "shake 2.0s infinite",
      },
      fontFamily: {
        cartoon: ["Anton SC", "sans-serif"],
        korean: ["Jua", "sans-serif"],
      },
    },
  },
  plugins: [],
};
