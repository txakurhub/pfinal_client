// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, Route } from 'react-router-dom'
// import { getUser } from '../redux/actions';

// const PrivateRouteAdmin = ({ component: Component, ...rest }) => {

//     const dispatch = useDispatch()
//     const users = useSelector(state => state.user)

//     useEffect(() => {
//         dispatch(getUser(id))
//     }, [dispatch])

//     return (
//         <Route {...rest}>{users.admin ? <Component /> : <Redirect to="/" />}</Route>
//     )

// }

// export default PrivateRouteAdmin