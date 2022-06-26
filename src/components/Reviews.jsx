import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_new_review, get_reviews } from "../redux/actions";
import swal from 'sweetalert';

function Reviews({ id }) {
    const reviews = useSelector((state) => state.reviews);
    const dispatch = useDispatch();
    const [input, setInput] = useState({ 
        comment: "",
        calification: 0,
        userid: "1",
        productid: id
    });
    
    useEffect(() => {
        dispatch(get_reviews(id));
    }, [dispatch, id]);

    console.log(input);
    const handlechange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if(!input.comment || !input.calification){
            swal("datos no completados");
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

    return (
        <div className="flex flex-col items-center w-full m-auto">
            <form className="relative w-full">
                <div className="flex flex-row absolute bottom-3 right-2">
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
                <button title="Save changes" className="absolute top-2 right-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                </button>
                <div className="flex flex-row absolute bottom-3 right-2">
                    <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={1} className="h-6 w-6 opacity-0 cursor-pointer" />
                    <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={2} className="ml-2 h-6 w-6 opacity-0 cursor-pointer" />
                    <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={3} className="ml-2 h-6 w-6 opacity-0 cursor-pointer" />
                    <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={4} className="ml-2 h-6 w-6 opacity-0 cursor-pointer" />
                    <input onChange={(e) => handlechange(e)} name="calification" type="radio" value={5} className="ml-2 h-6 w-6 opacity-0 cursor-pointer" />
                </div>
                <textarea value={input.comment} className="bg-gray-100 rounded border border-transparent focus:border-gray-400 leading-normal resize w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" type="text" placeholder="Add a comment" name="comment" id="comentario" onChange={(e) => handlechange(e)}/>
            </form>
            {
                reviews.map((r) => (
                    <div className="relative w-full">
                        <div className="bg-gray-100 rounded w-full h-20 py-2 px-3 font-medium">{r.calification}</div>
                        <div className="flex flex-row absolute bottom-3 right-2">{r.comment}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Reviews;
