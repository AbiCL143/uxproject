import React, { useState } from 'react';
import NavBarLog from '../components/NavBarLog';
import Card from '../components/cards';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import fondo from '../assets/fondo.jpg';

function NuevaRubrica() {
    const [selectedId, setSelectedId] = useState(null);  // Estado para manejar la tarjeta seleccionada
    const [toggleStates, setToggleStates] = useState([false, false, false]); // Estados para manejar múltiples toggles

    const cardsData = [
        { id: 1, title: 'Usabilidad', subtitle: 'Criterios de usabilidad', icon: 'usabilidad' },
        { id: 2, title: 'Accesibilidad', subtitle: 'Descripción de accesibilidad', icon: 'accesibilidad' },
        { id: 3, title: 'Simplicidad', subtitle: 'Descripción de simplicidad', icon: 'simplicidad' },
        { id: 4, title: 'Centrada en el usuario', subtitle: 'Descripción de centrada en el usuario', icon: 'centradaEnElUsuario' },
        { id: 5, title: 'Consistencia', subtitle: 'Descripción de consistencia', icon: 'consistencia' },
    ];

    const descriptions = [
        'Habilitar criterio de accesibilidad',
        'Permitir opción de simplicidad',
        'Optimización centrada en el usuario',
    ];

    const handleToggleChange = (index) => {
        const updatedToggles = [...toggleStates];
        updatedToggles[index] = !updatedToggles[index]; // Cambia el estado del toggle en la posición indicada
        setToggleStates(updatedToggles);
    };

    return (
        <div className="h-screen overflow-hidden" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <NavBarLog />

            {/* Fondo oscuro semi-transparente */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className='container-content w-3/4 h-3/4 mx-auto relative z-10'>
                <div className="text-4xl font-bold text-left bg-gradient-to-r from-blue-500 from-1% to-Degradado2 bg-clip-text text-transparent">
                    Crea tu rúbrica
                </div>

                <div className='flex items-center mt-4'>
                    <label htmlFor="simple-search" className="text-white mr-4 text-lg">
                        Título de la rúbrica:
                    </label>
                    <form className="flex items-center max-w-sm w-full">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-cards border border-cards text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Ingresa el nombre que tendrá tu rúbrica..." required />
                        </div>
                    </form>
                </div>

                <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto'>
                    {/* Mapear tarjetas dinámicamente */}
                    {cardsData.map((card) => (
                        <motion.div layoutId={card.id} key={card.id} onClick={() => setSelectedId(card.id)}>
                            {/* El icono solo se muestra en la tarjeta original, no en la tarjeta expandida */}
                            <Card title={card.title} icono={card.icon} />
                        </motion.div>
                    ))}
                </div>

                {/* Animación de expansión */}
                <AnimatePresence>
                    {selectedId && (
                        <motion.div layout layoutId={selectedId} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                            {cardsData
                                .filter((item) => item.id === selectedId)
                                .map((item) => (
                                    <motion.div key={item.id} className="bg-cards w-3/4 h-3/4 p-10 rounded-lg shadow-lg"
                                        initial={{ scale: 0.7 }} // Empieza más pequeño
                                        animate={{ scale: 1 }}  // Aumenta al tamaño completo
                                        exit={{ scale: 0.7 }}   // Vuelve a hacerse pequeño al cerrar
                                        transition={{ duration: 0.5 }}  // Control del tiempo de la animación
                                    >
                                        {/* Cambios de color en el subtítulo y el título */}
                                        <motion.h5 className="text-xl font-semibold text-blue-300">{item.subtitle}</motion.h5> {/* Subtítulo en azul claro */}
                                        <motion.h2 className="text-3xl font-bold mb-4 text-yellow-400">{item.title}</motion.h2> {/* Título en amarillo */}

                                        {/* Mapeamos las descripciones y toggles */}
                                        <div className="mt-4">
                                            {descriptions.map((description, index) => (
                                                <div key={index} className="mb-4 flex items-center justify-between">
                                                    {/* Texto y toggle en una sola línea */}
                                                    <p className="text-white">{description}</p>
                                                    {/* Toggle Switch */}
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" checked={toggleStates[index]} onChange={() => handleToggleChange(index)} className="sr-only peer" />
                                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Botón para cerrar el modal */}
                                        <motion.button onClick={() => setSelectedId(null)} className="px-4 py-2 bg-red-500 text-white rounded-lg mt-6">
                                            Cerrar
                                        </motion.button>
                                    </motion.div>
                                ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4">
                {/* Botón para pasar a la siguiente página */}
                <Link to="/resumen_de_rubrica"
                    type="button"
                    className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4" // Aumentar el tamaño
                    style={{ backgroundColor: '#003366' }}> {/* Color más claro */}
                    <FontAwesomeIcon icon={faArrowRight} className="text-white text-2xl" />
                </Link>
            </div>




        </div>
    );
}

export default NuevaRubrica;
