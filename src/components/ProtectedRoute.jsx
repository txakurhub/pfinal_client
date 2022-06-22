import { useAuth } from "../context/authContext";
import { NavLink, useHistory } from "react-router-dom";



export function ProtectedRoute({ children }) {
    const history = useHistory();
    const { user, loading } = useAuth()
    if (loading) return <h1>Loading.....</h1>
    if (!user) {
        console.log("a tu vieja en 4")
        // return <NavLink to="/"/>
        history.push('/')
    } 

    return <>{children}</>

}