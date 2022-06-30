import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../redux/actions";

export const EditUser = ({ id }) => {
  const dispatch = useDispatch();
  const initialState = {
    lastname: "",
    firstname: "",
    image: "",
    phone: "",
    password: "",
  };
  const [submission, setSubmission] = useState({ ...initialState });
  const user = useSelector((state) => state.user);

  const handleSubmissionChange = (r) => {
    setSubmission({ ...submission, [r.target.name]: r.target.value });
  };

  const handleSubmit = (r) => {
    r.preventDefault();
    dispatch(updateUser({ id, submission }));
    setSubmission({ ...initialState });
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);


  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <label>Nombre:</label>
        <input
          type="text"
          name="firstname"
          autoComplete="off"
          minLength={3}
          placeholder={user.firstname}
        ></input>
        <br />
        <label>Apellido:</label>
        <input
          type="text"
          name="lastname"
          autoComplete="off"
          minLength={3}
          placeholder={user.lastname}
        />
        <br />
        <label>Contraseña:</label>
        <input type="password" minLength={6} />
        <br />
        <label>Foto de perfil:</label>
        <input type="file" name="image" />
        <br />
        <label>Teléfono:</label>
        <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
        <br />
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};
