/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*{.html,js}"],
  theme: {
    extend: {
      content: {
        trash: '"\\f2ed"',
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        workSans: ["Work Sans", "sans-serif"],
        fontawesome: ['"Font Awesome 5 Free"'],
      },
      fontWeight: {
        "fa-solid": "900",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
