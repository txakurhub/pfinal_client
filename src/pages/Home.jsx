import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getCategories, getProducts } from "../redux/actions";
import NavBar from "../components/Navbar";
import Paginado from "../components/Paginado";
import FilterPrice from "../components/FilterPrice";
import PageHeading from "../components/PageHeading";
import FilterCategory from "../components/FilterCategory";

import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
import ShoppingCart from '../components/ShoppingCart'
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
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);
  const handleLogout = async () => {
    try {
      await logout();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <>
      {/* <NavBar setCurrentPage={setCurrentPage} /> */}
      {loading ? (
        <div>
          <h4>Loading...</h4>
        </div>
      ) : user ? (
        <div>
          <h4>Welcome {user.email}</h4>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      <FilterCategory />
          <ShoppingCart/>
      {currentProduct ? (
        <PageHeading
          products={products}
          setCurrentPage={setCurrentPage}
          setOrder={setOrder}
          order={order}
        />
      ) : null}
      {currentProduct ? (
        <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center px-[10px]">
          {currentProduct.map((r) => (
            <Card
              id={r.id}
              key={r.id}
              title={r.title}
              image={r.image}
              brand={r.brand}
              model={r.model}
              price={r.price}
              product={r}
            />
          ))}
        </div>
      ) : (

        "No hay nada"
      )}
      <Paginado
        productPorPage={productPage}
        product={products.length}
        paginado={paginate}
        pagina={currentPage}
      />
    </>
  );
}

