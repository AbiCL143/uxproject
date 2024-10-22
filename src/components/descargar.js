import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const RubricaPDF = ({ data, nombre_rubrica = "Rúbrica Evaluada", nombre_proyecto, imagen_grafica, pdfHabilitado, onDownload }) => {
    const [criterios, setCriterios] = useState([]);
    const [puntajes, setPuntajes] = useState([]);

    const generarPDF = () => {
        const doc = new jsPDF("landscape");

        const margin = 10; // margen más delgado
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Establecer el color de texto y márgenes internos
        doc.setTextColor(0, 0, 0);
        doc.setFont("times", "normal");
        doc.setFontSize(16);
        doc.setFont("times", "bold"); // Negrita para nombre_rubrica
        doc.text(nombre_rubrica, margin + 10, margin + 10);
        doc.setFont("times", "normal"); // Restablecer a normal
        let startY = 30; //Posicion inicial de la tabla
        if (nombre_proyecto) {
            doc.setFont("times", "bold"); // Negrita para nombre_proyecto
            startY = 35;
            doc.text(`Nombre del proyecto: ${nombre_proyecto}`, margin + 10, margin + 20);
            doc.setFont("times", "normal"); // Restablecer a normal
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
        const categoriasUnicas = new Set(); // Usar un Set para categorías únicas

        data.categorias.forEach((categoria) => {
            if (!categoria.criterios || !Array.isArray(categoria.criterios)) {
                return;
            }

            // Solo agregar la categoría una vez
            const nombreCategoria = categoria.categoria;
            let primeraFila = true; // Flag para determinar si es la primera fila de la categoría

            categoria.criterios.forEach((criterio) => {
                if (criterio.evaluacion) {
                    puntajeTotal += criterio.evaluacion;
                    criterios_seleccionados++;
                    tempCriterios.push(criterio.criterio);
                    tempPuntajes.push(criterio.evaluacion);
                }

                // Agregar los datos de la fila
                datos.push({
                    categoria: primeraFila ? nombreCategoria : "", // Mostrar nombre de la categoría solo en la primera fila
                    criterio: criterio.criterio,
                    descripcion: criterio.preguntas.join("\n"),
                    cal1: criterio.evaluacion === 1 ? "X" : "",
                    cal2: criterio.evaluacion === 2 ? "X" : "",
                    cal3: criterio.evaluacion === 3 ? "X" : "",
                    cal4: criterio.evaluacion === 4 ? "X" : "",
                    cal5: criterio.evaluacion === 5 ? "X" : "",
                    puntaje: criterio.evaluacion || "",
                });

                primeraFila = false; // Después de la primera fila, cambiar a false
            });
        });

        setCriterios(tempCriterios);
        setPuntajes(tempPuntajes);

        // Calcular el promedio final
        if (criterios_seleccionados > 0) {
            puntaje_Final = (puntajeTotal * 100) / (5 * criterios_seleccionados);
        }

        // Redondear a dos decimales
        puntaje_Final = parseFloat(puntaje_Final.toFixed(2));

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
        let yPos = startY; // inicializar la posición Y
        const rowHeight = 10; // altura de cada fila

        // Función para agregar la tabla
        const agregarTabla = () => {
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
                startY: yPos, // Cambiar este valor para elevar la tabla
                margin: { top: 30 }, // Ajustar el margen superior
            });

            yPos = doc.autoTable.previous.finalY + 20; // Actualizar la posición Y después de la tabla
        };

        // Llamar a la función para agregar la tabla
        agregarTabla();

        // Resumen
        const resumen = [
            `Total de criterios: ${criterios_seleccionados}`,
            `Promedio Final: ${puntaje_Final}%`,
            calidadSoftware,
        ];

        const agregarResumen = () => {
            const lines = doc.splitTextToSize(resumen.join("\n"), pageWidth - margin * 2);
            let currentY = yPos;

            // Verificar si cabe el resumen en la página
            if (currentY + (lines.length * rowHeight) > pageHeight - margin * 2) {
                // Si no cabe, crear una nueva página
                doc.addPage();
                currentY = margin + 10; // Reiniciar la posición Y para la nueva página
            }

            // Agregar texto del resumen
            doc.setFontSize(16);
            doc.setFont("times", "bold"); // Negrita para "Resumen del software evaluado:"
            doc.text("Resumen del software evaluado:", margin + 10, currentY); // Agregar título en negrita
            doc.setFont("times", "normal"); // Restablecer a normal
            currentY += rowHeight; // Espacio después del título
            doc.setFontSize(14);
            lines.forEach(line => {
                doc.text(line, margin + 10, currentY);
                currentY += rowHeight;
            });

            // Actualizar la posición Y después del resumen
            yPos = currentY; // Guardamos la nueva posición Y después del resumen
        };

        // Verificar si hay criterios seleccionados antes de generar el resumen
        if (criterios_seleccionados > 0) {
            // Llamar a la función para agregar el resumen
            agregarResumen();
        } else {
            console.log("No se generó el resumen porque no hay puntajes para los criterios.");
        }

        // Agregar la imagen de la gráfica después del resumen
        if (imagen_grafica) {
            // Asegúrate de que la imagen se coloque en la nueva posición Y después del resumen
            if (yPos + 80 > pageHeight - margin * 2) { // Ajusta para el tamaño de la imagen
                doc.addPage();
                yPos = margin + 10; // Reiniciar la posición Y para la nueva página
            }
            // Agregar título antes del gráfico
            doc.setFontSize(16);
            doc.setFont("times", "bold"); // Negrita para "Gráfico general"
            doc.text("Gráfico general:", margin + 10, yPos + 5);
            doc.setFont("times", "normal"); // Restablecer a normal
            yPos += rowHeight + 2; // Espacio después del título

            doc.addImage(imagen_grafica, "PNG", margin + 10, yPos, 180, 60); // Ajusta la posición y el tamaño
        }

        doc.save("rubrica_evaluada.pdf");

        // Llama a la función para habilitar la desactivación en el componente padre, solo si existe
        if (onDownload) {
            onDownload();
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={generarPDF}
                className={`focus:outline-none ${pdfHabilitado ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white font-bold py-2 px-4 rounded flex items-center`}
                disabled={!pdfHabilitado} // Cambiar a utilizar pdfHabilitado
            >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                {!pdfHabilitado ? "PDF Descargado" : "Descargar PDF"}
            </button>
        </div>
    );
};

export default RubricaPDF;
