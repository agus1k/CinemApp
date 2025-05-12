package org.agus.springboot.cinema_project.exception.custom;

public class FunctionNotFoundException extends RuntimeException {
    public FunctionNotFoundException(String message) {
        super(message);
    }
}
