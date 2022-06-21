import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getProducts } from "../redux/actions";
import NavBar from '../components/NavBar'
import Paginado from "../components/Paginado";
import FilterPrice from '../components/FilterPrice'

export default function Home() {

  const dispatch = useDispatch();
  const [order, setOrder] = useState('')
  const products = useSelector((state) => state.allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productPage = 20;


  const indexOfLastProduct = currentPage * productPage

  const indexOfFirstProduct = indexOfLastProduct - productPage

  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <main>
      <section>
        <NavBar
          setCurrentPage={setCurrentPage} />
        <FilterPrice
          setCurrentPage={setCurrentPage}
          setOrder={setOrder}
          order={order} />
        <div>
          {currentProduct
            ? currentProduct.map((p) => (
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
          <Paginado
            productPorPage={productPage}
            product={products.length}
            paginado={paginate}
            pagina={currentPage}
          />
        </div>
      </section>
    </main>
  );
}
