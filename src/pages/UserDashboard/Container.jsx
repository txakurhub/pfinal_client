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
    const { user } =  useAuth()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser(id))
    }, [dispatch]);
    const currentUser = useSelector(state => state.user);
console.log(currentUser);
    if (active === "compras") return <Shopping email={user.email} />;
    if (active === "edit") return <EditUser id={id} 
    lastname={currentUser.lastname}
    firstname={currentUser.firstname}
    phone={currentUser.phone}
    password={currentUser.password}
    image={currentUser.image}
    />;
    if (active === "favoritos") return <Wishlist />;
    if (active === "carrito") { return (<PageShopingCart />);
    } 
    if (active === "perfil"){return (
        <div className="flex flex-col justify-center w-100">
        <img src={currentUser.image?currentUser.image:currentUser.photoURL?currentUser.photoURL:userimg}   className='self-center object-cover h-50 w-50 rounded-full ' />
        <h1 className="text-4xl">hola {currentUser.firstname!==''?currentUser.firstname+' '+currentUser.lastname:currentUser.displayName!==''?currentUser.displayName:"usuario"}</h1>
    </div>
    )}
    else {
        return (

        <div className="flex flex-col justify-center w-100">
            <img src={currentUser.image?currentUser.image:currentUser.photoURL?currentUser.photoURL:userimg}   className='self-center object-cover h-50 w-50 rounded-full ' />
            <h1 className="text-4xl">hola {currentUser.firstname!==''?currentUser.firstname+' '+currentUser.lastname:currentUser.displayName!==''?currentUser.displayName:"usuario"}</h1>
        </div>
        )
    }
};

export default Container;
