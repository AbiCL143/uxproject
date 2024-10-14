import React, { useState } from 'react';
import NavBarLog from '../components/NavBarLog';

function Resumen_de_Rubrica() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='content w-screen h-screen flex items-center justify-center bg-fondo'>
            <NavBarLog />

            <div className='w-3/4 h-3/4 mx-auto'>
                <div className="text-4xl font-bold text-left bg-gradient-to-r from-blue-500 from-1% to-Degradado2 bg-clip-text text-transparent p-6">
                    Resumen de la rúbrica
                </div>

                <div id="accordion-collapse" data-accordion="collapse">
                    {/** Acordeón 1 */}
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

                            {/* Botón de Mover con más separación */}
                            <button 
                                type="button" 
                                className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={() => console.log('Moviendo...')}
                            >
                                Mover
                            </button>
                        </div>
                    </div>

                    {/** Acordeón 2 */}
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

                            {/* Botón de Mover con más separación */}
                            <button 
                                type="button" 
                                className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={() => console.log('Moviendo...')}
                            >
                                Mover
                            </button>
                        </div>
                    </div>

                    {/** Acordeón 3 */}
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
                        <div className="p-5 border border-t-0 border-gray-700 dark:border-gray-600 bg-[#1E1F20]">
                            <p className="mb-2 text-gray-300">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                            <p className="mb-2 text-gray-300">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                            <p className="mb-2 text-gray-300">Learn more about these technologies:</p>
                            <ul className="ps-5 text-gray-300 list-disc">
                                <li><a href="https://flowbite.com/pro/" className="text-[#5082ED] hover:underline">Flowbite Pro</a></li>
                                <li><a href="https://tailwindui.com/" rel="nofollow" className="text-[#5082ED] hover:underline">Tailwind UI</a></li>
                            </ul>

                            {/* Botón de Mover con más separación */}
                            <button 
                                type="button" 
                                className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={() => console.log('Moviendo...')}
                            >
                                Mover
                            </button>
                        </div>
                    </div>
                </div>

                {/* Botón de Descargar movido a la esquina inferior derecha */}
                <div className="flex justify-end mt-4">
                    <button 
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => console.log('Descargando...')}
                    >
                        Descargar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Resumen_de_Rubrica;
