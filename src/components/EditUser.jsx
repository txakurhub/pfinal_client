import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app} from "../firebase-config";
import { getUser, updateUser } from "../redux/actions";

export const EditUser = ({ id }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialState = {
    lastname: user.lastname,
    firstname: user.firstname,
    image: user.image,
    phone: user.phone,
    password: user.password,
  };
  const [submission, setSubmission] = useState({ ...initialState });


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
//---------------------------------------------------------
//ONCHANGEFILE EN PROCESO NECESITA GUARDAR LA IMG DE USER EN EL STORAGE PERO NO FUNCA
//----------------------------------------------------------------
  // const onChangeFile=(e)=>{
  //   e.preventDefault(e)
  //   const file = e.target.files[0];
  //   console.log(file);
  //   const storageRef = app.storage().ref();
  //   const fileRef = storageRef.child(file.name);
  //   fileRef.put(file).then(()=>{
  //     console.log('uploaded file',file.name);
  //   }) 
  // }
  //--------------------------------------------------------------------
  return (
  
      <form className="mx-auto space-y-4"
      onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold">Editar cuenta </h1>
        <p className="text-gray-600">Los cambios que hagas seran visibles para otros usuarios</p>
        <label className="font-semibold">Nombre:</label>
        <input className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"
          type="text"
          name="firstname"
          autoComplete="off"
          minLength={3}
          value={submission.firstname}
          onChange={e=>{handleSubmissionChange(e)}}
          placeholder={user.firstname}
        ></input>
        
        <label className="font-semibold">Apellido:</label>
        <input className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"
          type="text"
          name="lastname"
          value={submission.lastname}
          onChange={e=>{handleSubmissionChange(e)}}
          autoComplete="off"
          minLength={3}
          placeholder={user.lastname}
        />
        
        <label className="font-semibold">Contraseña:</label>
        <input className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300" value={submission.password} type="password" placeholder="****" minLength={6} onChange={e=>{handleSubmissionChange(e)}}/>
        
        <label className="font-semibold">Foto de perfil:</label>
        <input className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300" type="file" name="image" id="my_file" value={submission.image}/>
        
        <label className="font-semibold">Teléfono:</label>
        <input className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300" type="tel" name="phone" placeholder={user.phone} onChange={e=>{handleSubmissionChange(e)}} value={submission.phone}/>
        
        {/* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
        <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" type="submit">Confirmar</button>
      </form>
  );
};
