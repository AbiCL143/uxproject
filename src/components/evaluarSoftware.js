import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBarLog from '../components/NavBarLog';
import RúbricaPDF from '../components/descargar';
import fondo from '../assets/fondo.jpg';

function EvaluarSoftware() {
    const location = useLocation();
    const jsonRecibido = location.state?.jsonToSend || [];
    const [evaluaciones, setEvaluaciones] = useState({});
    const [mostrarPDF, setMostrarPDF] = useState(false);
    const [categoriasArray, setCategoriasArray] = useState([]);
    const [jsonEvaluaciones, setJsonEvaluaciones] = useState([]); // Estado para almacenar el JSON actualizado

    const handleChange = (criterio, value) => {
        // Actualizar evaluaciones
        const updatedEvaluaciones = {
            ...evaluaciones,
            [criterio]: value,
        };
        setEvaluaciones(updatedEvaluaciones);

        // Agrupar criterios bajo sus categorías para crear el JSON actualizado
        const categoriasAgrupadas = {};

        jsonRecibido.forEach((item) => {
            if (!categoriasAgrupadas[item.categoria]) {
                categoriasAgrupadas[item.categoria] = {
                    categoria: item.categoria,
                    criterios: [],
                };
            }

            categoriasAgrupadas[item.categoria].criterios.push({
                criterio: item.criterio,
                preguntas: item.preguntas,
                evaluacion: updatedEvaluaciones[item.criterio] || null,
                puntaje: updatedEvaluaciones[item.criterio] || 0,
            });
        });

        const nuevoJsonEvaluaciones = Object.values(categoriasAgrupadas);
        setJsonEvaluaciones(nuevoJsonEvaluaciones); // Actualizar el estado con el nuevo JSON

        // Mostrar el JSON actualizado en la consola
        console.log("JSON actualizado:", JSON.stringify(nuevoJsonEvaluaciones, null, 2));

        // Si todas las evaluaciones están completas, mostrar el PDF
        if (jsonRecibido.every(item => updatedEvaluaciones[item.criterio] !== undefined)) {
            setCategoriasArray(nuevoJsonEvaluaciones);
            setMostrarPDF(true);
        }
    };

    return (
        <div className="h-screen overflow-hidden relative"
             style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="flex flex-col items-center justify-center h-full relative z-10">
                <NavBarLog />
                <div className="container-content w-4/5 h-3/4 mx-auto overflow-y-scroll p-4 mt-14"
                     style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '8px' }}>
                    <h2 className="text-4xl font-bold text-left bg-gradient-to-r text-white from-1% to-Degradado2 bg-clip-text text-transparent p-6">
                        Evaluación del Software
                    </h2>
                    <form>
                        {jsonRecibido.map((item, index) => (
                            <div key={index} className="mb-4">
                                <h1 className="text-xl font-semibold text-white">{item.categoria}</h1>
                                <h3 className="text-lg font-semibold text-gray-200">{item.criterio}</h3>
                                <p className="text-gray-300">{item.preguntas.join(', ')}</p>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <label key={value} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name={item.criterio}
                                                value={value}
                                                onChange={() => handleChange(item.criterio, value)}
                                                required
                                                className="hidden" // Ocultar el input para usar solo las estrellas
                                            />
                                            <span className={`text-2xl ${evaluaciones[item.criterio] >= value ? 'text-yellow-400' : 'text-gray-400 opacity-50'}`}>
                                                {'⭐'}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </form>

                    {/* Mostrar el componente PDF si se ha generado el PDF */}
                    {mostrarPDF && (
                        <RúbricaPDF data={{ nombre_rubrica: "Nombre de tu Rúbrica", categorias: categoriasArray }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EvaluarSoftware;
