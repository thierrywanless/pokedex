const colors = require("./src/styles/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      width: {
        "255px": "255px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
