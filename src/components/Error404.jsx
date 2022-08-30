import React from "react";
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2">
                <img className="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" alt="" />
                <img className="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" alt="" />
                <img className="md:hidden" src="https://i.ibb.co/8gTVH2Y/Group-198.png" alt="" />
            </div>
            <div className="w-full lg:w-1/2">
                <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">Parece que has encontrado la puerta a la gran nada</h1>
                <p className="py-4 text-base text-gray-800">El contenido que buscas no existe. Se eliminó o escribiste mal el enlace, o necesitas permiso de administrador para acceder.</p>
                <p className="py-2 text-base text-gray-800">¡Lo lamentamos! Visita nuestra página de inicio para llegar a donde necesitas ir.</p>
                <Link to='/'>
                    <button className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Volver a la página principal</button>
                </Link>
            </div>
        </div>
    );
};

export default Error404;
