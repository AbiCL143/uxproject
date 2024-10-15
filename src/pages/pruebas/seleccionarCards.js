import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SeleccionarCards() {
    const [selectedChecklists, setSelectedChecklists] = useState([]);
    const navigate = useNavigate();

    const checklists = [
        { id: 1, label: 'Usabilidad' },
        { id: 2, label: 'Accesibilidad' },
        { id: 3, label: 'Simplicidad' },
        { id: 4, label: 'Constancia' },
        { id: 5, label: 'Centrado en el Usuario' }
    ];

    const handleCheckboxChange = (checklist) => {
        setSelectedChecklists(prevState => {
            const isSelected = prevState.some(item => item.id === checklist.id);
            const newSelectedChecklists = isSelected
                ? prevState.filter(item => item.id !== checklist.id)
                : [...prevState, checklist];

            console.log(newSelectedChecklists);
            return newSelectedChecklists;
        });
    };

    const handleNavigate = () => {
        navigate('/mostrarCriterios', { state: { selectedChecklists } });
    };

    return (
        <div>
            <h1>Seleccionar Cards</h1>
            {checklists.map((checklist) => (
                <div key={checklist.id}>
                    <input
                        type="checkbox"
                        id={`checklist-${checklist.id}`}
                        checked={selectedChecklists.some(item => item.id === checklist.id)}
                        onChange={() => handleCheckboxChange(checklist)}
                    />
                    <label htmlFor={`checklist-${checklist.id}`}>{checklist.label}</label>
                </div>
            ))}
            <button onClick={handleNavigate}>Ir a Home</button>
        </div>
    );
}

export default SeleccionarCards;