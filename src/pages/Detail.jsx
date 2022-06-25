import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getShoeDetail } from "../redux/actions";
import { Link } from 'react-router-dom'
import Review from "../components/Reviews"
import { CartContext } from "../context/CartItem";

// export default function Detail() {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const [loader, setLoader] = useState(true);
//   let selected = useSelector((state) => state.product_detail);
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     dispatch(getShoeDetail(params.id)).then(() => setLoader(false));
//   }, [dispatch, params.id]);

//   if (loader === true) {
//     return <div>Acá va un loader...</div>;
//   }
//   return (
//     <main>
//       <button><Link to={'/'}>volver</Link></button>
//       <div>
//         <img src={selected.image} alt={selected.title} />
//       </div>
//       <div>
//         <h2>{selected.title}</h2>
//         <h4>{selected.brand}</h4>
//         <h4>{selected.model}</h4>
//         <h5>{selected.price}</h5>
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, asperiores voluptatem iure veniam sint, ipsa id unde porro neque sunt placeat delectus nihil labore possimus facilis. Unde quaerat commodi fugit.</p>
//       </div>
//       <hr />
//       <div>
//         <button onClick={()=>addToCart(selected)}>Agregar al Carrito</button>
//       </div>
//       <div>
//         <Review id={selected.id}/> 
//       </div>
//     </main>
//   );
// }

const Detail = () => {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const [loader, setLoader] = useState(true);
  let selected = useSelector((state) => state.product_detail);
  const { addToCart } = useContext(CartContext);
  
  useEffect(() => {
    dispatch(getShoeDetail(params.id)).then(() => setLoader(false));
  }, [dispatch, params.id]);
  
  if (loader === true) {
    return <div>Acá va un loader...</div>;
  }

  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <Link title="Home" className="flex items-center ease-in-out transition duration-500 text-black border-b border-transparent hover:border-black cursor-pointer absolute top-3 left-1" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <p className="text-sm pl-2 leading-none">Back</p>
      </Link>
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img className="w-full mt-[100px]" alt="Not found" src={selected.image} />
      </div>
      <div className="md:hidden">
        <img className="w-full" alt="Not found" src={selected.image} />
      </div>
      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm leading-none text-gray-600">{selected.brand}</p>
          <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">{selected.title}</h1>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Colours</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600">Smoke Blue with red accents</p>
            <div className="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer" />
            <svg className="cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Size</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 mr-3">38.2</p>
            <svg className="cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700">
          <svg className="mr-3" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.66699 4.83333V4.84166" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.333 11.5V11.5083" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Check availability in store
        </button>
        <button onClick={() => addToCart(selected)} className="mt-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add to shopping cart
        </button>
        <p className="text-base leading-4 mt-7 text-gray-600">Product Model: {selected.model}</p>
        <div>
          <div className="border-t border-b py-4 mt-7 border-gray-200">
            <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
              <p className="text-base leading-4 text-gray-800">Shipping and returns</p>
              <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" aria-label="show or hide">
                <svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
              You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable
            </div>
          </div>
        </div>
        <div>
          <div className="border-b py-4 border-gray-200">
            <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
              <p className="text-base leading-4 text-gray-800">Reviews</p>
              <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" aria-label="show or hide">
                <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className={"text-base leading-normal mt-4 text-gray-600 " + (show2 ? "block" : "hidden")} id="sect">
              <Review id={selected.id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
