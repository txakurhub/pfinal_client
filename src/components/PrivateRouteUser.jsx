import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../context/authContext";
import Loading from './Loading';

const PrivateRouteUser = ({ component: Component, ...rest }) => {

<<<<<<< HEAD
    const { userInf } = useAuth();

    // if (!userInf) {
    //     return <Loading/>
    // }
    
=======
    const { userStorage } = useAuth();
    console.log(userStorage)
>>>>>>> 55abfd45cce76a4f8b7319df476ddf51f71950ea
    return (
        <Route {...rest}>{Object.keys(userStorage).length ? <Component /> : <Redirect to="/login" />}</Route>
    )
}

export default PrivateRouteUser
