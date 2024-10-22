import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import NavBarLog from '../components/NavBarLog';
import fondo from '../assets/fondo.jpg';
import RúbricaPDF from './descargar';
import BotonRegistrar from '../components/registrar_rubrica';
import { useNavigate } from 'react-router-dom';

function EvaluarSoftware() {
    const location = useLocation();
    const jsonRecibido = location.state?.jsonToSend || [];
    const registro = location.state?.estado || false;
    const [evaluaciones, setEvaluaciones] = useState({});
    const [nombreProyecto, setNombreProyecto] = useState('');
    const chartRef = useRef(null); // Referencia a la gráfica
    const [imagenGrafica, setImagenGrafica] = useState(null); // Estado para almacenar la imagen de la gráfica
    const [rubricaData, setRubricaData] = useState(null);
    const [preguntasData, setPreguntasData] = useState([]);    const [categoriasArray, setCategoriasArray] = useState([]);
    const [mostrarPDF, setMostrarPDF] = useState(false); // Controla la visualización del PDF
    const [pdfDeshabilitado, setPdfDeshabilitado] = useState(true); // Inicialmente deshabilitado
    const [jsonEvaluaciones, setJsonEvaluaciones] = useState([]);
    const [todosEvaluados, setTodosEvaluados] = useState(false); // Nuevo estado para verificar si todos los criterios han sido evaluados

    // Función para obtener la imagen más reciente del gráfico
    const obtenerImagenGrafico = () => {
        const chartInstance = chartRef.current;
        if (chartInstance) {
            return chartInstance.toBase64Image(); // Retorna la imagen como base64
        }
        return null;
    };

    const generarPDF = () => {
        const imagenBase64 = obtenerImagenGrafico();
        if (imagenBase64) {
            setImagenGrafica(imagenBase64); // Guarda la imagen del gráfico
            setMostrarPDF(true); // Activa la visualización del PDF
            setPdfDeshabilitado(false); // Habilita el botón de descarga al generar el PDF
        } else {
            console.error("Error al obtener la imagen del gráfico");
            return -1; // Devuelve un código de error si falla
        }
    };
    const navigate = useNavigate();
    const nombre = location.state?.nombre || '';

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
            nombre_rubrica: nombre,
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

        // Verifica si todos los criterios han sido evaluados
        const todosEvaluados = jsonRecibido.every(item => updatedEvaluaciones[item.criterio]);
        setTodosEvaluados(todosEvaluados); // Actualiza el estado
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

    // Efecto para habilitar el botón de RúbricaPDF cuando se muestra
    useEffect(() => {
        if (mostrarPDF) {
            setPdfDeshabilitado(false); // Habilita el botón de descarga cuando el PDF se muestra
        }
    }, [mostrarPDF]);

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

                           {/* Mostrar el componente RúbricaPDF */}
                            {registro && (
                               <BotonRegistrar
                               rubricaData={rubricaData}
                               preguntasData={preguntasData}
                               onSuccess={handleSuccess}
                               onError={handleError}
                           />
                            )}
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
                        </div>
                    </div>

                    {/* Mostrar el botón para evaluar el software solo si todos los criterios han sido evaluados */}
                    {todosEvaluados && (
                        <div className="mt-4">
                            <button
                                onClick={generarPDF} // Llama a generarPDF directamente
                                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 ml-4"
                            >
                                Evaluar Software
                            </button>
                        </div>
                    )}

                    {/* Mostrar el componente RúbricaPDF */}
                    {mostrarPDF && (
                        <RúbricaPDF
                            data={{ categorias: categoriasArray }}
                            nombre_rubrica={nombre}
                            nombre_proyecto={nombreProyecto}
                            imagen_grafica={imagenGrafica} // Pasar la imagen a RúbricaPDF
                            pdfHabilitado={!pdfDeshabilitado} // Habilitar el botón de descarga
                            onDownload={() => setPdfDeshabilitado(true)} // Callback para deshabilitar el PDF
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EvaluarSoftware;
