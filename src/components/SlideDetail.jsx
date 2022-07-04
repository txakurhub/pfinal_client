import React, { useEffect, useState, useRef } from "react";
import { getProductosDestacados } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";


export const SlideDetail = () => {
  const slideRef = useRef();
  const productDestacados = useSelector((state) => state.productosDestacados);
  const dispatch = useDispatch();
  const [inicio, setInicio] = useState(0);
  const [final, setFinal] = useState(3);

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };
  useEffect(() => {
    if (!productDestacados.length) {
      dispatch(getProductosDestacados());
    }
  }, [dispatch, productDestacados]);
  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    //   startSlider();
  }, []);
  const imagesArr = productDestacados?.map((s) => s.image);

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
    <section className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
      <div className="flex flex-col justify-start items-start w-full space-y-8">

    <h3 className="flex justify-start text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Más vendidos:</h3>
    <div
      ref={slideRef}
      className="w-full  select-none relative flex flex-row justify-center"
      >
        <button onClick={handlePrev}>
          <h2>{"<"}</h2>
        </button>
      <div className="aspect-w-16 aspect-h-9 flex flex-row">
        <img className="h-[13rem] w-auto" src={imagesArr[inicio]} alt="img carrousel" />
        <img className="h-[13rem] w-auto" src={imagesArr[inicio + 1]} alt="img carrousel" />
        <img className="h-[13rem] w-auto" src={imagesArr[final - 1]} alt="img carrousel" />
        <img className="h-[13rem] w-auto" src={imagesArr[final]} alt="img carrousel" />
      </div>
        <button onClick={handleNext}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
        </button>
      </div>
      
    </div>
    </section>
  );
};
