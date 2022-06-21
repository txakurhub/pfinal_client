import { current } from "@reduxjs/toolkit";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartItem";

function ShoppingCart() {
    const [cartOpen, setCartOpen] = useState(false)
    const [productsLength, setProductsLengt] = useState(0)

    const {cartItem} = useContext(CartContext);

    useEffect(()=>{
        setProductsLengt(
            cartItem.reduce((previus, current) => previus + current.amount, 0)
        );
    }, [cartItem])
    
    const total = cartItem.reduce((previus , current)=> previus + current.amount * current.price)


    return (
        <div>
            <div>
            {!cartOpen ? (
                <p>Vacio</p>
            ): (<p>lleno</p>)}
            </div>
            <div>
                {!cartOpen && (
                    <div>{productsLength}</div>
                )}
            </div>
        </div>
    )
}

export default ShoppingCart;
