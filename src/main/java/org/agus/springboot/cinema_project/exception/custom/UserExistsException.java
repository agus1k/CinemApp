package org.agus.springboot.cinema_project.exception.custom;

public class UserExistsException extends RuntimeException {
    public UserExistsException(String message) {
        super(message);
    }
}
