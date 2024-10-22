import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faPlus,
  faSquareCheck,
  faFileContract,
  faHand,
  faSquare,
  faUser,
  faWrench,
  faRulerVertical
} from "@fortawesome/free-solid-svg-icons";

const  Card = ({ title, link, icono, className, nombre, ID }) => {
  const registro = false;
  const navigate = useNavigate();
  const getIcon = (title) => {
    switch (icono) {
      case "nueva":
        return faPlus;
      case "calificar":
        return faSquareCheck;
      case "rubricas":
        return faFileContract;
      case "accesibilidad":
        return faHand;
      case "simplicidad":
        return faSquare;
      case "centradaEnElUsuario":
        return faUser;
      case "usabilidad":
        return faWrench;
      case "consistencia":
        return faRulerVertical;
      default:

        return faFileContract; // Ícono por defecto si no coincide con ningún caso
    }
  };
  const Rubrica = async () => {
    console.log("ID de la rúbrica:", ID);
    try{
      const response =  await fetch(`http://localhost:8000/rubricas/evaluacion_usuario/${ID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,}
        }
      );
      const data = await response.json();
      if(response.ok){
        console.log("Rúbrica evaluada", data);
        navigate('/evaluarSoftware', {state: { jsonToSend: data, estado: registro, nombre: title } });

      }
      else{
        console.log("Error al retornar la rubrica", data);
      }
    }catch(error){
      console.log("Error al evaluar la rúbrica", error);
    }
  }
  return (
    <div>
      <a href={link} className={`block max-w-sm h-52 w-52 p-6 bg-cards rounded-lg shadow hover:bg-cards hover:bg-opacity-80 dark:bg-gray-800 dark:border-gray-700 ${className}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mb-4">
            <FontAwesomeIcon icon={getIcon(title)} transform="grow-20" style={{ color: "#ffffff" }} />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-white text-center mt-6 overflow-hidden text-ellipsis whitespace-normal">
            {title}
          </h5>
          {nombre && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={Rubrica}
        >
          {nombre}
        </button>
      )}
        </div>
        
      </a>
      
    </div>
  );
};

export default Card;
