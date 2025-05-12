import { api,handleAxiosError } from "./Api";

//Peticion generica
const postRequest = async (url, data) => {
    try {
        const response = await api.post(url, data)
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

export const register = async ({username, password, email}) => {
    return postRequest('/register',{username,password,email});
}

export const login = async ({username,password}) => {    
    const response = await postRequest('/login',{username,password});

    localStorage.setItem('authToken',response.data.token);
     // Guardamos el token en el localStorage
    return response;
}

export const getUserData = async () => {
    try {
        const response = await api.get('/users/get')
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

