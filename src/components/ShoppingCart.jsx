import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartItem";
import { Link } from 'react-router-dom';

function ShoppingCart() {
    // const [cartOpen, setCartOpen] = useState(false)
    const [productsLength, setProductsLengt] = useState(0);
    const { cartItem } = useContext(CartContext);

    useEffect(() => {
      setProductsLengt(cartItem.reduce((previous, current) => previous + current.amount, 0));
    }, [cartItem]);

    return (
        <div>
            <Link to={'/cart'}>
                <div>
                    <p className="none">{productsLength}</p>
                    {
                        !cartItem ?
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="30" fill="#222222"/>
                            <path d="M42.733 23.6465C42.595 23.4471 42.4108 23.2841 42.196 23.1715C41.9813 23.0589 41.7425 23.0001 41.5 23H20.9995L19.2685 18.845C19.0415 18.2978 18.6572 17.8304 18.1642 17.5019C17.6713 17.1735 17.0919 16.9988 16.4995 17H13V20H16.4995L23.6155 37.0775C23.7295 37.3507 23.9218 37.5841 24.1681 37.7483C24.4145 37.9125 24.7039 38 25 38H37C37.6255 38 38.185 37.6115 38.4055 37.028L42.9055 25.028C42.9905 24.8009 43.0193 24.5566 42.9892 24.316C42.9592 24.0754 42.8713 23.8457 42.733 23.6465V23.6465Z" fill="#F0F0F0"/>
                            <path d="M25.75 44C26.9926 44 28 42.9926 28 41.75C28 40.5074 26.9926 39.5 25.75 39.5C24.5074 39.5 23.5 40.5074 23.5 41.75C23.5 42.9926 24.5074 44 25.75 44Z" fill="#F0F0F0"/>
                            <path d="M36.25 44C37.4926 44 38.5 42.9926 38.5 41.75C38.5 40.5074 37.4926 39.5 36.25 39.5C35.0074 39.5 34 40.5074 34 41.75C34 42.9926 35.0074 44 36.25 44Z" fill="#F0F0F0"/>
                        </svg> :
                        <svg width="70" height="68" viewBox="0 0 70 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="38" r="30" fill="#222222"/>
                            <path d="M42.733 31.6465C42.595 31.4471 42.4108 31.2841 42.196 31.1715C41.9813 31.0589 41.7425 31.0001 41.5 31H20.9995L19.2685 26.845C19.0415 26.2978 18.6572 25.8304 18.1642 25.5019C17.6713 25.1735 17.0919 24.9988 16.4995 25H13V28H16.4995L23.6155 45.0775C23.7295 45.3507 23.9218 45.5841 24.1681 45.7483C24.4145 45.9125 24.7039 46 25 46H37C37.6255 46 38.185 45.6115 38.4055 45.028L42.9055 33.028C42.9905 32.8009 43.0193 32.5566 42.9892 32.316C42.9592 32.0754 42.8713 31.8457 42.733 31.6465V31.6465Z" fill="#F0F0F0"/>
                            <path d="M25.75 52C26.9926 52 28 50.9926 28 49.75C28 48.5074 26.9926 47.5 25.75 47.5C24.5074 47.5 23.5 48.5074 23.5 49.75C23.5 50.9926 24.5074 52 25.75 52Z" fill="#F0F0F0"/>
                            <path d="M36.25 52C37.4926 52 38.5 50.9926 38.5 49.75C38.5 48.5074 37.4926 47.5 36.25 47.5C35.0074 47.5 34 48.5074 34 49.75C34 50.9926 35.0074 52 36.25 52Z" fill="#F0F0F0"/>
                            <circle cx="57.5" cy="12.5" r="12.5" fill="#FB3939"/>
                            <path d="M58.8984 7.46875V16H56.9238V9.69531L54.9785 10.2637V8.76367L58.7168 7.46875H58.8984Z" fill="white"/>
                        </svg>
                    }
                </div>
            </Link>
            {/* <div>
                {!cartOpen && (
                    <div>{productsLength}</div>
                    )}
            </div> */}

            {/* {cartItem && cartOpen && (
                <div>
                    <h2>Tu carrito</h2>
                    {cartItem.length === 0  ? <p>Tu carrito esta vacio</p> :(
                        <div>
                            {cartItem.map((item , i)=>(
                                <Cart key={i} item={item}/>
                            ))}
                        </div>
                    )}
                <h2>Total: ${total}</h2>
                </div>
            )} */}
        </div>
    );
};

export default ShoppingCart;

// onClick={()=> setCartOpen(!cartOpen)}