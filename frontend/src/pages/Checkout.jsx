import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { saveBooking } from "../services/BookingService";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";

export const Checkout = () => {

    const location = useLocation(); // Hook para obtener la URL actual
    const params = new URLSearchParams(location.search); // Obtenemos los query string de la URL
    const seatId = params.get('seatId'); // Obtenemos el id del asiento seleccionado

    const state = location.state || {}; // Obtenemos el state de la URL
    const price = state.price || 0; // Obtenemos el precio del state
    const movie = state.movie || {}; // Obtenemos la pelicula del state

    const {functionId} = useParams(); // Obtenemos el id de la funcion de la URL

    const [isLoading,setIsLoading] = useState(false); // Estado para manejar la carga de la pagina
    const [errorMessage,setErrorMessage] = useState(''); // Estado para manejar los errores
    const [successMessage,setSuccessMessage] = useState(''); // Estado para manejar los mensajes de exito

    //Estado para manejar el formulario
    const [form,setForm] = useState(
        {
            "name":"",
            "lastName":"",
            "phone":"",
            "cardNumber":"",
            "expirationDate":"",
            "cvv":"",
            "dni":""
        }
    )

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleCheckout = async () => {

        //Validaciones para la entrada del usuario
        if(!form.name||!form.lastName||!form.phone||!form.cardNumber||!form.expirationDate||!form.cvv||!form.dni) {
            setErrorMessage("Por favor, completa todos los campos.");
            return;
        }

        try {
            setIsLoading(true); // Comienza la carga
            await saveBooking({
                seatId: seatId,
                functionId: functionId,
            })
            setIsLoading(false); // Termina la carga
            setSuccessMessage("Compra realizada con éxito! Redirigiendo a la página principal"); // Mensaje de exito
            setTimeout(() => {
                window.location.replace('/movies'); // Redirige a la pagina principal
            }, 5000); // Espera 3 segundos antes de redirigir
        } catch (error) {
            
            if(error.message.includes('Elige otro asiento')) {
                setErrorMessage('El asiento ya fue reservado'); // Mensaje de error
            } else {
                console.error(error); // Muestra el error en la consola
                setErrorMessage(error.message);
            }
            
        } finally {
            setIsLoading(false); // Termina la carga
        }
    }

    if(isLoading) return <LoadingSpinner /> // Si la carga es true, muestra el spinner

    return (
        <>
            <Header />
            <div className="bg-black text-white min-h-screen py-8 px-4 sm:px-6">
                <div className="max-w-md mx-auto">
                {/* Encabezado */}
                <div className="mb-8 text-center border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-light tracking-tight mb-2">Checkout</h1>
                    <h2 className="text-xl text-white/80">Película: {movie.name}</h2>
                </div>

                {/* Imagen y precio */}
                <div className="flex flex-col items-center mb-8">
                    <img 
                    src={movie.imageUrl} 
                    className="w-40 h-60 object-cover rounded-lg shadow-lg mb-4 border border-white/10"
                    alt={movie.name} 
                    />
                    <p className="text-2xl font-light">${price.toFixed(2)}</p>
                </div>

                {/* Alerta demostrativa */}
                <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mb-6 text-sm text-yellow-100">
                    Este formulario es solo demostrativo. No se realiza validación de datos de tarjeta ni integración con pasarelas de pago.
                </div>

                {/* Formulario */}
                <form 
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleCheckout();
                    }}
                    className="space-y-4"
                >
                    {/* Grupo de inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40"
                        name="name"
                        value={form.name} 
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input 
                        type="text" 
                        placeholder="Apellido" 
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleInputChange}
                        />
                    </div>
                    </div>

                    <input 
                    type="tel" 
                    placeholder="Teléfono" 
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    />

                    <input 
                    type="text" 
                    placeholder="Número de tarjeta" 
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleInputChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                    <input 
                        type="month" 
                        placeholder="MM/AA" 
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40"
                        name="expirationDate"
                        value={form.expirationDate}
                        onChange={handleInputChange}
                    />
                    <input 
                        type="text" 
                        placeholder="CVV" 
                        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleInputChange}
                    />
                    </div>

                    <input 
                    type="text" 
                    placeholder="DNI" 
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40"
                    name="dni"
                    value={form.dni}
                    onChange={handleInputChange}
                    />

                    <button
                    type="submit" 
                    className="cursor-pointer w-full py-3 bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition-all duration-200 mt-6"
                    >
                    Confirmar Compra
                    </button>
                </form>

                {/* Mensajes de estado */}
                {successMessage && (
                    <div className="mt-6 p-3 bg-green-900/30 border border-green-700/50 rounded-md text-green-100 text-center">
                    {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mt-6 p-3 bg-red-900/30 border border-red-700/50 rounded-md text-red-100 text-center">
                    {errorMessage}
                    </div>
                )}
                </div>
            </div>
        </>
    );
}