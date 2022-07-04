import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase-config";
import { getUser, updateUser } from "../redux/actions";
import edit from "../assets/edit.png";
import swal from "sweetalert";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { set } from "firebase/database";
import defaultImage from "../assets/user.png"

export const EditUser = ({ id }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialState = {
    lastname: user.lastname,
    firstname: user.firstname,
    phone: user.phone,
    password: user.password,
    image: user.image
  };
  // const [imageUrl, setImageUrl] = useState(user.image ? user.image : "");
  const [submission, setSubmission] = useState({ ...initialState });

  const [active, setActive] = useState();

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
          console.log(snapshot);
        })
        .then((x) => {
          getDownloadURL(ref(storage, archivo.name)).then((url) => {
            console.log(url);
            setSubmission({ ...submission, image: url});
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
    dispatch(updateUser({ id, submission }));
  };

  return (
    <form
      className="flex flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <div className="col-span-3 text-gray-600">
        <button onClick={toggle}>
          <img src={edit} alt="" width={25} height={25} />
        </button>
        <p>Los cambios que hagas seran visibles para otros usuarios</p>
      </div>

      <div className="bg-gray-100 p-2">
        <label className="font-semibold">Foto de perfil:</label>
        <img src={user.image? user.image : defaultImage} alt="" />
        <input
          type="file"
          name="image"
          id="my_file"
          onChange={handleUpload}
          className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"
        />
      </div>

      <div className="bg-gray-100 p-2">
        <label className="font-semibold">Nombre:</label>
        <input
          className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"
          type="text"
          name="firstname"
          placeholder={user.firstname}
          autocomplete="off"
          minLength={3}
          value={submission.firstname}
          onChange={(e) => {
            handleSubmissionChange(e);
          }}
          disabled={active}
        ></input>
      </div>

      <div className="bg-gray-100 p-2">
        <label className="font-semibold">Apellido:</label>
        <input
          className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"
          placeholder={user.lastname}
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

      <div className="bg-gray-100 p-2">
        <label className="font-semibold">Contraseña:</label>
        <input
          disabled={active}
          className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"
          value={submission.password}
          type="password"
          placeholder="******"
          minLength={6}
          onChange={(e) => {
            handleSubmissionChange(e);
          }}
        />
      </div>


      <div className="bg-gray-100 p-2">
        <label className="font-semibold">Teléfono:</label>
        <div>
          <input
            disabled={active}
            className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"
            type="tel"
            name="phone"
            autocomplete="off"
            placeholder={user.phone}
            onChange={(e) => {
              handleSubmissionChange(e);
            }}
            value={submission.phone}
          />
        </div>
      </div>
      {/* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
      <button
        className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        Aceptar
      </button>
    </form>
  );
};
