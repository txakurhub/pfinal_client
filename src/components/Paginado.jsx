import React, { useState } from "react";


function Paginado({ productPorPage, product, paginado, pagina, setPagina}) {

  const [status, setStatus] = useState(1);

  const pageNumber = [];
  // const handleClick = (number) => {
  //   setStatus(number);
  //   paginado(number);
  // };

  const handleNext = ()=>{
    setStatus(parseInt(status)+1)
    setPagina(pagina+1)
  }
  const handlePrevius = ()=>{
    setStatus(status-1)
    setPagina(pagina-1)
  }

  const max = Math.ceil(product/productPorPage);

  function handleChangeInput(e){
    setStatus(e.target.value)
}

const  onKeyDown = e =>{
    if(e.keyCode === 13){
      paginado(parseInt(e.target.value))
    if(parseInt(e.target.value < 1) || parseInt(e.target.value) > max || isNaN(parseInt(e.target.value))){
      paginado(1)
      setStatus(1)
    }else {
      paginado(parseInt(e.target.value))
    }
  } 
}
  for (let i = 1; i <= Math.ceil(product/productPorPage); i++) {
    pageNumber.push(i);
  }
  // const totalPagesToRender = pageNumber.slice(pagina - 1, pagina);
   return (
    <div className="flex justify-center items-end my-4 mr-2.5">

      <div className="flex flex-row items-center justify-center space-x-8">
        {pagina > 1 && (<button disabled={status === 1} className="" onClick={handlePrevius}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>)}
        <input
        onKeyDown={e => onKeyDown(e)}
        onChange={(e)=> handleChangeInput(e)}
        type="text" value={status} name='page' autoComplete='off'/>
        <p>de {max}</p>
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