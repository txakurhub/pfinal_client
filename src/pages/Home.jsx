import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Card from "../components/Card";
import { getProducts } from "../redux/actions";

export default function Home() {
const history = useHistory()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  console.log(products);
  function handleClick(e){
    e.preventDefault()
    history()
  }

  return (
    <main>
      <section>
        <div>
          {products
            ? products.map((p) => (
                <Card
                onClick={handleClick}
                key={p.id}
                  title={p.title}
                  image={p.image}
                  brand={p.brand}
                  model={p.model}
                  price={p.price}
                />
              ))
            : "No hay nada"}
        </div>
      </section>
    </main>
  );
}
