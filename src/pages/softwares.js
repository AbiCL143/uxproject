import React from 'react';
import NavBarLog from '../components/NavBarLog';
import Card from '../components/cards';
import {useState,useEffect} from 'react';

function Softwares() {
    const [cardsData, setCardsData] = useState([]);
    useEffect(()=>{
        const fetchRubricas = async()=>{
            try {
                const response=await fetch('http://localhost:8000/softwares/',
                    {
                        method:'GET',
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':`Bearer ${localStorage.getItem('token')}`
                        },
                    });
                const data=await response.json();
                if(response.ok){
                    console.log('software',data);
                    setCardsData(data);
                }else{
                    console.log('Error en la petición',data);
                }    
            }catch(error){
                console.log('Error en la petición',error);
            };
                
        }
        fetchRubricas();
    },[]);
    return(
        
            <div className="bg-fondo h-screen overflow-hidden flex flex-col items-center">
                <NavBarLog />
    
                <div className='mt-16 w-full max-w-6xl'>
                    <span className='text-white underline text-6xl'>Softwares</span>
                    <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto'>
                        {/* Tarjeta para agregar nueva */}
                        <Card title='Agregar Nuevo' link="/registro_software" icono='nueva' className='border-dashed border-2 border-white'  />
                        {/* Usar map para crear las tarjetas dinámicamente */}
                        {cardsData.map((card, index) => (
                            <Card key={index} title={card.nombre_software} icono={card.icon}  />
                        ))}
                    </div>
                </div>
            </div>
        
    );
};
export default Softwares;