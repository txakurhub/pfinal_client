// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, Route, useParams } from 'react-router-dom'
// import { getUser } from '../redux/actions';

// const PrivateRouteAdmin = ({ component: Component, ...rest }) => {

//     let { userId } = useParams()
//     console.log(userId)
//     const dispatch = useDispatch()
//     const user = useSelector(state => state.user)

//     useEffect(() => {
//         dispatch(getUser({ id: userId.id }))
//     }, [dispatch, user])

//     return (
//         <Route {...rest}>{user.admin === true ? <Component /> : <Redirect to="/" />}</Route>
//     )

// }

// export default PrivateRouteAdmin