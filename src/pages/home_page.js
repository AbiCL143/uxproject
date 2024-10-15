import React from 'react';
import Navbar from '../components/NavBarLog';
import Card from '../components/cards';
import fondo from '../assets/fondo.jpg'; 

function HomePage() {
  return (
    <div className="h-screen overflow-hidden relative" 
         style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

      {/* Superposición oscura */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Contenido de la página */}
      <div className="relative z-10">
        <Navbar className="pl-5" />
        <div className='mt-16 pt-16'>
          <div className='flex justify-center gap-12 mt-9'>
            <Card 
              title="Nueva Rúbrica" 
              icono="nueva" 
              link="/newRubric"
              className="bg-transparent backdrop-blur-sm shadow-lg text-white w-80 h-80 p-8" 
            />
            <Card 
              title="Evaluar" 
              icono="calificar" 
              link="#" 
              className="bg-transparent backdrop-blur-sm shadow-lg text-white w-80 h-80 p-8" 
            />
            <Card 
              title="Ver rúbricas" 
              icono="rubricas" 
              link="/rubricas" 
              className="bg-transparent backdrop-blur-sm shadow-lg text-white w-80 h-80 p-8" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
