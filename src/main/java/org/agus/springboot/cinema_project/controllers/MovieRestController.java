package org.agus.springboot.cinema_project.controllers;

import jakarta.validation.Valid;
import org.agus.springboot.cinema_project.dtos.MovieDto;
import org.agus.springboot.cinema_project.dtos.MovieWithGenreDto;
import org.agus.springboot.cinema_project.entities.Movie;
import org.agus.springboot.cinema_project.services.MovieService;
import org.agus.springboot.cinema_project.validation.ValidationOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieRestController {

    // Dependencies

    private final MovieService movieService;

    // Constructor

    @Autowired
    public MovieRestController(MovieService movieService) {
        this.movieService = movieService;
    }

    // Endpoint to list all movies

    @GetMapping
    public ResponseEntity<List<MovieWithGenreDto>> getMovies() {
        List<MovieWithGenreDto> movies = movieService.getAllMovies();

        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    // Endpoint to save a movie

    @PostMapping()
    public ResponseEntity<Movie> save(@Validated(ValidationOrder.class) @RequestBody MovieDto movieDto) {
        Movie movie = movieService.saveMovie(movieDto);

        return new ResponseEntity<>(movie, HttpStatus.CREATED);
    }

    // Endpoint to update a movie

    @PutMapping("/update/{id}")
    public ResponseEntity<Movie> update(@Validated(ValidationOrder.class) @RequestBody MovieDto movieDto, @PathVariable Long id) {
        Movie movie = movieService.updateMovie(movieDto, id);

        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    // Endpoint to delete a movie

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        movieService.deleteMovie(id);

        return "Movie deleted";
    }
}
