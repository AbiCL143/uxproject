import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarLog from '../components/NavBarLog';
import fondo from '../assets/fondo.jpg';

function NewSelectCriterion() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedChecklists } = location.state || { selectedChecklists: [] };
    const nombre = location.state?.nombre || '';
    const [criterios, setCriterios] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    console.log(nombre);
    useEffect(() => {
        const fetchCriterios = async () => {
            if (selectedChecklists.length > 0) {
                const criteriosPromises = selectedChecklists.map(async (checklist) => {
                    try {
                        const response = await fetch(`http://localhost:8000/criterios/categoria/${checklist.id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                        });
                        const data = await response.json();
                        if (response.ok) {
                            const criteriosWithPreguntas = await Promise.all(data.map(async (criterio) => {
                                try {
                                    const responsePreguntas = await fetch(`http://localhost:8000/preguntas/criterio/${criterio.ID_criterio}`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                                        },
                                    });
                                    const preguntas = await responsePreguntas.json();
                                    return { ...criterio, preguntas: Array.isArray(preguntas) ? preguntas : [] };
                                } catch (error) {
                                    console.error(`Error al obtener las preguntas para el criterio ${criterio._id}:`, error);
                                    return { ...criterio, preguntas: [] };
                                }
                            }));
                            console.log('Criterios con preguntas:', criteriosWithPreguntas);
                            return { categoria: checklist.label, id_categoria: checklist.id, criterios: criteriosWithPreguntas };
                        } else {
                            return null;
                        }
                    } catch (error) {
                        console.error(`Error al obtener el criterio para el ID ${checklist.id}:`, error);
                        return null;
                    }
                });

                const criteriosData = await Promise.all(criteriosPromises);
                setCriterios(criteriosData.filter(criterio => criterio !== null));
            }
        };

        fetchCriterios();
    }, [selectedChecklists]);

    const handleCheckboxChange = (categoria, criterio, id_categoria) => {
        setSeleccionados((prevSeleccionados) => {
            const exists = prevSeleccionados.some(
                (item) => item.categoria === categoria && item.criterio.ID_criterio === criterio.ID_criterio
            );
            if (exists) {
                return prevSeleccionados.filter(
                    (item) => !(item.categoria === categoria && item.criterio.ID_criterio === criterio.ID_criterio)
                );
            } else {
                return [...prevSeleccionados, { categoria, criterio, id_categoria }];
            }
        });
    };
    
    const handleNext = () => {
        const jsonToSend = seleccionados.map((item) => ({
            id_categoria: item.id_categoria, // Incluir id_categoria
            categoria: item.categoria,
            criterio: item.criterio.nombre_criterio,
            id: item.criterio.ID_criterio,
            preguntas: item.criterio.preguntas.map(pregunta => pregunta.pregunta)
        }));

        navigate('/preguntas', { state: { jsonToSend, nombre } });
    };

    return (
        <div className="h-screen overflow-hidden relative"
            style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            {/* Superposición oscura */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Contenido de la página */}
            <div className="relative z-10 flex flex-col items-center justify-center h-screen">
                <NavBarLog />
                <div className="container-content w-4/5 h-3/4 mx-auto overflow-y-scroll p-4 mt-14" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '8px' }}>
                    {criterios.length > 0 ? (
                        criterios.map((categoriaData, index) => (
                            <div key={index} className="mb-6">
                                <h5 className="text-4xl font-bold text-white text-center">{categoriaData.categoria}</h5> {/* Ajuste aquí */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categoriaData.criterios.map((criterio) => (
                                        <div
                                            key={criterio.ID_criterio}
                                            className="p-4 bg-white shadow rounded-lg"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h6 className="text-lg font-semibold text-black">{criterio.nombre_criterio}</h6>
                                                <input
                                                    type="checkbox"
                                                    className="w-6 h-6"
                                                    checked={seleccionados.some(
                                                        (item) =>
                                                            item.categoria === categoriaData.categoria &&
                                                            item.criterio.ID_criterio === criterio.ID_criterio
                                                    )}
                                                    onChange={() =>
                                                        handleCheckboxChange(categoriaData.categoria, criterio, categoriaData.id_categoria)
                                                    }
                                                />
                                            </div>
                                            <ul className="mt-2">
                                                {(criterio.preguntas || []).map((pregunta) => (
                                                    <li key={pregunta._id} className="text-sm text-gray-600">
                                                        {pregunta.pregunta}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay criterios para mostrar.</p>
                    )}
                </div>

                <div className="flex items-center justify-center mt-7">
                    <button
                        onClick={handleNext}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewSelectCriterion;