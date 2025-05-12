package org.agus.springboot.cinema_project.controllers;

import org.agus.springboot.cinema_project.dtos.BookingDto;
import org.agus.springboot.cinema_project.dtos.UserBookingDto;
import org.agus.springboot.cinema_project.entities.Booking;
import org.agus.springboot.cinema_project.services.BookingService;
import org.agus.springboot.cinema_project.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingRestController {

    private final BookingService bookingService;

    public BookingRestController(final BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/new")
    public ResponseEntity<Booking> saveBooking(@RequestBody final BookingDto bookingDto) {
        Booking booking = bookingService.save(bookingDto);

        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @DeleteMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable final Long bookingId) {

        bookingService.cancel(bookingId);
        return ResponseEntity.ok("Reserva cancelada");
    }

    // Mostrar reservas del usuario
    @GetMapping
    public ResponseEntity<List<UserBookingDto>> getBookings() {
        return ResponseEntity.ok(bookingService.getUserBookings());
    }
}
