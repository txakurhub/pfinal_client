import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShoeDetail, modifyProduct } from "../redux/actions";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import style from './FormShoes.module.css'

const FormShoes = () => {

  const { id } = useParams()
  const dispatch = useDispatch();
  const detail = useSelector(state => state.product_detail)
  const [input, setInput] = useState({
    title: '',
    brand: '',
    model: '',
    price: '',
    stock: '', // sold
    image: ''
  })

  useEffect(() => {
    dispatch(getShoeDetail(id))
  }, [dispatch])

  useEffect(() => {
    if (detail) {
      setInput({
        title: detail.title,
        brand: detail.brand,
        model: detail.model,
        price: detail.price,
        stock: detail.stock,
        image: detail.image
      })
    }
  }, [detail])

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyProduct({ id: id, input }));
    swal("Zapatilla modificada");
    setInput({
      title: '',
      brand: '',
      model: '',
      price: '',
      stock: '',
      image: ''
    });
  };

  return (

    <div className={style.contenedor}>

      <form className={style.form} onSubmit={handleSubmit}>

        <label>Title </label>
        <input type="text" name="title" value={input.title} maxLength={150} onChange={handleChange} placeholder="Title..." />

        <label>Brand</label>
        <input type="text" value={input.brand} maxLength={12} onChange={handleChange} name="brand" placeholder="Brand..." />

        <label>Model</label>
        <input type="text" value={input.model} maxLength={20} onChange={handleChange} name="model" placeholder="Sports" />

        <label>Price</label>
        <input type="number" value={input.price} onChange={handleChange} name="price" placeholder="00000" />

        <label>Stock</label>
        <input type="number" value={input.stock} onChange={handleChange} name="stock" placeholder="00000" />

        {/*Image type text, type file tira error y se rompe el componente*/}
        <label>Image</label>
        <input type="text" value={input.image} onChange={handleChange} name="image" />
        <img src={input.image} alt='Not found' />

        <input type="submit" value='Send' />

      </form >

    </div>

  )

};

export default FormShoes;