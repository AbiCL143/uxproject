import React from "react";
import RúbricaPDF from '../components/descargar'; // Asegúrate de ajustar la ruta

function Prueba() {
    // Define la variable de datos como un array de strings
    const data = {
        "nombre_rubrica": "Evaluación de Usabilidad y Accesibilidad",
        "categorias": [
            {
                "nombre": "Usabilidad",
                "criterios": [
                    {
                        "nombre": "Facilidad de navegación",
                        "preguntas": [
                            "¿El usuario puede navegar por la interfaz sin dificultades?",
                            "¿Se pueden encontrar fácilmente las secciones y funciones principales?"
                        ]
                    },
                    {
                        "nombre": "Claridad de la interfaz",
                        "preguntas": [
                            "¿Los elementos de la interfaz son claros y comprensibles?",
                            "¿El texto es legible y está bien presentado?"
                        ]
                    },
                    {
                        "nombre": "Consistencia de los elementos",
                        "preguntas": [
                            "¿Los elementos de la interfaz mantienen un estilo y comportamiento uniforme?",
                            "¿Se aplican los mismos patrones en toda la interfaz?"
                        ]
                    },
                    {
                        "nombre": "Eficiencia en el uso",
                        "preguntas": [
                            "¿El usuario puede completar tareas de manera eficiente?",
                            "¿Se minimiza el número de clics necesarios para realizar acciones?"
                        ]
                    }
                ]
            },
            {
                "nombre": "Accesibilidad",
                "criterios": [
                    {
                        "nombre": "Compatibilidad con lectores de pantalla",
                        "preguntas": [
                            "¿La interfaz es compatible con tecnologías de asistencia?",
                            "¿Se proporciona información suficiente para que los usuarios comprendan el contenido?"
                        ]
                    },
                    {
                        "nombre": "Uso de contrastes adecuados",
                        "preguntas": [
                            "¿Se utilizan contrastes de color que facilitan la lectura?",
                            "¿Los colores utilizados son accesibles para personas con daltonismo?"
                        ]
                    },
                    {
                        "nombre": "Textos alternativos para imágenes",
                        "preguntas": [
                            "¿Se proporcionan descripciones de texto alternativo para imágenes?",
                            "¿Las descripciones son suficientemente detalladas para comprender el contenido?"
                        ]
                    },
                    {
                        "nombre": "Facilidad de navegación para usuarios con discapacidad",
                        "preguntas": [
                            "¿La navegación es accesible para usuarios con diferentes discapacidades?",
                            "¿Se pueden utilizar atajos de teclado para navegar por la interfaz?"
                        ]
                    }
                ]
            },
            {
                "nombre": "Simplicidad",
                "criterios": [
                    {
                        "nombre": "Diseño limpio y minimalista",
                        "preguntas": [
                            "¿La interfaz tiene un diseño que evita la sobrecarga visual?",
                            "¿Se utilizan solo los elementos necesarios para la función principal?"
                        ]
                    },
                    {
                        "nombre": "Eliminación de elementos innecesarios",
                        "preguntas": [
                            "¿Se han eliminado elementos que no aportan valor al usuario?",
                            "¿Cada elemento en la interfaz tiene un propósito claro?"
                        ]
                    },
                    {
                        "nombre": "Acceso directo a funciones principales",
                        "preguntas": [
                            "¿Las funciones más importantes son fácilmente accesibles?",
                            "¿Se pueden encontrar rápidamente las acciones más utilizadas?"
                        ]
                    },
                    {
                        "nombre": "Lenguaje claro y comprensible",
                        "preguntas": [
                            "¿El lenguaje utilizado es fácil de entender para el usuario?",
                            "¿Se evitan tecnicismos innecesarios en la redacción?"
                        ]
                    }
                ]
            },
            {
                "nombre": "Centrada en el Usuario",
                "criterios": [
                    {
                        "nombre": "Investigación de usuarios previa al diseño",
                        "preguntas": [
                            "¿Se realizó una investigación sobre las necesidades del usuario antes del diseño?",
                            "¿Se llevaron a cabo entrevistas o encuestas con los usuarios potenciales?"
                        ]
                    },
                    {
                        "nombre": "Incorporación de feedback de usuarios",
                        "preguntas": [
                            "¿Se ha considerado el feedback de los usuarios en el diseño?",
                            "¿Se han realizado pruebas de usabilidad para recopilar opiniones?"
                        ]
                    },
                    {
                        "nombre": "Adaptabilidad a diferentes perfiles de usuario",
                        "preguntas": [
                            "¿La interfaz se adapta a las necesidades de diferentes tipos de usuarios?",
                            "¿Se ofrece personalización para diferentes niveles de experiencia?"
                        ]
                    },
                    {
                        "nombre": "Enfoque en necesidades del usuario",
                        "preguntas": [
                            "¿La interfaz aborda directamente las necesidades de los usuarios?",
                            "¿Se han considerado diferentes escenarios de uso al diseñar la interfaz?"
                        ]
                    }
                ]
            },
            {
                "nombre": "Consistencia",
                "criterios": [
                    {
                        "nombre": "Uso uniforme de colores y tipografías",
                        "preguntas": [
                            "¿Se utilizan colores y tipografías de manera uniforme en toda la interfaz?",
                            "¿Los estilos se mantienen consistentes en todas las páginas y secciones?"
                        ]
                    },
                    {
                        "nombre": "Estándares de diseño aplicados en toda la interfaz",
                        "preguntas": [
                            "¿Se han aplicado estándares de diseño reconocidos?",
                            "¿Los elementos de la interfaz cumplen con las pautas de accesibilidad?"
                        ]
                    },
                    {
                        "nombre": "Comportamiento predecible de los elementos",
                        "preguntas": [
                            "¿Los elementos de la interfaz se comportan de manera predecible?",
                            "¿Los usuarios pueden anticipar la acción de los elementos?"
                        ]
                    },
                    {
                        "nombre": "Uso de patrones de diseño conocidos",
                        "preguntas": [
                            "¿Se utilizan patrones de diseño que los usuarios ya conocen?",
                            "¿Los usuarios pueden reconocer la funcionalidad basada en experiencias previas?"
                        ]
                    }
                ]
            }
        ]
    }
    
    
    

    return (
        <div>
        <RúbricaPDF data={data} />
      </div>
    );
}

export default Prueba;
