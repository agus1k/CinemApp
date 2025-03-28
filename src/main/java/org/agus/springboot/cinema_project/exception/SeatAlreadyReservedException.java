package org.agus.springboot.cinema_project.exception;

public class SeatAlreadyReservedException extends RuntimeException {
    public SeatAlreadyReservedException(String message) {
        super(message);
    }
}
