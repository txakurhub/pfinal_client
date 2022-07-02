import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getUser } from "../redux/actions";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import UpdateUser from "../components/UpdateUser";
import { EditUser } from "../components/EditUser";
import { useHistory } from "react-router-dom";
// import img5 from "../assets/5.jpg";
import user from '../assets/user.png'
import home from '../assets/home.png'
import bag from '../assets/shopping-bag.png'
import edit from '../assets/edit.png'
const imgDefault = user


export default function UserProfile() {
    const history = useHistory()
    const params = useParams();
    const { user } = useAuth()
    const [active, setActive] = useState(false);
    const toggle = () => setActive(!active);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getUser(user.uid))
    }, [dispatch, user.id]);
    return (
        <div >
            <div className="flex bg-gray-100 shadow-sm p-6">
                <div className="flex text-2xl font-semibold">
                    <img className="ml-14 mr-14" src={user.photoURL ? user.photoURL : currentUser.image ? currentUser.image : imgDefault} width={50} height={35} />
                    <div className='flex self-center'>
                        <h1 className="mr-2">{currentUser.firstname}</h1>
                        <h1 >{currentUser.lastname}</h1>
                    </div>
                </div>
                {/* <h1 className="flex-0">Mi Perfil</h1> */}

                {/* <h2>{currentUser.email}</h2>
                <h1>{currentUser.phone}</h1> */}
                {/* <h1>{user.uid ? user.uid : currentUser.id}</h1> */}
            </div>
            <div className="flex h-screen">
                <div className="p-6 border-r w-90 border-gray-200 ">
                    <ul>
                        <h6 className="font-bold mb-4">Acciones</h6>
                        <li className='flex mb-8' onClick={() => { history.push('/') }}>
                            <div className="bg-white shadow-sm mr-4"><img src={home} width={25} height={25} /></div><button className="self-center">inicio</button></li>
                        <li className='flex mb-8'>
                            <div className="bg-white shadow-sm mr-4"><img src={bag} width={25} height={25} /></div><button className="self-center">Mis compras</button></li>
                    </ul>
                    <ul>
                        <h6 className="font-bold mb-4">Configuracion</h6>
                        <li className='flex mb-8' onClick={() => { toggle() }}>
                            <div className="bg-white shadow-sm mr-4"><img src={edit} width={25} height={25} /></div><button className="self-center">Editar perfil</button></li>
                    </ul>
                </div>
                <div className="p-6">
                    <div className="gird grid-cols-">
                        <div className="bg-gray-100 p-6">
                            <EditUser id={user.uid} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}