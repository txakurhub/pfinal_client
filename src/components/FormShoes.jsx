import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShoeDetail, modifyProduct } from "../redux/actions";
// import { useParams } from "react-router-dom";
import swal from 'sweetalert';

const FormShoes = () => {

  // const { id } = useParams()
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch();
  const detail = useSelector(state => state.product_detail)
  const [input, setInput] = useState({
    title: '',
    brand: '',
    model: '',
    price: '' // imagen, stock, sold
  })

  useEffect(() => {
    dispatch(getShoeDetail('MLA1143436625')).then(() => { setLoader(false) }) // id de prueba
  }, [dispatch])

  useEffect(() => {
    if (detail) {
      setInput({
        title: detail.title,
        brand: detail.brand,
        model: detail.model,
        price: detail.price
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
    dispatch(modifyProduct({ id: 'MLA1143436625', input }));
    swal("Zapatilla modificada");
    setInput({
      title: '',
      brand: '',
      model: '',
      price: '',
      image: '',
    });
  };

  return (
    loader === true ? <h1>loading</h1> : (
      <form id="login" onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800">
          <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Edit Product</p>
                <div title="Fill in your product information in the fields" className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mx-auto pt-4">
              <div className="container mx-auto">
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="title" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                    Title
                  </label>
                  <input type="text" name="title" value={input.title} maxLength={150} onChange={handleChange} id="title" placeholder="Title..." />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="brand" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                    Brand
                  </label>
                  <input type="text" value={input.brand} maxLength={12} onChange={handleChange} id="brand" name="brand" placeholder="Brand..." />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="model" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Model</label>
                  <input type="text" value={input.model} maxLength={20} onChange={handleChange} id="model" name="model" placeholder="Sports" />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="price" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Price</label>
                  <div>$</div>
                  <div>
                    <input type="number" value={input.price} onChange={handleChange} id="price" name="price" placeholder="00000" />
                  </div>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <div className="flex items-center pb-2">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-11/12 xl:w-full">
          <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
            <button className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" type="submit">
              Save
            </button>
          </div>
        </div>
      </form >)
  )
};

export default FormShoes;