import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getFunction } from "../services/FunctionService";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export const FunctionDetail = () => {

    const location = useLocation(); // Hook para obtener la URL actual
    const state = location.state || {}; // Obtenemos el state de la URL
    const movie = state.movie || {}; // Obtenemos la pelicula del state

    const { functionId, movieId } = useParams();  //Obtenemos la functionId de la URL

    const navigate = useNavigate(); //Hook para navegar entre rutas

    const [func,setFunc] = useState(null); // Estado para manejar las funciones

    const [isLoading,setIsLoading] = useState(true); //Estado para manejar la carga

    const [selectedSeat,setSelectedSeat] = useState(null); // Estado para manejar el asiento seleccionado

    //Traemos datos del back, con la functionId de la URL como condicional
    useEffect(() => {
        const fetchFunction = async () => {
            try {
                const response = await getFunction(functionId);
                setFunc(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            } 
        }
        fetchFunction();
    },[functionId])

    if (isLoading) return <LoadingSpinner />

    return (
        <>  
            <Header />
            <div className="bg-black text-white min-h-screen p-6">
                {/* Cabecera */}
                <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">{movie.name}</h1>
                <h2 className="text-xl text-white/60">Sala {func.auditorium.id}</h2>
                </div>

                {/* Imagen de la película */}
                <div className="flex justify-center mb-10">
                <img 
                    src={movie.imageUrl} 
                    className="w-full max-w-md rounded-lg shadow-xl border border-white/10"
                    alt={movie.name} 
                />
                </div>

                {/* Pantalla de cine */}
                <div className="mb-8 text-center">
                <div className="inline-block px-8 py-2 bg-white/10 rounded-t-lg border border-white/10">
                    <span className="text-white/80">PANTALLA</span>
                </div>
                </div>

                {/* Asientos */}
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 mb-10 mx-auto max-w-2xl">
                {func.functionSeats.map(fs => (
                    <button
                    key={fs.id}
                    className={`
                        aspect-square flex items-center justify-center rounded-sm border 
                        ${selectedSeat === fs.seat.id 
                        ? 'bg-white text-black border-white' 
                        : fs.avaible 
                            ? 'bg-white/5 border-white/20 hover:bg-white/10 cursor-pointer'  
                            : 'bg-red-900/30 border-red-700/50 cursor-not-allowed'
                        }
                        transition-all duration-200
                    `}
                    onClick={() => fs.avaible && setSelectedSeat(fs.seat.id)}
                    disabled={!fs.avaible}
                    >
                    {fs.seat.number}
                    </button>
                ))}
                </div>

                {/* Botón de reserva */}
                <div className="text-center">
                <button 
                    className={`
                    px-8 py-3 rounded-lg border border-white/20 text-lg cursor-pointer
                    ${selectedSeat 
                        ? 'bg-white/10 hover:bg-white/20 hover:border-white/30' 
                        : 'bg-white/5 opacity-50 cursor-not-allowed'
                    }
                    transition-all duration-200
                    `}
                    disabled={!selectedSeat} 
                    onClick={() => {
                    navigate(`/movies/${movieId}/function/${func.id}/checkout?seatId=${selectedSeat}`, {
                        state: { price: func.price, movie: movie }
                    })
                    }}
                >
                    Reservar - ${func.price}
                </button>
                </div>
            </div>
        </>
    );
}