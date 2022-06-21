import React from 'react'

export default function Card({title, image, brand, model, price}) {
  return (
    <div>
      <div >
        <p>{title}</p>
        <img src={image} alt="" />
        <p>Brand: {brand}</p>
        <p>Model: {model}</p>
        <p>Price: ${price}</p>
      </div>
      <hr />
    </div>
  )
}
