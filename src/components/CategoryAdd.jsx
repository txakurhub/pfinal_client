import React from 'react'
import { useState } from 'react'

export default function CategoryAdd() {

    const {name, setName} = useState("");
    
    const handleSubmit = (e)=>{
        e.preventDefault();
    };

  return (
    <div>
        <form onClick={(e)=>handleSubmit(e)}>
            <input type="text" name='name' placeholder='Nombre'/>
        </form>
    </div>
  )
}
