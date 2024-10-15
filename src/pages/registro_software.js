import React from 'react';
import NavBarLog from '../components/NavBarLog';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Registro_software(){
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const Navigate = useNavigate();

  const handleRegistrer = async (e) => {
    e.preventDefault();
    const registrerData = {
      id_usuario: localStorage.getItem('id'),
      nombre_software: nombre,
      descripcion: descripcion
    };
    console.log(JSON.stringify(registrerData));
    try {
      const response =await fetch('http://localhost:8000/softwares/nuevo-software',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registrerData)
        });
      const data = await response.json();
      if(response.ok){
        console.log('Registro exitoso',data);
        Navigate('/softwares');
      }else{
        console.log('Error en registro',data);
      }
    }catch (error) {
      console.log('Error en registro',error);
    };
  };
    return(
        <div className='bg-fondo h-screen overflow-hidden'>
        <NavBarLog />
        <div className='bg-fondo text-white p-4'>
          <section className="bg-fondo h-full w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center px-4 py-5 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-cards rounded-lg shadow dark:border md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 space-y-4 md:space-y-6 sm:p-6">
                  <h1 className="text-lg font-bold leading-tight tracking-tight text-center underline md:text-xl dark:text-white">
                    Nuevo de Software
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleRegistrer}>
                        <div>
                            <label htmlFor="nombre" className="block mb-1 text-sm font-medium dark:text-white">Nombre</label>
                            <input 
                                type="text" 
                                value={nombre}
                                onChange={(e)=> setNombre(e.target.value)}
                                name="nombre" 
                                id="nombre" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="descripcion" className="block mb-1 text-sm font-medium dark:text-white">Descripción</label>
                            <textarea 
                                name="descripcion" 
                                value={descripcion}
                                onChange={(e)=> setDescripcion(e.target.value)}
                                id="descripcion" 
                                rows="4" // Ajustar el número de filas según sea necesario
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Registrar
                        </button>
                    </form>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
};

export default Registro_software;