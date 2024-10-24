import React, { useState } from "react";
import NavBarLog from '../components/NavBarLog';
import imagen from '../assets/usabilidad.jpg';
import accesibilidad from '../assets/accesibilidad.jpg';
import centradoEnElUsuario from '../assets/centrado en el usuario.jpg';
import consistencia from '../assets/consistencia.jpg';
import simplicidad from '../assets/simplicidad.jpg';
import usabilidad from '../assets/usabilidad.jpg';
import { useNavigate } from "react-router-dom";
import fondo from '../assets/fondo.jpg';


function NewRubric() {
  const navigate = useNavigate();
  const [selectedChecklists, setSelectedChecklists] = useState([]);
  const checklists = [
    { id: 1, label: 'Usabilidad' },
    { id: 2, label: 'Accesibilidad' },
    { id: 3, label: 'Simplicidad' },
    { id: 4, label: 'Consistencia' },
    { id: 5, label: 'Centrado en el Usuario' }
  ];

  const handleCheckboxChange = (checklist) => {
    setSelectedChecklists(prevState => {
      const isSelected = prevState.some(item => item.id === checklist.id);
      const newSelectedChecklists = isSelected
        ? prevState.filter(item => item.id !== checklist.id)
        : [...prevState, checklist];

      // Guardar el estado en un JSON
      const jsonState = JSON.stringify(newSelectedChecklists);
      console.log(jsonState); // Aquí puedes guardar el JSON en un archivo o enviarlo a un servidor

      return newSelectedChecklists;
    });
  };
  const handleNavigate = () => {
    navigate('/newSelectCriterion', { state: { selectedChecklists } });
  };

  return (

    <div className="">

      <NavBarLog className />

      <div className="w-screen h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> {/* Cambiado aquí */}


        <div className="container-content w-4/5 h-3/4 mx-auto overflow-y-scroll p-4"> {/*Contenedor de las cards*/}
          <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4"> {/*Sgrego grid Layout al div donde estan las cards*/}


            {/*Card1 USABILIDAD*/}
            <div className="max-w-sm text-white p-4"> {/*Aqui comienza el bloque de codigo de las card*/}
              <div className="max-w-sm bg-newCards rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="w-full h-60 rounded-t-lg object-cover" src={imagen} alt="Usabilidad" /> {/* Usa la variable de la imagen importada */}
                </a>

                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Usabilidad</h5>
                  </a>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>

                  <div className="flex items-center justify-between space-x-4">

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>

                    <div className="flex items-center">
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        checked={selectedChecklists.some(item => item.id === 1)}
                        onChange={() => handleCheckboxChange(checklists[0])}
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fin Bloque de codigo de la card */}

            {/*Card2 ACCESIBILIDAD*/}
            <div className="max-w-sm text-white p-4"> {/*Aqui comienza el bloque de codigo de las card*/}

              <div className="max-w-sm bg-newCards rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="w-full h-60 rounded-t-lg object-cover" src={accesibilidad} alt="accesibilidad" /> {/* Usa la variable de la imagen importada */}
                </a>

                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Accesibilidad</h5>
                  </a>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>

                  <div className="flex items-center justify-between space-x-4">

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>

                    <div className="flex items-center">
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        checked={selectedChecklists.some(item => item.id === 2)}
                        onChange={() => handleCheckboxChange(checklists[1])}
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fin Bloque de codigo de la card */}

            {/*Card3*/}
            <div className="max-w-sm text-white p-4"> {/*Aqui comienza el bloque de codigo de las card*/}

              <div className="max-w-sm bg-newCards rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="w-full h-60 rounded-t-lg object-cover" src={centradoEnElUsuario} alt="centrado en el usuario" /> {/* Usa la variable de la imagen importada */}
                </a>

                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Centrado en el usuario</h5>
                  </a>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>

                  <div className="flex items-center justify-between space-x-4">

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>

                    <div className="flex items-center">
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        checked={selectedChecklists.some(item => item.id === 5)}
                        onChange={() => handleCheckboxChange(checklists[4])}
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fin Bloque de codigo de la card */}

            <div className="max-w-sm text-white p-4"> {/*Aqui comienza el bloque de codigo de las card*/}

              <div className="max-w-sm bg-newCards rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="w-full h-60 rounded-t-lg object-cover" src={consistencia} alt="Consistencia" /> {/* Usa la variable de la imagen importada */}
                </a>

                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Consistencia</h5>
                  </a>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>

                  <div className="flex items-center justify-between space-x-4">

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>

                    <div className="flex items-center">
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        checked={selectedChecklists.some(item => item.id === 4)}
                        onChange={() => handleCheckboxChange(checklists[3])}
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fin Bloque de codigo de la card */}

            <div className="max-w-sm text-white p-4"> {/*Aqui comienza el bloque de codigo de las card*/}

              <div className="max-w-sm bg-newCards rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="w-full h-60 rounded-t-lg object-cover" src={simplicidad} alt="Simplicidad" /> {/* Usa la variable de la imagen importada */}
                </a>

                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Simplicidad</h5>
                  </a>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>

                  <div className="flex items-center justify-between space-x-4">

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>

                    <div className="flex items-center">
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        checked={selectedChecklists.some(item => item.id === 3)}
                        onChange={() => handleCheckboxChange(checklists[2])}
                        className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fin Bloque de codigo de la card */}



            {/* Fin Bloque de codigo de la card */}
          </div>
        </div>


        <div className="flex items-center justify-between w-3/4 mt-7"> {/* Contenedor flex para alinear los componentes */}

          {/* Texto de categorías seleccionadas */}
          <p className="text-red-500 dark:text-gray-300 font-bold">
            {/* Categorías seleccionadas {selectedCount} */}
          </p>

          {/* Indicador de pasos en el centro */}
          <div className="container-content w-4/5 h-3/4 mx-auto overflow-y-scroll p-4 mt-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>

            <ol className="flex items-center w-2/4 text-sm font-medium text-center text-black-500 dark:text-gray-400 sm:text-base justify-center">
              <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  Selección <span className="hidden sm:inline-flex sm:ms-2">categorías</span>
                </span>
              </li>
              <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <span className="me-2">2</span>
                  Selección <span className="hidden sm:inline-flex sm:ms-2">criterios</span>
                </span>
              </li>
              <li className="flex items-center">
                <span className="me-2">3</span>
                Resumen
              </li>
            </ol>
          </div>

          {/* Botón de siguiente */}
          <a href="#"
            onClick={handleNavigate}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Siguiente
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
};

export default NewRubric;
