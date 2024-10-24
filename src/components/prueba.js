import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import NavBarLog from '../components/NavBarLog';
import fondo from '../assets/fondo.jpg';
import RúbricaPDF from './descargar';

function EvaluarSoftware() {
    const location = useLocation();
    const jsonRecibido = location.state?.jsonToSend || [];
    const [evaluaciones, setEvaluaciones] = useState({});
    const [nombreProyecto, setNombreProyecto] = useState('');
    const chartRef = useRef(null); // Referencia a la gráfica
    const [mostrarPDF, setMostrarPDF] = useState(false); // Controla la visualización del PDF
    const [imagenGrafica, setImagenGrafica] = useState(null); // Estado para almacenar la imagen de la gráfica
    const [categoriasArray, setCategoriasArray] = useState([]);
    const [jsonEvaluaciones, setJsonEvaluaciones] = useState([]);


    const generarPDF = () => {
        const imagenBase64 = obtenerImagenGrafico();
        setImagenGrafica(imagenBase64);
        setMostrarPDF(true); // Muestra el componente RúbricaPDF con los datos
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
            obtenerImagenGrafico(); // Capturar la gráfica al mostrar PDF
        }
    };

    const prepararDatosGrafico = () => {
        const criterios = jsonRecibido.map((item) => item.criterio);
        const puntajes = criterios.map((criterio) => evaluaciones[criterio] || 0);

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
    const descargarImagenGrafico = () => {
        const chartInstance = chartRef.current;
        if (chartInstance) {
            const link = document.createElement('a');
            link.href = chartInstance.toBase64Image();
            link.download = 'grafico-evaluacion.png'; // Nombre del archivo de la imagen
            link.click(); // Simula la descarga
        }
    };
    const obtenerImagenGrafico = () => {
        const chartInstance = chartRef.current;
        if (chartInstance) {
            return chartInstance.toBase64Image(); // Retorna la imagen como base64
        }
        return null;
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
                            {/* Formulario de evaluación */}
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
                        </div>

                        <div className="w-2/5 ml-20">
                            <div className="mb-3 p-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>
                                <h3 className="text-lg font-bold text-blue-700">Evaluación General</h3>
                                <div>
                                    <Bar
                                        ref={chartRef} // Asigna la referencia aquí
                                        data={prepararDatosGrafico()}
                                        options={{
                                            indexAxis: 'y',
                                            responsive: true,
                                            scales: {
                                                x: {
                                                    beginAtZero: true,
                                                    max: 5,
                                                },
                                                y: {
                                                    ticks: {
                                                        autoSkip: false,
                                                    },
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
                                        height={100}
                                    />
                                </div>
                            </div>

                            {/* Botón para descargar la imagen */}
                            <div className="mt-4">
                                <button
                                    onClick={descargarImagenGrafico}
                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Descargar Imagen del Gráfico
                                </button>

                                {/* Botón para generar el PDF */}
                                <button
                                    onClick={generarPDF}
                                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 ml-4"
                                >
                                    Generar PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mostrar el componente RúbricaPDF */}
                {mostrarPDF && (
                    <RúbricaPDF
                        data={{ categorias: categoriasArray }}
                        nombre_rubrica={"Nombre de tu Rúbrica"}
                        nombre_proyecto={nombreProyecto}
                        imagen_grafica={imagenGrafica} // Pasar la imagen a RúbricaPDF
                    />
                )}
            </div>
        </div>
    );
}

export default EvaluarSoftware;
