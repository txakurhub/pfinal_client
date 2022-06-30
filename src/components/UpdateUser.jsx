import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../redux/actions";

const UpdateUser = ({ id }) => {
  const dispatch = useDispatch();
  const initialState = {lastname: '', firstname: '', image: '', phone: '', email: '', admin: false, banned: false, password: ''};
  const [ submission, setSubmission ] = useState({ ...initialState });
  const user = useSelector(state => state.user);

  const handleSubmissionChange = (r) => {
    setSubmission({ ...submission, [r.target.name]: r.target.value });
  };

  const handleSubmit = (r) => {
    r.preventDefault();
    dispatch(updateUser({id, submission}));
    setSubmission({ ...initialState });
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      {user.firstname && <input type="text" value={submission.firstname} onChange={handleSubmissionChange} name="firstname" placeholder={user.firstname} />}
      {user.lastname && <input type="text" value={submission.lastname} onChange={handleSubmissionChange} name="lastname" placeholder={user.lastname} />}
      {user.image && <input type="text" value={submission.image} onChange={handleSubmissionChange} name="image" placeholder={user.image} />}
      {user.phone && <input type="text" value={submission.phone} onChange={handleSubmissionChange} name="phone" placeholder={user.phone} />}
      <input type="text" value={submission.email} onChange={handleSubmissionChange} name="email" placeholder={user.email} />
      {user.admin && <input type="text" value={submission.admin} onChange={handleSubmissionChange} name="admin" placeholder={user.admin?.toString()} />}
      {user.banned && <input type="text" value={submission.banned} onChange={handleSubmissionChange} name="banned" placeholder={user.banned?.toString()} />}
      {user.password && <input type="text" value={submission.password} onChange={handleSubmissionChange} name="password" placeholder={user.password} />}
      <input type="submit" value="Done" />
    </form>
  );
};

export default UpdateUser;