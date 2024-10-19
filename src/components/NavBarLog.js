import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faHouse, faFileContract } from "@fortawesome/free-solid-svg-icons";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';
import logo from '../assets/logo_no_background.png';

const NavBarLog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-fondo fixed w-full z-20 top-0 h-24"> {/* Hacer el fondo transparente */}
            <div className="flex items-center h-full px-6">

                <div className="flex items-center space-x-6">
                    <button onClick={toggleDrawer} type="button">
                        <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} size="2x" />
                    </button>

                    <div className="flex items-center space-x-3">
                        <img src={logo} alt="Logotipo" className="w-12 h-12" />
                        <span className="text-3xl font-semibold whitespace-nowrap text-white">Reviewer UX</span>
                    </div>
                </div>

                <div className="ml-auto">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white">
                        <Link to="/perfil">
                        <FontAwesomeIcon icon={faUser} size="2x" style={{ color: "#ffffff" }} />
                        </Link>
                    </div>
                </div>
            </div>

            <div
                id="drawer-navigation"
                className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-cards dark:bg-gray-800`}
                tabIndex="-1"
                aria-labelledby="drawer-navigation-label"
            >
                <div className="flex justify-between items-center">
                    <h5 id="drawer-navigation-label" className="text-base font-semibold text-white uppercase dark:text-gray-400">
                        Menu
                    </h5>
                    <button
                        onClick={toggleDrawer}
                        type="button"
                        className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                </div>

                {/* Lista del menú */}
                <ul className="mt-6 space-y-2 font-medium">
                    <li>
                        <Link to="/home" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff" }} size="lg" /> {/* Aumenta el tamaño del icono */}
                            <span className="ms-3 text-lg">Inicio</span> {/* Aumenta el tamaño del texto */}
                        </Link>
                    </li>
                    <li>
                        <Link to="/rubricas" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon icon={faFileContract} style={{ color: "#ffffff" }} size="lg" /> {/* Aumenta el tamaño del icono */}
                            <span className="flex-1 ms-3 text-lg">Rubricas</span> {/* Aumenta el tamaño del texto */}
                        </Link>
                    </li>
                    <li>
                        <Link to="/softwares" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon icon={faWindows} style={{ color: "#ffffff" }} size="lg" /> {/* Aumenta el tamaño del icono */}
                            <span className="flex-1 ms-3 text-lg">Software</span> {/* Aumenta el tamaño del texto */}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBarLog;
