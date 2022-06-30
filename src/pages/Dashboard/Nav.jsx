import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div>
      <h1>Nav</h1>
      <p>NOMBRE ADMIN</p>
      <Link to={"/"}>home</Link>
    </div>
  )
}

export default Nav