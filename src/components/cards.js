import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const Card = ({ title, link, icono, className }) => {
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
        </div>
      </a>
    </div>
  );
};

export default Card;
 