import React, { useState } from 'react';
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
    const [jsonEvaluaciones, setJsonEvaluaciones] = useState([]);

    const handleChange = (criterio, value) => {
        const updatedEvaluaciones = {
            ...evaluaciones,
            [criterio]: value,
        };
        setEvaluaciones(updatedEvaluaciones);

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
        setJsonEvaluaciones(nuevoJsonEvaluaciones);
        
        console.log("JSON actualizado:", JSON.stringify(nuevoJsonEvaluaciones, null, 2));

        if (jsonRecibido.every(item => updatedEvaluaciones[item.criterio] !== undefined)) {
            setCategoriasArray(nuevoJsonEvaluaciones);
            setMostrarPDF(true);
        }
    };

    // Calcular el puntaje total
    const calcularPuntajeTotal = () => {
        return Object.values(evaluaciones).reduce((total, puntaje) => total + (puntaje || 0), 0);
    };

    // Calcular el puntaje máximo
    const puntajeMaximo = jsonRecibido.length * 5; // Asumiendo que cada criterio puede recibir un puntaje de 1 a 5

    // Evaluar el estado basado en el puntaje total
    const evaluarEstado = (puntajeTotal) => {
        const porcentaje = (puntajeTotal / puntajeMaximo) * 100;
        if (porcentaje >= 80) {
            return 'Excelente';
        } else if (porcentaje >= 50) {
            return 'Bueno';
        } else {
            return 'Malo';
        }
    };

    // Calcular el puntaje total antes de usarlo en el JSX
    const puntajeTotal = calcularPuntajeTotal();

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
                                                className="hidden"
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

                    {/* Mostrar el puntaje acumulado y evaluación */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-200">
                            Puntaje: {puntajeTotal} de {puntajeMaximo} - {evaluarEstado(puntajeTotal)}
                        </h3>
                    </div>

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
