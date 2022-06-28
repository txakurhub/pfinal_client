import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Categories() {
  const allcategories = useSelector(state=>state.categories)
  const [categories,setCategories] = useState(allcategories)
  const [buscar,setBuscar] = useState("")

  const handleChange = (e)=>{
    setBuscar(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    const resultado = allcategories.filter(el=> el.id.toLowerCase().includes(buscar.toLowerCase()))
    if(!resultado.length) return alert("No hay resultados") // cambiar alerta por swal
    setBuscar("")
    setCategories(resultado)
  }

  const deleteCategories = ({id,name})=>{
    alert(`ELIMINAR => ID: ${id} NAME: ${name}`)
    // esta funcion va a despachar una accion que elimina el producto
  }
  const editCategories = ({id,name})=>{
    alert(`EDITAR => ID: ${id} NAME: ${name}`)
    // esta funcion va a despachar una accion que elimina el producto
  }

  const allCategories = ()=>{
    setCategories(allcategories)
  }
  return (
    <div>
        <div >
        <input type="text" placeholder='ID de la categoria' value={buscar} onChange={handleChange} />
        <button onClick={handleSubmit}>Buscar</button>
        {"   "}
        <button onClick={allCategories}>All shoes</button>
      </div>
        <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">CATEGORIA</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td className="text-dark"> {category.name}</td>
                <td className="text-dark">
                  <div>
                    <button id={category.id} onClick={()=>editCategories({id:category.id,name:category.name})}>Editar</button>
                    <button id={category.id} onClick={()=>deleteCategories({id:category.id,name:category.name})}>Eliminar</button>
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

export default Categories