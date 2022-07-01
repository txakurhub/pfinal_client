import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_new_review, get_reviews } from "../redux/actions";
import swal from 'sweetalert';

const Reviews = ({ id }) => {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const [input, setInput] = useState({comment: "", calification: 0, userid: "1", productid: id});
  
  const handlechange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    if(!input.comment || !input.calification){
      swal("Datos no completados");
    } else {
      dispatch(create_new_review(input));
      setInput({
        comment: "",
        calification: 0,
        userid: "1",
        productid: id
      });
    };
  };
  
  useEffect(() => {
    dispatch(get_reviews(id));
  }, [dispatch, id]);

  return (
    <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
      <div className="flex flex-col justify-start items-start w-full space-y-8">
        <div className="flex justify-start items-start">
          <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Reviews</p>
        </div>
        <form className="relative w-full" onSubmit={handlesubmit}>
          <div className="flex flex-row absolute bottom-3 right-7">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${input.calification >= 1 ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-6 w-6 ${input.calification >= 2 ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-6 w-6 ${input.calification >= 3 ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-6 w-6 ${input.calification >= 4 ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-6 w-6  ${input.calification === '5' ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <button onChange={(e) => handlesubmit(e)} title="Enviar cambios" className="absolute top-2 right-7 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </button>
          <div className="flex flex-row absolute bottom-3 right-7">
            <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={1} className="h-6 w-6 opacity-0 cursor-pointer" />
            <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={2} className="ml-2 h-6 w-6 opacity-0 cursor-pointer" />
            <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={3} className="ml-2 h-6 w-6 opacity-0 cursor-pointer" />
            <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={4} className="ml-2 h-6 w-6 opacity-0 cursor-pointer" />
            <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={5} className="ml-2 h-6 w-6 opacity-0 cursor-pointer" />
          </div>
          <textarea value={input.comment} className="bg-gray-100 rounded border border-transparent focus:border-gray-400 leading-normal resize w-full h-20 py-2 pr-[40px] px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" type="text" placeholder="Agregar un comentario" name="comment" id="comentario" onChange={(e) => handlechange(e)}/>
        </form>
        {
          reviews.map((r) => (
            <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
              <div className="w-full flex justify-end">
                {r.calification}
              </div>
              <div className="md:block">
                <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">{r.comment}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Reviews;
