import React, { useState, useEffect } from "react";

function Perfil() {
    const id = Number(localStorage.getItem('id')); // Convertir el ID a número
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newValues, setNewValues] = useState({});

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Usuario', data);
                setUser(data);
                setNewValues(data); // Inicializar newValues con los datos del usuario
            } else {
                console.log('Error en la petición', data);
            }
        } catch (error) {
            console.log('Error en la petición', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newValues)
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Usuario actualizado', data);
                setIsEditing(false);
                fetchUser(); // Volver a obtener los datos del usuario
            } else {
                console.log('Error en la actualización', data);
            }
        } catch (error) {
            console.log('Error en la actualización', error);
        }
    };

    const handleChange = (e, field) => {
        setNewValues({ ...newValues, [field]: e.target.value });
    };

    return (
        <div>
            <h1>Perfil</h1>
            {user ? (
                <div>
                    <p>ID: {user.ID_usuario}</p>
                    <div>
                        <p>Name: {isEditing ? (
                            <input
                                type="text"
                                value={newValues.nombre || ''}
                                onChange={(e) => handleChange(e, 'nombre')}
                            />
                        ) : (
                            user.nombre
                        )}
                        </p>
                    </div>
                    <div>
                        <p>Apellido Paterno: {isEditing ? (
                            <input
                                type="text"
                                value={newValues.apellido_p || ''}
                                onChange={(e) => handleChange(e, 'apellido_p')}
                            />
                        ) : (
                            user.apellido_p
                        )}
                        </p>
                    </div>
                    <div>
                        <p>Apellido Materno: {isEditing ? (
                            <input
                                type="text"
                                value={newValues.apellido_m || ''}
                                onChange={(e) => handleChange(e, 'apellido_m')}
                            />
                        ) : (
                            user.apellido_m
                        )}
                        </p>
                    </div>
                    <div>
                        <p>Usuario: {isEditing ? (
                            <input
                                type="text"
                                value={newValues.usuario || ''}
                                onChange={(e) => handleChange(e, 'usuario')}
                            />
                        ) : (
                            user.usuario
                        )}
                        </p>
                    </div>
                    <div>
                        <p>Email: {isEditing ? (
                            <input
                                type="text"
                                value={newValues.correo || ''}
                                onChange={(e) => handleChange(e, 'correo')}
                            />
                        ) : (
                            user.correo
                        )}
                        </p>
                    </div>
                    {isEditing ? (
                        <button onClick={handleSave}>Guardar</button>
                    ) : (
                        <button onClick={handleEdit}>Editar</button>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Perfil;