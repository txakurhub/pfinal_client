import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory } from '../redux/actions';

export default function CategoryAdd() {

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
    window.location.reload()
  };

  const handleChange = (e) => {
    e.preventDefault()
    setInfo(e.target.value)
    setErrores(validation({
      ...info, [e.target.name]: e.target.value
    }));
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name='name' value={info} placeholder='Nombre' onChange={(e) => handleChange(e)} />
        {errores.name ? <p>{errores.name}</p> : null}
        <input type="submit" />
      </form>
    </div>
  )
}