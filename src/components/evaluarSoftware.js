import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
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
    const [nombreProyecto, setNombreProyecto] = useState('');

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
        setCategoriasArray(nuevoJsonEvaluaciones);

        if (jsonRecibido.every(item => updatedEvaluaciones[item.criterio] !== undefined)) {
            setMostrarPDF(true);
        }
    };

    const calcularPuntajeTotal = () => {
        return Object.values(evaluaciones).reduce((total, puntaje) => total + (puntaje || 0), 0);
    };

    const puntajeMaximo = jsonRecibido.length * 5;

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

    const puntajeTotal = calcularPuntajeTotal();

    const prepararDatosGrafico = (categoria) => {
        const criterios = categoria.criterios.map((criterio) => criterio.criterio);
        const puntajes = categoria.criterios.map((criterio) => criterio.puntaje);

        return {
            labels: criterios,
            datasets: [{
                label: 'Puntaje',
                data: puntajes,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        };
    };

    const handleDownload = () => {
        // Muestra el nombre del proyecto en la consola
        console.log('Nombre del Proyecto desde Evaluar:', nombreProyecto);
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

                    {/* Campo de entrada para el nombre del proyecto */}
                    <div className="mb-4">
                        <label className="text-xl font-semibold text-white" htmlFor="nombreProyecto">Nombre del Proyecto a Evaluar (OPCIONAL):</label>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="nombreProyecto"
                            value={nombreProyecto}
                            onChange={(e) => setNombreProyecto(e.target.value)}
                            className="mt-2 p-2 w-80 rounded"
                            placeholder="Escribe el nombre del proyecto"
                        />
                    </div>

                    <div className="flex mb-8">
                        <div className="w-1/2">
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

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-200">
                                    Puntaje: {puntajeTotal} de {puntajeMaximo} - {evaluarEstado(puntajeTotal)}
                                </h3>
                            </div>

                            {mostrarPDF && (
                                console.log('Nombre del Proyecto desde Evaluar:', nombreProyecto),
                                <RúbricaPDF data={{ categorias: categoriasArray }} nombre_rubrica={"Nombre de tu Rúbrica"} nombre_proyecto={nombreProyecto} onDownload={handleDownload} />
                            )}
                        </div>

                        <div className="w-2/5 ml-20">
                            {categoriasArray.map((categoria, index) => (
                                <div key={index} className="mb-3 p-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>
                                    <h3 className="text-lg font-bold text-blue-700">{categoria.categoria}</h3>
                                    <Bar
                                        data={prepararDatosGrafico(categoria)}
                                        options={{
                                            responsive: true,
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    max: 5,
                                                },
                                            },
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            barPercentage: 0.5,
                                            categoryPercentage: 0.7,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EvaluarSoftware;
