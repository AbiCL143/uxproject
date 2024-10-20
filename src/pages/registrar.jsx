import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Registrar() {
    const location = useLocation();
    const navigate = useNavigate();
    const rubrica = location.state?.rubrica || [];
    const nombre = location.state?.nombreProyecto || '';
    const [rubricaData, setRubricaData] = useState(null);
    const [preguntasData, setPreguntasData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Transformar el objeto recibido en el formato requerido
        const categorias = [...new Set(rubrica.map(item => item.id_categoria))];
        const criterios = rubrica.map(item => item.id);
        const preguntas = rubrica.flatMap(item => 
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
    }, [rubrica, nombre]);

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
            navigate('/home'); // Redirigir a una ruta de éxito o mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error al registrar la rúbrica y las preguntas:', error);
            // Manejar el error, mostrar un mensaje de error al usuario
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Registrar Rúbrica</h1>
            {rubricaData && (
                <div>
                    <h2>Rúbrica:</h2>
                    <pre>{JSON.stringify(rubricaData, null, 2)}</pre>
                </div>
            )}
            {preguntasData.length > 0 && (
                <div>
                    <h2>Preguntas:</h2>
                    <pre>{JSON.stringify(preguntasData, null, 2)}</pre>
                </div>
            )}
            <button onClick={handleRegister} disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar Rúbrica y Preguntas'}
            </button>
        </div>
    );
}

export default Registrar;