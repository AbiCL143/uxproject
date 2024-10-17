import React from 'react';
import NavBarLog from '../components/NavBarLog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function NewSelectCriterion() {
    return (

        <div class="content w-screen h-screen flex flex-col items-center justify-center bg-newFondo">

            <NavBarLog />



            <div class="container-content w-4/5 h-3/4 mx-auto overflow-y-scroll p-4 border border-b-red-500">

                <div className="text-4xl font-bold text-left bg-gradient-to-r from-blue-500 from-1% to-Degradado2 bg-clip-text text-transparent pt-6 pb-6">
                    Nombre del criterio
                </div>

                <div class="grid grid-cols-4 gap-4 relative border-s border-blue-500 dark:border-gray-700 bg-cards rounded-tr-lg">

                    <div class="col-span-3">
                        <ol class="">
                            <li class="mb-10 ms-4">
                                <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                <time class="mb-1 text-sm font-bold leading-none text-white">Personalizacion</time>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Application UI code in Tailwind CSS</h3>
                                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>
                                <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg class="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg></a>
                            </li>
                        </ol>

                    </div>
                    <div class=" p-4 flex items-center justify-center">

                    <div className="flex items-center">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                  
                      value=""
                      className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                    </div>



                </div>

            </div>

            <div className="flex items-center justify-between w-3/4 mt-7"> {/* Contenedor flex para alinear los componentes */}

                {/* Texto de categorías seleccionadas */}
                <p className="text-red-500 dark:text-gray-300 font-bold">
                    C
                </p>

                {/* Indicador de pasos en el centro */}
                <ol className="flex items-center w-2/4 text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base justify-center">
                    <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">

                            Selección <span className="hidden sm:inline-flex sm:ms-2">categorías</span>
                        </span>
                    </li>
                    <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                            <span className="me-2">2</span>
                            Selección <span className="hidden sm:inline-flex sm:ms-2">criterios</span>
                        </span>
                    </li>
                    <li className="flex items-center">
                        <span className="me-2">3</span>
                        Resumen
                    </li>
                </ol>

                {/* Botón de siguiente */}
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Siguiente
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>





        </div>




    );
};

export default NewSelectCriterion;