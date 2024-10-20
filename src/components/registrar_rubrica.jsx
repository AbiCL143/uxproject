import React, { useState } from "react";

function BotonRegistrar({ rubricaData, preguntasData, onSuccess, onError }) {
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            // Registrar la rúbrica
            const responseRubrica = await fetch(`http://localhost:8000/rubricas/nueva-rubrica`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(rubricaData)
            });

            const rubricaResponseData = await responseRubrica.json();
            if (!responseRubrica.ok) {
                throw new Error(rubricaResponseData.message || 'Error al registrar la rúbrica');
            }

            const id_rubrica = rubricaResponseData.ID_rubrica; // Asumiendo que el ID de la rúbrica se devuelve en la respuesta

            // Agregar id_rubrica e id_usuario a cada pregunta
            const preguntasConRubrica = preguntasData.map(pregunta => ({
                id_criterio: pregunta.id_criterio,
                pregunta: pregunta.pregunta,
                id_rubrica
            }));
            console.log('Preguntas con Rúbrica:', preguntasConRubrica);

            // Registrar las preguntas
            for (const pregunta of preguntasConRubrica) {
                const responsePregunta = await fetch(`http://localhost:8000/preguntas/nueva-pregunta`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(pregunta)
                });

                const preguntaResponseData = await responsePregunta.json();
                if (!responsePregunta.ok) {
                    throw new Error(preguntaResponseData.message || 'Error al registrar la pregunta');
                }
            }

            console.log('Rúbrica y preguntas registradas exitosamente');
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error al registrar la rúbrica y las preguntas:', error);
            if (onError) onError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleRegister} disabled={loading} className="mb-2 bg-blue-700 text-white py-2 px-4 rounded">
            {loading ? 'Registrando...' : 'Registrar Rúbrica y Preguntas'}
        </button>
    );
}

export default BotonRegistrar;