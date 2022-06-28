import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Shoes() {
  const allProduts = useSelector(state=>state.allProductsCopy)
  const [shoes,setShoes] = useState(allProduts)
  const [buscar,setBuscar] = useState("")
  
  const handleChange = (e)=>{
    setBuscar(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const resultado = allProduts.filter(el=> el.id.toLowerCase().includes(buscar.toLowerCase()))
    if(!resultado.length) return alert("No hay resultados") // cambiar alerta por swal
    setBuscar("")
    setShoes(resultado)
  }

  const allShoes = ()=>{
    setShoes(allProduts)
  }

  const deleteShoes = ({id,name})=>{
    alert(`ELIMINAR => ID: ${id} NAME: ${name}`)
    // esta funcion va a despachar una accion que elimina el producto
  }
  const editShoes = ({id,name})=>{
    alert(`EDITAR => ID: ${id} NAME: ${name}`)
    // esta funcion va a despachar una accion que elimina el producto
  }
  return (
    <div>
      <div >
        <input type="text" placeholder='ID del producto' value={buscar} onChange={handleChange} />
        <button onClick={handleSubmit}>Buscar</button>
        {"   "}
        <button onClick={allShoes}>All shoes</button>
      </div>
      <table className='table-fixed'>
        <thead>
          <tr>
            <th > </th>
            <th >ID</th>
            <th >NOMBRE</th>
            <th >MARCA</th>
            <th >STOCK</th>
            <th >PRECIO</th>
            <th >ACTION</th>
          </tr>
        </thead>
        <tbody>
          {shoes &&shoes.map((shoes) => {
            return (
              <tr key={shoes.id}>
                <th ></th>
                <th >{shoes.id}</th>
                <td className="text-dark"> {shoes.title}</td>
                <td className="text-dark"> {shoes.brand}</td>
                <td className="text-dark">{true?5:"SIN STOCK"}</td>
                <td className="text-dark"> ${shoes.price}</td>
                <td className="text-dark">
                  <div>
                    <button id={shoes.id} onClick={()=>editShoes({id:shoes.id,name:shoes.title})}>Editar</button>
                    <button id={shoes.id} onClick={()=>deleteShoes({id:shoes.id,name:shoes.title})}>Eliminar</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Shoes