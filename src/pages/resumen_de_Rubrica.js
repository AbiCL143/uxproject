import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarLog from '../components/NavBarLog';
import RúbricaPDF from '../components/descargar';
import fondo from '../assets/fondo.jpg';
import BotonRegistrar from '../components/registrar_rubrica';

function Resumen_de_Rubrica() {
    const location = useLocation();
    const navigate = useNavigate();
    const jsonRecibido = location.state?.jsonToSend || [];
    const nombreProyecto = location.state?.nombre || '';
    console.log('Nombre del proyecto:',     );
    console.log('JSON Recibido:', jsonRecibido);
    const [rubricaData, setRubricaData] = useState(null);
    const [preguntasData, setPreguntasData] = useState([]);
    const registro = true;

    useEffect(() => {
        // Transformar el objeto recibido en el formato requerido
        const categorias = [...new Set(jsonRecibido.map(item => item.id_categoria))];
        const criterios = jsonRecibido.map(item => item.id);
        const preguntas = jsonRecibido.flatMap(item => 
            item.preguntas.map(pregunta => ({
                id_criterio: item.id,
                pregunta: pregunta // Asegurarse de que el campo `pregunta` esté presente
            }))
        );

        const rubricaTransformada = {
            nombre_rubrica: nombreProyecto,
            categorias,
            criterios
        };

        setRubricaData(rubricaTransformada);
        setPreguntasData(preguntas);

        console.log('Rúbrica Transformada:', rubricaTransformada);
        console.log('Preguntas:', preguntas);
    }, [jsonRecibido, nombreProyecto]);
    const handleSuccess = () => {
        navigate('/home'); // Redirigir a una ruta de éxito o mostrar un mensaje de éxito
    };

    const handleError = (error) => {
        // Manejar el error, mostrar un mensaje de error al usuario
        console.error('Error al registrar la rúbrica y las preguntas:', error);
    };

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!Array.isArray(jsonRecibido) || jsonRecibido.length === 0) {
        return <p>No hay categorías disponibles.</p>;
    }

    // Agrupamos las categorías, criterios y preguntas
    const categoriasAgrupadas = jsonRecibido.reduce((acc, item) => {
        const { categoria, criterio, preguntas } = item;
        if (!acc[categoria]) {
            acc[categoria] = {
                categoria,
                criterios: [],
            };
        }
        acc[categoria].criterios.push({ criterio, preguntas });
        return acc;
    }, {});

    const categoriasArray = Object.values(categoriasAgrupadas);

    const enviarDatos = () => {
        console.log('Datos a enviar:', jsonRecibido);
        navigate('/registrar_rubrica', { state: { rubrica: jsonRecibido, nombre: nombreProyecto } });
    }

    return (
        <div className="h-screen overflow-hidden relative"
            style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className='flex flex-col items-center justify-center h-full relative z-10'>
                <NavBarLog />
                <div className="container-content w-4/5 h-3/4 mx-auto overflow-y-scroll p-4 mt-14" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '8px' }}>                 
                    <div className="text-4xl font-bold text-left bg-gradient-to-r text-white from-1% to-Degradado2 bg-clip-text text-transparent p-6">
                        Resumen de la rúbrica
                    </div>
                    
                    <div className='flex flex-auto items-center space-x-4'>
                    {/* Asegúrate de pasar pdfHabilitado={true} */}
                    <RúbricaPDF 
                        data={{ nombre_proyecto: {nombreProyecto}, categorias: categoriasArray }} 
                        pdfHabilitado={true} // Botón habilitado
                    />
                    <BotonRegistrar 
                        rubricaData={rubricaData}
                        preguntasData={preguntasData}
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                    {/* Botón para evaluar el software */}
                    <button 
                        className="mb-2 bg-green-500 text-white py-2 px-4 rounded"
                        onClick={() => navigate('/evaluarSoftware', { state: { jsonToSend: jsonRecibido, estado: registro, nombre: nombreProyecto } })}
                    >
                        Evaluar
                    </button>
                    </div>
                    <div id="accordion-collapse" data-accordion="collapse">
                        {categoriasArray.map((categoria, index) => (
                            <div key={index} className="mb-4">
                                <h2 id={`accordion-collapse-heading-${index}`}>
                                    <div className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-200 bg-[#333537] border border-b-0 border-gray-700 rounded-t-xl focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-800 dark:border-gray-600 hover:bg-[#1E1F20] gap-3">
                                        <button
                                            type="button"
                                            className="flex-1 text-left text-2xl"
                                            onClick={() => toggleAccordion(index)}
                                            aria-expanded={openIndex === index}
                                            aria-controls={`accordion-collapse-body-${index}`}
                                        >
                                            <span className="text-[#3777C3]">{categoria.categoria}</span>
                                        </button>
                                        <svg data-accordion-icon className={`w-3 h-3 rotate-180 shrink-0 text-[#C6C9C7] ${openIndex === index ? '' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </div>
                                </h2>
                                <div id={`accordion-collapse-body-${index}`} className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'block' : 'hidden'}`} aria-labelledby={`accordion-collapse-heading-${index}`}>
                                    <div className="p-5 border border-b-0 border-gray-700 dark:border-gray-600 bg-[#1E1F20]">
                                        <p className="text-gray-300 text-lg">Criterios y preguntas de la categoría {categoria.categoria}:</p>
                                        <ul>
                                            {categoria.criterios.map((criterioObj, critIndex) => (
                                                <li key={critIndex} className="text-gray-300 text-lg">
                                                    <strong>{criterioObj.criterio}</strong>
                                                    {criterioObj.preguntas && criterioObj.preguntas.length > 0 && (
                                                        <ul>
                                                            {criterioObj.preguntas.map((pregunta, preguntaIndex) => (
                                                                <li key={preguntaIndex} className="text-gray-200 pl-5 text-lg">
                                                                    {pregunta}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Resumen_de_Rubrica;
