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
          <h2>{">"}</h2>
        </button>
      
    </div>
  );
};
