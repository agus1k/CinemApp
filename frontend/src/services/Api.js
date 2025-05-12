import axios from "axios";

const baseUrl = 'http://localhost:8080';   

//Creo instancia personalizada de axios para evitar repetir codigo
export const api = axios.create({
    baseURL: baseUrl,
})

//Manejo general de errores
export const handleAxiosError = (error) => {
    if (error.response) {
        throw new Error(`Error ${error.response.status}: ${error.response.data.message || "Algo salio mal"}`);
    } else if (error.request) {
        throw new Error("No se recibio respuesta.");
    } else {
        throw new Error("Error al hacer la solicitud: "+error.message)
    }
}

//Agrego interceptor para que intercepte todas las solicitudes y actualice el token en caso de ser necesario
api.interceptors.request.use(config => {
    const isAuthRoute = config.url.includes('/login') ||config.url.includes('/register');
    const isMovieGet = config.url.includes('/movies') && config.method === 'get';

    if (!isAuthRoute && !isMovieGet) {
        const token = localStorage.getItem('authToken');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            window.location.href = "/login";
            return;
        }
    }
    
    return config;
}, error => Promise.reject(error));