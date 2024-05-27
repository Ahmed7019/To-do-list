/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*{.html,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      animation: {},
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
