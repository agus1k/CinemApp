package org.agus.springboot.cinema_project.services;

import org.agus.springboot.cinema_project.dtos.BookingDto;
import org.agus.springboot.cinema_project.dtos.UserBookingDto;
import org.agus.springboot.cinema_project.entities.*;
import org.agus.springboot.cinema_project.exception.custom.BookingNotFoundException;
import org.agus.springboot.cinema_project.exception.custom.FunctionNotFoundException;
import org.agus.springboot.cinema_project.exception.custom.SeatAlreadyReservedException;
import org.agus.springboot.cinema_project.exception.custom.SeatNotFoundException;
import org.agus.springboot.cinema_project.repositories.BookingRepository;
import org.agus.springboot.cinema_project.repositories.FunctionRepository;
import org.agus.springboot.cinema_project.repositories.FunctionSeatRepository;
import org.agus.springboot.cinema_project.repositories.SeatRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
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

    @Transactional
    public Booking save(BookingDto bookingDto) {
        Booking booking = new Booking();

        Seat seat = seatRepository.findById(bookingDto.getSeatId()).orElseThrow(() -> new SeatNotFoundException("Seat not found"));
        Function function = functionRepository.findById(bookingDto.getFunctionId()).orElseThrow(() -> new FunctionNotFoundException("Function not found"));

        if(!functionSeatRepository.existsByFunctionAndSeat(function, seat)){
            throw new SeatNotFoundException("Seat not found");
        }

        if(bookingRepository.existsBySeatAndFunction(seat, function)) {
            throw new SeatAlreadyReservedException("Seat already reserved");
        }

        FunctionSeat functionSeat = functionSeatRepository.findByFunctionAndSeat(function, seat).orElseThrow(() -> new RuntimeException("Function Seat not found"));

        functionSeat.setAvaible(false);
        functionSeatRepository.save(functionSeat);

        booking.setSeat(seat);
        booking.setFunction(function);
        booking.setUser(userService.getAuthenticatedUser());
        booking.setStatus("ONGOING");

        return bookingRepository.save(booking);
    }

    @Transactional
    public void cancel(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new BookingNotFoundException("Booking not found"));

        if(Objects.equals(userService.getAuthenticatedUser().getId(), booking.getUser().getId())) {
            booking.setStatus("CANCELLED");
            bookingRepository.save(booking);
        } else {
            throw new BookingNotFoundException("Booking not found");
        }
    }

    @Transactional(readOnly = true)
    public List<UserBookingDto> getUserBookings() {
        User user = userService.getAuthenticatedUser();

        List<Booking> bookings = bookingRepository.findByUser(user);

        return bookings.stream()
                .map(booking ->
                new UserBookingDto(
                        booking.getId(),
                        booking.getSeat().getNumber(),
                        booking.getFunction().getDate(),
                        booking.getFunction().getMovie().getName(),
                        booking.getFunction().getAuditorium().getId())
        ).toList();
    }
}
