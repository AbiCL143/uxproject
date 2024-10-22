import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from '../assets/fondo.jpg'; // Asegúrate de que la ruta al archivo del fondo sea correcta

function NombreRubrica() {
    const [nombreRubrica, setNombreRubrica] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/newRubric', { state: { nombre: nombreRubrica } });
    };

    const handleInputChange = (e) => {
        setNombreRubrica(e.target.value);
    };

    return (
        <div className="h-screen overflow-hidden relative"
            style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="flex flex-col items-center justify-center h-full relative z-10">
                <div className="text-white text-4xl font-bold mb-6">Nombre de la Rúbrica</div>
                <input 
                    type="text" 
                    className="p-2 rounded border border-gray-300 mb-4"
                    placeholder="Nombre de la Rúbrica" 
                    value={nombreRubrica}
                    onChange={handleInputChange}
                />
                <button 
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handleNext}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default NombreRubrica;
