/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "btngreen": "#8eb545",
        "del": "#b91c1c",
        "blue": "#0284c7",
        "card": "#075985",
        "answer-bg": "#d6d3d1",
        "right-answer": "#65a30d",
      }
    },
  },
  plugins: [],
}

