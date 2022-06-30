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
      {
        users.map(r => <button onClick={() => {toggle(); onClick(r.id)}} key={r.id}>{r.email}</button>)
      }
      <Modal active={active} toggle={toggle} children={<UpdateUser id={id} />} />
    </div>
  );
};

export default Users;
