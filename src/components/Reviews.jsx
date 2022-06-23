import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_new_review, get_reviews } from "../redux/actions";

function Reviews({id}) {
  console.log(id)
    const dispatch = useDispatch();
    const [input, setInput] = useState({ 
        comment: "",
        calification: "",
        userid: "1",
        productid: id
    })
    const review = useSelector((state)=>state.reviews)
    useEffect(()=>{
        dispatch(get_reviews(id))
    }, [dispatch, id])
    const handlechange = (e)=>{
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handlesubmit = (e)=>{
        e.preventDefault();
        if(!input.comment || !input.calification){
            alert("datos no completados")
        }else{
            dispatch(create_new_review(input))
            setInput({
                comment: "",
                calification: "",
                userid: "1",
                productid: id
            })
        }
    }
    return (
        <div>
            <form>
                <label htmlFor="comentario">Comentario: </label>
                <input type="text" placeholder="Comentario" name="comment" id="comentario" onChange={e=>handlechange(e)}/>
                <br />
                <label htmlFor="calificacion">Calificacion </label>
                <input type="text" placeholder="calificacion" name="calification" id="calificacion" onChange={e=>handlechange(e)}/>
                <br />
                <button type="submit" onClick={(e)=>handlesubmit(e)}>Enviar</button>
             </form>
            {review && review.map((r)=>(
                <>
                <div>Comentario: {r.comment}</div>
                <div>Calificacion: {r.calification}</div>
                </>
            ))} 
        </div>
    )
}

export default Reviews;

