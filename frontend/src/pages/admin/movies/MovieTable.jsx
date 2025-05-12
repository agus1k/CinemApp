import { useState } from "react";
import Header from "../../../components/Header";

export const MovieTable = ({movies, handleMovieSelected, handleMovieDelete}) => {
    // Estado para manejar la confirmación de eliminación
    const [movieToDelete, setMovieToDelete] = useState(null);
    
    // Función para manejar la solicitud de eliminación
    const confirmDelete = (movieId, movieName) => {
        setMovieToDelete({id: movieId, name: movieName});
    };
    
    // Función para confirmar la eliminación
    const executeDelete = () => {
        if (movieToDelete) {
            handleMovieDelete(movieToDelete.id);
            setMovieToDelete(null);
        }
    };
    
    // Función para cancelar la eliminación
    const cancelDelete = () => {
        setMovieToDelete(null);
    };

    return (
        <>
            <Header />
            <div className="bg-black text-white min-h-screen p-6 md:p-10">
                <h2 className="text-3xl font-light mb-8">Películas</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-4 px-4 text-white/80 font-light">Nombre</th>
                                <th className="text-left py-4 px-4 text-white/80 font-light">Género</th>
                                <th className="text-left py-4 px-4 text-white/80 font-light">Descripción</th>
                                <th className="text-left py-4 px-4 text-white/80 font-light">Imagen</th>
                                <th className="text-left py-4 px-4 text-white/80 font-light">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie) => {
                                const genreNames = {
                                    '1': 'Sci-Fi',
                                    '2': 'Acción',
                                    '3': 'Romance',
                                    '4': 'Terror',
                                    '5': 'Cyberpunk',
                                    '6': 'Comedia',
                                    '7': 'Thriller'
                                };

                                return (
                                    <tr 
                                        key={movie.id} 
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="py-4 px-4 text-white/90">{movie.name}</td>
                                        <td className="py-4 px-4 text-white/70">{genreNames[movie.genreId] || movie.genreId}</td>
                                        <td className="py-4 px-4 text-white/70 max-w-xs truncate">{movie.description}</td>
                                        <td className="py-4 px-4 text-white/70 max-w-xs truncate">{movie.imageUrl}</td>
                                        <td className="py-4 px-4 flex space-x-2">
                                            <button 
                                                onClick={() => handleMovieSelected(movie)}
                                                className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded hover:bg-white/20 transition-colors cursor-pointer"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => confirmDelete(movie.id, movie.name)}
                                                className="bg-red-900/30 border border-red-700/50 text-red-100 px-3 py-2 rounded hover:bg-red-800/40 transition-colors cursor-pointer"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    
                    {movies.length === 0 && (
                        <div className="text-center text-white/60 italic py-10">
                            No hay películas registradas
                        </div>
                    )}
                </div>

                {/* Confirmación de eliminación */}
                {movieToDelete && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
                        <div className="bg-zinc-900 border border-white/10 rounded-lg max-w-md w-full p-6 shadow-lg">
                            <h3 className="text-xl font-light mb-4">Confirmar eliminación</h3>
                            <p className="text-white/80 mb-6">
                                ¿Estás seguro que deseas eliminar la película "<span className="text-white font-medium">{movieToDelete.name}</span>"? 
                                Esta acción no se puede deshacer.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button 
                                    onClick={cancelDelete}
                                    className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={executeDelete}
                                    className="bg-red-900/50 border border-red-700/50 text-red-100 px-4 py-2 rounded hover:bg-red-800/70 transition-colors cursor-pointer"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}