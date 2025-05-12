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
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
    public ResponseEntity<FunctionDto> create(@Validated(ValidationOrder.class) @RequestBody FunctionDto functionDto) {
        FunctionDto function = functionService.create(functionDto);

        return new ResponseEntity<>(function, HttpStatus.CREATED);
    }

    // Endpoint to update a function

    @PutMapping("/update/{id}")
    public ResponseEntity<FunctionDto> update(@RequestBody FunctionDto functionDto, @PathVariable Long id){
        FunctionDto function = functionService.update(functionDto, id);

        return new ResponseEntity<>(function, HttpStatus.OK);
    }

    // Endpoint to delete a function

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        functionService.delete(id);

        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

    // Endpoint to get all functions

    @GetMapping
    public ResponseEntity<List<FunctionDto>> getAllFunctions(){
        List<FunctionDto> functions = functionService.getAllFunctions();
        return new ResponseEntity<>(functions, HttpStatus.OK);
    }

    // Endpoint to get all functions by specific date

    @GetMapping("/by-date")
    public ResponseEntity<List<Function>> getAllFunctionsSpecificDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        List<Function> functions = functionService.getAllSpecificDate(date);
        return new ResponseEntity<>(functions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Function> getFunctionById(@PathVariable Long id){
        Function function = functionService.getById(id);
        return new ResponseEntity<>(function, HttpStatus.OK);
    }

}
