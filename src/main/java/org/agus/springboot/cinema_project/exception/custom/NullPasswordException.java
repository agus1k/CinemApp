package org.agus.springboot.cinema_project.exception.custom;

public class NullPasswordException extends RuntimeException {
    public NullPasswordException(String message) {
        super(message);
    }
}
