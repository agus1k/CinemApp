package org.agus.springboot.cinema_project.controllers;

import jakarta.validation.Valid;
import org.agus.springboot.cinema_project.dtos.UserDto;
import org.agus.springboot.cinema_project.dtos.UserProfileDto;
import org.agus.springboot.cinema_project.entities.User;
import org.agus.springboot.cinema_project.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserRestController {

    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDto userDto, BindingResult result) {
        if(result.hasErrors()) {
            return validation(result);
        }
        userService.register(userDto);
        return ResponseEntity.ok("Te registraste correctamente");
    }

    @GetMapping("/users/get")
    public ResponseEntity<UserProfileDto> getUser() {
        return ResponseEntity.ok(userService.getAuthenticatedUserData());
    }

    public ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error ->{
            errors.put(error.getField(), error.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
