package org.agus.springboot.cinema_project.exception;

public class NullPasswordException extends RuntimeException {
    public NullPasswordException(String message) {
        super(message);
    }
}
