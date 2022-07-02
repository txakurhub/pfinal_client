import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";

const PrivateRouteUser = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    console.log(user);
    return (
        <Route {...rest}>{user ? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser
