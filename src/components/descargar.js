import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const RubricaPDF = ({ data }) => {
  const generarPDF = () => {
    const doc = new jsPDF("landscape");

    // Título de la rúbrica
    doc.setFontSize(16);
    doc.text(data.nombre_rubrica, 14, 20);

    // Definir las columnas de la tabla
    const columnas = [
      { header: "Categoría", dataKey: "categoria" },
      { header: "Criterio", dataKey: "criterio" },
      { header: "Descripción", dataKey: "descripcion" },
      { header: "Muy Malo", dataKey: "cal1" },
      { header: "Malo", dataKey: "cal2" },
      { header: "Regular", dataKey: "cal3" },
      { header: "Bueno", dataKey: "cal4" },
      { header: "Muy Bueno", dataKey: "cal5" },
      { header: "Puntaje", dataKey: "puntaje" } // Agregar columna para puntaje
    ];

    const datos = [];
    let puntajeTotal = 0; // Variable para acumular el puntaje total
    let criterios_seleccionados = 0;
    let puntaje_Final = 0;

    // Validar si data.categorias existe y es un arreglo
    if (!Array.isArray(data.categorias)) {
      console.error("data.categorias no es un arreglo o está indefinido");
      return;
    }

    data.categorias.forEach((categoria) => {
      // Validar si la categoría tiene criterios definidos
      if (!categoria.criterios || !Array.isArray(categoria.criterios)) {
        console.warn(`La categoría ${categoria.categoria} no tiene criterios definidos`);
        return; // Salir si no hay criterios
      }

      let isFirstCriterio = true;

      categoria.criterios.forEach((criterio) => {
        const nombreCriterio = criterio.criterio;

        // Si hay preguntas, generamos filas de acuerdo al criterio
        if (!criterio.preguntas || !Array.isArray(criterio.preguntas)) {
          console.warn(`El criterio ${nombreCriterio} no tiene preguntas definidas`);
          return; // Salir si no hay preguntas
        }

        // Acumular puntaje
        if (criterio.evaluacion) { // Solo contar si hay una evaluación
          puntajeTotal += criterio.evaluacion; // Sumar el puntaje de la evaluación
          criterios_seleccionados++; // Incrementar el contador de criterios seleccionados
        }

        const preguntasConcatenadas = criterio.preguntas.join("\n");
        datos.push({
          categoria: isFirstCriterio ? categoria.categoria : "",
          criterio: nombreCriterio,
          descripcion: preguntasConcatenadas,
          cal1: criterio.evaluacion === 1 ? "X" : "",
          cal2: criterio.evaluacion === 2 ? "X" : "",
          cal3: criterio.evaluacion === 3 ? "X" : "",
          cal4: criterio.evaluacion === 4 ? "X" : "",
          cal5: criterio.evaluacion === 5 ? "X" : "",
          puntaje: criterio.evaluacion || "" // Agregar el puntaje aquí
        });

        isFirstCriterio = false;
      });
    });

    puntaje_Final = (puntajeTotal * 100) / (5 * criterios_seleccionados);

    // Determinar la calidad del software
    let calidadSoftware = "";
    if (puntaje_Final <= 25) {
      calidadSoftware = "El software es demasiado malo";
    } else if (puntaje_Final <= 50) {
      calidadSoftware = "El software es malo";
    } else if (puntaje_Final >= 80) {
      calidadSoftware = "El software es bueno";
    } else if (puntaje_Final >= 60) {
      calidadSoftware = "El software es pasable";
    } else if (puntaje_Final === 100) {
      calidadSoftware = "El software es excelente";
    }

    // Generar la tabla
    doc.autoTable({
      columns: columnas,
      body: datos,
      startY: 30,
      styles: {
        cellWidth: "wrap",
        overflow: "linebreak",
        valign: "middle", // Alinear verticalmente al centro
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      columnStyles: {
        descripcion: { cellWidth: 50, halign: "left" }, // Alinear a la izquierda
        criterio: { cellWidth: 40, halign: "left" },    // Alinear a la izquierda
        categoria: { cellWidth: 40, halign: "left" },   // Alinear a la izquierda
        cal1: { cellWidth: 20, halign: "center" },      // Centrar "X"
        cal2: { cellWidth: 20, halign: "center" },
        cal3: { cellWidth: 20, halign: "center" },
        cal4: { cellWidth: 20, halign: "center" },
        cal5: { cellWidth: 20, halign: "center" },
        puntaje: { cellWidth: 20, halign: "center" }    // Alinear puntaje al centro
      },
      theme: "grid",
      margin: { top: 20, bottom: 10 },
      pageBreak: "auto",
    });

    // Agregar el puntaje total y la calidad del software al final del PDF
    doc.setFontSize(14);
    doc.text(`Puntaje Total: ${puntajeTotal}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Total de criterios: ${criterios_seleccionados}`, 14, doc.autoTable.previous.finalY + 20);
    doc.text(`Promedio Final: ${puntaje_Final}%`, 14, doc.autoTable.previous.finalY + 30);
    doc.text(calidadSoftware, 14, doc.autoTable.previous.finalY + 40); // Agregar la calidad del software

    doc.save("rubrica_evaluada.pdf");
  };

  return (
    <div>
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
