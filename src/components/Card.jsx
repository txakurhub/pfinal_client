import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({title, image, brand, model, price,id}) {
  return (
    <div>
      <Link to={`/${id}`}>
      <div >
        <p>{title}</p>
        <img src={image} alt="" />
        <p>Brand: {brand}</p>
        <p>Model: {model}</p>
        <p>Price: ${price}</p>
      </div>
      <hr />
      </Link>
    </div>
  )
}
