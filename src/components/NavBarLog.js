import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const NavBarLog = () => {
    return (
        <nav className="bg-fondo fixed w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Reviewer UX</span>
                </a>
                <div className="flex md:order-2 space-x-6 rtl:space-x-reverse items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white">
                        <FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#ffffff" }} />
                    </div>
                    
                </div>
            </div>
        </nav>
    );
};

export default NavBarLog;