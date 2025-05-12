import { Navigate } from "react-router-dom";

//Componente generico para proteger rutas
export const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('authToken');

    if(!token) {
        return <Navigate to="/login" replace />
    }

    return children;
}