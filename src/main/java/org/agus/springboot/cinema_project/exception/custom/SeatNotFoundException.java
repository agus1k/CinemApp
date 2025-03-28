package org.agus.springboot.cinema_project.exception.custom;

public class SeatNotFoundException extends RuntimeException {
    public SeatNotFoundException(String message) {
        super(message);
    }
}
