// src/components/EvaluarSoftware.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RúbricaPDF from '../components/descargar';

function EvaluarSoftware() {
    const location = useLocation();
    const jsonRecibido = location.state?.jsonToSend || [];
    const [evaluaciones, setEvaluaciones] = useState({});
    const [mostrarPDF, setMostrarPDF] = useState(false);
    const [categoriasArray, setCategoriasArray] = useState([]);

    const handleChange = (criterio, value) => {
        setEvaluaciones({
            ...evaluaciones,
            [criterio]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Crear el JSON con las evaluaciones, incluyendo el puntaje de los criterios
        const jsonEvaluaciones = jsonRecibido.map((item) => ({
            categoria: item.categoria, // Añadir la categoría
            criterio: item.criterio,
            preguntas: item.preguntas,
            evaluacion: evaluaciones[item.criterio] || null, // Añadir la evaluación seleccionada
            puntaje: evaluaciones[item.criterio] || 0, // Campo extra con el puntaje de los criterios
        }));

        // Mostrar el JSON en la consola
        console.log("JSON a enviar:", JSON.stringify(jsonEvaluaciones, null, 2));

        // Establecer el array de categorías y mostrar el PDF
        setCategoriasArray(jsonEvaluaciones);
        setMostrarPDF(true);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Evaluación del Software</h2>
            <form onSubmit={handleSubmit}>
                {jsonRecibido.map((item, index) => (
                    <div key={index} className="mb-4">
                        <h1 className="text-xl font-semibold">{item.categoria}</h1> {/* Mostrar categoría */}
                        <h3 className="text-xl font-semibold">{item.criterio}</h3>
                        <p className="text-gray-700">{item.preguntas.join(', ')}</p>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value} className="flex items-center">
                                    <input
                                        type="radio"
                                        name={item.criterio}
                                        value={value}
                                        onChange={() => handleChange(item.criterio, value)}
                                        required
                                    />
                                    <span className="ml-1">{value}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Enviar Evaluación
                </button>
            </form>

            {/* Mostrar el componente PDF si se ha enviado el formulario */}
            {mostrarPDF && (
                <RúbricaPDF data={{ nombre_rubrica: "Nombre de tu Rúbrica", categorias: categoriasArray }} />
            )}
        </div>
    );
}

export default EvaluarSoftware;
