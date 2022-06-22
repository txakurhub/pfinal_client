import React from 'react'
import { useContext } from "react";
import { CartContext } from '../context/CartItem';
import Cart from '../components/Cart'

export const PageShopingCart = () => {
    const {cartItem} = useContext(CartContext);
    const total = cartItem.reduce((previous , current)=> previous + current.amount * current.price, 0)

  return (
    <div>
    <div>
        {cartItem.length === 0  ? <p>Tu carrito esta vacio</p> :(
            <div>
                {cartItem.map((item , i)=>(
                    <Cart key={i} item={item}/>
                ))}
            </div>
        )}
    </div>
    <div>
        <h2>Total Del Carrito $ {total}</h2>
    </div>
    </div>
  )
}
