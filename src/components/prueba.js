import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";

const RubricaPDF = ({ data, nombre_rubrica = "Rúbrica Evaluada", nombre_proyecto }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [criterios, setCriterios] = useState([]);
    const [puntajes, setPuntajes] = useState([]);
    const [chartReady, setChartReady] = useState(false);

    const generarPDF = async () => {
        const doc = new jsPDF("landscape");

        const margin = 2; // Margen más delgado de 2 unidades
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        // Dibujar el margen negro
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
        doc.setFillColor(255, 255, 255);
        doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2, "F");

        // Establecer el color de texto y márgenes internos
        doc.setTextColor(0, 0, 0);
        doc.setFont("times", "normal");
        doc.setFontSize(16);
        doc.text(nombre_rubrica, margin + 10, margin + 10);
        if (nombre_proyecto) {
            doc.text(`Nombre del proyecto: ${nombre_proyecto}`, margin + 10, margin + 20);
        }

        const datos = [];
        let puntajeTotal = 0;
        let criterios_seleccionados = 0;
        let puntaje_Final = 0;

        if (!Array.isArray(data.categorias)) {
            console.error("data.categorias no es un arreglo o está indefinido");
            return;
        }

        const tempCriterios = [];
        const tempPuntajes = [];

        data.categorias.forEach((categoria) => {
            if (!categoria.criterios || !Array.isArray(categoria.criterios)) {
                return;
            }

            categoria.criterios.forEach((criterio) => {
                if (criterio.evaluacion) {
                    puntajeTotal += criterio.evaluacion;
                    criterios_seleccionados++;
                    tempCriterios.push(criterio.criterio);
                    tempPuntajes.push(criterio.evaluacion);
                }

                datos.push({
                    categoria: categoria.categoria,
                    criterio: criterio.criterio,
                    descripcion: criterio.preguntas.join("\n"),
                    cal1: criterio.evaluacion === 1 ? "X" : "",
                    cal2: criterio.evaluacion === 2 ? "X" : "",
                    cal3: criterio.evaluacion === 3 ? "X" : "",
                    cal4: criterio.evaluacion === 4 ? "X" : "",
                    cal5: criterio.evaluacion === 5 ? "X" : "",
                    puntaje: criterio.evaluacion || "",
                });
            });
        });

        setCriterios(tempCriterios);
        setPuntajes(tempPuntajes);

        puntaje_Final = (puntajeTotal * 100) / (5 * criterios_seleccionados);
        // Determinar la calidad del software
        let calidadSoftware = "";
        if (puntaje_Final <= 25) {
            calidadSoftware = "El software no cumple con los criterios necesarios para ser lanzado a producción. Es difícil de entender y de usar.";
        } else if (puntaje_Final <= 57) {
            calidadSoftware = "El software se considera inestable. No está listo para producción y tiene que hacer cambios significativos.";
        } else if (puntaje_Final <= 70) {
            calidadSoftware = "El software se considera pasable. Podría estar en producción pero no se asegura que sea entendible y puede mejorar.";
        } else if (puntaje_Final <= 80) {
            calidadSoftware = "El software es bueno. Puede mejorar en algunas áreas pero en general es un buen software.";
        } else if (puntaje_Final <= 90) {
            calidadSoftware = "El software tiene una buena presentación y es fácil de aprender y de usar.";
        } else if (puntaje_Final === 100) {
            calidadSoftware = "El software es excelente. Cumple con los requisitos de la rúbrica de forma perfecta.";
        }

        // Crear la tabla
        doc.autoTable({
            columns: [
                { header: "Categoría", dataKey: "categoria" },
                { header: "Criterio", dataKey: "criterio" },
                { header: "Descripción", dataKey: "descripcion" },
                { header: "Muy Malo", dataKey: "cal1" },
                { header: "Malo", dataKey: "cal2" },
                { header: "Regular", dataKey: "cal3" },
                { header: "Bueno", dataKey: "cal4" },
                { header: "Muy Bueno", dataKey: "cal5" },
                { header: "Puntaje", dataKey: "puntaje" },
            ],
            body: datos,
            startY: 30, // Cambiar este valor para elevar la tabla
        });

        // Agregar resumen al PDF
        doc.setFontSize(14);
        doc.text("RESUMEN", 14, 20);
        doc.text(`Puntaje Total: ${puntajeTotal}`, 14, doc.autoTable.previous.finalY + 10);
        doc.text(`Total de criterios: ${criterios_seleccionados}`, 14, doc.autoTable.previous.finalY + 20);
        doc.text(`Promedio Final: ${puntaje_Final}%`, 14, doc.autoTable.previous.finalY + 30);
        doc.text(calidadSoftware, 14, doc.autoTable.previous.finalY + 40);


        // Agregar nueva página para el gráfico
        doc.addPage();

        doc.setFillColor(0, 0, 0); // Color negro
        doc.rect(0, 0, pageWidth, pageHeight, "F"); // Llenar toda la página
        doc.setFillColor(255, 255, 255); // Cambiar a blanco
        doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2, "F"); // Dibujar un rectángulo blanco dentro del margen

        if (chartReady) {
            const chartCanvas = chartRef.current;
            const canvas = await html2canvas(chartCanvas);
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 180;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Añadir título "GRÁFICA"
            doc.setFontSize(14);
            doc.text("GRÁFICA", 14, 20);

            // Añadir el gráfico
            doc.addImage(imgData, "PNG", 14, 30, imgWidth, imgHeight);
        }

        doc.save("rubrica_evaluada.pdf");
    };

    useEffect(() => {
        const chartCanvas = chartRef.current;

        if (chartCanvas && criterios.length > 0 && puntajes.length > 0) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const chartInstance = new Chart(chartCanvas, {
                type: "bar",
                data: {
                    labels: criterios,
                    datasets: [
                        {
                            label: "Puntaje",
                            data: puntajes,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    indexAxis: "y",
                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 5,
                        },
                    },
                },
            });

            chartInstanceRef.current = chartInstance;

            chartInstance.options.animation.onComplete = () => {
                setChartReady(true);
            };
        }
    }, [criterios, puntajes]);

    return (
        <div>
            <canvas ref={chartRef} width="80" height="80"></canvas>
            <button
                type="button"
                onClick={generarPDF}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 flex items-center"
            >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Descargar Rúbrica
            </button>
        </div>
    );
};

export default RubricaPDF;
