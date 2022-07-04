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
const Container =  ({ active }) => {
    
    const { id } = useParams();
    const { user } =  useAuth()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser(id))
    }, [dispatch]);
    const currentUser = useSelector(state => state.user);
    console.log(currentUser);

    if (active === "compras") return <Shopping />;
    if (active === "edit") return <EditUser user={currentUser}/>;
    if (active === "favoritos") return <Wishlist />;
    if (active === "carrito") {
        return (
            <PageShopingCart />
        );
    } else {
        return (

        <div>
            <h1>hola</h1>
        </div>
        )
    }
};

export default Container;