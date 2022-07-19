import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import {
  getAllCategoryAdmin,
  getCategories,
  getProductosDestacados,
  getProducts,
  getUser,
  getUsers,
  orderStatus
} from "../redux/actions";
import Paginado from "../components/Paginado";
import PageHeading from "../components/PageHeading";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
import NavBar from "../components/Navbar";
import ProductosDestacados from "../components/ProductosDestacados";
import { Carrousel } from "../components/Carrousel";
// import ShoppingCart from '../components/ShoppingCart';
// import { CartContext } from "../context/CartItem";
import QuickView from "../components/QuickView";
import Modal from "../components/Modal";
import FilterPrice from "../components/FilterPrice";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState("");
  const [active, setActive] = useState(false);
  const [product, setProduct] = useState();
  const toggle = () => setActive(!active);
  const onClick = (r) => setId(r);
  const { user, logout, loading , userStorage } = useAuth();
  const currentUser = useSelector(state => state.user)
  const nombreProductos = useSelector((state) => state.allProductsName);
  const products = useSelector((state) => state.allProducts);
  const productDestacados = useSelector((state) => state.productosDestacados);
  const productPage = 20;
  const indexOfLastProduct = currentPage * productPage;
  const indexOfFirstProduct = indexOfLastProduct - productPage;
  const sinStock = 'SIN STOCK';
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const [show, setShow] = useState(false);
  let classCol = show ? "col-span-3" : "col-span-4";
  let gridCols = show ? 'grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3' : 'grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4 xl:grid-cols-4'
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogin = () => history.push("/login");

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      window.location.reload();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getUsers());
    dispatch(getAllCategoryAdmin());
    dispatch(orderStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!productDestacados.length) {
      dispatch(getProductosDestacados());
    }
    if (!currentUser) {
      if(user){
        dispatch(getUser(user.uid))
      }
    }
  }, [dispatch]);

  return (
    <section className="bg-gray-200">
      <NavBar
        admin={userStorage &&userStorage.admin} // use el localstorage porque sino renderiza el "Admin" 
        nombreProductos={nombreProductos}
        setCurrentPage={setCurrentPage}
        loading={loading}
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <Carrousel />

      <section className="flex justify-around mt-6">
        <button onClick={() => setShow(show === false ? true : false)} className="hover:text-gray-500 text-gray-600 bg-gray-100 py-3.5 px-3 rounded-sm flex flex-row justify-center items-center space-x-3">     <svg className="fill-stroke" width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 14.6452V9.33875" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 6.30645V1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 14.6452V7.82263" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 4.79032V1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 14.6452V10.8549" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 7.82258V1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 9.33875H7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 4.79028H15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 10.8549H23" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
          <p className="hidden md:block text-sm leading-none">Filtros</p></button>
        <div className="flex flex-col ">
          <div className="mt-2 flex flex-col  space-x-3">
            <p className="text-2xl font-semibold leading-normal text-gray-800">Zapatillas</p>
            <p className="text-base leading-4 text-gray-600 mt-2">(20 productos de {products.length})</p>
          </div>
        </div>
        <FilterPrice
          setCurrentPage={setCurrentPage}
          setOrder={setOrder}
          order={order} />
      </section>
      <section className="grid grid-flow-row-dense grid-cols-4 ">

        {currentProduct && show ? (
          <article className="col-span-1">

            <PageHeading
              products={products}
              setCurrentPage={setCurrentPage}
              setOrder={setOrder}
              order={order}
            />
          </article>



        ) : (<article className="col-span-0">

        </article>)}


        <article className={classCol}>
          {
            currentProduct ?
              <div className="bg-gray-200">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
  
                  <div className={gridCols}>
                    {
                      currentProduct.map((r) =>
                        r.stock === 0 ?
                          <Card setProduct={setProduct} toggle={toggle} onClick={onClick} id={r.id} key={r.id} title={r.title} image={r.image} brand={r.brand} model={r.model} price={r.price} product={r} stock={r.stock} sold={r.sold} wishlist={r.wishlist} sinStock={sinStock} /> :
                          <Card setProduct={setProduct} toggle={toggle} onClick={onClick} id={r.id} key={r.id} title={r.title} image={r.image} brand={r.brand} model={r.model} price={r.price} product={r} stock={r.stock} sold={r.sold} wishlist={r.wishlist} />
                      )
                    }
                  </div>
                </div>
              </div> :
              <h1>No hay productos</h1>
          }
        </article>

      </section>

      {currentProduct ? <Paginado productPorPage={productPage} product={products.length} paginado={paginate} pagina={currentPage} setPagina={setCurrentPage} /> : null}
      <section className="bg-gray-100">
      <h2 className="mt-4 mb-6 ml-5 text-2xl font-semibold leading-normal text-gray-800 flex justify-center">Productos Destacados</h2>
      <ProductosDestacados setProduct={setProduct} toggle={toggle} onClick={onClick} />
      <Modal active={active} toggle={toggle} children={<QuickView id={id} product={product} />} />

      </section>
    </section>
  );
}
