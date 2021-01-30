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
      animation: {
        stat: "stat 3s linear",
      },
      keyframes: {
        stat: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
