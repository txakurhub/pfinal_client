import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getShoeDetail } from "../redux/actions";
import { Link } from 'react-router-dom'

export default function Detail({ title, image, brand, model, price }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [loader, setLoader] = useState(true);
  let selected = useSelector((state) => state.product_detail);

  useEffect(() => {
    dispatch(getShoeDetail(params.id)).then(() => setLoader(false));
  }, [dispatch, params.id]);

  if (loader === true) {
    return <div>Acá va un loader...</div>;
  }
  return (
    <main>
      <button><Link to={'/'}>volver</Link></button>
      <div>
        <img src={selected.image} alt={title} />
      </div>
      <div>
        <h2>{selected.title}</h2>
        <h4>{selected.brand}</h4>
        <h4>{selected.model}</h4>
        <h5>{selected.price}</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, asperiores voluptatem iure veniam sint, ipsa id unde porro neque sunt placeat delectus nihil labore possimus facilis. Unde quaerat commodi fugit.</p>
      </div>
    </main>
  );
}
