import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { editCategory } from '../redux/actions';

export default function CategoryEdit() {

  const dispatch = useDispatch()
  const [info, setInfo] = useState({
    id: "",
    name: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCategory(info))
    setInfo({ id: "", name: "" })
    history.push("/admin")
  };

  const handleChange = (e) => {
    e.preventDefault()
    setInfo({ ...info, [e.target.id]: e.target.value })
  }

  return (
    <div>
      <Link to="/">
        <button>Volver</button>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" id='id' value={info.id} placeholder='id' onChange={(e) => handleChange(e)} />
        <input type="text" id='name' value={info.name} placeholder='Nombre' onChange={(e) => handleChange(e)} />
        <input type="submit" />
      </form>
    </div>
  )
}