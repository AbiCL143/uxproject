import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>Nombre de la Rúbrica</h1>
            <input 
                type="text" 
                placeholder="Nombre de la Rúbrica" 
                value={nombreRubrica}
                onChange={handleInputChange}
            />
            <button onClick={handleNext}>Siguiente</button>
        </div>
    );
}

export default NombreRubrica;