/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#3169b1", // Change this to your primary color
        secondary: "#0CB4A8",
      }

    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
