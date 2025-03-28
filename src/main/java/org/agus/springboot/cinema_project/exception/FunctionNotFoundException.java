package org.agus.springboot.cinema_project.exception;

public class FunctionNotFoundException extends RuntimeException {
    public FunctionNotFoundException(String message) {
        super(message);
    }
}
