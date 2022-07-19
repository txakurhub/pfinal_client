import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_wishlist_product, remove_wishlist_product } from "../redux/actions";
import { useHistory, Link } from "react-router-dom";
import { CartContext } from "../context/CartItem";
import { useAuth } from "../context/authContext";
import Loading from '../components/Loading'
const Wishlist = () => {
  const { userStorage } = useAuth() 
  const [id, setId] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();
  const wishlist = useSelector((state) => state.wishlist);
  const [order, setOrder] = useState('');
  const [loader, setLoader] = useState(true);
  const To = (props) => history.push('/' + props ? props : null);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    dispatch(get_wishlist_product(userStorage.uid)).then(() => setLoader(false));
  }, [dispatch]);

  const handleButton = (id) => {
    const dato = id;
    dispatch(remove_wishlist_product(dato, userStorage.uid));
    setOrder(dato);
  };
  if (loader === true) {
    return <Loading />;
  }
  return (

    <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
      <Link title="Home" className="flex items-center ease-in-out transition duration-500 text-black border-b border-transparent hover:border-black cursor-pointer absolute top-3 left-1" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <p className="text-sm pl-2 leading-none">Volver</p>
      </Link>
      <div className="flex flex-col jusitfy-start items-start">
        <p className="text-sm leading-4 text-gray-600">Inicio</p><p className="hidden">{order}</p>
        <h1 className="mt-3 text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Favoritos</h1>
        <p className="mt-4 text-2xl tracking-tight leading-6 text-gray-600">{wishlist.length === 1 ? 0 : null}{wishlist.length} elementos</p>
        <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-8">
          {
            wishlist.length > 0 &&
            wishlist.map(r => (
              <div className="flex flex-col" key={r.id}>
                <div className="relative">
                  <img className="hidden lg:block" src={r.Products[0].image} alt="bag" />
                  <img className="hidden sm:block lg:hidden" src={r.Products[0].image} alt="bag" />
                  <img className=" sm:hidden" src={r.Products[0].image} alt="bag" />
                  <button onClick={() => handleButton(r.id)} aria-label="close" className="top-0 right-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 text-white hover:text-gray-400">
                    <svg className="fil-current" width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="w-[90%] flex justify-center items-center">
                    <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 truncate">{r.Products[0].title}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <button aria-label="show menu" onClick={() => setId(id === r.id ? '' : r.id)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400">
                      <svg className={`fill-stroke ${id === r.id ? "block" : "hidden"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <svg className={`fill-stroke ${id === r.id ? "hidden" : "block"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div id={r.id} className={` flex-col jusitfy-start items-start mt-12 ${id === r.id ? "flex" : "hidden"}`}>
                  <p className="tracking-tight text-xs leading-3 text-gray-800">{r.Products[0].model}</p>
                  <p className="mt-2 tracking-tight text-base font-medium leading-4 text-gray-800">Color</p>
                  <p className="mt-6 tracking-tight text-base font-medium leading-4 text-gray-800">Tamaño</p>
                  <p className="mt-6 tracking-tight text-base font-medium leading-4 text-gray-800">${r.Products[0].price}</p>
                  <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full  space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                    <button onClick={() => To(`/detail/${r.Products[0].id}`)} className="w-full focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800  bg-white border border-gray-800">Más información</button>
                    <button onClick={() => addToCart(r.Products[0])} className="w-full focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2  text-white w-full tracking-tight py-4 text-lg leading-4  hover:bg-black bg-gray-800 border border-gray-800">Añadir al carrito</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Wishlist;