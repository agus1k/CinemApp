import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children, rolesAllowed}) => {
    const token = localStorage.getItem('authToken');

    if (!token) return <Navigate to='/login'/>

    try {
        const decoded = jwtDecode(token);
        const roles = decoded.roles || '';

        const hasAccess = rolesAllowed.some(role => roles.includes(role));
        return hasAccess ? children : <Navigate to="/login" />;
    } catch(e) {
        console.log(e);
        return <Navigate to='/login' />
    }
};