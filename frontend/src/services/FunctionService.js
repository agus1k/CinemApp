import { api,handleAxiosError } from "./Api";

export const getFunction = async (functionId) => {
    try {
        const response = await api.get(`/functions/${functionId}`);
        return response;
    } catch (error) {
        handleAxiosError(error)
    }
}

export const getAllFunctions = async () => {
    try {
        const response = await api.get('/functions')
        return response;
    } catch (error) {
        handleAxiosError(error)
    }
}

export const createFunction = async (func) => {
    try {
        const response = api.post('/functions',func)
        return response;
    } catch(error) {
        handleAxiosError(error);
    }
}

export const deleteFunction = async (id) => {
    try {
        const response = api.delete(`/functions/delete/${id}`)
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

export const updateFunction = async (id,func) => {
    try {
        const response = api.put(`/functions/update/${id}`,func)
        return response
    } catch (error) {
        handleAxiosError(error);
    }
}