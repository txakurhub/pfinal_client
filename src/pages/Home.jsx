import React, {useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getProducts } from "../redux/actions";
import NavBar from '../components/Navbar'
import Paginado from "../components/Paginado";
import {CartContext} from '../components/CartItem'
import ShoppingCart from "./ShoppingCart";


export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productPage = 20;
  
  const indexOfLastProduct = currentPage * productPage 
  
  const indexOfFirstProduct = indexOfLastProduct - productPage
  
  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct)
  
  const paginate = pageNumber =>{
    setCurrentPage(pageNumber)
  }
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  
  const {addToCart} = useContext(CartContext)
  return (
    <main>
      <section>
        <NavBar />
        <ShoppingCart/>
        <div>
          {currentProduct
            ? currentProduct.map((p) => (
              <div>
                <Card
                  id={p.id}
                  key={p.id}
                  title={p.title}
                  image={p.image}
                  brand={p.brand}
                  model={p.model}
                  price={p.price}
                />
                  <button onClick={()=> addToCart(p)}>Add To Cart</button>
              </div>
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
