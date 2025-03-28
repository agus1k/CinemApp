package org.agus.springboot.cinema_project.exception.custom;

public class GenreNotFoundException extends RuntimeException {
    public GenreNotFoundException(String message) {
        super(message);
    }
}
