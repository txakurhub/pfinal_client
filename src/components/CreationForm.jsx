import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, getCategories } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const validaciones = (input) => {
  const errores = {}

  ////////TITLE/////////////
  if (!input.title.length) {
    errores.title = "Obligatory field!"
  } else if (input.title.length < 6) {
    errores.title = "Title too short!"
  }
  //////////////////////////

  ////////////BRAND////////
  if (!input.brand.length) {
    errores.brand = "Obligatory field!"
  } else if (!/^[a-zA-Z ]*$/.test(input.brand)) {
    errores.brand = "Only letters are allowed!"
  } else if (input.brand.length < 4) {
    errores.brand = "Brand too short!"
  }
  /////////////////////////

  ////////MODEL///////////
  if (!input.model.length) {
    errores.model = "Obligatory field!"
  } else if (input.model.length < 6) {
    errores.model = "Modelo too short!"
  }
  ///////////////////////

  ////////IMAGE/////////
  if (!input.image.length) {
    errores.image = "Obligatory field!"
  }
  /////////////////////

  ////////PRICE///////
  if (!input.price.length) {
    errores.price = "Obligatory field!"
  } else if (input.price < 200 || input.price > 50000) {
    errores.price = "The price must not be less than $200 and more than $50,000!"
  }
  ///////////////////

  //////CATEGORY/////
  if (!input.category.length) {
    errores.category = "Obligatory field!"
  }
  ///////////////////

  return errores
};

const CreationForm = () => {
  const history = useHistory()
  const [input, setInput] = useState({
    title: '',
    brand: '',
    model: '',
    price: '',
    image: '',
    category: ''
  });
  const [errores, setErrores] = useState([]);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const handleUpload = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
      console.log("no hay archivos");
    } else {
      const storage = getStorage();
      const storageRef = ref(storage, archivo.name);
      uploadBytes(storageRef, archivo)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
        })
        .then((x) => {
          getDownloadURL(ref(storage, archivo.name)).then((url) => {
            console.log(url);
            setInput({ ...input, image: url });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    setErrores(validaciones({
      ...input, [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.title.length || !input.brand.length || !input.model.length || !input.price.length || !input.image.length || !input.category.length) {
      swal("Faltan completar datos.");
    } else if (errores.title || errores.brand || errores.model || errores.price || errores.image) {
      swal("Revisar bien los campos completados.");
    } else {
      dispatch(createProduct(input));
      swal("Producto creado");
      setInput({
        title: '',
        brand: '',
        model: '',
        price: '',
        image: '',
        category: ''
      });
      setTimeout(() => {
        history.push("/admin")
      }, 2000);
    };
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <form id="login" onSubmit={handleSubmit}>
      <Link title="Home" className="flex items-center ease-in-out transition duration-500 text-black border-b border-transparent hover:border-black cursor-pointer absolute top-3 left-1" to="/admin/7R07xtn17ZU09JHnm6Mi">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <p className="text-sm pl-2 leading-none">Back</p>
      </Link>
      <div className="bg-white dark:bg-gray-800">
        <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
          <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
            <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
              <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Product Information</p>
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
                <input type="text" name="title" value={input.title} maxlength={150} onChange={handleChange} id="title" required className={`border border-gray-300 ${errores.title ? 'border-red-400' : input.title === '' ? 'border-gray-300' : 'border-green-400'} dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400`} placeholder="Title..." />
                <div className={`flex justify-between items-center pt-1 ${errores.title ? 'text-red-400' : 'text-green-400'}`}>
                  <p className="text-xs">{errores.title ? errores.title : input.title === '' ? '' : 'Title submission succes!'}</p>
                  {
                    errores.title ?
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                        <circle cx={12} cy={12} r={10} />
                        <line x1={15} y1={9} x2={9} y2={15} />
                        <line x1={9} y1={9} x2={15} y2={15} />
                      </svg> :
                      input.title === '' ?
                        null :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                          <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" stroke="currentColor" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                        </svg>
                  }
                </div>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="brand" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                  Brand
                </label>
                <input type="text" value={input.brand} maxlength={12} onChange={handleChange} id="brand" name="brand" required className={`border ${errores.brand ? 'border-red-400' : input.brand === '' ? 'border-gray-300' : 'border-green-400'} focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400`} placeholder="Brand..." />
                <div className={`flex justify-between items-center pt-1 ${errores.brand ? 'text-red-400' : input.brand === '' ? '' : 'text-green-400'}`}>
                  <p className="text-xs">{errores.brand ? errores.brand : input.brand === '' ? '' : 'Brand submission succes!'}</p>
                  {
                    errores.brand ?
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                        <circle cx={12} cy={12} r={10} />
                        <line x1={15} y1={9} x2={9} y2={15} />
                        <line x1={9} y1={9} x2={15} y2={15} />
                      </svg> :
                      input.brand === '' ?
                        null :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                          <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" stroke="currentColor" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                        </svg>
                  }
                </div>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="model" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Model</label>
                <div className={`border focus:outline-none focus:border-indigo-700 ${errores.model ? 'border-red-400' : input.model === '' ? 'border-gray-300' : 'border-green-400'} shadow-sm rounded flex`}>
                  <div className={`px-4 py-3 dark:text-gray-100 flex items-center focus:outline-none focus:border-indigo-700 border-r ${errores.model ? 'border-red-400' : input.model === '' ? 'border-gray-300' : 'border-green-400'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <input type="text" value={input.model} maxlength={20} onChange={handleChange} id="model" name="model" required className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400" placeholder="Sports" />
                </div>
                <div className={`flex justify-between items-center pt-1 ${errores.model ? 'text-red-400' : 'text-green-400'}`}>
                  <p className="text-xs">{errores.model ? errores.model : input.model === '' ? '' : 'Model submission succes!'}</p>
                  {
                    errores.model ?
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                        <circle cx={12} cy={12} r={10} />
                        <line x1={15} y1={9} x2={9} y2={15} />
                        <line x1={9} y1={9} x2={15} y2={15} />
                      </svg> :
                      input.model === '' ?
                        null :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                          <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" stroke="currentColor" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                        </svg>
                  }
                </div>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="price" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Price</label>
                <div className={`border focus:outline-none focus:border-indigo-700 ${errores.price ? 'border-red-400' : input.price === '' ? 'border-gray-300' : 'border-green-400'} shadow-sm rounded flex`}>
                  <div className={`px-4 py-3 dark:text-gray-100 flex items-center border-r focus:outline-none focus:border-indigo-700 font-semibold ${errores.price ? 'border-red-400' : input.price === '' ? 'border-gray-300' : 'border-green-400'}`}>$</div>
                  <input type="number" value={input.price} onChange={handleChange} id="price" name="price" required className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400" placeholder="00000" />
                </div>
                <div className={`flex justify-between items-center pt-1 ${errores.price ? 'text-red-400' : 'text-green-400'}`}>
                  <p className="text-xs">{errores.price ? errores.price : input.price === '' ? '' : 'Price submission succes!'}</p>
                  {
                    errores.price ?
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                        <circle cx={12} cy={12} r={10} />
                        <line x1={15} y1={9} x2={9} y2={15} />
                        <line x1={9} y1={9} x2={15} y2={15} />
                      </svg> :
                      input.price === '' ?
                        null :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                          <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" stroke="currentColor" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                        </svg>
                  }
                </div>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <div className="flex items-center pb-2">
                  <label htmlFor="image" className="text-sm font-bold text-gray-800 dark:text-gray-100">Image</label>
                  <div title="image/*" className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                      <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <input type="file" name="image"  accept="image/*" onChange={handleUpload} required id="image" className="cursor-pointer bg-transparent pl-3 py-3 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-black hover:file:bg-violet-100" />
                <div className={`flex justify-between items-center pt-1 ${errores.image ? 'text-red-400' : 'text-green-400'}`}>
                  <p className="text-xs">{errores.price ? errores.image : input.image === '' ? '' : 'Image submission succes!'}</p>
                  {
                    errores.image ?
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                        <circle cx={12} cy={12} r={10} />
                        <line x1={15} y1={9} x2={9} y2={15} />
                        <line x1={9} y1={9} x2={15} y2={15} />
                      </svg> :
                      input.image === '' ?
                        null :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                          <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" stroke="currentColor" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                        </svg>
                  }
                </div>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                <label htmlFor="City" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">Category</label>
                <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex">
                  <select name='category' onChange={handleChange} className="w-full h-[50px] p-2 focus:outline-none focus:border-indigo-700">
                    <option hidden>Select category</option>
                    {
                      categories && categories.map(c => (
                        <option key={categories.indexOf(c)} value={c.name}>{c.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className={`flex justify-between items-center pt-1 ${errores.category ? 'text-red-400' : 'text-green-400'}`}>
                  <p className="text-xs">{errores.price ? errores.category : input.category === '' ? '' : 'Category submission succes!'}</p>
                  {
                    errores.category ?
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
                        <circle cx={12} cy={12} r={10} />
                        <line x1={15} y1={9} x2={9} y2={15} />
                        <line x1={9} y1={9} x2={15} y2={15} />
                      </svg> :
                      input.image === '' ?
                        null :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                          <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" stroke="currentColor" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
                        </svg>
                  }
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
      </div>
    </form>
  );
};

export default CreationForm;
