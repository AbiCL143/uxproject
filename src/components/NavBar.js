import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-fondo fixed w-full z-20 top-0 h-24 flex items-center px-6"> {/* Añadido el espaciado y altura */}
      <div className="flex items-center space-x-6 rtl:space-x-reverse">
        <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">Reviewer UX</span> {/* Cambié el tamaño de la fuente */}
      </div>
      <div className="ml-auto flex space-x-6 rtl:space-x-reverse items-center">
        <Link 
          to="/registrer" 
          type="button" 
          className="text-white bg-botones hover:bg-opacity-40 active:bg-opacity-20 font-medium rounded-lg text-lg px-4 py-2" // Aumentado el tamaño de la letra
        >
          Registrarse
        </Link>
        <p className="text-white text-xl font-semibold">/</p>
        <Link 
          to="/login" 
          type="button" 
          className="text-white bg-botones hover:bg-opacity-40 active:bg-opacity-20 font-medium rounded-lg text-lg px-4 py-2" // Aumentado el tamaño de la letra
        >
          Iniciar sesión
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
