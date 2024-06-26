/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        xl: "1200px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        bricolage: ["Bricolage Grotesque", "sans-serif"],
      },
    },
  },
  plugins: [],
};
