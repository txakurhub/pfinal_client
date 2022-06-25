import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_wishlist_product, remove_wishlist_product } from "../redux/actions";

function Wishlist() {
 
    const dispatch = useDispatch();

    const wishlist = useSelector((state)=> state.wishlist)
    const [order, setOrder] = useState('')
   
    useEffect(()=>{
        // aca falta modificar el id del usuario
        dispatch(get_wishlist_product(1))
    },[dispatch])

    const handleButton = (id)=>{
        
        const dato = id;
        console.log(dato)
        dispatch(remove_wishlist_product( dato, "1"))
        setOrder(dato)
    }
    return (
        <div>
            <h1>Mis Favoritos {wishlist&&wishlist.length}</h1>
            {wishlist.length? wishlist.map((w)=>(
                <div key={w.id}>
                <img src={w.Products[0].image} alt="" style={{width: "400px", height: "400px"}} />
                <p>{w.Products[0].title}</p>
                <button  onClick={() => handleButton(w.id)}>          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z" fill="#1F2937" />
          </svg></button>
                </div>
            )): <div> No hay Favoritos </div>}
            <div>

            </div>
        </div>
    )
}

export default Wishlist;
