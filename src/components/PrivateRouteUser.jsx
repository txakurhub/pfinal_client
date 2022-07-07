import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";

const PrivateRouteUser = ({ component: Component, ...rest }) => {

    const { userStorage } = useAuth();

    if (!userStorage) {
        return <p>Loading ...</p>
    }

    return (
        <Route {...rest}>{userStorage ? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser