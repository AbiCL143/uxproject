import React, { useState, useEffect } from 'react';
import NavBarLog from '../components/NavBarLog';

function Resumen_de_Rubrica() {
    const [openIndex, setOpenIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]); // Estado para las categorías
    const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada

    useEffect(() => {
        // Simulación de llamada a una API para obtener categorías
        const fetchCategories = async () => {
            // Reemplaza esto con la llamada a tu API
            const response = await fetch('/api/categorias'); // Suponiendo que tienes una ruta de API para categorías
            const data = await response.json();
            setCategories(data); // Asignar las categorías al estado
        };

        fetchCategories();
    }, []);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleConfirm = () => {
        // Aquí puedes manejar la lógica después de confirmar, como enviar la categoría seleccionada a tu API
        console.log('Categoría seleccionada:', selectedCategory);
        toggleModal(); // Cerrar el modal después de confirmar
    };

    return (
        <div className='content w-screen h-screen flex items-center justify-center bg-fondo'>
            <NavBarLog />

            <div className='w-3/4 h-3/4 mx-auto'>
                <div className="text-4xl font-bold text-left bg-gradient-to-r from-blue-500 from-1% to-Degradado2 bg-clip-text text-transparent p-6">
                    Resumen de la rúbrica
                </div>

                <div id="accordion-collapse" data-accordion="collapse">
                    {/* Acordeón 1 */}
                    <h2 id="accordion-collapse-heading-1">
                        <div className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-200 bg-[#333537] border border-b-0 border-gray-700 rounded-t-xl focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-800 dark:border-gray-600 hover:bg-[#1E1F20] gap-3">
                            <button 
                                type="button" 
                                className="flex-1 text-left"
                                onClick={() => toggleAccordion(1)} 
                                aria-expanded={openIndex === 1} 
                                aria-controls="accordion-collapse-body-1"
                            >
                                <span className="text-[#3777C3]">What is Flowbite?</span>
                            </button>
                            <svg data-accordion-icon className={`w-3 h-3 rotate-180 shrink-0 text-[#C6C9C7] ${openIndex === 1 ? '' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </div>
                    </h2>
                    <div id="accordion-collapse-body-1" className={`transition-all duration-300 ease-in-out ${openIndex === 1 ? 'block' : 'hidden'}`} aria-labelledby="accordion-collapse-heading-1">
                        <div className="p-5 border border-b-0 border-gray-700 dark:border-gray-600 bg-[#1E1F20]">
                            <p className="mb-2 text-gray-300">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                            <p className="text-gray-300">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-[#5082ED] hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>

                            {/* Botón de Mover que abre el modal */}
                            <button 
                                type="button" 
                                className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={toggleModal}
                            >
                                Mover
                            </button>
                        </div>
                    </div>

                    {/* Repite el mismo patrón para los otros acordeones */}
                    {/* Acordeón 2 */}
                    <h2 id="accordion-collapse-heading-2">
                        <div className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-200 bg-[#333537] border border-b-0 border-gray-700 focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-800 dark:border-gray-600 hover:bg-[#1E1F20] gap-3">
                            <button 
                                type="button" 
                                className="flex-1 text-left"
                                onClick={() => toggleAccordion(2)} 
                                aria-expanded={openIndex === 2} 
                                aria-controls="accordion-collapse-body-2"
                            >
                                <span className="text-[#3777C3]">Is there a Figma file available?</span>
                            </button>
                            <svg data-accordion-icon className={`w-3 h-3 rotate-180 shrink-0 text-[#C6C9C7] ${openIndex === 2 ? '' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </div>
                    </h2>
                    <div id="accordion-collapse-body-2" className={`transition-all duration-300 ease-in-out ${openIndex === 2 ? 'block' : 'hidden'}`} aria-labelledby="accordion-collapse-heading-2">
                        <div className="p-5 border border-b-0 border-gray-700 dark:border-gray-600 bg-[#1E1F20]">
                            <p className="mb-2 text-gray-300">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                            <p className="text-gray-300">Check out the <a href="https://flowbite.com/figma/" className="text-[#5082ED] hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>

                            {/* Botón de Mover que abre el modal */}
                            <button 
                                type="button" 
                                className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={toggleModal}
                            >
                                Mover
                            </button>
                        </div>
                    </div>

                    {/* Acordeón 3 */}
                    <h2 id="accordion-collapse-heading-3">
                        <div className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-200 bg-[#333537] border border-gray-700 focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-800 dark:border-gray-600 hover:bg-[#1E1F20] gap-3">
                            <button 
                                type="button" 
                                className="flex-1 text-left"
                                onClick={() => toggleAccordion(3)} 
                                aria-expanded={openIndex === 3} 
                                aria-controls="accordion-collapse-body-3"
                            >
                                <span className="text-[#3777C3]">What are the differences between Flowbite and Tailwind UI?</span>
                            </button>
                            <svg data-accordion-icon className={`w-3 h-3 rotate-180 shrink-0 text-[#C6C9C7] ${openIndex === 3 ? '' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </div>
                    </h2>
                    <div id="accordion-collapse-body-3" className={`transition-all duration-300 ease-in-out ${openIndex === 3 ? 'block' : 'hidden'}`} aria-labelledby="accordion-collapse-heading-3">
                        <div className="p-5 border border-b-0 border-gray-700 dark:border-gray-600 bg-[#1E1F20]">
                            <p className="mb-2 text-gray-300">Flowbite is an open-source library of interactive components built on top of Tailwind CSS.</p>
                            <p className="text-gray-300">While Tailwind UI is a premium component library with pre-designed components.</p>

                            {/* Botón de Mover que abre el modal */}
                            <button 
                                type="button" 
                                className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={toggleModal}
                            >
                                Mover
                            </button>
                        </div>
                    </div>
                </div>

                {/* Botón de Descargar fuera del acordeón */}
                <div className="flex justify-end mt-4">
                    <button 
                        type="button" 
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                        onClick={() => alert('Descargando...')}
                    >
                        Descargar
                    </button>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Mover</h2>
                            <p className="mb-4">¿Estás seguro de que quieres mover esta sección?</p>
                            
                            {/* Selector de categoría */}
                            <label htmlFor="category" className="block text-gray-700 mb-2">Selecciona una categoría:</label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded-lg mb-4"
                            >
                                <option value="" disabled>Seleccione una categoría</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>

                            <div className="flex justify-end">
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={handleConfirm}
                                >
                                    Confirmar
                                </button>
                                <button 
                                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                                    onClick={toggleModal}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Resumen_de_Rubrica;
