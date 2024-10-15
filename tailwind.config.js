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
        'botones': '#333537',
        'importante': '#041E49',
        'Degradado1': '#5082ED ',
        'Degradado2': '#D76676',
        'suptitulo': '#484B4A',
        'iconos': '#C6C9C7',
        'boton2': '#000000',
        'letras': '#3777C3',
        'boton3': '#1B1B1B',
        'newFondo':'#001F3F',
        'newCards':'#B0BEC5',
        'newTitulos':'#6A9AB0',
        'selecCriterio': '#fffff'


      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}