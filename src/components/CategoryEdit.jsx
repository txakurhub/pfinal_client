import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { editCategory } from '../redux/actions';

export default function CategoryEdit() {
  const history = useHistory();
  const dispatch = useDispatch()
  const [info, setInfo] = useState({
    id: "",
    name: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCategory(info))
    setInfo({ id: "", name: "" })
    // window.location.reload()
    history.push("/admin")
  };

  const handleChange = (e) => {
    e.preventDefault()
    setInfo({ ...info, [e.target.id]: e.target.value })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="h-full w-full flex flex-col items-center justify-center">
      <input type="text" id='id' value={info.id} placeholder='ID' onChange={(e) => handleChange(e)} className="w-[40%] mt-2 border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
      <input type="text" id='name' value={info.name} placeholder='Nombre' onChange={(e) => handleChange(e)} className="w-[40%] mt-2 border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
      <input type="submit" className="hover:bg-gray-700 focus:ring focus:ring-offset-2 mt-3 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" />
    </form>
  )
}