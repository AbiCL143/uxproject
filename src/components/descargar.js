import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const RúbricaPDF = ({ data }) => {
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
    ];

    const datos = [];

    data.categorias.forEach((categoria) => {
      let isFirstCriterio = true;

      categoria.criterios.forEach((criterio) => {
        const nombreCriterio = criterio.nombre;

        criterio.preguntas.forEach((pregunta, index) => {
          datos.push({
            categoria:
              isFirstCriterio && index === 0 ? categoria.nombre : "", // Combinar categorías
            criterio: index === 0 ? nombreCriterio : "", // Combinar criterios
            descripcion: pregunta,
            cal1: "",
            cal2: "",
            cal3: "",
            cal4: "",
            cal5: "",
          });
        });

        isFirstCriterio = false;
      });
    });

    // Generar la tabla sin rectángulos manuales y dejar que autoTable maneje el rowSpan y los saltos de página
    doc.autoTable({
      columns: columnas,
      body: datos,
      startY: 30,
      styles: {
        cellWidth: "wrap",
        overflow: "linebreak",
        halign: "left",
        valign: "middle",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      columnStyles: {
        descripcion: { cellWidth: 50 },
        criterio: { cellWidth: 30 },
        categoria: { cellWidth: 40 },
      },
      theme: 'grid', // Aplica una tabla con cuadrícula visible
      margin: { top: 20, bottom: 10 }, // Margen reducido para mejorar la continuidad entre páginas
      pageBreak: 'auto', // Permitir que autoTable maneje los saltos de página automáticamente
    });

    doc.save("rubrica.pdf");
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

export default RúbricaPDF;
