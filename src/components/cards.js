import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSquareCheck,faFileContract } from "@fortawesome/free-solid-svg-icons";

const Card = ({title, link, icono})=>{
    const getIcon = (title) => {
        switch (icono) {
          case "nueva":
            return faPlus;
          case "calificar":
            return faSquareCheck;
          case "rubricas":
            return faFileContract;
          default:
            return faPlus; // Ícono por defecto si no coincide con ningún caso
        }
      };
    return(
        <a href="#" className="block max-w-sm h-64 w-64 p-6 bg-cards  rounded-lg shadow hover:bg-cards hover:bg-opacity-80 dark:bg-gray-800 dark:border-gray-700">
  <div className="flex flex-col items-center justify-center h-full">
    <div className="mb-4">
      <FontAwesomeIcon icon={getIcon(title)} transform="grow-70" style={{ color: "#ffffff" }} />
    </div>
    <br></br>
    <h5 className="text-2xl font-bold tracking-tight text-white text-center overflow-hidden text-ellipsis whitespace-nowrap">
      {title}
    </h5>
  </div>
</a>

      
      

    );
};

export default Card;