import React from 'react'

export const ProductosDestacados = ({title,image}) => {
  return (
    <div>
        <p>{title}</p>
        <img src={image} alt="" />
    </div>
  )
}
