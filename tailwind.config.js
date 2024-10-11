const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        'fondo': '#131314',
        'cards': '#1E1F20 ',
        'botones': '#333537'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}