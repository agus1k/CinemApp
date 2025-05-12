import { api,handleAxiosError } from "./Api";

export const getAllMovies = async () => {
    try {
        const response = await api.get('/movies')
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

export const getAllMoviesWithGenre = async () => {

    try {
        const response = await api.get('/movies/with-genre')
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

export const getMovieById = async (movieId) => {
    try {
        const response = await api.get(`/movies/${movieId}`)
        return response;
    } catch (error) {
       handleAxiosError(error);
    }
}

export const createMovie = async (movie) => {
    try {
        const response = await api.post('/movies', movie)
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

export const updateMovie = async (movieId, movie) => {
    try {
        const response = await api.put(`/movies/update/${movieId}`, movie)
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

export const deleteMovie = async (movieId) => {
    try {
        const response = await api.delete(`/movies/delete/${movieId}`)
        return response;
    } catch (error) {
        handleAxiosError(error);
    }
}

