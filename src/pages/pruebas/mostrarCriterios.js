import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function MostrarCriterios() {
    const location = useLocation();
    const { selectedChecklists } = location.state || { selectedChecklists: [] };
    const [criterios, setCriterios] = useState([]);

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
                                    console.log(criterio.ID_criterio);
                                    const preguntas = await responsePreguntas.json();
                                    return { ...criterio, preguntas: Array.isArray(preguntas) ? preguntas : [] };
                                } catch (error) {
                                    console.error(`Error al obtener las preguntas para el criterio ${criterio._id}:`, error);
                                    return { ...criterio, preguntas: [] };
                                }
                            }));
                            return { categoria: checklist.label, criterios: criteriosWithPreguntas };
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

    console.log(criterios);

    return (
        <div>
            <h1>Mostrar Criterios</h1>
            {criterios.length > 0 ? (
                criterios.map((categoriaData, index) => (
                    <div key={index}>
                        <h5>{categoriaData.categoria}</h5>
                        <ul>
                            {categoriaData.criterios.map((criterio) => (
                                <li key={criterio._id}>
                                    {criterio.nombre_criterio}
                                    <ul>
                                        {(criterio.preguntas || []).map((pregunta) => (
                                            <li key={pregunta._id}>{pregunta.pregunta}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No hay criterios para mostrar.</p>
            )}
        </div>
    );
}

export default MostrarCriterios;