import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartItem";

const Card = ({ title, image, price, id, product, toggle, onClick, setProduct, sinStock}) => {
  const { addToCart } = useContext(CartContext);
  
  const numberFormat = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      currencyDisplay: "symbol",
  }).format(value);

  return (
    <div key={id} className="group w-[290px] h-[320px] bg-white rounded-lg p-4 hover:shadow-2xl transition delay-200 duration-300  ">
      <a title="Ir al detalle del producto" href={`/detail/${id}`} className="w-full h-[140px] aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 flex items-center justify-center">
        <img
          src={image}
          alt="Not found"
        
          className="h-full object-center object-cover  "
        />
      </a>
      <h3 title={title} className="mt-4 text-sm text-start text-gray-700 w-full h-[20px] truncate">{title}</h3>
      <div className="flex justify-between items-center">
        <p title={'$' + price} className="mt-1 text-lg text-start font-medium text-gray-900">{numberFormat(price)}</p>
        {
          sinStock ? 
          <p title="Producto sin disponibilidad en stock" className="flex items-center text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="red">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            No disponible
          </p> : 
          <p title="Producto disponible en stock" className="flex items-center text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="green">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Disponible
          </p>
        }
      </div>
      <button title={sinStock ? 'deshabilitado' : 'Agregar al carrito'} disabled={sinStock ? true : false} onClick={() => addToCart(product)} className="w-full h-[50px] m-auto rounded bg-gray-900 text-white font-semibold mt-10 opacity-0 group-hover:opacity-100 transition duration-500">
        Agregar al carrito
      </button>
    </div>
  );
};

export default Card;