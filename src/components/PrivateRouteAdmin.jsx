import { Route } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import Error404 from './Error404'
import Loading from './Loading'

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {

  const { userInf } = useAuth();

  if (userInf === false) {
    return <Loading />
  }
  else{

    return (
      // cambiar la varia de false a true
      <Route {...rest}>{userInf && userInf.admin === "true" || userInf && userInf.admin === true ? <Component /> : <Error404 />}</Route>
      )
    }
}

export default PrivateRouteAdmin