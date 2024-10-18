import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Preguntas() {
    const location = useLocation();
    const navigate = useNavigate();
    const jsonRecibido = location.state?.jsonToSend || [];
    console.log('JSON Recibido:', jsonRecibido);

    const [newQuestions, setNewQuestions] = useState({});
    const [originalQuestions, setOriginalQuestions] = useState(jsonRecibido.map(item => item.preguntas.slice()));

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
            setNewQuestions(prevState => ({
                ...prevState,
                [id]: ''
            }));
        }
    };

    const handleDeleteQuestion = (categoryIndex, pregunta) => {
        const itemIndex = jsonRecibido.findIndex(item => item.id === categoryIndex);
        const isOriginal = originalQuestions[itemIndex].includes(pregunta);
        if (!isOriginal) {
            jsonRecibido[itemIndex].preguntas = jsonRecibido[itemIndex].preguntas.filter(q => q !== pregunta);
            setNewQuestions(prevState => ({
                ...prevState,
                [categoryIndex]: ''
            }));
        }
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
                                        <li key={idx} className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            {pregunta}
                                            {!originalQuestions[jsonRecibido.findIndex(i => i.id === item.id)].includes(pregunta) && (
                                                <button
                                                    onClick={() => handleDeleteQuestion(item.id, pregunta)}
                                                    className="ml-2 text-red-500"
                                                >
                                                    Eliminar
                                                </button>
                                            )}
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
        </div>
    );
}

export default Preguntas;