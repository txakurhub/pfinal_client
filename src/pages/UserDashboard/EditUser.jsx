import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser, updateUser } from "../../redux/actions";
import edit from '../../assets/edit.png'
import swal from "sweetalert";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import userimg from "../../assets/user.png";

export const EditUser = ({
  id,
  lastname,
  firstname,
  phone,
  password,
  image,
}) => {
  const dispatch = useDispatch();
  const initialState = {
    lastname: lastname,
    firstname: firstname,
    phone: phone,
    password: password,
    image: image,
  };

  const [submission, setSubmission] = useState({ ...initialState });
  const [active, setActive] = useState();

  const viewPassword = () => {
    var x = document.getElementById("password");
    x.type === "password" ? (x.type = "text") : (x.type = "password");
  };

  const toggle = (e) => {
    console.log(e.target.disabled);
    setActive({[e.target.disabled]:!e.target.disabled.value});
  };

  const handleSubmissionChange = (r) => {
    setSubmission({ ...submission, [r.target.name]: r.target.value });
  };

  useEffect(() => {
    console.log("otra vez");
    dispatch(getUser(id));
  }, [dispatch]);

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
            setSubmission({ ...submission, image: url });
          });
        })
        .catch((error) => {
          console.log("que pingo pasa acá >>> ", error);
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, submission }));
    // window.location.reload();
  };

  return (
      <form className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 pb-5 m-auto mt-5 flex items-center justify-center flex-col" onSubmit={handleSubmit}>
        <div className="h-[100px] w-[100px] rounded-full mr-1.5 overflow-hidden">
          <img src={image ? image : userimg} alt="foto" className="h-full" width={120} height={120} />
        </div>
        <div className="mt-2 items-center w-full">
          <label className="text-sm font-medium leading-none text-gray-800 mt-4 flex">Foto de perfil:</label>
          <input onChange={(e) => handleUpload(e)} id="image" name="image" aria-label="enter image" type="file" placeholder={image} className="w-full cursor-pointer bg-transparent pl-3 py-3 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-black hover:file:bg-violet-100" />
        </div>
        <div className="mt-2 items-center w-full">
          <label className="text-sm font-medium leading-none text-gray-800 mt-4 flex">Nombre</label>
          <input onChange={handleSubmissionChange} id="firstname" name="firstname" value={submission.firstname} placeholder={firstname} aria-label="enter firstname" type="text" className="w-full border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="mt-2 items-center w-full">
          <label className="text-sm font-medium leading-none text-gray-800 flex">Apellido</label>
          <input onChange={handleSubmissionChange} id="lastname" name="lastname" value={submission.lastname} placeholder={lastname} aria-label="enter lastname" type="text" className="w-full border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="mt-2 items-center w-full">
          <label className="text-sm font-medium leading-none text-gray-800 flex mr-10">Número de celular</label>
          <input onChange={handleSubmissionChange} id="phone" value={submission.phone} placeholder={phone} name="phone" aria-label="enter phone" type="text" className="w-full border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <button className="mt-3 hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" onClick={(e) => handleSubmit(e)} type="submit">
          Aceptar
        </button>
      </form>
  );
};