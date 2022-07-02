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
    useEffect(() => {
        dispatch(getUser(user.uid))
    }, [dispatch, user.uid]);
    const currentUser = useSelector(state => state.user);
    return (
        <div >
            <div className="flex dark:bg-gray-900 shadow-sm p-6">
                <div className="flex text-2xl font-semibold">
                    <img className="ml-14 mr-14 rounded-full dark:text-white" src={user.photoURL ? user.photoURL : currentUser.image ? currentUser.image : imgDefault} width={50} height={35} />
                    </div>
                    {currentUser.firstname?
                    <div className="dark:text-white self-center">
                    <h1>{currentUser.firstname}</h1><h1>{currentUser.lastname}</h1>
                    </div>:<h1 className="dark:text-white self-center">{user.email}</h1>}               
            </div>
            <div className="flex h-screen ">
                <div className="p-10 border-r w-120 border-gray-200 ">
                    <ul>
                        <h6 className="font-bold mb-4">Acciones</h6>
                        <div className="mr-10 border-l-2 border-gray-100 hover:border-blue-900 transition-all duration-200 delay-150">
                        <li className='flex mb-8 ' onClick={() => { history.push('/') }}>
                            <div className="bg-white shadow-sm  mr-4"><img src={home} width={25} height={25} /></div><button className="self-center ">inicio</button></li>
                        </div>

                        <div className="mr-10 border-l-2 border-gray-100 hover:border-blue-900 transition-all duration-200 delay-150">
                        <li className='flex mb-8'>
                            <div className="bg-white shadow-sm mr-4"><img src={bag} width={25} height={25} /></div><button className="self-center">Compras</button></li>
                        </div>
                    </ul>
                    
                    <ul>
                        <h6 className="font-bold mb-4">Configuracion</h6>
                        <div className="mr-2 border-l-2 border-gray-100 hover:border-blue-900 transition-all duration-200 delay-150">
                        <li className='flex mb-8' onClick={() => { toggle() }}>
                            <div className="bg-white shadow-sm mr-4"><img src={edit} width={25} height={25} /></div><button className="self-center">Editar perfil</button></li>
                        </div>
                    </ul>

                </div>
                <div className="p-6">
                    <div className="gird grid-cols ">
                        <div>
                            <EditUser id={user.uid} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}