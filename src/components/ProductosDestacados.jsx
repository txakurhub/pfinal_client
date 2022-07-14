import React, { useEffect, useState, useRef } from "react";
import { getProductosDestacados } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import FeaturedCards from "./FeaturedCards";

export const ProductosDestacados = ({setProduct,toggle,onClick}) => {
  const slideRef = useRef();
  const productDestacados = useSelector((state) => state.productosDestacados);
  const dispatch = useDispatch();
  const [inicio, setInicio] = useState(0);
  const [final, setFinal] = useState(4);

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };
  useEffect(() => {
    if (!productDestacados.length) {
      dispatch(getProductosDestacados());
    }
  }, []);
  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    //   startSlider();
  }, []);
  const imagesArr = productDestacados?.map((s) => s.image).slice(0,20);

  const handleNext = () => {
    if (final >= imagesArr.length - 1) {
      setInicio(0);
      setFinal(3);
    } else {
      setInicio(inicio+1);
      setFinal(final+1);
    }
    slideRef.current.classList.add("fade-anim");
  };

  const handlePrev = () => {
    if (inicio <= 0) {
        setInicio(imagesArr.length-5);
        setFinal(imagesArr.length-1);
      } else {
        setInicio(inicio-1);
        setFinal(final-1);
      }
      slideRef.current.classList.add("fade-anim");
  };

  return (
    // <div className="mt-3 grid md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3  gap-x-8 gap-y-8 items-center px-[10px]">
    <div  ref={slideRef}
    className="w-full  select-none relative flex flex-row justify-center">
      
            <div className="aspect-w-16 aspect-h-9 flex flex-row">
        <button onClick={handlePrev}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
        </button>
        
          {
        productDestacados?.map((r)=>(

          r.stock !== 0 && <FeaturedCards  setProduct={setProduct} toggle={toggle} onClick={onClick} id={r.id} key={r.id} title={r.title} image={r.image} brand={r.brand} model={r.model} price={r.price} product={r} stock={r.stock} sold={r.sold} wishlist={r.wishlist} />
          )).slice(inicio,final)
        }
       
           <button onClick={handleNext}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
        </button>
          </div>
      </div> 
  // </div>

  )
}


export default ProductosDestacados;