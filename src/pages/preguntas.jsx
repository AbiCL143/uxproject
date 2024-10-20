import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Preguntas() {
    const location = useLocation();
    const navigate = useNavigate();
    const jsonRecibido = location.state?.jsonToSend || [];
    const nombre = location.state?.nombre || '';

    console.log('JSON Recibido:', jsonRecibido);
    console.log('Nombre:', nombre);

    const [newQuestions, setNewQuestions] = useState({});
    const [originalQuestions] = useState(jsonRecibido.map(item => item.preguntas.slice()));
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    useEffect(() => {
        // Inicializar las preguntas seleccionadas con las que ya están en el JSON recibido
        const inicialPreguntasSeleccionadas = jsonRecibido.flatMap(item =>
            item.preguntas.map(pregunta => ({ id: item.id, pregunta }))
        );
        setSelectedQuestions(inicialPreguntasSeleccionadas);
    }, [jsonRecibido]);

    const handleInputChange = (e, id) => {
        const { value } = e.target;
        setNewQuestions(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleAddQuestion = (id) => {
        const itemIndex = jsonRecibido.findIndex(item => item.id === id);
        if (newQuestions[id]) {
            jsonRecibido[itemIndex].preguntas.push(newQuestions[id]);
            setSelectedQuestions(prevState => [
                ...prevState,
                { id, pregunta: newQuestions[id] } // Agregar la nueva pregunta como seleccionada automáticamente
            ]);
            setNewQuestions(prevState => ({
                ...prevState,
                [id]: ''
            }));
            console.log('Nuevas Preguntas:', selectedQuestions);
        }
    };

    const handleSelectQuestion = (pregunta, itemId) => {
        const isSelected = selectedQuestions.some(q => q.pregunta === pregunta && q.id === itemId);
        
        if (isSelected) {
            // Deseleccionar la pregunta, pero no eliminarla del JSON
            setSelectedQuestions(prevState => prevState.filter(q => q.pregunta !== pregunta || q.id !== itemId));
        } else {
            // Seleccionar la pregunta
            setSelectedQuestions(prevState => [...prevState, { pregunta, id: itemId }]);
        }
    };

    const handleNext = () => {
        // Filtrar solo las preguntas seleccionadas para el envío
        const jsonToSend = jsonRecibido.map(item => ({
            ...item,
            preguntas: selectedQuestions.filter(q => q.id === item.id).map(q => q.pregunta)
        }));

        console.log('Datos a enviar:', jsonToSend); // Verificar el contenido de jsonToSend
        navigate('/resumen_de_rubrica', { state: { jsonToSend, nombre } });
    };

    // Agrupar criterios por categoría
    const groupedByCategory = jsonRecibido.reduce((acc, item) => {
        if (!acc[item.categoria]) {
            acc[item.categoria] = [];
        }
        acc[item.categoria].push(item);
        return acc;
    }, {});

    return (
        <div>
            <h1>Preguntas de criterios</h1>
            {Object.keys(groupedByCategory).length > 0 ? (
                Object.keys(groupedByCategory).map((categoria, catIndex) => (
                    <div key={catIndex} className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{categoria}</h2>
                        {groupedByCategory[categoria].map((item, index) => (
                            <div key={index} className="mt-4">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{item.criterio}</h3>
                                <ul className="list-disc list-inside mt-2">
                                    {item.preguntas.map((pregunta, idx) => (
                                        <li 
                                            key={idx} 
                                            className={`text-base font-normal text-gray-500 dark:text-gray-400 ${selectedQuestions.some(q => q.pregunta === pregunta && q.id === item.id) ? 'bg-gray-200' : ''}`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedQuestions.some(q => q.pregunta === pregunta && q.id === item.id)}
                                                onChange={() => handleSelectQuestion(pregunta, item.id)}
                                                className="mr-2"
                                            />
                                            {pregunta}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={newQuestions[item.id] || ''}
                                        onChange={(e) => handleInputChange(e, item.id)}
                                        placeholder="Nueva pregunta"
                                        className="border rounded p-2 mr-2"
                                    />
                                    <button
                                        onClick={() => handleAddQuestion(item.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No hay preguntas para mostrar.</p>
            )}
            <button
                onClick={handleNext}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
                Siguiente
            </button>
        </div>
    );
}

export default Preguntas;
