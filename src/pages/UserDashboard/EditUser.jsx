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
    <div className="h-screen bg-gray-100 w-full flex flex-col items-center justify-center">
    <form
      className="flex flex-col justify-center  bg-white shadow rounded  p-10"
      onSubmit={handleSubmit}
    >
        <img
            src={image? image: userimg}
            alt="foto "
            className='self-center rounded-full '
            width={120} height={120}
          />
        <div className="mt-2 items-center">
          <label 
          className="text-sm font-medium leading-none text-gray-800 mt-4 flex"
          >
            Foto de perfil:
          </label>
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

        <div className=" mt-2 items-center">
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
      <div
       className=" mt-2 items-center"
      >
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

      <div  className=" mt-2 items-center">
        <label className="text-sm font-medium leading-none text-gray-800 flex mr-10">
          Número de celular
        </label>
        <input
          onChange={handleSubmissionChange}
          id="phone"
          value={submission.phone}
          placeholder={phone}
          name="phone"
          aria-label="enter phone"
          type="text"
          className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-1"
        />
      </div>

      {/* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
      <button
        className="focus:outline-none ml-3 bg-white-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        Aceptar
      </button>
    </form>
    </div>
  );
};