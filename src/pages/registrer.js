import React from 'react';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/fondo.jpg';

function Registrer() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleRegistrer = async (e) => {
    e.preventDefault();
    const registrerData = {
      nombre: nombre,
      apellido_p: apellidoPaterno,
      apellido_m: apellidoMaterno,
      usuario: usuario,
      correo: email,
      contraseña: password,
      rol: 1,
    };
    console.log(JSON.stringify(registrerData));
    try {
      const response = await fetch('http://localhost:8000/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrerData),
      });
      const data = await response.json();
      if (response.status === 201) {
        console.log('Registro exitoso', data);
        Navigate('/login');
      } else {
        console.log('Error en registro', data);
      }
    } catch (error) {
      console.log('Error en registro', error);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <NavBar />
      <div className='absolute inset-0 bg-black opacity-50' />
      <div className='relative text-white p-4 mt-32'> {/* Aumenta el margen superior aquí */}
        <section className="min-h-full w-full">
          <div className="flex flex-col items-center justify-center px-4 py-5 mx-auto">
            <div className="w-full bg-cards rounded-lg shadow dark:border sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 space-y-4 md:space-y-6 sm:p-6">
                <h1 className="text-lg font-bold leading-tight tracking-tight text-center underline md:text-xl dark:text-white">
                  Registro de Usuario
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleRegistrer}>
                  <div>
                    <label htmlFor="nombre" className="block mb-1 text-sm font-medium dark:text-white">Nombre</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} name="nombre" id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="apellidoPaterno" className="block mb-1 text-sm font-medium dark:text-white">Apellido Paterno</label>
                    <input type="text" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} name="apellidoPaterno" id="apellidoPaterno" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="apellidoMaterno" className="block mb-1 text-sm font-medium dark:text-white">Apellido Materno</label>
                    <input type="text" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} name="apellidoMaterno" id="apellidoMaterno" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium dark:text-white">Correo</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="usuario" className="block mb-1 text-sm font-medium dark:text-white">Usuario</label>
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} name="usuario" id="usuario" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium dark:text-white">Contraseña</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrar</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Registrer;
