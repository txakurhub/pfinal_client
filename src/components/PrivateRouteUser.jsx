import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";

const PrivateRouteUser = ({ component: Component, ...rest }) => {
<<<<<<< Updated upstream

    const { userStorage } = useAuth();

    if (!userStorage) {
        return <p>Loading ...</p>
    }

=======
    const { user } = useAuth();
    const currentUser = useSelector(state => state.user);
    console.log('esto es ',user);
>>>>>>> Stashed changes
    return (
        <Route {...rest}>{userStorage ? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser