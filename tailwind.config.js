/** @type {import('tailwindcss').Config} */
export default {
  // 這裡告訴 Tailwind 要掃描哪些檔案
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        "ghost-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(10%, -10%) scale(1.05)" },
          "66%": { transform: "translate(-5%, 15%) scale(0.95)" },
        },
      },
      animation: {
        "ghost-smooth": "ghost-float 5s ease-in-out infinite", // 時間極長，確保流暢
      },
    },
  },
  plugins: [],
};
