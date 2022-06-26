import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  create_new_wishlist,
  filter_get_wishlist_product,
  getShoeDetail,
  remove_wishlist_product,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Review from "../components/Reviews";
import { CartContext } from "../context/CartItem";

export default function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const [loader, setLoader] = useState(true);
  let selected = useSelector((state) => state.product_detail);
  const wishlist = useSelector((state) => state.wishlist);
  const counter = useSelector((state)=> state.counterwishlist);
  const [order, setOrder] = useState('')
  const { addToCart } = useContext(CartContext);
let das = 0;
  const getid =(b)=>{
      for (let key in b) {
        if (b.hasOwnProperty(key) && (typeof b[key] === "object")) {
          getid(b[key])
      } else {
          // printing the flat attributes
          // console.log(key + " -> " + b[key]);
          if(key === "wishlistId"){
            das=b[key]
          }  
      }
      }
    }

  useEffect(() => {
   
    dispatch(filter_get_wishlist_product({ id: "1", product: params.id }));
    dispatch(getShoeDetail(params.id)).then(() => setLoader(false));
  
  }, [dispatch, counter ]);
  


  const handleaddwishlist = (e)=>{
    e.preventDefault();
    console.log("agregar")
    dispatch(create_new_wishlist({user_id: 1, product_id: params.id}))
    
  }
  const handledeltewishlist = (e)=>{
    e.preventDefault();
    if(counter>0){
      console.log(counter)
      getid(wishlist)
      console.log(das)
      if(das>0){
        console.log("todo bien")
        dispatch(remove_wishlist_product(das, "1"))
        
      }
    }
  }
  if (loader === true) {
    return <div>Acá va un loader...</div>;
  }
  return (
    <main>
      <button>
        <Link to={"/"}>volver</Link>
      </button>
      <div>
        <img src={selected.image} alt={selected.title} />
      </div>
      <div>
        <h2>{selected.title}</h2>
        <h4>{selected.brand}</h4>
        <h4>{selected.model}</h4>
        <h5>{selected.price}</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
          asperiores voluptatem iure veniam sint, ipsa id unde porro neque sunt
          placeat delectus nihil labore possimus facilis. Unde quaerat commodi
          fugit.
        </p>
      </div>
      <hr />
      <div>
        <button onClick={() => addToCart(selected)}>Agregar al Carrito</button>
        {counter > 0 ? (

          <div>
            <button value={wishlist.id} name="id" onClick={e=>handledeltewishlist(e)}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z"
                  fill="#ff0000"
                />
              </svg>
          
            </button>
          </div>
        ) : (
          <div>
            <button value={selected.id} name="id" onClick={e=>handleaddwishlist(e)}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z"
                  fill="#1F2937"
                />
              </svg>
              
            </button>
          </div>
        )}
      </div>
      <div>
        <Review id={selected.id} />
      </div>
    </main>
  );
}
