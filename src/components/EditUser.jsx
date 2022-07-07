import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser, updateUser } from "../redux/actions";
import edit from "../assets/edit.png";
import swal from "sweetalert";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import userimg from "../assets/user.png";

export const EditUser = ({
  id,
  lastname,
  firstname,
  phone,
  password,
  image,
}) => {
  // const user = useSelector((state) => state.user);
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
    setActive(!active);
  };

  const handleSubmissionChange = (r) => {
    setSubmission({ ...submission, [r.target.name]: r.target.value });
  };

  useEffect(() => {
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
  const handleSubmit = (r) => {
    r.preventDefault();
    dispatch(updateUser({ id, submission }));
    window.location.reload();
  };

  return (
    <section 
    // className="flex flex-col justify-center w-100"
    >

    <form
      className="flex flex-col justify-center w-100 bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 pb-5"
      onSubmit={handleSubmit}
    >
      <div className="mt-3">
        <div>
          <label className="text-sm font-medium leading-none text-gray-800 mt-4 flex">
            Foto de perfil:
          </label>
          <img
            src={image === undefined ? userimg : image}
            alt="foto de perfil"
            className="h-[12rem] w-auto "
          />
          <input
            onChange={(e) => {
              handleUpload(e);
            }}
            id="image"
            name="image"
            aria-label="enter image"
            type="file"
            placeholder={image}
            className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-1"
          />
        </div>
        <label className="text-sm font-medium leading-none text-gray-800 mt-4 flex">
          Nombre
        </label>
        <input
          onChange={handleSubmissionChange}
          id="firstname"
          name="firstname"
          value={submission.firstname}
          placeholder={firstname}
          aria-label="enter firstname"
          type="text"
          className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-1"
        />
      </div>
      <div className="mt-3">
        <label className="text-sm font-medium leading-none text-gray-800 flex">
          Apellido
        </label>
        <input
          onChange={handleSubmissionChange}
          id="lastname"
          name="lastname"
          value={submission.lastname}
          placeholder={lastname}
          aria-label="enter lastname"
          type="text"
          className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-1"
        />
      </div>

      <div className="mt-3">
        <label className="text-sm font-medium leading-none text-gray-800 flex">
          Número de celular
        </label>
        <input
          onChange={handleSubmissionChange}
          id="phone"
          value={submission.phone}
          placeholder={phone}
          name="phone"
          aria-label="enter phone"
          type="number"
          className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-1"
        />
      </div>
      {/* <div className="w-full mt-3 flex flex-col">
          <label className="text-sm font-medium leading-none text-gray-800 flex">
            Contraseña</label>
          <div title="See password" className="relative flex items-center justify-center">
            <input 
            onChange={handleSubmissionChange} 
            id="password" 
            value={submission.password}
            placeholder={password}
            name="password" 
            min={6} 
            aria-label="change Password" 
            type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-1" />
            <div onClick={viewPassword} className="absolute right-0 mt-2 mr-3 cursor-pointer">
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A" />
              </svg>
            </div>
          </div>
          </div>
          <div>
          <label className="text-sm font-medium leading-none text-gray-800 flex">
            Confirmar contraseña</label>
            <div title="See password" className="relative flex items-center justify-center">
            <input 
            onChange={handleSubmissionChange} 
            id="passwordchange" 
            name="passwordchange" 
            min={6} 
            aria-label="change Password" 
            type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-1" />
            <div onClick={viewPassword} className="absolute right-0 mt-2 mr-3 cursor-pointer">
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A" />
              </svg>
            </div>
          </div>
          </div> */}

      {/* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
      <button
        className="focus:outline-none ml-3 bg-white-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        Aceptar
      </button>
    </form>
      </section>
  );
};
