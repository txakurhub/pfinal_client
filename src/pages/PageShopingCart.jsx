import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartItem";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert';

function PageShopingCart() {
  // const [show, setShow] = useState(false);
  const { cartItem } = useContext(CartContext);
  const { deleteItemToCart, deleteItemCantidad, sendMP, deleteTotal , addToCart2 } =
    useContext(CartContext);
  const total = cartItem.reduce(
    (previous, current) => previous + current.amount * current.price,
    0
  );
  const { user } = useAuth();
  const history = useHistory()

  const handleCheckout = async (e) => {
    e.preventDefault();
    const linkMP = await sendMP()
    if (user) {
      swal({
        text: "Will be redirected to the payment method, thank you for the purchase!",
        icon: "success",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            window.open(linkMP, '_blank');
            history.push('/')
            localStorage.clear()
            window.location.reload()
          } else {
            swal("Your payment was not completed");
          }
        });
    } else {
      history.push('/login')
    }
  };
  return (
    <>
      <div>
        <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
          <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div className="lg:w-[70%] w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                <Link className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none">Back</p>
                </Link>
                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bag</p>
                {
                  cartItem.length === 0 ?
                    <p className="mt-14">Tu carrito esta vacio</p> :
                    cartItem.map((r) => (
                      <div key={cartItem.indexOf(r)} className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                        <div className="w-1/4">
                          <img src={r.image} alt="Not found" className="w-full h-full object-center object-cover" />
                        </div>
                        <div className="md:pl-3 md:w-3/4">
                          <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4 opacity-0">RF293</p>
                          <div className="flex items-center justify-between w-full pt-1">
                            <p className="text-base font-black leading-none text-gray-800 truncate">{r.title}</p>
                            <button title="Delete product from the bag" onClick={() => deleteItemCantidad(r)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-xs leading-3 text-gray-600 pt-2 opacity-0">Height: 10 inches</p>
                          <p className="text-xs leading-3 text-gray-600 py-4 opacity-0">Color: Black</p>
                          <p className="w-96 text-xs leading-3 text-gray-600 opacity-0">Composition: 100% calf leather</p>
                          <div className="flex items-center justify-between pt-5 pr-6">
                            <button title="Add to favorites">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:fill-red-500" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <div className="flex items-center">
                              <button title="Delete one item" onClick={() => deleteItemToCart(r)} className="pl-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                </svg>
                              </button>
                              <p className="pl-4 font-semibold">{(r.amount * r.price) / r.price}</p>
                              <button title="Add one item more" onClick={() => addToCart2(r)} className="pl-4 pr-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                              <p title="Total" className="text-base font-black leading-none text-gray-800">${r.amount * r.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                }
              </div>
              <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                    <div className="flex items-center justify-between pt-16 opacity-0">
                      <p className="text-base leading-none text-gray-800">Subtotal</p>
                      <p className="text-base leading-none text-gray-800">$9,000</p>
                    </div>
                    <div className="flex items-center justify-between pt-5 opacity-0">
                      <p className="text-base leading-none text-gray-800">Shipping</p>
                      <p className="text-base leading-none text-gray-800">$30</p>
                    </div>
                    <div className="flex items-center justify-between pt-5 opacity-0">
                      <p className="text-base leading-none text-gray-800">Tax</p>
                      <p className="text-base leading-none text-gray-800">$35</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">Total</p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">${total}</p>
                    </div>
                    <button onClick={(e) => handleCheckout(e)} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                      Checkout
                    </button>
                    <button onClick={() => deleteTotal()} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                      Empty Cart
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-5 opacity-0">
                    <p className="text-base leading-none text-gray-800">Tax</p>
                    <p className="text-base leading-none text-gray-800">$35</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageShopingCart;
