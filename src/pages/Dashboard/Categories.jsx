import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import { getAllCategoryAdmin } from '../../redux/actions'


function Categories() {
  const allcategories = useSelector(state=>state.allcategoriesAdmin)
  const [categories,setCategories] = useState(allcategories)
  const [buscar,setBuscar] = useState("")
  const [actualizar,setActualizar]=useState(true)
  const history = useHistory()
  const dispatch = useDispatch()
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

  const deleteCategories = async ({id,name})=>{
    await swal({
      title: "¿Estás seguro de realizar esta acción?",
      text: "¡Una vez eliminado, no podrá recuperar este producto!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        swal(`¡El producto ${name}, ha sido eliminado correctamente!`, {
          icon: "success",
        });
        //await dispatch(adminDeleteCategories(id));
       setTimeout(() => {
        window.location.reload()
       }, 2000);
      } else {
        swal("¡La acción ha sido cancelada con éxito!");
      }
    })
    alert(`ELIMINAR => ID: ${id} NAME: ${name}`)
    // esta funcion va a despachar una accion que elimina el producto
  }
  const editCategories = ({id,name})=>{
    history.push("/edit/category/"+id)
    // esta funcion va a despachar una accion que edita el producto
  }

  const allCategories = ()=>{
    setCategories(allcategories)
  }
  useEffect(() => {
    if(actualizar){
      dispatch(getAllCategoryAdmin())
    }
    setCategories(allcategories)
    setActualizar(false)
    
  }, [allcategories])
  

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
            <th scope="col">CANTIDAD PRODUCTOS</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {categories&&categories.map((category, index) => {
            return (
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td className="text-dark"> {category.name}</td>
                <td className="text-dark"> {category.cantidad}</td>
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