import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getShoeDetail } from "../redux/actions";
import { Link } from 'react-router-dom'
import Review from "../components/Reviews"
import { CartContext } from "../context/CartItem";

<<<<<<< HEAD
export default function Detail({ title, image, brand, model, price }) {
  // const dispatch = useDispatch();
  // const params = useParams();
  // const [loader, setLoader] = useState(true);
  // let selected = useSelector((state) => state.product_detail);
=======
export default function Detail() {
  const dispatch = useDispatch();
  const params = useParams();
  const [loader, setLoader] = useState(true);
  let selected = useSelector((state) => state.product_detail);
  const { addToCart } = useContext(CartContext);
>>>>>>> f6db73a322615caca8ceed56dbf59942becc916f

  // useEffect(() => {
  //   dispatch(getShoeDetail(params.id)).then(() => setLoader(false));
  // }, [dispatch, params.id]);

  // if (loader === true) {
  //   return <div>Acá va un loader...</div>;
  // }
  return (
    <main>
<<<<<<< HEAD
      {/* <div>
        <img src={selected.image} alt={title} />
=======
      <button><Link to={'/'}>volver</Link></button>
      <div>
        <img src={selected.image} alt={selected.title} />
>>>>>>> f6db73a322615caca8ceed56dbf59942becc916f
      </div>
      <div>
        <h2>{selected.title}</h2>
        <h4>{selected.brand}</h4>
        <h4>{selected.model}</h4>
        <h5>{selected.price}</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, asperiores voluptatem iure veniam sint, ipsa id unde porro neque sunt placeat delectus nihil labore possimus facilis. Unde quaerat commodi fugit.</p>
<<<<<<< HEAD
      </div> */}
=======
      </div>
      <hr />
      <div>
        <button onClick={()=>addToCart(selected)}>Agregar al Carrito</button>
      </div>
      <div>
        <Review id={selected.id}/> 
      </div>
>>>>>>> f6db73a322615caca8ceed56dbf59942becc916f
    </main>
  );
}
