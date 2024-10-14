import React, { useState } from 'react';
import NavBarLog from '../components/NavBarLog';
import Card from '../components/cards';
import { motion, AnimatePresence } from "framer-motion";

function NuevaRubrica() {
    const [selectedId, setSelectedId] = useState(null);  // Estado para manejar la tarjeta seleccionada

    const cardsData = [
        { id: 1, title: 'Usabilidad', subtitle: 'Descripción de usabilidad', icon: 'usabilidad' },
        { id: 2, title: 'Accesibilidad', subtitle: 'Descripción de accesibilidad', icon: 'accesibilidad' },
        { id: 3, title: 'Simplicidad', subtitle: 'Descripción de simplicidad', icon: 'simplicidad' },
        { id: 4, title: 'Centrada en el usuario', subtitle: 'Descripción de centrada en el usuario', icon: 'centradaEnElUsuario' },
        { id: 5, title: 'Consistencia', subtitle: 'Descripción de consistencia', icon: 'consistencia' },
    ];

    return (
        <div className="contentcontent w-screen h-screen flex items-center justify-center bg-fondo">
            <NavBarLog />

            <div className='container-content w-3/4 h-3/4 mx-auto'>
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
                            <input type="text" id="simple-search" className="bg-cards border border-cards text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Ingresa el nombre que tendra tu rubrica..." required />
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
                                        {/* No mostramos el icono aquí, solo el título y el subtítulo */}
                                        <motion.h5 className="text-xl font-semibold">{item.subtitle}</motion.h5>
                                        <motion.h2 className="text-3xl font-bold mb-4">{item.title}</motion.h2>
                                        <motion.button onClick={() => setSelectedId(null)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                                            Cerrar
                                        </motion.button>
                                    </motion.div>
                                ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default NuevaRubrica;
