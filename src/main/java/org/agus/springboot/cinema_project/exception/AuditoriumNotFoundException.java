package org.agus.springboot.cinema_project.exception;

public class AuditoriumNotFoundException extends RuntimeException {
    public AuditoriumNotFoundException(String message) {
        super(message);
    }
}
