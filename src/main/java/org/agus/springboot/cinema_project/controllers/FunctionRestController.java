package org.agus.springboot.cinema_project.controllers;

import jakarta.validation.Valid;
import org.agus.springboot.cinema_project.dtos.FunctionDto;
import org.agus.springboot.cinema_project.entities.Function;
import org.agus.springboot.cinema_project.services.FunctionService;
import org.agus.springboot.cinema_project.validation.ValidationOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/functions")
public class FunctionRestController {

    // Dependencies

    private final FunctionService functionService;

    // Constructor

    @Autowired
    public FunctionRestController(FunctionService functionService) {
        this.functionService = functionService;
    }

    // Endpoint to save a function

    @PostMapping
    public ResponseEntity<?> create(@Validated(ValidationOrder.class) @RequestBody FunctionDto functionDto) {
        Function function = functionService.create(functionDto);

        return new ResponseEntity<>(function, HttpStatus.CREATED);
    }

    // Endpoint to update a function

    @PutMapping("/update/{id}")
    public ResponseEntity<Function> update(@RequestBody FunctionDto functionDto, @PathVariable Long id){
        Function function = functionService.update(functionDto, id);

        return new ResponseEntity<>(function, HttpStatus.OK);
    }

    // Endpoint top delete a function

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        functionService.delete(id);

        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

    // Endpoint to get all functions

    @GetMapping
    public ResponseEntity<List<Function>> getAllFunctions(){
        List<Function> functions = functionService.getAllFunctions();
        return new ResponseEntity<>(functions, HttpStatus.OK);
    }

    // Endpoint to get all functions by specific date

    @GetMapping("/by-date")
    public ResponseEntity<List<Function>> getAllFunctionsSpecificDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        List<Function> functions = functionService.getAllSpecificDate(date);
        return new ResponseEntity<>(functions, HttpStatus.OK);
    }
}
