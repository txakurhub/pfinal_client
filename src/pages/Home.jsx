import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getCategories, getProducts } from "../redux/actions";
import Paginado from "../components/Paginado";
import PageHeading from "../components/PageHeading";
import FilterCategory from "../components/FilterCategory";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
import ShoppingCart from '../components/ShoppingCart'
// import NavBar from "../components/Navbar";
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
      <ShoppingCart />
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
<div>
          <button >
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM15 13H13V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V13H9C8.73479 13 8.48043 12.8946 8.2929 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.2929 11.2929C8.48043 11.1054 8.73479 11 9 11H11V9C11 8.73478 11.1054 8.48043 11.2929 8.29289C11.4804 8.10536 11.7348 8 12 8C12.2652 8 12.5196 8.10536 12.7071 8.29289C12.8946 8.48043 13 8.73478 13 9V11H15C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13Z" fill="#1F2937" />
          </svg>
          </button>
          </div>
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
