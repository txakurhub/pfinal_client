import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartItem";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import swal2 from 'sweetalert2'
import PayPal from "../components/PayPal";
import mercadopago from "../assets/mercadopago.png"


function PageShopingCart() {
  const { user } = useAuth();
  const history = useHistory()
  // const [show, setShow] = useState(false);
  const { cartItem } = useContext(CartContext);
  const { deleteItemToCart, deleteItemCantidad, sendMP, deleteTotal, addToCart2, generateQr } =
    useContext(CartContext);
  const total = cartItem.reduce(
    (previous, current) => previous + current.amount * current.price,
    0
  );
    // const { id } = useParams();
   const product = {
    price: Math.round((total * 0.0079)),
  }

  /*const product = cartItem.map((e) => {
    return {
      id: e.id,
      title: e.title,
      description: `${e.title}, ${e.brand}, ${e.model}`,
      picture_url: e.image,
      category_id: e.category,
      quantity: e.amount,
      unit_price: e.price,
    };
  });
   */
  const handleBack = (e) => {
    e.preventDefault()
    history.push("/")
    window.location.reload()
  }   
  
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (user) {
      if(user.emailVerified){
         const linkMP = await sendMP()
          const QR = await generateQr(linkMP)
        swal2.fire({
          text: "Serás redirigido/a al método de pago, ¡gracias por la compra!",
          icon: "success",
          text2: "Pagar con QR",
          imageUrl: `${QR}`,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Ir al link',
          cancelButtonText: 'Cancelar',
          // dangerMode: true,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.open(linkMP, '_blank');
                history.push('/')
                localStorage.clear()
                window.location.reload()
            swal2.fire('Saved!', '', 'success')
          } else if (result.isDenied) {
              swal("Su pago no fue completado");
          }
        })}else{
        swal({
          text: "Lo siento! Necesitas verificar tu email para continuar.",
          icon: "warning",
          dangerMode: true,
          
        }).then(res =>
          history.push(`/user/profile/${user.uid}`)
        )
      }
    } else {
      history.push('/login')
    }
  };

  return (
    <>
      <div>
        <div 
        // className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div"
        >
          <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div className="lg:w-[70%] w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                <button className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" onClick={handleBack}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none">Volver</p>
                </button>
                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Carrito</p>
                {
                  cartItem.length === 0 ?
                    <p className="mt-14">Tu carrito está vacío</p> :
                    cartItem.map((r) => (
                      <div key={cartItem.indexOf(r)} className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                        <div className="w-1/4">
                          <img src={r.image} alt="Not found" className="w-full h-full object-center object-cover" />
                        </div>
                        <div className="md:pl-3 md:w-3/4">
                          <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4 opacity-0">RF293</p>
                          <div className="flex items-center justify-between w-full pt-1">
                            <p className="text-base font-black leading-none text-gray-800 truncate">{r.title}</p>
                            <button title="Eliminar producto de la bolsa" onClick={() => deleteItemCantidad(r)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-xs leading-3 text-gray-600 pt-2 opacity-0">Height: 10 inches</p>
                          <p className="text-xs leading-3 text-gray-600 py-4 opacity-0">Color: Black</p>
                          <p className="w-96 text-xs leading-3 text-gray-600 opacity-0">Composition: 100% calf leather</p>
                          <div className="flex items-center justify-between pt-5 pr-6">
                            <button title="Agregar a favoritos">
                            </button>
                            <div className="flex items-center">
                              <button title="Eliminar un elemento" onClick={() => deleteItemToCart(r)} className="pl-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                </svg>
                              </button>
                              <p className="pl-4 font-semibold">{(r.amount * r.price) / r.price}</p>
                              <button title="Agregar un elemento" onClick={() => addToCart2(r)} className="pl-4 pr-6">
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
                    <p className="text-4xl font-black leading-9 text-gray-800">Resumen</p>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">Total</p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">${total}</p>
                    </div>
                    <button onClick={(e) => handleCheckout(e)} disabled={!cartItem.length} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                      Comprar
                    </button>
                    {user && (user.emailVerified && <div>
                      <div className="w-full flex items-center justify-between py-5">
                      <hr className="w-full bg-gray-400" />
                      <p className="text-base font-medium leading-4 px-2.5 text-gray-400">Ó</p>
                      <hr className="w-full bg-gray-400  " />
                    </div>
                    <PayPal product={product}/>
                    </div>
                    ) }
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
