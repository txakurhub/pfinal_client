import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { getCategories, getProductosDestacados, getProducts } from "../redux/actions";
import Paginado from "../components/Paginado";
import PageHeading from "../components/PageHeading";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
import NavBar from "../components/Navbar";
import { ProductosDestacados } from "../components/ProductosDestacados";
import { Carrousel } from "../components/Carrousel";
// import ShoppingCart from '../components/ShoppingCart';
// import { CartContext } from "../context/CartItem";
import QuickView from "../components/QuickView";
import Modal from "../components/Modal";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState('');
  const [active, setActive] = useState(false);
  const [product, setProduct] = useState();
  const toggle = () => setActive(!active);
  const onClick = (r) => setId(r);
  const { user, logout, loading } = useAuth();
  const nombreProductos = useSelector(state => state.allProductsName);
  const products = useSelector((state) => state.allProducts);
  const productDestacados = useSelector((state)=> state.productosDestacados);
  const productPage = 20;
  const indexOfLastProduct = currentPage * productPage;
  const indexOfFirstProduct = indexOfLastProduct - productPage;
  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
console.log(user);
  const handleLogin = () => history.push("/login");

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear()
      window.location.reload()
      history.push("/");
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() =>{
    if(!productDestacados.length){
      dispatch(getProductosDestacados())
    }
  },[dispatch, productDestacados])

  return (
    <>
      <NavBar nombreProductos={nombreProductos} setCurrentPage={setCurrentPage} loading={loading} user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
      <Carrousel />
      {
        currentProduct ?
          <PageHeading products={products} setCurrentPage={setCurrentPage} setOrder={setOrder} order={order} /> :
          null
      }
      {
        currentProduct ?
          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3  gap-x-8 gap-y-8 items-center px-[10px]">
            {
              currentProduct.map((r) =>
                r.stock !== 0 && <Card setProduct={setProduct} toggle={toggle} onClick={onClick} id={r.id} key={r.id} title={r.title} image={r.image} brand={r.brand} model={r.model} price={r.price} product={r} stock={r.stock} sold={r.sold} wishlist={r.wishlist} />
              )
            }
          </div> :
          "Nothing"
      }
      <h2 className="mt-10 ml-5 text-2xl font-semibold leading-normal text-gray-800 flex justify-start">Productos Destacados</h2>
      <div className="mt-3 grid md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3  gap-x-8 gap-y-8 items-center px-[10px]">
        {
          productDestacados?.map((r)=>(
            r.stock !== 0 && <Card setProduct={setProduct} toggle={toggle} onClick={onClick} id={r.id} key={r.id} title={r.title} image={r.image} brand={r.brand} model={r.model} price={r.price} product={r} stock={r.stock} sold={r.sold} wishlist={r.wishlist} />
          ))
        }
      </div>
      {currentProduct ? <Paginado productPorPage={productPage} product={products.length} paginado={paginate} pagina={currentPage} setPagina={setCurrentPage} /> : null}
      <Modal active={active} toggle={toggle} children={<QuickView id={id} product={product} />} />
    </>
  );
};
