import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useAuth } from "../context/authContext";
import { getUser, updateUserAdmin } from "../redux/actions";

const UpdateUser = ({ id }) => {
  const dispatch = useDispatch();

  const {resetPassword} = useAuth()
  const initialState = { admin: false, banned: false };
  const [submission, setSubmission] = useState({ ...initialState });
  const user = useSelector(state => state.user);

  const toBoolean = (string)=>{ // funcion para pasar de string a booleano
    if(typeof string === "string"){
       if(string.trim().includes("true")){
      return true
    }
    if(string.trim().includes("false")){
      return false
    }
    }else return string
  }

  const handleSubmissionChange = (r) => {
    setSubmission({ ...submission, [r.target.name]: r.target.value });
  };

  const handleSubmit = (r) => {
    r.preventDefault();
    const {admin,banned}= submission
    dispatch(updateUserAdmin({ id, admin: toBoolean(admin), banned:toBoolean(banned) }));
    setSubmission({ ...initialState });
    swal("Buen trabajo!","Los cambios se han realizados correctamente","success").then(res=>{
      window.location.reload()
    })

  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="h-full w-full flex flex-col items-center justify-center">
      {/* <div className="flex flex-row w-full justify-evenly"> */}
      <div className="flex flex-col w-[48%] m-auto my-2">
          <label className="text-start">Admin</label>
          <select name="admin" value={submission.admin} onChange={handleSubmissionChange} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400">
            <option hidden>estado</option>
            <option value={false}>Falso</option>
            <option value={true}>Verdadero</option>
          </select>
        {/* </div> */}
      </div>
      {/* <div className="flex flex-row w-full justify-evenly"> */}
        <div className="flex flex-col w-[48%] m-auto my-2">
          <label className="text-start">Bloquear</label>
          <select name="banned" value={submission.banned} onChange={handleSubmissionChange} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400">
            <option hidden>estado</option>
            <option value={false}>Falso</option>
            <option value={true}>Verdadero</option>
          </select>
        </div>
        <div className="flex flex-row w-[48%] m-auto my-2">
          <label className="text-start">Cambiar contraseña?</label>
          {/* eso pa que le envien un correo para restablecer la contra*/}
          {user&& <span className="underline hover:underline cursor-pointer ml-2" onClick={()=>{resetPassword(user.email); swal("Atención","Se envio un correo al usuario para restablecer la contraseña","warning")}}>Resetéala aquí</span>}
          {/* <input type="text" value={submission.password} onChange={handleSubmissionChange} name="password" placeholder={user.password} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" /> */}
        </div>
      {/* </div> */}
      <input type="submit" value="Enviar" className="hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" />
    </form>
  );
};

export default UpdateUser;





{/* <div className="flex flex-col w-[48%]">
          <label className="text-start">firstname</label>
          <input type="text" value={submission.firstname} onChange={handleSubmissionChange} name="firstname" placeholder={user.firstname} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">firstname</label>
          <input type="text" value={submission.lastname} onChange={handleSubmissionChange} name="lastname" placeholder={user.lastname} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col w-[48%]">
          <label className="text-start">image</label> 
          <input type="text" value={submission.image} onChange={handleSubmissionChange} name="image" placeholder={user.image} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">phone</label>
          <input type="text" value={submission.phone} onChange={handleSubmissionChange} name="phone" placeholder={user.phone} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col w-[48%]">
          <label className="text-start">email</label>
          <input type="text" value={submission.email} onChange={handleSubmissionChange} name="email" placeholder={user.email} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div> */}
