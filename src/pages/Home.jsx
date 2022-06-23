import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getCategories, getProducts } from "../redux/actions";
import Paginado from "../components/Paginado";
import PageHeading from "../components/PageHeading";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
import NavBar from "../components/Navbar";
// import FilterCategory from "../components/FilterCategory";
// import ShoppingCart from '../components/ShoppingCart';
// import FilterPrice from "../components/FilterPrice";
// import { CartContext } from "../context/CartItem";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { user, logout, loading } = useAuth();
  const products = useSelector((state) => state.allProducts);
  const productPage = 20;
  // const {addToCart} = useContext(CartContext)
  const indexOfLastProduct = currentPage * productPage;
  const indexOfFirstProduct = indexOfLastProduct - productPage;
  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleLogin = () => history.push("/login");
  
  const handleLogout = async () => {
    try {
      await logout();
      history.push("/");
    } catch (error) {
      console.log(error);
    };
  };
    
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);
  
  return (
    <>
      <NavBar setCurrentPage={setCurrentPage} loading={loading} user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
      {
        currentProduct ?
        <PageHeading products={products} setCurrentPage={setCurrentPage} setOrder={setOrder} order={order} /> : 
        null
      }
      {
        currentProduct ?
        <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center px-[10px]">
          {
            currentProduct.map((r) => 
              <Card id={r.id} key={r.id} title={r.title} image={r.image} brand={r.brand} model={r.model} price={r.price} product={r} />
            )
          }
        </div> : 
        "No hay nada"
      }
      <Paginado productPorPage={productPage} product={products.length} paginado={paginate} pagina={currentPage} />
    </>
  );
}
