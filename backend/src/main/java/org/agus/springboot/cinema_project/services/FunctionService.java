package org.agus.springboot.cinema_project.services;

import org.agus.springboot.cinema_project.dtos.FunctionDto;
import org.agus.springboot.cinema_project.entities.*;
import org.agus.springboot.cinema_project.exception.custom.AuditoriumNotFoundException;
import org.agus.springboot.cinema_project.exception.custom.FunctionNotFoundException;
import org.agus.springboot.cinema_project.exception.custom.MovieNotFoundException;
import org.agus.springboot.cinema_project.mappers.FunctionMapper;
import org.agus.springboot.cinema_project.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class FunctionService {

    // Dependencies

    private final FunctionRepository functionRepository;

    private final AuditoriumRepository auditoriumRepository;

    private final MovieRepository movieRepository;

    private final SeatRepository seatRepository;

    private final FunctionSeatRepository functionSeatRepository;

    private final FunctionMapper functionMapper;

    // Constructor

    @Autowired
    public FunctionService(FunctionRepository functionRepository, AuditoriumRepository auditoriumRepository, MovieRepository movieRepository, SeatRepository seatRepository, FunctionSeatRepository functionSeatRepository, FunctionMapper functionMapper) {
        this.functionRepository = functionRepository;
        this.auditoriumRepository = auditoriumRepository;
        this.movieRepository = movieRepository;
        this.seatRepository = seatRepository;
        this.functionSeatRepository = functionSeatRepository;
        this.functionMapper = functionMapper;
    }

    // Adds a function to the DB, also adds the respective seats to functions_seats table

    @Transactional
    public FunctionDto create(FunctionDto functionDto) {

        Movie movie = movieRepository.findById(functionDto.getMovieId()).orElseThrow(() -> new MovieNotFoundException("Movie not found"));
        Auditorium auditorium = auditoriumRepository.findById(functionDto.getAuditoriumId()).orElseThrow(() -> new AuditoriumNotFoundException("Auditorium not found"));

        DateTimeFormatter format = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime date = LocalDateTime.parse(functionDto.getDate(), format);
        Integer price = functionDto.getPrice();

        Function function = new Function();

        function.setMovie(movie);
        function.setAuditorium(auditorium);
        function.setDate(date);
        function.setPrice(price);

        Function functionBd = functionRepository.save(function);

        List<Seat> seats = seatRepository.findByAuditorium(auditorium.getId());
        functionSeatRepository.saveAll(saveFunctionSeats(auditorium, function));

        return functionMapper.toDto(functionBd);
    }

    // Update a function

    @Transactional
    public FunctionDto update(FunctionDto functionDto, Long id) {
        Movie movie = movieRepository.findById(functionDto.getMovieId()).orElseThrow(() -> new MovieNotFoundException("Movie not found"));
        Auditorium auditorium = auditoriumRepository.findById(functionDto.getAuditoriumId()).orElseThrow(() -> new AuditoriumNotFoundException("Auditorium not found"));

        DateTimeFormatter format = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime date = LocalDateTime.parse(functionDto.getDate(), format);
        Integer price = functionDto.getPrice();

        Function function = functionRepository.findById(id).orElseThrow(() -> new FunctionNotFoundException("Function not found"));

        function.setMovie(movie);
        function.setAuditorium(auditorium);
        function.setDate(date);
        function.setPrice(price);

        // Save the updated function
        Function functionDb = functionRepository.save(function);

        //Delete the old seats and save the new ones.
        functionSeatRepository.deleteAllByFunctionId(function.getId());
        functionSeatRepository.saveAll(saveFunctionSeats(auditorium, function));

        return functionMapper.toDto(functionDb);
    }

    // Delete a function

    @Transactional
    public void delete(Long id) {
        Function function = functionRepository.findById(id).orElseThrow(() -> new FunctionNotFoundException("Function not found"));
        functionRepository.delete(function);
    }

    //Get function by id
    @Transactional(readOnly = true)
    public Function getById(Long id) {
        return functionRepository.findById(id).orElseThrow(() -> new FunctionNotFoundException("Function not found"));
    }

    public List<FunctionDto> getAllFunctions() {
       List<Function> functions = (List<Function>) functionRepository.findAll();
       return functions.stream()
               .map(functionMapper::toDto)
               .toList();
    }

    // Get all functions by a specific date

    public List<Function> getAllSpecificDate(LocalDate date) {
        return functionRepository.getAllSpecificDate(date);
    }

    // Save function seats

    public List<FunctionSeat> saveFunctionSeats(Auditorium auditorium, Function function){
        List<Seat> seats = seatRepository.findByAuditorium(auditorium.getId());
        List<FunctionSeat> functionSeats = new ArrayList<>();
        seats.forEach(seat -> {
            FunctionSeat functionSeat = new FunctionSeat(function, seat, true);
            functionSeats.add(functionSeat);
        });
        return functionSeats;
    }

    public boolean existsByMovieAndDateAndAuditorium(Movie movie, LocalDateTime date, Auditorium auditorium) {
        return functionRepository.existsByMovieAndDateAndAuditorium(movie,date,auditorium);
    }


}
