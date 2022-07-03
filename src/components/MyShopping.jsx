import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOrderProducts } from "../redux/actions";

export const MyShopping =()=>{
    return(
        <div >
        <section className="container mx-auto p-10 md:p-20 transform duration-500 mb-0">
          <article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-screen-lg  border border-gray-200 bg-white">
            <img className="w-full md:w-2/4 h-auto" draggable="false" src='https://http2.mlstatic.com/D_NQ_NP_818272-MLA46942063230_082021-W.jpg' alt="" />
            <div className="p-8 my-auto">
              <h1 className="text-2xl font-semibold text-gray-800">NIKE AIR 90</h1>
              <p className="text-base text-gray-600 mt-2">
                Zapatillas
              </p>
              <p className="text-base text-gray-400 mt-2">
                25000
              </p>
              <p className="text-base text-gray-400 mt-2">

                <button  className="w-full focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800  bg-white border border-gray-800">Más información</button>
              </p>
            </div>
          </article>
        </section>
      </div>
    )
}