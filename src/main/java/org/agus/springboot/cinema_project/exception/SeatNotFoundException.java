package org.agus.springboot.cinema_project.exception;

public class SeatNotFoundException extends RuntimeException {
    public SeatNotFoundException(String message) {
        super(message);
    }
}
