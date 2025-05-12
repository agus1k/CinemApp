package org.agus.springboot.cinema_project.exception.handler;

import org.agus.springboot.cinema_project.exception.custom.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Validation exception

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            if(error instanceof FieldError) {
                errors.put(((FieldError) error).getField(), error.getDefaultMessage());
            } else {
                errors.put("global",error.getDefaultMessage());
            }
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // Login exceptions

    @ExceptionHandler(NullPasswordException.class)
    public ResponseEntity<Map<String, String>> handleNullPasswordException(NullPasswordException ex) {
        Map<String, String> errors = new HashMap<>();

        errors.put("error","La contrasena no puede ser nula");
        errors.put("message","Por favor, ingrese una contrasena");

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<Map<String, String>> handleUserExistsException(UserExistsException ex) {
        Map<String, String> errors = new HashMap<>();

        errors.put("error","El usuario ya existe");
        errors.put("message","Ingrese otro nombre de usuario");

        return new ResponseEntity<>(errors, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MailExistsException.class)
    public ResponseEntity<Map<String, String>> handleMailExistsException(MailExistsException ex) {
        Map<String, String> errors = new HashMap<>();

        errors.put("error","El usuario ya existe");
        errors.put("message","Ya hay un usuario con ese mail");

        return new ResponseEntity<>(errors, HttpStatus.CONFLICT);
    }

    //Datetime parse exception

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<Map<String, String>> handleDateTimeParseException(DateTimeParseException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Formato de fecha invalido");
        response.put("message","El formato valido es: MM-dd-yyyy HH:mm");

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    //Seat already reserved

    @ExceptionHandler(SeatAlreadyReservedException.class)
    public ResponseEntity<Map<String, String>> handleSeatAlreadyReserved(SeatAlreadyReservedException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "El asiento ya esta reservado");
        response.put("message","Elige otro asiento");

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Not found exceptions

    @ExceptionHandler(AuditoriumNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleAuditoriumNotFoundException(AuditoriumNotFoundException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Auditorio no encontrado");
        response.put("message","El auditorio no existe");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SeatNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleSeatNotFoundException(SeatNotFoundException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Asiento no encontrado");
        response.put("message","El asiento no existe");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FunctionNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleFunctionNotFoundException(FunctionNotFoundException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Funcion no encontrada");
        response.put("message","La funcion no existe");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MovieNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleMovieNotFoundException(MovieNotFoundException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("error", "Pelicula no encontrada");
        response.put("message","La pelicula no existe");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFoundException(UserNotFoundException ex) {
        Map<String, String> response = new HashMap<>();

        response.put("error", "Usuario no encontrado");
        response.put("message","El usuario no existe");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(GenreNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleGenreNotFoundException(GenreNotFoundException ex) {
        Map<String, String> response = new HashMap<>();

        response.put("error", "Genero no encontrado");
        response.put("message","El genero no existe");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BookingNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleBookingNotFoundException(BookingNotFoundException ex) {
        Map<String, String> response = new HashMap<>();

        response.put("error", "Reserva no encontrada");
        response.put("message","La reserva no existe");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
