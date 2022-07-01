import React, { useEffect, useState, useRef } from "react";
import img1 from "../assets/zap1.jpg";
import img2 from "../assets/zap2.jpg";
import img3 from "../assets/zap3.jpg";
import img4 from "../assets/zap4.jpg";
import img5 from "../assets/zap5.jpg";
let count = 0

export const Carrousel = () => {
  const imagesArr = [img1, img2, img3, img4, img5];
  const [index, setIndex] = useState(0);
  const slideRef = useRef()

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim')
  }

  useEffect(() => {
    slideRef.current.addEventListener('animationend', removeAnimation)
    startSlider();
  }, []);

  const startSlider = () => {
    setInterval(() => {
      handleNext();
    }, 3000);
  };
  
  const handleNext = () => {
    count = (count + 1) % imagesArr.length
    setIndex(count);
    slideRef.current.classList.add('fade-anim')
  };
  
  const handlePrev = () => {
   const imagesLength = imagesArr.length
   count = (index + imagesLength -1) % imagesLength
   setIndex(count)
   slideRef.current.classList.add('fade-anim')
  };

  return (
    <div ref={slideRef} className="w-full select-none relative flex justify-center">
      <div className="aspect-w-16 aspect-h-9">
        <img src={imagesArr[index]} alt="img carrousel" className="w-screen" />
      </div>
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 py-2 px-3 flex justify-between items-center">
        <button onClick={handlePrev}>
          <h2>{"<"}</h2>
        </button>
        <button onClick={handleNext}>
          <h2>{">"}</h2>
        </button>
      </div>
    </div>
  );
};