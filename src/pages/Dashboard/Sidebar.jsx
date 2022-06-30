import React from 'react'

function Sidebar({setView}) {

    const handleClick=(value)=>{
        setView(value)
    }
  return (
    <div>
        <h1>Sidebar</h1>
        <ul>
            <li onClick={(e)=>handleClick("dashboard")}>
                Dashboard
            </li>
            <li onClick={(e)=>handleClick("customers")}>
                Customers
            </li>
            <li onClick={(e)=>handleClick("shoes")}>
                Shoes
            </li>
            <li onClick={(e)=>handleClick("categories")}>
                Categories
            </li>
        </ul>
    </div>
  )
}

export default Sidebar