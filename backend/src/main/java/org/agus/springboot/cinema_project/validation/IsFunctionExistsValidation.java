package org.agus.springboot.cinema_project.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.agus.springboot.cinema_project.dtos.FunctionDto;
import org.agus.springboot.cinema_project.entities.Auditorium;
import org.agus.springboot.cinema_project.entities.Movie;
import org.agus.springboot.cinema_project.services.AuditoriumService;
import org.agus.springboot.cinema_project.services.FunctionService;
import org.agus.springboot.cinema_project.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class IsFunctionExistsValidation implements ConstraintValidator<IsFunctionExists, FunctionDto> {

    @Autowired
    private FunctionService functionService;

    @Autowired
    private MovieService movieService;

    @Autowired
    private AuditoriumService auditoriumService;

    @Override
    public boolean isValid(FunctionDto functionDto, ConstraintValidatorContext constraintValidatorContext) {

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime date;

        date = LocalDateTime.parse(functionDto.getDate(), formatter);

        Movie movie = movieService.getMovie(functionDto.getMovieId());
        Auditorium auditorium = auditoriumService.getAuditorium(functionDto.getAuditoriumId());

        return !functionService.existsByMovieAndDateAndAuditorium(movie, date, auditorium);


    }
}
