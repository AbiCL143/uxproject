// src/components/NavBar.js
import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    

<nav class="bg-fondo fixed w-full z-20 top-0 start-0">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a  class="flex items-center space-x-3 rtl:space-x-reverse">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Reviewer UX</span>
    </a>
    <div class="flex md:order-2 space-x-6 rtl:space-x-reverse items-center">
      <Link  to="/registrer" type="button" class="text-white bg-botones hover:bg-opacity-40 active:bg-opacity-20 font-medium rounded-lg text-sm px-4 py-2 text-center">Registrarse</Link>
      <p class="text-white text-xl font-semibold">/</p>
      <Link to="/login" type="button" class="text-white bg-botones hover:bg-opacity-40 active:bg-opacity-20 font-medium rounded-lg text-sm px-4 py-2 text-center">Iniciar sesión</Link>    
    </div>
  </div>
</nav>


  );
};

export default NavBar;