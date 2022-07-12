import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_new_review, getUsers, get_reviews } from "../redux/actions";
import swal from 'sweetalert';

export const ReviewsDetail = ({ id, user }) => {
    const users = useSelector(state => state.users);

    const username = (id) => {
        const dato = Object.values(users).filter(e => e.id === id)
        const date = dato.map(e => e.firstname ? e.firstname : "Sin nombre")
        return date.length > 0 ? date : "Sin información"
    }

    const reviews = useSelector((state) => state.reviews);

    const dispatch = useDispatch();

    const [input, setInput] = useState({ comment: "", calification: 0, userid: user ? user.uid : null, productid: id });

    const handlechange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };


    useEffect(() => {
        dispatch(get_reviews(id));
        dispatch(getUsers())
        if (user) {
            setInput({ comment: "", calification: 0, userid: user ? user.uid : null, productid: id })
        }
    }, [dispatch, id, user]);

    return (
        <div>

            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Comentarios:</p>
            {
                reviews.length ? reviews.map((r) => (
                    <div className="w-full flex justify-start items-start flex-col bg-gray-100 p-2 rounded relative">
                        <p className="text-gray-700 font-medium">{username(r.userId)} dice:</p>
                        <p className="">{r.comment}</p>
                        <div className="flex flex-row absolute bottom-3 right-7">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${Number(r.calification) >= 1 ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-6 w-6 ${Number(r.calification) >= 2 ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-6 w-6 ${Number(r.calification) >= 3 ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-6 w-6 ${Number(r.calification) >= 4 ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-6 w-6  ${Number(r.calification) === 5 ? 'fill-[#fbff00]' : ''}`} fill="#1f2937" viewBox="0 0 24 24" stroke="none" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                    </div>
                )) : (<p>Sin comentarios</p>)}
        </div>

    )
}
