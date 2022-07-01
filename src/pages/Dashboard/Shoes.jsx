import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import { adminDeleteShoes, getProducts } from '../../redux/actions'

function Shoes() {
  const allProduts = useSelector(state=>state.allProductsCopy)
  const [shoes,setShoes] = useState(allProduts)
  const [buscar,setBuscar] = useState("")
  const [actualizar,setActualizar]=useState(true)
  const dispatch = useDispatch()
  const history = useHistory()
  
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

  const deleteShoes = async({id,name})=>{
    // esta funcion va a despachar una accion que elimina el producto
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
        await dispatch(adminDeleteShoes(id));
       setTimeout(() => {
        window.location.reload()
       }, 2000);
      } else {
        swal("¡La acción ha sido cancelada con éxito!");
      }
    })
  }
  const editShoes = ({id,name})=>{
    history.push("/dashboard/admin/edit/"+id)
    // const win = window.open("/dashboard/admin/edit/"+id, "_blank")
    // win.focus()
  }

  useEffect(() => {
    if(actualizar){
      dispatch(getProducts())
    }
    setShoes(allProduts)
    setActualizar(false)
  }, [allProduts]); // no tocar porfa xd

  return (
    <div>
      <div >
        <input type="text" placeholder='ID del producto' value={buscar} onChange={handleChange} />
        <button onClick={handleSubmit}>Buscar</button>
        {"         "}
        <button onClick={allShoes}>All shoes</button>
        {"         "}
        <button onClick={()=>{
         history.push("/form")
        }}>Crear producto</button>
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
                <th > <img src={shoes.image} draggable="false" width="50" height="50" alt="das" /> </th>
                <th >{shoes.id}</th>
                <td className="text-dark"> {shoes.title}</td>
                <td className="text-dark"> {shoes.brand}</td>
                <td className="text-dark">{shoes.stock ? shoes.stock:"Sin stock"}</td>
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