import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addCategory } from '../redux/actions';

export default function CategoryAdd() {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories);
    const [info, setInfo] = useState("");
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(addCategory(info))
    };

    const handleChange = (e)=>{
        e.preventDefault()
        setInfo(e.target.value)
        console.log(info)
    }

  return (
    <div>
        <Link to="/">
            <button>Volver</button>
        </Link>
        <form onClick={(e)=>handleSubmit(e)}>
            <input type="text" name='name' value={info} placeholder='Nombre' onChange={(e)=>handleChange(e)}/>
            <input type="submit" />
        </form>
    </div>
  )
}