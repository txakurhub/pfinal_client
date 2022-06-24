import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_wishlist_product, remove_wishlist_product } from "../redux/actions";

function Wishlist() {
 
    const dispatch = useDispatch();

    const wishlist = useSelector((state)=> state.wishlist)
   
    useEffect(()=>{
        // aca falta modificar el id del usuario
        dispatch(get_wishlist_product(1))
    },[dispatch])

    const handleButton = (e)=>{
        e.preventDefault();

        dispatch(remove_wishlist_product( e.target.value, "1"))
    }
    return (
        <div>
            <h1>Mis Favoritos {wishlist&&wishlist.length}</h1>
            {wishlist.length? wishlist.map((w)=>(
                <div key={w.id}>
                <img src={w.Products[0].image} alt="" style={{width: "400px", height: "400px"}} />
                <p>{w.Products[0].title}</p>
                <button value={w.id} name="id" onClick={e=>handleButton(e)}>Like</button>
                </div>
            )): <div> No hay Favoritos </div>}
            <div>

            </div>
        </div>
    )
}

export default Wishlist;
