import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import Loading from './Loading';

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {

  const { userInf } = useAuth();

  if (userInf === false) {
    return <Loading/>
  }

  return (
    // cambiar la varia de false a true
    <Route {...rest}>{userInf && userInf.admin === "true" || userInf && userInf.admin === true ? <Component /> : <Redirect to="/" />}</Route>
  )
}

export default PrivateRouteAdmin