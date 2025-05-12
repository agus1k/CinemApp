import { useState, useEffect } from "react";
import { getAllMovies } from "../../../services/MovieService";

export const FunctionForm = ({form,handleInputChange,handleSubmit,errorMessage,successMessage}) => {

    //Hooks para inicializar peliculas
    const [movies,setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getAllMovies();
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        fetchMovies();
    },[])

    //========= VISTA =========
    return (
    <>
        <Header />    
        <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
            <form 
            className="w-full max-w-md space-y-6"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            >
            <h2 className="text-3xl font-light text-center mb-8">Crear Nueva Función</h2>
            
            <div className="space-y-4">
                <div className="relative">
                <label htmlFor="date" className="inline -top-6 left-4 text-white/70 text-sm">
                    Fecha y hora
                </label>
                <input 
                    type="datetime-local" 
                    id="date"
                    name="date" 
                    value={form.date} 
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                />
                </div>

                <div className="relative">
                <label htmlFor="movieId" className="inline -top-6 left-4 text-white/70 text-sm">
                    Película
                </label>
                <select 
                    id="movieId"
                    name="movieId" 
                    value={form.movieId} 
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                >
                    <option value={""}>Seleccione una película</option>
                    {movies.map((movie) => (
                    <option 
                        key={movie.id} 
                        value={movie.id} 
                        className="bg-black text-white"
                    >
                        {movie.name}
                    </option>
                    ))}
                </select>
                </div>

                <div className="relative">
                <label htmlFor="auditoriumId" className="inline -top-6 left-4 text-white/70 text-sm">
                    Sala (1 a 10)
                </label>
                <input 
                    type="number" 
                    id="auditoriumId"
                    name="auditoriumId" 
                    placeholder="Número de sala"
                    value={form.auditoriumId} 
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                />
                </div>

                <div className="relative">
                <label htmlFor="price" className="inline -top-5 left-4 text-white/70 text-sm">
                    Precio
                </label>
                <input 
                    type="number" 
                    id="price"
                    name="price" 
                    placeholder="Precio de la entrada"
                    value={form.price} 
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                />
                </div>
            </div>

            <button 
                type="submit"
                className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
            >
                {form.id ? "Actualizar Función" : "Crear Función"}
            </button>

            {successMessage && (
                <div className="bg-green-900/30 border border-green-700/50 text-green-100 px-4 py-3 rounded-lg mt-4 text-center">
                {successMessage}
                </div>
            )}
            
            {errorMessage && (
                <div className="bg-red-900/30 border border-red-700/50 text-red-100 px-4 py-3 rounded-lg mt-4 text-center">
                {errorMessage}
                </div>
            )}
            </form>
        </div>
    </>
    );
}