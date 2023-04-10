/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-1": "#191a1b",
        "dark-2": "#242424",
        "th-green": "#01c38d",
      },
      height: {
        500: "500px",
      },
    },
  },
  plugins: [],
};
