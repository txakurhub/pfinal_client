import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";
import { useSelector } from 'react-redux';
const PrivateRouteUser = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    const currentUser = useSelector(state => state.user);
    return (
        <Route {...rest}>{user? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser
