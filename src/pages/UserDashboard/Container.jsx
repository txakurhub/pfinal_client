import React, { useEffect } from "react";
import { EditUser } from './EditUser'
import PageShopingCart from '../PageShopingCart'
import Wishlist from '../Wishlist'
import Shopping from "../Shopping";
import { Profile } from "./Profile";
import { useAuth } from "../../context/authContext";
import { useParams } from "react-router-dom";
import userimg from '../../assets/user.png'

const Container =  ({ active }) => { 
    const { id } = useParams();
    const { user,userStorage } =  useAuth()
    if (active === "compras") return (<section className="h-screen bg-gray-100"><Shopping email={user.email} /></section>)
    if (active === "edit") return <EditUser 
    id={id} 
    lastname={userStorage.lastname}
    firstname={userStorage.firstname}
    phone={userStorage.phone}
    password={userStorage.password}
    image={userStorage.image?userStorage.image:userStorage.photoURL}
    />;
    if (active === "favoritos") return ( <section className="h-screen bg-gray-100">
    <Wishlist /></section>)
    if (active === "carrito") { return (<PageShopingCart />)} 
    if (active === "perfil"){return (<section className="h-screen bg-gray-100"><Profile user={userStorage}/></section>)}
    else {
        return (<section className="h-screen bg-gray-100"><Profile user={userStorage}/></section>
        )
    }
};

export default Container;