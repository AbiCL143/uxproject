import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import fondo from '../assets/fondo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos

function Registrer() {
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegistrer = async (e) => {
    e.preventDefault();

    // Validar correo
    if (!validateEmail(email)) {
      setError('El correo debe estar en formato "nombre@compañia.com"');
      return;
    }

    // Validar contraseña
    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un símbolo especial.');
      return;
    }

    // Si todo está bien, quitar el error
    setError('');

    const registrerData = {
      nombre: nombre,
      apellido_p: apellidoPaterno,
      apellido_m: apellidoMaterno,
      usuario: usuario,
      correo: email,
      contraseña: password,
      rol: 1,
    };

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
        setError('Error en el registro: ' + data.message);
      }
    } catch (error) {
      console.log('Error en el registro', error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (validatePassword(e.target.value)) {
      setError('');
    }
  };

  return (
    <div className="relative h-screen overflow-hidden" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <NavBar />
      <div className='absolute inset-0 bg-black opacity-50' />
      <div className='relative text-white p-4 top-24'>
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
                    <input type="email" value={email} onChange={handleEmailChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    {!validateEmail(email) && email !== '' && (
                      <p className="text-red-500 text-sm">Favor de ingresar un formato correcto de correo (name@company.com)</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="usuario" className="block mb-1 text-sm font-medium dark:text-white">Usuario</label>
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} name="usuario" id="usuario" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>

                  <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium dark:text-white">Contraseña</label>
                    <label className="block mb-1 text-sm font-medium dark:text-white">**La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un símbolo especial.</label>

                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'} // Mostrar u ocultar la contraseña
                        value={password}
                        onChange={handlePasswordChange}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // Alternar el estado
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>

                    {!validatePassword(password) && password !== '' && (
                      <p className="text-red-500 text-sm">Favor de ingresar una contraseña válida.</p>
                    )}
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-md text-sm px-5 py-2.5 text-center">Registrar</button>
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
