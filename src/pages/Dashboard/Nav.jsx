import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../../context/authContext";

function Nav() {
  
  
  const { userData } = useAuth();

  useEffect(()=>{
    console.log()
    console.log(userData())
  },[])
  

  return (
    <div className='text-3xl h-20 text-white font-bold bg-[#1da1f2] flex flex-row justify-center justify-items-center'>
      <Link to={"/"}>home</Link>
      <h1 className=''>Nav</h1>
      <p>NOMBRE ADMIN</p>
    </div>
  )
}

export default Nav