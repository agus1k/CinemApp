package org.agus.springboot.cinema_project.exception.custom;

public class BookingNotFoundException extends RuntimeException {
    public BookingNotFoundException(String message) {
        super(message);
    }
}
