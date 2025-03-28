package org.agus.springboot.cinema_project.exception;

public class UserExistsException extends RuntimeException {
    public UserExistsException(String message) {
        super(message);
    }
}
