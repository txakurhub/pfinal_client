import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getOrderProducts } from "../redux/actions";
import Reviews from '../components/Reviews'
import userimg from "../assets/user.png"

const Shopping = ({ email }) => {
  const { userStorage } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  // const [loader, setLoader] = useState(true);
  const ProductOrder = useSelector((state) => state.orderProduct);

  const numberFormat = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      currencyDisplay: "symbol",
    }).format(value);

  useEffect(() => {
    // if (!ProductOrder.length) {
      dispatch(getOrderProducts(email));
    // }
  }, [dispatch]); 
  
  const total = ProductOrder?.map(r => r.amount).reduce((a, b) => a + b, 0);
  const compras = ProductOrder?.map(r => r.Products.length).reduce((a, b) => a + b, 0);

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          {
            ProductOrder?.length > 0 ?
            ProductOrder.map((r, index) => (
              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <span className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 flex">Órden #{r.id.length > 2 ? r.id : '0' + r.id} -
                  <p className="text-base font-medium leading-6 text-gray-600 ml-1 capitalize">
                    {r.order_date.split("-").join("/").slice(0, 10)} - {r.Products.length > 2 ? r.Products.length + ' productos' : r.Products.length + ' producto'} | {r.order_status}
                  </p>
                  {
                    (r.order_status !== 'Completada' && r.order_status !== "realizada") &&
                    <a href="/cart" title="Ir al carrito" className="cursor-pointer dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">: Pagar ahora</a>
                  }
                </span>
                {
                  r.Products.map(p => (
                    <div>
                    <a title="Ver detalles" href={`/detail/${p.id}`}>
                      <div className="mt-4 md:mt-6 flex hover:bg-gray-100 flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                        <div className="pb-4 md:pb-8 w-full md:w-auto">
                          <img className="hidden md:block h-[144px]" src={p.image} alt="Zapateiro" />
                          <img className="md:hidden h-[144px] m-auto" src={p.image} alt="Zapateiro" />
                        </div>
                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-xl xl:text-2xl text-start w-full lg:w-[320px] font-semibold leading-6 text-gray-800 truncate">{p.title}</h3>
                            <div className="flex justify-start items-start flex-col space-y-2">
                              <p className="text-sm leading-none text-gray-800">
                                <span className="text-gray-300">Marca: </span> {p.brand}
                              </p>
                              <p className="text-sm leading-none text-gray-800">
                                <span className="text-gray-300">Modelo: </span> {p.model}
                              </p>
                              <p className="text-sm leading-none text-gray-800">
                                <span className="text-gray-300">Categoría: </span> {p.category}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between space-x-8 items-start w-full">
                            <p className="text-base xl:text-lg leading-6 opacity-0">
                              $36.00 <span className="text-red-300 line-through"> $45.00</span>
                            </p>
                            <p className="text-base xl:text-lg leading-6 text-gray-800 opacity-0">{r.id.length > 2 ? r.id : '0' + r.id}</p>
                            <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">{numberFormat(p.price)}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div>
                    {r.order_status === 'realizada' && <Reviews className="w-screen bg-gray-100 " user={userStorage} id={p.id} />}
                    </div>
                    </div>
                  ))
                }
              </div>
            )) :
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <span className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 flex">No tienes registro de compras</span>
            </div>
          }
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Resumen</h3>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                <p className="text-base font-semibold leading-4 text-gray-600">{numberFormat(total)}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Seguir comprando</h3>
              <div className="w-full flex justify-center items-center">
                <a href="/" className="w-full">
                  <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">Ver más</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">Usuario</h3>
          <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img className="h-[56px] w-[56px]" src={userStorage.image !== ""? userStorage.image : userStorage.photoURL ? userStorage.photoURL : userimg} alt="avatar" />
                <div className=" flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">{userStorage.firstname !== "" ? userStorage.firstname + " " + userStorage.lastname : userStorage.displayName !== "" ? userStorage.displayName : "No nombre"}</p>
                  <p className="text-sm leading-5 text-gray-600">{compras} órdenes</p>
                </div>
              </div>
              <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="cursor-pointer text-sm leading-5 text-gray-800">{userStorage.email}</p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0 opacity-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                </div>
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                </div>
              </div>
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                <a href="/">
                  <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Edit Details</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
