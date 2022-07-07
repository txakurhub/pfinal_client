import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";

const PrivateRouteUser = ({ component: Component, ...rest }) => {

    const { userInf } = useAuth();

    if (userInf === false) {
        return <p>Loading ...</p>
    }

    return (
        <Route {...rest}>{userInf ? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser