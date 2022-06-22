import React ,{useContext} from 'react'
import { CartContext } from '../context/CartItem';

export const Cart = ({item}) => {
    const {deleteItemToCart,addToCart} = useContext(CartContext)
    const {id} = item;
    console.log(item.title)
  return (
    <div>
        <div>
        <img src={item.image} alt={item.title} />
        </div>
        <div>
        <p>{item.title}</p>
        </div>
        <div>
        <button onClick={()=> addToCart(item)}>Agregar</button>
        </div>
        <div>
        <button onClick={()=>deleteItemToCart(item)}>ELIMINAR</button>
        </div>
        <div>
        <p> ${item.amount * item.price}</p>
        </div>
    </div>
  )
}

export default Cart;

