import React from 'react';
import NavBarLog from '../components/NavBarLog';
import Card from '../components/cards';

function HomePage() {
  return (
    <div className="bg-fondo h-screen overflow-hidden ">
    <NavBarLog className="fixed top-0 left-0 w-full z-10" />
    <div className='mt-16 pt-16'>
      <div className='flex justify-center gap-6 mt-9'>
      <Card title="Nueva Rubrica" icono="nueva"/>
      <Card title="Evaluar"  icono="calificar" />
      <Card title="Ver rubricas"       icono="rubricas" />
      </div>
    </div>
  </div>

  );
}

export default HomePage;