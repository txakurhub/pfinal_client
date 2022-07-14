import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // clearStateDetail,
  create_new_wishlist,
  filter_get_wishlist_product,
  getPictures,
  getShoeDetail,
  getUsers,
  // getStock,
  remove_wishlist_product,
} from "../redux/actions";
import { Link, useParams } from "react-router-dom";
import {ReviewsDetail} from "../components/ReviewsDetail";
import { CartContext } from "../context/CartItem";
import { SlideDetail } from "../components/SlideDetail";
import { useAuth } from "../context/authContext";
import Loading from "../components/Loading";
import swal from "sweetalert";

const Detail = () => {
  const { user } = useAuth()
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const [loader, setLoader] = useState(true);
  let selected = useSelector((state) => state.product_detail);
  const wishlist = useSelector((state) => state.wishlist);
  const counter = useSelector((state) => state.counterwishlist);
  const [order, setOrder] = useState('')
  let stock = useSelector((state) => state.stockShoes)


  const pictures = useSelector((state) => state.pictures);
  const { addToCart } = useContext(CartContext);
  const numberFormat = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      currencyDisplay: "symbol",
    }).format(value);

  useEffect(() => {
    dispatch(getShoeDetail(params.id)).then(() => setLoader(false));
    dispatch(getPictures(params.id))
    if (user) {
      dispatch(filter_get_wishlist_product({ id: user.uid, product: params.id }));
    }
    // dispatch(getStock(params.id))
    //   return () => {
    //     dispatch(clearStateDetail())
    // } // Esto hacía que a la hora de restaurar la página aparezca por unos milisegundos img not found,
    // por eso lo comenté
  }, [dispatch, counter]);


  const handleaddwishlist = (e) => {
    e.preventDefault();
    if (!user) {
      swal("Debes estar registrado para poder agregar este producto a favoritos")
    } else {
      dispatch(create_new_wishlist({ user_id: user.uid, product_id: params.id }))
    }
  }
  const handledeltewishlist = (e) => {
    e.preventDefault();
    if (!user) {
      alert("error")
    } else {
      const fil = selected.wishlists.filter(f => f.userId === user.uid)
      dispatch(remove_wishlist_product(fil[0].id, user.uid))
    }

  }
  if (loader === true) {
    return <Loading />
  }
  

  return (
    <div >
      <section className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        <Link
          title="Home"
          className="flex items-center ease-in-out transition duration-500 text-black border-b border-transparent hover:border-black cursor-pointer absolute top-3 left-1"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-left"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="15 6 9 12 15 18" />
          </svg>
          <p className="text-sm pl-2 leading-none">Volver</p>
          <p className="hidden">{order}</p>
        </Link>
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden relative">
          {
            counter > 0 ?
              <button title="Add to Wishlist" className="absolute top-[10px] left-[10px]" value={wishlist.id} name="id" onClick={(e) => handledeltewishlist(e)}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z" fill="#ff0000" />
                </svg>
              </button> :
              <button title="Remove of the Wishlist" className="absolute top-[10px] left-[10px]" value={selected.id} name="id" onClick={(e) => handleaddwishlist(e)}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z" fill="#1F2937" />
                </svg>
              </button>
          }
          <img className="w-full" src={selected.image} />
          {pictures[1] && <img className="mt-6 w-full" src={pictures[1]} />}
        </div>
        <div className="md:hidden relative">
          {
            counter > 0 ?
              <button title="Add to Wishlist" className="absolute top-[10px] left-[10px]" value={wishlist.id} name="id" onClick={(e) => handledeltewishlist(e)}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z" fill="#ff0000" />
                </svg>
              </button> :
              <button title="Remove of the Wishlist" className="absolute top-[10px] left-[10px]" value={selected.id} name="id" onClick={(e) => handleaddwishlist(e)}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z" fill="#1F2937" />
                </svg>
              </button>
          }
          <img className="w-full" alt="img of a girl posing" src={selected.image} />
          <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
            {pictures[1] && <img alt="img-tag-one" className="md:w-48 md:h-48 w-[100px]" src={pictures[1]} />}
            {pictures[2] && <img alt="img-tag-one" className="md:w-48 md:h-48 w-[100px]" src={pictures[2]} />}
            {pictures[3] && <img alt="img-tag-one" className="md:w-48 md:h-48 w-[100px]" src={pictures[3]} />}
            {pictures[4] && <img alt="img-tag-one" className="md:w-48 md:h-48 w-[100px]" src={pictures[4]} />}
          </div>
        </div>
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600">
              {selected.brand}
            </p>
            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
              {selected.title}
            </h1>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Tamaño</p>
            <p>Stock: {selected.stock}</p>
            <p>Vendidas: {selected.sold}</p>
            <p>Precio: {numberFormat(selected.price)}</p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 mr-3">Talle: 38.2</p>
              <svg
                className="cursor-pointer"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L1 9"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {selected.stock ?
            <button
              onClick={() => addToCart(selected)}
              disabled={selected.stock === 0}
              className="mt-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>

              <p>Añadir al Carrito</p>
            </button> : (
              <button
                onClick={() => addToCart(selected)}
                disabled={selected.stock === 0}
                className="mt-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-red-600 w-full py-4 hover:bg-red-800"
              >

                <p className="text-white">Sin Stock</p>
              </button>
            )}
          <p className="text-base leading-4 mt-7 text-gray-600">
            Modelo del producto: {selected.model}
          </p>
          <div>
            <div className="border-t border-b py-4 mt-7 border-gray-200">
              <div
                onClick={() => setShow(!show)}
                className="flex justify-between items-center cursor-pointer"
              >
                <p className="text-base leading-4 text-gray-800">
                  Envíos y devoluciones
                </p>
                <button
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded"
                  aria-label="show or hide"
                >
                  <svg
                    className={
                      "transform " + (show ? "rotate-180" : "rotate-0")
                    }
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L5 5L1 1"
                      stroke="#4B5563"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={
                  "pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
                  (show ? "block" : "hidden")
                }
                id="sect"
              >
                Usted será responsable de pagar sus propios costos de envío para devolver su artículo. Los gastos de envío no son reembolsables.
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReviewsDetail user={user} id={selected.id} />
      {/* <SlideDetail /> */}
    </div>
  );
};

export default Detail;