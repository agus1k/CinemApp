package org.agus.springboot.cinema_project.controllers;

import org.agus.springboot.cinema_project.entities.Seat;
import org.agus.springboot.cinema_project.services.SeatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/seats")
public class SeatRestController {

    private final SeatService seatService;

    public SeatRestController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping("/{functionId}")
    public ResponseEntity<List<Seat>> getAvaibleSeats(@PathVariable Long functionId) {
        List<Seat> seats = seatService.getAvaibleSeats(functionId);
        return new ResponseEntity<>(seats, HttpStatus.OK);
    }
}
