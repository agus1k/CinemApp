import { useEffect, useState } from "react";
import { createMovie } from "../../../services/MovieService";
import { getAllMovies } from "../../../services/MovieService";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { MovieForm } from "./MovieForm";
import { MovieTable } from "./MovieTable";
import { updateMovie } from "../../../services/MovieService";
import { deleteMovie } from "../../../services/MovieService";
import Header from "../../../components/Header";

const initDataForm = {
    "id": null,
    "name": "",
    "genreId": 0,
    "description": "",
    "imageUrl": ""
}

export const AdminMovies = () => {

    //********** USE STATE HOOKS **********//

    // Hook para manejar el estado del formulario
    const [form, setForm] = useState(initDataForm);
    // Hook para manejar la tabla de peliculas 
    const [movies, setMovies] = useState([]);

    // Hook para manejar la pelicula seleccionada
    const [movieSelected, setMovieSelected] = useState({
        id: null,
        name: "",
        genreId: "",
        description: "",
        imageUrl: ""
    });

    // Hook para manejar mensajes de exito, error y el estado de carga
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //********** USE EFFECT HOOKS **********//

    // Inicializamos las peliculas al cargar la pagina
    useEffect(() => {
        const fetchMovies = async () =>{
            try {
                const response = await getAllMovies();
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        fetchMovies();
    },[])

    // Actualizamos el formulario cuando se selecciona una pelicula
    useEffect(() => {
        setForm(movieSelected)
    },[movieSelected])

    //********** HANDLERS **********//

    // Manejo de cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "genreId" ? parseInt(value) : value
        });
    }
    
    // Manejo de pelicula seleccionada
    const handleMovieSelected = (movie) => {
        console.log("Pelicula seleccionada:", movie);
        setMovieSelected(movie);
    }

    // Manejo de pelicula eliminada
    const handleMovieDelete = async (movieId) => {
        setSuccessMessage("");
        setErrorMessage("");
        try {
            await deleteMovie(movieId)
        } catch (error) {
            setErrorMessage("Error al eliminar la pelicula, intenta nuevamente");
            console.error("Error deleting movie:", error);
        }
        
        setMovies(movies.filter(movie => movie.id !== movieId));
        setSuccessMessage("Pelicula eliminada con exito");
    }

    // Manejo de envio de formulario
    const handleSubmit = async () => {
        setSuccessMessage("");
        setErrorMessage("");

        if (form.name === "" || form.genreId <= 0 || form.description === "" || form.imageUrl === "") {
            setErrorMessage("Por favor completa todos los campos");
            return;
        } else if (form.description.length > 1000) {
            setErrorMessage("La descripcion no puede superar los 1000 caracteres");
            return;
        } else if (form.name.length > 100) {
            setErrorMessage("El nombre no puede superar los 100 caracteres");
            return;
        }

        try {
            //Iniciamos la carga
            setIsLoading(true);
            console.log("Enviando form:", form);

            if (form.id) {
                // Si la pelicula ya existe, la actualizamos
                await updateMovie(form.id, form);
                setErrorMessage("");
                setSuccessMessage("Pelicula actualizada con exito");

                setMovies(movies.map(movie => {
                    if (movie.id === form.id) {
                        return form;
                    } else {
                        return movie;
                    }   
                }));
            } else {
              const response = await createMovie(form);
              setErrorMessage("");
                // Si la pelicula no existe, la creamos
                setSuccessMessage("Pelicula creada con exito");

                setMovies([...movies, response.data]);
            }
            
            setForm(initDataForm);
        } catch (error) {
            setIsLoading(false);
            setSuccessMessage("");

            // Manejo de errores
            setErrorMessage("Algo salio mal, intenta nuevamente");
            console.log(error);
        } finally {
            console.log(movies)
            setIsLoading(false);
        }
    }
    

    if (isLoading) return <LoadingSpinner />

    return (
        <>  
            <Header />
            <MovieForm form={form} handleInputChange={handleInputChange} handleSubmit={handleSubmit} errorMessage={errorMessage} successMessage={successMessage} />
            <MovieTable movies={movies} handleMovieSelected={handleMovieSelected} handleMovieDelete={handleMovieDelete}/>
        </>
    )
}