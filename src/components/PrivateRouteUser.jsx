import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";
import Loading from './Loading';

const PrivateRouteUser = ({ component: Component, ...rest }) => {

    const { userInf } = useAuth();

    if (!userInf) {
        return <Loading/>
    }

    return (
        <Route {...rest}>{userInf ? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser