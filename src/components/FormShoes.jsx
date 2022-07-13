import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShoeDetail, modifyProduct } from "../redux/actions";
import { useHistory, useParams } from "react-router-dom";
import swal from 'sweetalert';

const FormShoes = ({ id }) => {
  const history = useHistory()
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
  }, [dispatch,id])
  //agregue el id al arreglo para que no llore el navegador

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(modifyProduct({ id: id, input }));
    swal("Buen trabajo!", "Producto modificado correctamente", "success")
    setInput({
      title: '',
      brand: '',
      model: '',
      price: '',
      stock: '',
      image: ''
    });
    // window.location.reload()
    history.push("/admin")
  };

  return (
    <form className="h-full w-full" onSubmit={handleSubmit}>
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col w-[48%]">
          <label className="text-start">Title </label>
          <input type="text" name="title" value={input.title} maxLength={150} onChange={handleChange} placeholder="Title..." className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">Brand</label>
          <input type="text" value={input.brand} maxLength={12} onChange={handleChange} name="brand" placeholder="Brand..." className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col w-[48%]">
          <label className="text-start">Model</label>
          <input type="text" value={input.model} maxLength={20} onChange={handleChange} name="model" placeholder="Sports" className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">Price</label>
          <input type="number" value={input.price} onChange={handleChange} name="price" placeholder="00000" className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col w-[48%]">
          <label className="text-start">Stock</label>
          <input type="number" value={input.stock} onChange={handleChange} name="stock" placeholder="00000" className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">Image</label>
          <input type="text" value={input.image} onChange={handleChange} name="image" className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex flex-row w-full items-center justify-evenly">
        <img src={input.image} alt='Not found' className="h-[250px]" />
        <input type="submit" value='Send' className="h-[45px] hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" />
      </div>
    </form >
  );
};

export default FormShoes;
