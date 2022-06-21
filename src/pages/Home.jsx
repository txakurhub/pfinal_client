import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getCategories, getProducts } from "../redux/actions";
import NavBar from '../components/Navbar'
import Paginado from "../components/Paginado";
import FilterPrice from '../components/FilterPrice'
import PageHeading from "../components/PageHeading";
import FilterCategory from "../components/FilterCategory";

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
    dispatch(getCategories())
  }, [dispatch]);

  return (
    <>
  
      {/* <NavBar setCurrentPage={setCurrentPage} /> */}
      <FilterCategory/>
      { currentProduct ? <PageHeading products={products} setCurrentPage={setCurrentPage} setOrder={setOrder} order={order} /> : null }
      {
        currentProduct ?
        <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center px-[10px]">
          {currentProduct.map(r => <Card id={r.id} key={r.id} title={r.title} image={r.image} brand={r.brand} model={r.model} price={r.price} />)}
        </div> :
        "No hay nada"
      }
      <Paginado productPorPage={productPage} product={products.length} paginado={paginate} pagina={currentPage} />
    </>
  );
}

