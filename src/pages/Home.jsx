import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getProducts } from "../redux/actions";
import NavBar from '../components/NavBar'

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <main>
      <section>
        <NavBar />
        <div>
          {products
            ? products.map((p) => (
                <Card
                  id={p.id}
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
