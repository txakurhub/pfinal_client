import React, { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartItem";
import { Link } from "react-router-dom";

function PageShopingCart() {
  const [show, setShow] = useState(false);
  const { cartItem } = useContext(CartContext);
  const { deleteItemToCart, addToCart, deleteItemCantidad, sendMP } =
    useContext(CartContext);
  const total = cartItem.reduce(
    (previous, current) => previous + current.amount * current.price,
    0
  );

  const handleCheckout = (e) => {
    e.preventDefault();
    sendMP();
  };
  return (
    <>
      <div>
        {/* <div className="flex items-center justify-center py-8">
          <button onClick={() => setShow(!show)} className="py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white">
            Open Modal
          </button>
        </div>
        {show && ( */}
        <div
          className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
          id="chec-div"
        >
          <div
            className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="checkout"
          >
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div
                className="lg:w-[70%] w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                id="scroll"
              >
                <Link
                  className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                  to="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none">Back</p>
                </Link>
                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                  Bag
                </p>
                {cartItem.length === 0 ? (
                  <p className="mt-14">Tu carrito esta vacio</p>
                ) : (
                  cartItem.map((r) => (
                    <div
                      key={cartItem.indexOf(r)}
                      className="md:flex items-center mt-14 py-8 border-t border-gray-200"
                    >
                      <div className="w-1/4">
                        <img
                          src={r.image}
                          alt="Not found"
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4 opacity-0">
                          RF293
                        </p>
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base font-black leading-none text-gray-800 truncate">
                            {r.title}
                          </p>
                          {/* <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                              <option>01</option>
                              <option>02</option>
                              <option>03</option>
                            </select> */}

                            <button onClick={()=>deleteItemCantidad(r)}>
                            <svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="10" y1="29" x2="26" y2="29" stroke="#1F2937" stroke-width="2"/>
                            <line x1="30.0824" y1="6.24541" x2="24.8678" y2="29.1977" stroke="#1F2937" stroke-width="2"/>
                            <line x1="11.0249" y1="29.2216" x2="6.02487" y2="7.22162" stroke="#1F2937" stroke-width="2"/>
                            <line x1="18" y1="10" x2="18" y2="26" stroke="#1F2937" stroke-width="2"/>
                            <line x1="24.581" y1="10.2215" x2="20.9751" y2="26.093" stroke="#1F2937" stroke-width="2"/>
                            <line x1="14.6307" y1="26.093" x2="11.0248" y2="10.2216" stroke="#1F2937" stroke-width="2"/>
                            <line x1="5" y1="7" x2="5" y2="5" stroke="#1F2937" stroke-width="2"/>
                            <line x1="31.0001" y1="6.98799" x2="31.0238" y2="4.98813" stroke="#1F2937" stroke-width="2"/>
                            <line x1="22" y1="4" x2="22" y2="2" stroke="#1F2937" stroke-width="2"/>
                            <line x1="14" y1="5" x2="14" y2="2" stroke="#1F2937" stroke-width="2"/>
                            <g filter="url(#filter0_d_5_51)">
                            <path d="M4 7L32 7" stroke="#1F2937" stroke-width="2"/>
                            </g>
                            <line x1="4" y1="4" x2="32" y2="4" stroke="#1F2937" stroke-width="2"/>
                            <line x1="13" y1="1" x2="23" y2="1" stroke="#1F2937" stroke-width="2"/>
                            <defs>
                            <filter id="filter0_d_5_51" x="0" y="6" width="36" height="10" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5_51"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5_51" result="shape"/>
                            </filter>
                            </defs>
                            </svg>
                            </button>
                          </div>
                          <p className="text-xs leading-3 text-gray-600 pt-2 opacity-0">Height: 10 inches</p>
                          <p className="text-xs leading-3 text-gray-600 py-4 opacity-0">Color: Black</p>
                          <p className="w-96 text-xs leading-3 text-gray-600 opacity-0">Composition: 100% calf leather</p>
                          <div className="flex items-center justify-between pt-5 pr-6">
                            <div className="flex itemms-center">
                              {/* <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p> */}
                              <button>
                              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 21C11.8684 21.0008 11.7379 20.9755 11.6161 20.9258C11.4943 20.876 11.3834 20.8027 11.29 20.71L3.51999 12.93C2.54536 11.9452 1.99866 10.6156 1.99866 9.23C1.99866 7.84443 2.54536 6.51482 3.51999 5.53C4.50226 4.55051 5.83283 4.00047 7.21999 4.00047C8.60716 4.00047 9.93773 4.55051 10.92 5.53L12 6.61L13.08 5.53C14.0623 4.55051 15.3928 4.00047 16.78 4.00047C18.1672 4.00047 19.4977 4.55051 20.48 5.53C21.4546 6.51482 22.0013 7.84443 22.0013 9.23C22.0013 10.6156 21.4546 11.9452 20.48 12.93L12.71 20.71C12.6166 20.8027 12.5057 20.876 12.3839 20.9258C12.2621 20.9755 12.1316 21.0008 12 21Z" fill="#1F2937" />
                              </svg>
                              </button>
                              <button onClick={() => deleteItemToCart(r)}>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#1F2937"/>
                              <path d="M8.50016 11.1C7.88682 11.1 7.58016 10.7667 7.58016 10.1C7.59349 9.75333 7.68016 9.5 7.84016 9.34C8.00016 9.16667 8.22016 9.08 8.50016 9.08H12.5402C13.1402 9.08 13.4402 9.42 13.4402 10.1C13.4668 10.7667 13.1668 11.1 12.5402 11.1H8.50016Z" fill="#FFEFEF"/>
                              </svg>
                              </button>
                              <button  onClick={() => addToCart(r)}>
                              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM15 13H13V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V13H9C8.73479 13 8.48043 12.8946 8.2929 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.2929 11.2929C8.48043 11.1054 8.73479 11 9 11H11V9C11 8.73478 11.1054 8.48043 11.2929 8.29289C11.4804 8.10536 11.7348 8 12 8C12.2652 8 12.5196 8.10536 12.7071 8.29289C12.8946 8.48043 13 8.73478 13 9V11H15C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13Z" fill="#1F2937" />
                              </svg>
                              </button>
                            </div>
                            <div className="flex items-center">
                              <p className="text-xs leading-3 text-gray-600 pr-2">Amount {(r.amount * r.price) / r.price}</p>
                              <p className="text-base font-black leading-none text-gray-800">${r.amount * r.price}</p>
                            </div>
=======
                          <button onClick={() => deleteItemCantidad(r)}>
                            {" "}
                            Remove All
                          </button>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 pt-2 opacity-0">
                          Height: 10 inches
                        </p>
                        <p className="text-xs leading-3 text-gray-600 py-4 opacity-0">
                          Color: Black
                        </p>
                        <p className="w-96 text-xs leading-3 text-gray-600 opacity-0">
                          Composition: 100% calf leather
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex itemms-center">
                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                              Add to favorites
                            </p>
                            <p
                              onClick={() => deleteItemToCart(r)}
                              className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                            >
                              Remove
                            </p>
                            <p
                              onClick={() => addToCart(r)}
                              className="text-xs leading-3 underline text-blue-800 pl-5 cursor-pointer"
                            >
                              Add more
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-xs leading-3 text-gray-600 pr-2">
                              Amount {(r.amount * r.price) / r.price}
                            </p>
                            <p className="text-base font-black leading-none text-gray-800">
                              ${r.amount * r.price}
                            </p>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">
                      Summary
                    </p>
                    <div className="flex items-center justify-between pt-16 opacity-0">
                      <p className="text-base leading-none text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        $9,000
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5 opacity-0">
                      <p className="text-base leading-none text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        $30
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-5 opacity-0">
                      <p className="text-base leading-none text-gray-800">
                        Tax
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        $35
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">
                        Total
                      </p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                        ${total}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleCheckout(e)}
                      className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
}

export default PageShopingCart;
