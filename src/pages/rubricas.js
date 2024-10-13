import React from 'react';
import NavBarLog from '../components/NavBarLog';
import Card from '../components/cards';


function Rubricas() {
    // Definir un arreglo con la información de las tarjetas
    const cardsData = [
        { title: 'Nueva', icon: 'nueva' },
        { title: 'En Progreso', icon: 'progreso' },
        { title: 'Completada', icon: 'completada' },
        { title: 'Pendiente', icon: 'pendiente' },
        { title: 'Revisar', icon: 'revisar' },
        // Puedes agregar más tarjetas según sea necesario
    ];

    return (
        <div className="bg-fondo h-screen overflow-hidden flex flex-col items-center">
            <NavBarLog />

            <div className='mt-16 w-full max-w-6xl'>
                <span className='text-white underline text-6xl'>Rubricas</span>
                <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto'>
                    {/* Tarjeta para agregar nueva */}
                    <Card title='Agregar Nueva' icono='nueva' className='border-dashed border-2 border-white'  />
                    {/* Usar map para crear las tarjetas dinámicamente */}
                    {cardsData.map((card, index) => (
                        <Card key={index} title={card.title} icono={card.icon}  />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rubricas;





