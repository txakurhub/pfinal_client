import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions";
import Modal from "./Modal";
import UpdateUser from "./UpdateUser";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [id, setId] = useState('');
  const [active, setActive] = useState(false);
  const toggle = () => setActive(!active);
  const onClick = (r) => setId(r);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
      {
        users.map(r => <button onClick={() => {toggle(); onClick(r.id)}} key={r.id} className="
        block
        px-6
        py-2
        border-b border-gray-200
        w-full
        hover:bg-gray-100 hover:text-gray-500
        focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
        transition
        duration-500
        cursor-pointer
      " >{r.email}</button>)
      }
      <Modal active={active} toggle={toggle} children={<UpdateUser id={id} />} />
      </div>
    </div>
  );
};


export default Users;
