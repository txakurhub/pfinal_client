import React from 'react'

export default function Card(props) {
  return (
    <div>
      <div >
        <p>{props.titulo}</p>
        <img src={props.img} alt="" />
        <p>Brand: {props.brand}</p>
        <p>Model: {props.model}</p>
        <p>Price: ${props.price}</p>
      </div>
      <hr />
    </div>
  )
}
