import React from 'react';
import NavBarLog from '../components/NavBarLog';
import Card from '../components/cards';
import { useState, useEffect } from 'react';
import fondo from '../assets/fondo.jpg'; 

function Rubricas() {
    // Definir un arreglo con la información de las tarjetas
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        const fetchRubricas = async () => {
            try {
                const response = await fetch('http://localhost:8000/rubricas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    console.log('Rubricas', data);
                    setCardsData(data);
                } else {
                    console.log('Error en la petición', data);
                }
            } catch (error) {
                console.log('Error en la petición', error);
            }
        }
        fetchRubricas();
    }, []);

    return (
        <div className="relative h-screen overflow-hidden flex flex-col items-center" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <NavBarLog />

            {/* Fondo oscuro semi-transparente */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className='mt-28 w-full max-w-6xl relative'> 
                <span className='text-white underline text-6xl'>Rúbricas</span>
                <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto'>
                    {/* Tarjeta para agregar nueva */}
                    <Card title='Agregar Nueva' icono='nueva' className='border-dashed border-2 border-white' link="/nuevaRubrica" />
                    {/* Usar map para crear las tarjetas dinámicamente */}
                    {cardsData.map((card, index) => (
                        <Card key={index} title={card.nombre_rubrica} icono={card.icon} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rubricas;
