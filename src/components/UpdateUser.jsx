import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useAuth } from "../context/authContext";
import { getUser, updateUserAdmin } from "../redux/actions";

const UpdateUser = ({ id }) => {
  const dispatch = useDispatch();
  // const history = useHistory()
  const {resetPassword} = useAuth()
  const initialState = { lastname: '', firstname: '', image: '', phone: '', email: '', admin: false, banned: false };
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
    window.location.reload()
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);
console.log(submission)
  return (
    <form onSubmit={handleSubmit} className="h-full w-full">
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col w-[48%]">
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
          <label className="text-start">image</label> {/*Esto solo tiene que ver pero no modificar*/}
          <input type="text" value={submission.image} onChange={handleSubmissionChange} name="image" placeholder={user.image} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">phone</label>{/*Esto solo tiene que ver pero no modificar*/}
          <input type="text" value={submission.phone} onChange={handleSubmissionChange} name="phone" placeholder={user.phone} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col w-[48%]">
          <label className="text-start">email</label>{/*Esto solo tiene que ver pero no modificar*/}
          <input type="text" value={submission.email} onChange={handleSubmissionChange} name="email" placeholder={user.email} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">admin</label>
          <select name="admin" onChange={handleSubmissionChange} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400">
            <option hidden>estado</option>
            <option value={false}>false</option>
            <option value={true}>true</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col w-[48%]">
          <label className="text-start">banned</label>
          <select name="banned" onChange={handleSubmissionChange} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400">
            <option hidden>estado</option>
            <option value={false}>false</option>
            <option value={true}>true</option>
          </select>
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">Resetear contraseña</label>
          {/* eso pa que le envien un correo para restablecer la contra*/}
          <span onClick={()=>{resetPassword(submission.email); swal("Se envio un correo para restablecer la contraseña")}}>Resetear</span>
          {/* <input type="text" value={submission.password} onChange={handleSubmissionChange} name="password" placeholder={user.password} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" /> */}
        </div>
      </div>
      <input type="submit" value="Done" className="hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" />
    </form>
  );
};

export default UpdateUser;