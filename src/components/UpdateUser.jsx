import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUser, updateUserAdmin } from "../redux/actions";

const UpdateUser = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const initialState = { lastname: '', firstname: '', image: '', phone: '', email: '', admin: "", banned: false, password: '' };
  const [submission, setSubmission] = useState({ ...initialState });
  const user = useSelector(state => state.user);

  const handleSubmissionChange = (r) => {
    setSubmission({ ...submission, [r.target.name]: r.target.value });
  };

  const handleSubmit = (r) => {
    r.preventDefault();
    dispatch(updateUserAdmin({ id, admin: submission.admin, banned: submission.banned }));
    setSubmission({ ...initialState });
    history.goBack()

  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

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
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">admin</label>
          <select name="admin" onChange={handleSubmissionChange} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400">
          <option value='false'>false</option>
          <option value='true'>true</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div className="flex flex-col w-[48%]">
          <label className="text-start">banned</label>
          <input type="text" value={submission.banned} onChange={handleSubmissionChange} name="banned" placeholder={user.banned?.toString()} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label className="text-start">password</label>
          <input type="text" value={submission.password} onChange={handleSubmissionChange} name="password" placeholder={user.password} className="border focus:outline-none focus:border-indigo-700 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <input type="submit" value="Done" className="hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" />
    </form>
  );
};

export default UpdateUser;