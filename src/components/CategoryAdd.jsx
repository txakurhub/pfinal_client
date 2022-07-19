import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { addCategory } from '../redux/actions';

export default function CategoryAdd() {
  const history = useHistory();

  const validation = (info) => {
    let errores = {}
    if (!/^[a-zA-Z ]*$/.test(info.name)) {
      errores.name = "Sólo se permiten letras"
    }
    return errores
  }

  const dispatch = useDispatch()
  const [info, setInfo] = useState("");
  const [errores, setErrores] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory(info))
    setInfo('')
    // window.location.reload()
    history.push("/admin")
  };

  const handleChange = (e) => {
    e.preventDefault()
    setInfo(e.target.value)
    setErrores(validation({
      ...info, [e.target.name]: e.target.value
    }));
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="h-full w-full flex flex-col items-center justify-center gap-3">
      <input type="text" name='name' value={info} placeholder='Nombre' onChange={(e) => handleChange(e)} className="w-[48%] border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
      {errores.name ? <p>{errores.name}</p> : null}
      <input type="submit" className="cursor-pointer hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" />
    </form>
  )
}