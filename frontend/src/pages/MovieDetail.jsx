import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getMovieById } from "../services/MovieService";
import { formattedDateTime } from "../assets/utils/dateUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";

export const MovieDetail = () => {
    
    const { movieId } = useParams();
    
    const [movie,setMovie] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate(); //Hook para navegar entre rutas

    //Hook para mostrar datos desde la api, cambia si la movieId es distinta
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await getMovieById(movieId);
                setMovie(response.data);
            } catch (error) {
                console.error('Error al cargar pelicula: ', error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovie();
    },[movieId]) 
    
    //En caso de carga
    if(isLoading) return <LoadingSpinner />

    if(!movie) {
        return <p>No se encontro la pelicula</p>
    }

    return (
        <>
            <Header />
            <div className="bg-black text-white min-h-screen p-6 md:p-10 w-full overflow-hidden">
                <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Sección de imagen */}
                    <div className="md:w-1/2">
                    <img 
                        src={movie.imageUrl} 
                        className="w-full rounded-xl shadow-2xl object-cover aspect-[2/3]"
                        alt={movie.name} 
                    />
                    </div>

                    {/* Sección de contenido */}
                    <div className="md:w-1/2 flex flex-col">
                    {/* Título */}
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">{movie.name}</h1>
                    
                    {/* Género */}
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-medium border border-white/10">
                        {movie.genre.name}
                        </span>
                    </div>

                    {/* Descripción */}
                    <div className="mb-8">
                        <h2 className="text-xl font-light mb-3 text-white/80">Sinopsis</h2>
                        <p className="text-white/70 leading-relaxed">{movie.description}</p>
                    </div>

                    {/* Funciones */}
                    <div className="mt-auto">
                        <h2 className="text-xl font-light mb-4 text-white/80">Funciones disponibles</h2>
                        
                        {movie.function.length === 0 ? (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                            <p className="text-white/70">Actualmente no hay funciones disponibles</p>
                        </div>
                        ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {movie.function.map(f => (
                            <button
                                key={f.id}
                                onClick={() => {
                                if (localStorage.getItem('authToken')) {
                                    navigate(`/movies/${movieId}/function/${f.id}`, { state: { movie: movie } });
                                } else {
                                    navigate("/login", { replace: true });
                                }
                                }}
                                className="cursor-pointer bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-center"
                            >
                                <span className="block text-lg font-light">{formattedDateTime(f.date)}</span>
                                <span className="text-xs text-white/50">Haz clic para reservar</span>
                            </button>
                            ))}
                        </div>
                        )}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
);

}