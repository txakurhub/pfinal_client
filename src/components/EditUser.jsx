import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase-config";
import { getUser, updateUser } from "../redux/actions";
import edit from '../assets/edit.png'
import swal from "sweetalert";

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
  const [url, setUrl] = useState("")
  const [active,setActive] =useState(true)

  const toggle =(e)=>{
    e.target.disabled(setActive(!active)) 
  } 

  const handleSubmissionChange = (r) => {
    setSubmission({ ...submission, [r.target.name]: r.target.value });
  };

  const handleSubmit = (r) => {
    r.preventDefault();
    swal({
      text: "Estas seguro que quieres guardar los cambios?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(res=>{

      dispatch(updateUser({ id, submission })).then()
      url !== "" ? setSubmission({...initialState, image: url}) : setSubmission({ ...initialState })
    })
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

  const handleUpload = async (e) => {
    const archivo = e.target.files[0]
    const storageRef = app.storage().ref();
    const path = storageRef.child(archivo.name)
    await path.put(archivo)
    const link = await path.getDownloadURL()
    setUrl(link)
  }
  
  return (
  
      <form className="grid grid-flow-row-dense grid-cols-3 grid-rows-3  gap-4"
      onSubmit={handleSubmit}>
        <div className="col-span-3 text-gray-600">
        <button  onClick={toggle}><img src={edit} alt="" width={25} height={25}/></button>
        <p>Los cambios que hagas seran visibles para otros usuarios</p>
        </div>
        <div className="bg-gray-100 p-2">

        <label className="font-semibold">Nombre:</label>
        <input className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"
          type="text"
          name="firstname"
          autoComplete="off"
          minLength={3}
          value={submission.firstname}
          onChange={e=>{handleSubmissionChange(e)}}
          placeholder={user.firstname}
          disabled={active}
        ></input>
        </div>

        <div className="bg-gray-100 p-2">
        <label className="font-semibold">Apellido:</label>
        <input className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"
          type="text"
          name="lastname"
          value={submission.lastname}
          onChange={e=>{handleSubmissionChange(e)}}
          autoComplete="off"
          minLength={3}
          placeholder={user.lastname}
          disabled={active}
        />
        </div>

        <div className="bg-gray-100 p-2">
        <label className="font-semibold">Contraseña:</label>
        <input
        disabled={active} 
        className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300" 
        value={submission.password} type="password" placeholder="****" minLength={6} onChange={e=>{handleSubmissionChange(e)}}/>
        </div>
        
        <div className="bg-gray-100 p-2">
        <label className="font-semibold">Foto de perfil:</label>
        <input disabled={active} type="file" name="image" id="my_file" onChange={handleUpload} value={submission.image} className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300"/>
        </div>
        
        <div className="bg-gray-100 p-2">

        <label className="font-semibold">Teléfono:</label>
        <div>
        <input disabled={active} className="border border-gray-400 block w-full rounded focus:outline-none focus:border-teal-300" type="tel" name="phone" placeholder={user.phone} onChange={e=>{handleSubmissionChange(e)}} value={submission.phone}/>
        </div>
        </div>
        {/* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
        <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={e=>handleSubmit(e)} type="submit">Aceptar</button>
      </form>
  );
};

