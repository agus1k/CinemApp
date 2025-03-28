package org.agus.springboot.cinema_project.services;

import org.agus.springboot.cinema_project.dtos.BookingDto;
import org.agus.springboot.cinema_project.entities.Booking;
import org.agus.springboot.cinema_project.entities.Function;
import org.agus.springboot.cinema_project.entities.Seat;
import org.agus.springboot.cinema_project.exception.BookingNotFoundException;
import org.agus.springboot.cinema_project.exception.FunctionNotFoundException;
import org.agus.springboot.cinema_project.exception.SeatAlreadyReservedException;
import org.agus.springboot.cinema_project.exception.SeatNotFoundException;
import org.agus.springboot.cinema_project.repositories.BookingRepository;
import org.agus.springboot.cinema_project.repositories.FunctionRepository;
import org.agus.springboot.cinema_project.repositories.FunctionSeatRepository;
import org.agus.springboot.cinema_project.repositories.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    private final SeatRepository seatRepository;

    private final FunctionRepository functionRepository;

    private final FunctionSeatRepository functionSeatRepository;

    private final UserService userService;

    public BookingService(BookingRepository bookingRepository, SeatRepository seatRepository, FunctionRepository functionRepository, UserService userService, FunctionSeatRepository functionSeatRepository) {
        this.bookingRepository = bookingRepository;
        this.seatRepository = seatRepository;
        this.functionRepository = functionRepository;
        this.userService = userService;
        this.functionSeatRepository = functionSeatRepository;
    }

    public Booking save(BookingDto bookingDto, Long functionId) {
        Booking booking = new Booking();

        Seat seat = seatRepository.findById(bookingDto.getSeatId()).orElseThrow(() -> new SeatNotFoundException("Seat not found"));
        Function function = functionRepository.findById(functionId).orElseThrow(() -> new FunctionNotFoundException("Function not found"));

        if(bookingRepository.existsBySeatAndFunction(seat, function)) {
            throw new SeatAlreadyReservedException("Seat already reserved");
        }

        if(!functionSeatRepository.existsByFunctionAndSeat(function, seat)){
            throw new SeatNotFoundException("Seat not found");
        }

        booking.setSeat(seat);
        booking.setFunction(function);
        booking.setUser(userService.getAuthenticatedUser());
        booking.setStatus("ONGOING");

        return bookingRepository.save(booking);
    }

    public void cancel(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if(Objects.equals(userService.getAuthenticatedUser().getId(), booking.getUser().getId())) {
            booking.setStatus("CANCELLED");
            bookingRepository.save(booking);
        } else {
            throw new BookingNotFoundException("Booking not found");
        }
    }
}
