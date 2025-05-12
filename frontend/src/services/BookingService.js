import { api,handleAxiosError } from "./Api";

// Guardar reserva
export const saveBooking = async (seatId,functionId) => {
    try {
        const response = await api.post('/bookings/new', seatId,functionId);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

// Obtener reservas por usuario
export const getBookings = async () => {
    try {
        const response = await api.get('/bookings');
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

// Cancelar reserva
export const cancelBooking = async (bookingId) => {
    try {
        const response = await api.delete(`/bookings/cancel/${bookingId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}