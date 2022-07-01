import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getUser } from "../redux/actions";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import UpdateUser from "../components/UpdateUser";
import { EditUser } from "../components/EditUser";
const imgDefault='https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo.png'

export default function UserProfile() {
    const params=useParams();
    const {user}=useAuth()
    const [active, setActive] = useState(false);
    const toggle = () => setActive(!active);
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.user);
    console.log(currentUser)
    useEffect(() => {
        dispatch(getUser(user.uid))
      }, [dispatch, user.id]);
    return(
        <div style={{backgroundColor:'lightgray', display:'flex', flexDirection:'column',justifyContent:'center'}}>
            <h1>{currentUser.email}</h1>
            <img src={user.photoURL?user.photoURL:currentUser.image?currentUser.image:imgDefault} width={200} height={200}/>
            <h1>{currentUser.phone}</h1>
            <h1>{currentUser.firstname}</h1>
            <h1>{currentUser.lastname}</h1>
            <button onClick={()=>{toggle()}}>{user.uid?user.uid:currentUser.id}</button>
            <Modal active={active} toggle={toggle} children={<EditUser id={user.uid} />}/>
        </div>
    )
}