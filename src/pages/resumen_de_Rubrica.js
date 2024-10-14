import React, { useState } from 'react';
import NavBarLog from '../components/NavBarLog';
import RúbricaPDF from '../components/descargar'; // Asegúrate de ajustar la ruta
import { Link } from 'react-router-dom';
function Resumen_de_Rubrica() {
    const [openIndex, setOpenIndex] = useState(null);
    const data = {
        "nombre_rubrica": "Evaluación de Usabilidad y Accesibilidad",
        "categorias": [
            {
                "nombre": "Usabilidad",
                "criterios": [
                    {
                        "nombre": "Facilidad de navegación",
                        "preguntas": [
                            "¿El usuario puede navegar por la interfaz sin dificultades?",
                            "¿Se pueden encontrar fácilmente las secciones y funciones principales?"
                        ]
                    },
                    {
                        "nombre": "Claridad de la interfaz",
                        "preguntas": [
                            "¿Los elementos de la interfaz son claros y comprensibles?",
                            "¿El texto es legible y está bien presentado?"
                        ]
                    },
                    {
                        "nombre": "Consistencia de los elementos",
                        "preguntas": [
                            "¿Los elementos de la interfaz mantienen un estilo y comportamiento uniforme?",
                            "¿Se aplican los mismos patrones en toda la interfaz?"
                        ]
                    },
                    {
                        "nombre": "Eficiencia en el uso",
                        "preguntas": [
                            "¿El usuario puede completar tareas de manera eficiente?",
                            "¿Se minimiza el número de clics necesarios para realizar acciones?"
                        ]
                    }
                ]
            },
            {
                "nombre": "Accesibilidad",
                "criterios": [
                    {
                        "nombre": "Compatibilidad con lectores de pantalla",
                        "preguntas": [
                            "¿La interfaz es compatible con tecnologías de asistencia?",
                            "¿Se proporciona información suficiente para que los usuarios comprendan el contenido?"
                        ]
                    },
                    {
                        "nombre": "Uso de contrastes adecuados",
                        "preguntas": [
                            "¿Se utilizan contrastes de color que facilitan la lectura?",
                            "¿Los colores utilizados son accesibles para personas con daltonismo?"
                        ]
                    },
                    {
                        "nombre": "Textos alternativos para imágenes",
                        "preguntas": [
                            "¿Se proporcionan descripciones de texto alternativo para imágenes?",
                            "¿Las descripciones son suficientemente detalladas para comprender el contenido?"
                        ]
                    },
                    {
                        "nombre": "Facilidad de navegación para usuarios con discapacidad",
                        "preguntas": [
                            "¿La navegación es accesible para usuarios con diferentes discapacidades?",
                            "¿Se pueden utilizar atajos de teclado para navegar por la interfaz?"
                        ]
                    }
                ]
            },
            {
                "nombre": "Simplicidad",
                "criterios": [
                    {
                        "nombre": "Diseño limpio y minimalista",
                        "preguntas": [
                            "¿La interfaz tiene un diseño que evita la sobrecarga visual?",
                            "¿Se utilizan solo los elementos necesarios para la función principal?"
                        ]
                    },
                    {
                        "nombre": "Eliminación de elementos innecesarios",
                        "preguntas": [
                            "¿Se han eliminado elementos que no aportan valor al usuario?",
                            "¿Cada elemento en la interfaz tiene un propósito claro?"
                        ]
                    },
                    {
                        "nombre": "Acceso directo a funciones principales",
                        "preguntas": [
                            "¿Las funciones más importantes son fácilmente accesibles?",
                            "¿Se pueden encontrar rápidamente las acciones más utilizadas?"
                        ]
                    },
                    {
                        "nombre": "Lenguaje claro y comprensible",
                        "preguntas": [
                            "¿El lenguaje utilizado es fácil de entender para el usuario?",
                            "¿Se evitan tecnicismos innecesarios en la redacción?"
                        ]
                    }
                ]
            },
            {
                "nombre": "Centrada en el Usuario",
                "criterios": [
                    {
                        "nombre": "Investigación de usuarios previa al diseño",
                        "preguntas": [
                            "¿Se realizó una investigación sobre las necesidades del usuario antes del diseño?",
                            "¿Se llevaron a cabo entrevistas o encuestas con los usuarios potenciales?"
                        ]
                    },
                    {
                        "nombre": "Incorporación de feedback de usuarios",
                        "preguntas": [
                            "¿Se ha considerado el feedback de los usuarios en el diseño?",
                            "¿Se han realizado pruebas de usabilidad para recopilar opiniones?"
                        ]
                    },
                    {
                        "nombre": "Adaptabilidad a diferentes perfiles de usuario",
                        "preguntas": [
                            "¿La interfaz se adapta a las necesidades de diferentes tipos de usuarios?",
                            "¿Se ofrece personalización para diferentes niveles de experiencia?"
                        ]
                    },
                    {
                        "nombre": "Enfoque en necesidades del usuario",
                        "preguntas": [
                            "¿La interfaz aborda directamente las necesidades de los usuarios?",
                            "¿Se han considerado diferentes escenarios de uso al diseñar la interfaz?"
                        ]
                    }
                ]
            },
            {
                "nombre": "Consistencia",
                "criterios": [
                    {
                        "nombre": "Uso uniforme de colores y tipografías",
                        "preguntas": [
                            "¿Se utilizan colores y tipografías de manera uniforme en toda la interfaz?",
                            "¿Los estilos se mantienen consistentes en todas las páginas y secciones?"
                        ]
                    },
                    {
                        "nombre": "Estándares de diseño aplicados en toda la interfaz",
                        "preguntas": [
                            "¿Se han aplicado estándares de diseño reconocidos?",
                            "¿Los elementos de la interfaz cumplen con las pautas de accesibilidad?"
                        ]
                    },
                    {
                        "nombre": "Comportamiento predecible de los elementos",
                        "preguntas": [
                            "¿Los elementos de la interfaz se comportan de manera predecible?",
                            "¿Los usuarios pueden anticipar la acción de los elementos?"
                        ]
                    },
                    {
                        "nombre": "Uso de patrones de diseño conocidos",
                        "preguntas": [
                            "¿Se utilizan patrones de diseño que los usuarios ya conocen?",
                            "¿Los usuarios pueden reconocer la funcionalidad basada en experiencias previas?"
                        ]
                    }
                ]
            }
        ]
    }
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
                    <div 
                        type="button" 
                        className="text-white flex  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => console.log('Descargando...')}
                    >
                        <RúbricaPDF  data={data}/>
                        <Link to="/home" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">  Terminar </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Resumen_de_Rubrica;
