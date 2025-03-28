package org.agus.springboot.cinema_project.controllers;

import org.agus.springboot.cinema_project.dtos.BookingDto;
import org.agus.springboot.cinema_project.entities.Booking;
import org.agus.springboot.cinema_project.services.BookingService;
import org.agus.springboot.cinema_project.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class BookingRestController {

    private final BookingService bookingService;
    private final UserService userService;

    public BookingRestController(final BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    @PostMapping("/new")
    public ResponseEntity<Booking> saveBooking(@RequestBody final BookingDto bookingDto, @RequestParam Long functionId) {
        Booking booking = bookingService.save(bookingDto, functionId);

        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @PostMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable final Long bookingId) {

        bookingService.cancel(bookingId);
        return ResponseEntity.ok("Reserva cancelada");
    }
}
