import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import CategoryAdd from '../../components/CategoryAdd'
import CategoryEdit from '../../components/CategoryEdit'
import Modal from '../../components/Modal'
import { adminDeleteCategories, getAllCategoryAdmin } from '../../redux/actions'


function Categories() {
  const history = useHistory();
  const allcategories = useSelector(state=>state.allcategoriesAdmin)
  const [categories,setCategories] = useState(allcategories)
  const [buscar,setBuscar] = useState("")
  const [actualizar,setActualizar]=useState(true)
  const dispatch = useDispatch()
  const [id, setId] = useState('');
  const [activeCreate, setActiveCreate] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
    const toggleEdit = () => setActiveEdit(!activeEdit);
    const toggleCreate = () => setActiveCreate(!activeCreate);
    const onClick = (r) => setId(r);

  const handleChange = (e)=>{
    setBuscar(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    const resultado = allcategories.filter(el=> el.name.toLowerCase().includes(buscar.toLowerCase()))
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
        dispatch(adminDeleteCategories(id));
       setTimeout(() => {
        // window.location.reload()
        history.push("/admin")
       }, 2000);
      } else {
        swal("¡La acción ha sido cancelada con éxito!");
      }
    })
    // esta funcion va a despachar una accion que elimina el producto
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
    <div className="w-[95%] m-auto">
    <div className=" px-4 py-3 space-y-2">
        <div className="bg-grey col-12 mt-2 align-middle justify-end flex " >
        
				<input onChange={handleChange} type="text" className="col-8 border-2 p-2 m-1 rounded-lg " placeholder="Buscar categoria..." id="search-filter"/>
        <button onClick={handleSubmit} className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">Buscar</button>
        <button onClick={allCategories} className="h-10 px-5 m-2 ml-10 text-gray-100 transition-colors duration-150 bg-gray-600 rounded-lg focus:shadow-outline hover:bg-gray-700">Recargar</button>
        <button
       className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-700"
       onClick={()=>{toggleCreate();}}
        >
          Crear categoria
        </button>
			</div>
      </div>
      <table className="table w-full">
      <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr>
          <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
            ID</th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">
            
            CATEGORIA</th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">

            CANTIDAD PRODUCTOS</th>
            <th className="border border-gray-300 p-4 text-sm font-semibold tracking-wide text-center">

            ACTION</th>
          </tr>
        </thead>
        <tbody>
          {categories&&categories.map((category, index) => {
            return (
              <tr className="odd:bg-white even:bg-slate-50" key={category.id}>
                <th className="border border-gray-200 p-3 text-sm text-gray-700">{category.id}</th>
                <td className="border border-gray-200 p-3 text-sm text-gray-700"> {category.name}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-700"> {category.cantidad}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-700">
                  <div>
                    <button
                        className="px-2 bg-lime-500 py-2 rounded-md text-white font-semibold hover:bg-lime-600 active:bg-lime-700 focus:outline-none focus:ring focus:bg-lime-300 "
                     id={category.id} onClick={()=>{toggleEdit(); onClick(category.id)}}>Editar</button>
                    <button
                        className="px-2 bg-red-500 py-2 rounded-md text-white font-semibold hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:bg-red-300 "

                     id={category.id} onClick={()=>deleteCategories({id:category.id,name:category.name})}>Eliminar</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal active={activeEdit} toggle={toggleEdit} children={<CategoryEdit id={id} />} />
      <Modal active={activeCreate} toggle={toggleCreate} children={<CategoryAdd />} />
    </div>
  )
}

export default Categories