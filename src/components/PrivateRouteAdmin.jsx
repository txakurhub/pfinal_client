// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, Route } from 'react-router-dom'
// import { getUsers } from '../redux/actions';

// const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
//     const dispatch = useDispatch()
//     const users = useSelector(state => state.users)
//     console.log("usuarios:", users)
//     const prueba = users.find(e => e.admin === true)
//     console.log(prueba)
//     console.log(users)

//     useEffect(() => {
//         dispatch(getUsers())
//     }, [dispatch, users])


//     return (
//         <Route {...rest}>{prueba && <Component />}</Route>
//     )

// }

// export default PrivateRouteAdmin