import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";
import Loading from './Loading';

const PrivateRouteUser = ({ component: Component, ...rest }) => {

    const { userStorage } = useAuth();
    console.log(userStorage)
    return (
        <Route {...rest}>{Object.keys(userStorage).length ? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser
