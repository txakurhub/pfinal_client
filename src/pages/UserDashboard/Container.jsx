import React, { useEffect } from "react";
import { EditUser } from '../../components/EditUser'
import PageShopingCart from '../PageShopingCart'
import Wishlist from '../Wishlist'
import Shopping from "../Shopping";
import { useAuth } from "../../context/authContext";
import { useParams } from "react-router-dom";
import userimg from '../../assets/user.png'

const Container =  ({ active }) => {
    
    const { id } = useParams();
    const { userStorage } =  useAuth()

    if (active === "compras") return <Shopping email={userStorage.email} />;
    if (active === "edit") return <EditUser id={id} user={userStorage}/>;
    if (active === "favoritos") return <Wishlist />;
    if (active === "carrito") { return (<PageShopingCart />);
    } 
    if (active === "perfil"){return (
        <div className="flex flex-col justify-center w-100">
        <img src={userStorage.image?userStorage.image:userStorage.photoURL?userStorage.photoURL:userimg}   className='self-center object-cover h-50 w-50 rounded-full ' />
        <h1 className="text-4xl">hola {userStorage.firstname!==''?userStorage.firstname+' '+userStorage.lastname:userStorage.displayName!==''?userStorage.displayName:"usuario"}</h1>
    </div>
    )}
    else {
        return (

        <div className="flex flex-col justify-center w-100">
            <img src={userStorage.image?userStorage.image:userStorage.photoURL?userStorage.photoURL:userimg}   className='self-center object-cover h-50 w-50 rounded-full ' />
            <h1 className="text-4xl">hola {userStorage.firstname!==''?userStorage.firstname+' '+userStorage.lastname:userStorage.displayName!==''?userStorage.displayName:"usuario"}</h1>
        </div>
        )
    }
};

export default Container;
