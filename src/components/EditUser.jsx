import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase-config";
import { getUser, updateUser } from "../redux/actions";
import edit from "../assets/edit.png";
import swal from "sweetalert";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { set } from "firebase/database";
import defaultImage from "../assets/user.png"

export const EditUser = ({ id, lastname, firstname, phone, password, image }) => {

  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialState = {
    lastname: lastname,
    firstname: firstname,
    phone: phone,
    password: password,
    image: image
  };

  const [submission, setSubmission] = useState({ ...initialState });
  const [active, setActive] = useState();

  const toggle = (e) => {
    console.log(e.target.disabled);
    setActive({[e.target.disabled]:!e.target.disabled.value});
  };

  const handleSubmissionChange = (r) => {
    setSubmission({ ...submission, [r.target.name]: r.target.value });
  };


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
            setSubmission({ ...submission, image: url });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleSubmit = (r) => {
    r.preventDefault();
    console.log(submission);
    dispatch(updateUser({ id, submission }))
  };

  return (
    <div className="flex flex-col items-center">

      <div className="text-gray-600">
        <p>Los cambios que hagas seran visibles para otros usuarios</p>
      </div>

      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="bg-white-100 p-2">
          <label className="font-semibold">Foto de perfil:</label>
          <button onClick={(e)=>{toggle(e)}}>
            <img src={edit} alt="" width={25} height={25} />
          </button>
          <input
            disabled={active}
            type="file"
            name="image"
            id="my_file"
            onChange={(e) => { handleUpload(e) }}
            className="border border-gray-400 block  rounded focus:outline-none focus:border-teal-300"
          />
        </div>
      </form>

      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="bg-white-100 p-2">
          <label className="font-semibold">Nombre:</label>
          <button onClick={e=>{toggle(e)}}>
            <img src={edit} alt="" width={25} height={25} />
          </button>
          <input
            className="border border-gray-400 block  rounded focus:outline-none focus:border-teal-300"
            type="text"
            name="firstname"
            // placeholder={submission.firstname}
            autocomplete="off"
            minLength={3}
            value={ submission.firstname}
            onChange={(e) => {
              handleSubmissionChange(e);
            }}
            disabled={active}
          ></input>
        </div>
      </form>

      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="bg-white-100 p-2">
          <label className="font-semibold">Apellido:</label>
          <button onClick={e=>{toggle(e)}}>
            <img src={edit} alt="" width={25} height={25} />
          </button>
          <input
            className="border border-gray-400 block  rounded focus:outline-none focus:border-teal-300"
            placeholder={submission.lastname}
            autocomplete="off"
            type="text"
            name="lastname"
            value={submission.lastname}
            onChange={(e) => {
              handleSubmissionChange(e);
            }}
            minLength={3}
            disabled={active}
          />
        </div>
      </form>

      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="bg-white-100 p-2">
          <label className="font-semibold">Contraseña:</label>
          <button onClick={e=>{toggle(e)}}>
            <img src={edit} alt="" width={25} height={25} />
          </button>
          <input
            name="password"
            disabled={active}
            className="border border-gray-400 block  rounded focus:outline-none focus:border-teal-300"
            value={submission.password}
            type="password"
            placeholder="******"
            minLength={6}
            onChange={(e) => {
              handleSubmissionChange(e);
            }}
          />
        </div>
      </form>

      <form 
    className="flex flex-col items-center"
    onSubmit={handleSubmit}
    >
      <div className="bg-white-100 p-2">
        <label className="font-semibold">Teléfono:</label>
        <button onClick={e=>{toggle(e)}}>
            <img src={edit} alt="" width={25} height={25} />
          </button>
        <div>
          <input
            disabled={active}
            className="border border-gray-400 block  rounded focus:outline-none focus:border-teal-300"
            type="tel"
            name="phone"
            autocomplete="off"
            placeholder={submission.phone}
            onChange={(e) => {
              handleSubmissionChange(e);
            }}
            value={submission.phone}
          />
        </div>
      </div>
      </form>
      
      <button
        className="focus:outline-none ml-3 bg-white-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        Aceptar
      </button>

    </div>
  );
};
