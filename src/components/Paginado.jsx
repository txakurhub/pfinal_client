import React, { useState } from "react";


function Paginado({ productPorPage, product, paginado, pagina, setPagina }) {

  const [status, setStatus] = useState(1);

  const pageNumber = [];
  // const handleClick = (number) => {
  //   setStatus(number);
  //   paginado(number);
  // };

  const handleNext = () => {
    setStatus(parseInt(status) + 1)
    setPagina(pagina + 1)
  }
  const handlePrevius = () => {
    setStatus(status - 1)
    setPagina(pagina - 1)
  }

  const max = Math.ceil(product / productPorPage);

  function handleChangeInput(e) {
    setStatus(e.target.value)
  }

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      paginado(parseInt(e.target.value))
      if (parseInt(e.target.value < 1) || parseInt(e.target.value) > max || isNaN(parseInt(e.target.value))) {
        paginado(1)
        setStatus(1)
      } else {
        paginado(parseInt(e.target.value))
      }
    }
  }
  for (let i = 1; i <= Math.ceil(product / productPorPage); i++) {
    pageNumber.push(i);
  }
  // const totalPagesToRender = pageNumber.slice(pagina - 1, pagina);
  return (
    <div className="flex justify-center items-end mt-4">
      <div className="flex flex-row items-center justify-center space-x-8 mb-8">
        {
          pagina > 1 &&
          (
            <button title="Prev page" disabled={status === 1} className="" onClick={handlePrevius}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )
        }
        <input onKeyDown={e => onKeyDown(e)} onChange={(e) => handleChangeInput(e)} type="text" value={status} name='page' autoComplete='off' className="w-[50px] border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        <p className="ml-[15px]">de {max}</p>
        {
          pagina !== max &&
          (
            <button title="Next page" className="flex justify-center items-center" disabled={status === max} onClick={handleNext}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )
        }
      </div>
    </div>
  );
}

export default Paginado;