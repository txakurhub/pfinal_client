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
// import ShoppingCart from '../components/ShoppingCart';
// import { CartContext } from "../context/CartItem";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { user, logout, loading } = useAuth();
  const nombreProductos = useSelector(state => state.allProductsName);
  const products = useSelector((state) => state.allProducts);
  const productDestacados = useSelector((state)=> state.productosDestacados)
  const productPage = 20;
  const indexOfLastProduct = currentPage * productPage;
  const indexOfFirstProduct = indexOfLastProduct - productPage;
  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

                r.stock !== 0 && <Card id={r.id} key={r.id} title={r.title} image={r.image} brand={r.brand} model={r.model} price={r.price} product={r} stock={r.stock} sold={r.sold} wishlist={r.wishlist} />

              )
            }
          </div> :
          "Nothing"
      }
     <h2>Productos Destacados</h2>
      {
        productDestacados?.map((r)=>(
          r.stock !== 0 &&<ProductosDestacados title={r.title} image={r.image} brand={r.brand} model={r.model} />
        ))
      }
      <Paginado productPorPage={productPage} product={products.length} paginado={paginate} pagina={currentPage} setPagina={setCurrentPage} />
    </>
  );
}
