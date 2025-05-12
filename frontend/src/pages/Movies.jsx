import { useEffect, useState } from "react"
import { getAllMoviesWithGenre } from "../services/MovieService"
import { Link } from "react-router-dom";
import Header from "../components/Header";

export const Movies = () => {

    const [movies,setMovies] = useState([]);
    
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await getAllMoviesWithGenre();
            setMovies(response.data);
        }
        fetchMovies();
    }, []);

    return (
        <>
          <Header />
          <div className="bg-black min-h-screen p-8">
            <h1 className="text-4xl font-bold text-white mb-12 text-center tracking-tighter">PELÍCULAS DISPONIBLES</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {movies.map(movie => (
                <Link 
                  to={`/movies/${movie.id}`} 
                  key={movie.id} 
                  className="group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none"
                >
                  <div className="bg-black rounded-lg overflow-hidden shadow-lg border border-gray-800 h-[550px] w-[300px] mx-auto flex flex-col">
                    <div className="overflow-hidden h-[400px]">
                      <img 
                        src={movie.imageUrl} 
                        alt={movie.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{movie.name}</h3>
                        <p className="text-gray-400 uppercase text-sm tracking-wider">{movie.genreDto.name}</p>
                      </div>
                      
                      <div className="mt-4">
                        <div className="h-px bg-gray-700 w-full group-hover:bg-white transition-colors duration-300"></div>
                        <p className="text-xs text-gray-500 mt-2 text-right">Haz click para ver detalles</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )
}