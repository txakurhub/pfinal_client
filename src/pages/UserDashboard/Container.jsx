import React from "react";
import { EditUser } from './EditUser'
import PageShopingCart from '../PageShopingCart'
import Wishlist from '../Wishlist'
import Shopping from "../Shopping";
import { Profile } from "./Profile";
import { useAuth } from "../../context/authContext";
import { useParams } from "react-router-dom";
import userimg from "../../assets/user.png";

const Container = ({ active }) => { 
    const { id } = useParams();
    const { user,userStorage } =  useAuth(); // usando el user cuando recargas se rompe por eso use el useStorage
    if(active === "compras") return <section className="h-full bg-gray-100 overflow-x-hidden"><Shopping email={userStorage.email} /></section> //tiraba error esta linea con el user.email
    if(active === "edit") return <EditUser 
        id={id} 
        lastname={userStorage.lastname}
        firstname={userStorage.firstname}
        phone={userStorage.phone}
        password={userStorage.password}
        image={userStorage.image?userStorage.image:userStorage.photoURL}
    />;
    if(active === "favoritos") return <section className="h-screen bg-gray-100"><Wishlist /></section>
    if(active === "carrito") return <PageShopingCart />
    if(active === "perfil") {
        return <section className="h-full bg-gray-100"><Profile user={userStorage}/></section>
    } else {
        return <section className="h-screen bg-gray-100"><Profile user={userStorage}/></section>
    }
//   if(active === "perfil") {
//    return (
//    <div className="flex flex-col justify-center w-100">
//      <div className="rounded-full h-[450px] w-[450px] overflow-hidden m-auto my-2.5">
//        <img src={userStorage.image !== '' ? userStorage.image : userStorage.photoURL ? userStorage.photoURL : userimg} className="h-full" />
//      </div>        
//      <h1 className="text-4xl">
//        Hola {userStorage.firstname ? userStorage.firstname + ' ' + userStorage.lastname : userStorage.displayName !== '' ? userStorage.displayName : "Usuario"}
//      </h1>
//    </div>
//    );
//  } else {
//    return (
//      <div className="flex flex-col justify-center w-100">
//        <div className="rounded-full h-[450px] w-[450px] overflow-hidden m-auto my-2.5">
//          <img src={userStorage.image !== '' ? userStorage.image : userStorage.photoURL ? userStorage.photoURL : userimg} className="h-full" />
//        </div>        
//        <h1 className="text-4xl">
//          Hola {userStorage.firstname ? userStorage.firstname + ' ' + userStorage.lastname : userStorage.displayName !== '' ? userStorage.displayName : "Usuario"}
//        </h1>
//      </div>
//    );
//  };

};

export default Container;
