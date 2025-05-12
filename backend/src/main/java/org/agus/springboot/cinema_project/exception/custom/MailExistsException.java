package org.agus.springboot.cinema_project.exception.custom;

public class MailExistsException extends RuntimeException {
    public MailExistsException(String message) {
        super(message);
    }
}
