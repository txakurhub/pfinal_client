import React, { useState } from "react";


function Paginado({ productPorPage, product, paginado, pagina }) {

  const [status, setStatus] = useState(1);
  const pageNumber = [];
  const handleClick = (number) => {
    setStatus(number);
    paginado(number);
  };


  const handleNext = () => {
    paginado(status + 1)
    setStatus(status + 1)
  }
  const handlePrevius = () => {
    paginado(status - 1)
    setStatus(status - 1)
  }

  const max = Math.ceil(product / productPorPage);

  for (let i = 1; i <= Math.ceil(product / productPorPage); i++) {
    pageNumber.push(i);
  }

  const totalPagesToRender = pageNumber.slice(pagina - 1, pagina);
  const simbolito = '< prev'
  return (
    <div className="flex justify-center items-end my-4 mr-2.5">

      <div className="flex flex-row items-center justify-center space-x-8">
        {pagina > 1 && (<button disabled={status === 1} className="" onClick={handlePrevius}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>)}
        {
          totalPagesToRender?.map((number) => (
            <>
              <button key={number} id="pagina" className="text-base leading-none text-gray-800 border-b-2 border-transparent focus:outline-none focus:border-gray-800" onClick={() => number!==max? handleClick(number):handleClick(1)}>
                <p>{number !== max? number : 1}</p>
              </button>
              <p>de</p>
              <button onClick={()=> handleClick(max)}>{max}</button>
            </>

          ))
        }
        {pagina !== max && (<button className="flex justify-center items-center" disabled={status === max} onClick={handleNext}>
          <svg width={24} height={24} className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>)}
      </div>
    </div>
  );
}

export default Paginado;