/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", ".public/index.html"],
  theme: {
    extend: {
      colors: {
        primaryColor: "var(--primaryColor)",
        primaryDarkColor: "var(--primaryDarkColor)",
        backgroundColor: "var(--backgroundColor)",
        textColor: "var(--textColor)",
        whiteColor: "var(--whiteColor)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
