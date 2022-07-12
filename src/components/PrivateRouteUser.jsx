import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";
import Loading from './Loading';

const PrivateRouteUser = ({ component: Component, ...rest }) => {

    const { userStorage } = useAuth();

    return (
        <Route {...rest}>{userStorage ? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser
