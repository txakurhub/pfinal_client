// NO TOCAR ESTE COMPONENTE

import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";

const PrivateRouteUser = ({ component: Component, ...rest }) => {
    console.log({...rest})

    const { user } = useAuth();

    return (
        <Route {...rest}>{user ? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser





// import { useAuth } from "../context/authContext";
// const { user } = useAuth();