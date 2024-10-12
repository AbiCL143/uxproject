import React from 'react';
import NavBar from '../components/NavBar'; // Asegúrate de la ruta correcta

function Login() {
    return (
      <div className='bg-fondo h-screen overflow-hidden'>
        <NavBar />
        <div className='bg-fondo text-white p-4'>
          <section className="bg-fondo h-full w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center px-4 py-5 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-cards rounded-lg shadow dark:border md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 space-y-4 md:space-y-6 sm:p-6">
                  <h1 className="text-lg font-bold leading-tight tracking-tight text-center underline md:text-xl dark:text-white">
                    Inicio de Sesión
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label htmlFor="email" className="block mb-1 text-sm font-medium dark:text-white">Correo</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-1 text-sm font-medium dark:text-white">Contraseña</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Iniciar</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  
  export default Login;
  

