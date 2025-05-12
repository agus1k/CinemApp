import { getUserData } from "../services/UserService";
import { useEffect, useState } from "react";
import { getBookings } from "../services/BookingService";
import { formattedDateTime } from "../assets/utils/dateUtils";
import { cancelBooking } from "../services/BookingService";
import Header from "../components/Header";

export const Profile = () => {
    const [user, setUser] = useState({});
    const [bookings, setBookings] = useState([]);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showCancelBookingConfirm, setShowCancelBookingConfirm] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);

    //Hook para mostrar datos del usuario.
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserData();
                setUser(response);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUser()
    },[])

    //Hook para mostrar reservas del usuario.
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookings();
                setBookings(response);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        }
        fetchBookings();
    },[])

    const confirmCancelBooking = (bookingId) => {
        setBookingToCancel(bookingId);
        setShowCancelBookingConfirm(true);
    };

    const executeCancelBooking = async () => {
        try {
            await cancelBooking(bookingToCancel);
            setBookings((bookings) => bookings.filter((booking) => booking.id !== bookingToCancel));
            setShowCancelBookingConfirm(false);
            setBookingToCancel(null);
        } catch (error) {
            console.error("Error canceling booking:", error);
        }
    };

    const abortCancelBooking = () => {
        setShowCancelBookingConfirm(false);
        setBookingToCancel(null);
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(true);
    };

    const executeLogout = () => {
        localStorage.removeItem('authToken');
        window.location.replace('/movies');
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-black text-white p-6 md:p-10">
                {/* Encabezado del perfil */}
                <div className="mb-10 border-b border-white/10 pb-6">
                <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Perfil</h1>
                <div className="space-y-2">
                    <p className="text-xl text-white/90">@{user.username}</p>
                    <p className="text-white/70">{user.email}</p>
                </div>
                </div>
                
                {/* Sección de reservas */}
                <div className="mb-10">
                <h2 className="text-2xl font-light mb-6 border-b border-white/10 pb-2">Reservas</h2>
                {bookings.length === 0 ? (
                    <p className="text-white/60 italic">No tienes reservas</p>
                ) : (
                    <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 text-white/80 font-light">Asiento</th>
                            <th className="text-left py-3 px-4 text-white/80 font-light">Fecha y hora</th>
                            <th className="text-left py-3 px-4 text-white/80 font-light">Película</th>
                            <th className="text-left py-3 px-4 text-white/80 font-light">Sala</th>
                            <th className="text-left py-3 px-4 text-white/80 font-light">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 text-white/90">{booking.seatNumber}</td>
                            <td className="py-4 px-4 text-white/70">{formattedDateTime(booking.functionDate)}hs</td>
                            <td className="py-4 px-4 text-white/90">{booking.movieName}</td>
                            <td className="py-4 px-4 text-white/70">{booking.auditoriumNumber}</td>
                            <td className="py-4 px-4">
                                <button 
                                onClick={() => confirmCancelBooking(booking.id)} 
                                className="bg-red-900/30 border border-red-700/50 text-red-100 px-4 py-2 rounded hover:bg-red-800/40 transition-colors cursor-pointer"
                                >
                                Cancelar
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                )}
                </div>
                
                {/* Botón de cerrar sesión */}
                <div className="flex justify-end">
                <button 
                    className="bg-white/5 border border-white/10 px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer" 
                    onClick={confirmLogout}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar sesión
                </button>
                </div>
                
                {/* Modal de confirmación de cierre de sesión */}
                {showLogoutConfirm && (
                    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
                        <div className="bg-black border border-white/10 rounded-lg p-6 max-w-md w-full">
                            <h3 className="text-xl font-light mb-4">Confirmar cierre de sesión</h3>
                            <p className="text-white/80 mb-6">¿Estás seguro que deseas cerrar la sesión?</p>
                            <div className="flex justify-end space-x-3">
                                <button 
                                    onClick={cancelLogout}
                                    className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={executeLogout}
                                    className="bg-white/30 text-white px-4 py-2 rounded hover:bg-white/40 transition-colors cursor-pointer"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Modal de confirmación de cancelación de reserva */}
                {showCancelBookingConfirm && (
                    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
                        <div className="bg-black border border-white/10 rounded-lg p-6 max-w-md w-full">
                            <h3 className="text-xl font-light mb-4">Confirmar cancelación</h3>
                            <p className="text-white/80 mb-6">¿Estás seguro que deseas cancelar esta reserva? Esta acción no se puede deshacer.</p>
                            <div className="flex justify-end space-x-3">
                                <button 
                                    onClick={abortCancelBooking}
                                    className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                    Volver
                                </button>
                                <button 
                                    onClick={executeCancelBooking}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors cursor-pointer"
                                >
                                    Confirmar cancelación
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}