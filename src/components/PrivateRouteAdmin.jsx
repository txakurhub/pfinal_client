import { Route } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import Error404 from './Error404'
// import Loading from './Loading'

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {

  const { userStorage } = useAuth(); 

  // if (!userStorage) {
  //   return <Loading />
  // }

  return (
    // cambiar la varia de false a true
    <Route {...rest}>{userStorage.admin ? <Component /> : <Error404 />}</Route>
  )
}

export default PrivateRouteAdmin