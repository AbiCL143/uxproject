import React from 'react';
import NavBar from '../components/NavBar'; // Asegúrate de la ruta correcta
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/fondo.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      correo: email,
      contraseña: password
    };
    console.log(JSON.stringify(loginData));
    try {
      const response = await fetch('http://localhost:8000/usuarios/iniciar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log('Inicio de sesión exitoso', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        Navigate('/home');
      } else {
        console.log('Error en inicio de sesión', data);
      }
    } catch (error) {
      console.log('Error en inicio de sesión', error);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <NavBar />
      
      {/* Fondo oscuro semi-transparente */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="flex items-center justify-center h-full relative"> {/* Añadir 'relative' para mantener el contexto de posicionamiento */}
        <div className="w-full max-w-sm bg-cards rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 space-y-4 sm:p-6">
            <h1 className="text-lg font-bold text-center underline text-white md:text-xl">
              Inicio de Sesión
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block mb-1 text-lg font-medium text-white">Correo</label> {/* Aumenté el tamaño de la fuente aquí */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md block w-full p-3 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" // Mantengo el tamaño de la fuente para el input
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1 text-lg font-medium text-white">Contraseña</label> {/* Aumenté el tamaño de la fuente aquí */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md block w-full p-3 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" // Mantengo el tamaño de la fuente para el input
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-lg px-4 py-2"> {/* Aumenté el tamaño de la letra del botón */}
                Iniciar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
