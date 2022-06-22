import React, { useState } from "react";


function Paginado({ productPorPage, product, paginado}) {

  const [status, setStatus] = useState(1);

  const pageNumber = [];
  const handleClick = (number) => {
    setStatus(number);
    paginado(number);
  };

  const handleNext = ()=>{
    paginado(status+1)
    setStatus(status +1)
  }
  const handlePrevius = ()=>{
    paginado(status-1)
    setStatus(status-1)
  }

  const max = Math.ceil(product/productPorPage);

  for (let i = 1; i <= Math.ceil(product/productPorPage); i++) {
    pageNumber.push(i);
  }
  
  return (
    // <nav className="">
    //   <ul id="ul_pagina" className="">
    //     <li>
    //       <button disabled={status === 1} className="" onClick={handlePrevius}>
    //         Previus
    //       </button>
    //     </li>
    //     {pageNumber?.map((number) => (
    //       <li key={number} id="pagina">
    //         <button
    //           className=""
    //           onClick={() => handleClick(number)}
    //         >
    //           {number}
    //         </button>
    //       </li>
    //     ))}
    //     <li>
    //       <button disabled={status === max}  onClick={handleNext}>
    //         Next
    //       </button>
    //     </li>
    //   </ul>
    // </nav>
    <div className="flex justify-end items-end my-4 mr-2.5">
      <div className="flex flex-row items-center justify-center space-x-8">
        {
          pageNumber?.map((number) => (
            <button key={number} id="pagina" className="text-base leading-none text-gray-800 border-b-2 border-transparent focus:outline-none focus:border-gray-800" onClick={() => handleClick(number)}>
              <p>{number}</p>
            </button>
          ))
        }
        <button className="flex justify-center items-center" disabled={status === max}  onClick={handleNext}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Paginado;