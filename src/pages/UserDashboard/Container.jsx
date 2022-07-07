import React, { useEffect } from "react";
import { EditUser } from '../../components/EditUser'
import PageShopingCart from '../PageShopingCart'
import Wishlist from '../Wishlist'
import Shopping from "../Shopping";
import { getUser } from "../../redux/actions";
import { useAuth } from "../../context/authContext";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import userimg from '../../assets/user.png'
const Container =  ({ active }) => {
    
    const { id } = useParams();
    const { user,userStorage } =  useAuth()
   
    if (active === "compras") return <Shopping email={user.email} />;
    if (active === "edit") return <EditUser id={id} 
    lastname={userStorage.lastname}
    firstname={userStorage.firstname}
    phone={userStorage.phone}
    password={userStorage.password}
    image={userStorage.image}
    />;
    if (active === "favoritos") return <Wishlist />;
    if (active === "carrito") { return (<PageShopingCart />);
    } 
    if (active === "perfil"){return (
        <div className="flex flex-col justify-center w-100">
        <img src={userStorage.image!==''?userStorage.image:userStorage.photoURL?userStorage.photoURL:userimg}   className='self-center object-cover h-50 w-50 rounded-full ' />
        <h1 className="text-4xl">hola {userStorage.firstname?userStorage.firstname+' '+userStorage.lastname:userStorage.displayName!==''?userStorage.displayName:"usuario"}</h1>
    </div>
    )}
    else {
        return (

        <div className="flex flex-col justify-center w-100">
            <img src={userStorage.image!==''?userStorage.image:userStorage.photoURL?userStorage.photoURL:userimg}   className='self-center object-cover h-50 w-50 rounded-full ' />
            <h1 className="text-4xl">hola {userStorage.firstname!==''?userStorage.firstname+' '+userStorage.lastname:userStorage.displayName!==''?userStorage.displayName:"usuario"}</h1>
        </div>
        )
    }
};

export default Container;