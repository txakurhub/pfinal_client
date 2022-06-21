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
    <nav className="">
      <ul id="ul_pagina" className="">
        <li>
          <button disabled={status === 1} className="" onClick={handlePrevius}>
            Previus
          </button>
        </li>
        {pageNumber?.map((number) => (
          <li key={number} id="pagina">
            <button
              className=""
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button disabled={status === max}  onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Paginado;