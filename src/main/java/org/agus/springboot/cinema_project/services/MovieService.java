package org.agus.springboot.cinema_project.services;

import org.agus.springboot.cinema_project.dtos.MovieDto;
import org.agus.springboot.cinema_project.dtos.MovieWithGenreDto;
import org.agus.springboot.cinema_project.entities.Genre;
import org.agus.springboot.cinema_project.entities.Movie;
import org.agus.springboot.cinema_project.exception.custom.GenreNotFoundException;
import org.agus.springboot.cinema_project.exception.custom.MovieNotFoundException;
import org.agus.springboot.cinema_project.repositories.GenreRepository;
import org.agus.springboot.cinema_project.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    // Dependencies

    private final GenreRepository genreRepository;

    private final MovieRepository movieRepository;

    // Constructor

    @Autowired
    public MovieService(GenreRepository genreRepository, MovieRepository movieRepository) {
        this.genreRepository = genreRepository;
        this.movieRepository = movieRepository;
    }

    // Add a movie to the DB

    @Transactional
    public Movie saveMovie(MovieDto movieDto){
        Genre genre = genreRepository.findById(movieDto.getGenreId()).orElseThrow(() ->new GenreNotFoundException("Genre not found"));

        Movie movie = new Movie();
        movie.setName(movieDto.getName());
        movie.setGenre(genre);
        movie.setDescription(movieDto.getDescription());

        return movieRepository.save(movie);
    }

    // Update a movie

    @Transactional
    public Movie updateMovie(MovieDto movieDto, Long id) {

        Genre genre = genreRepository.findById(movieDto.getGenreId()).orElseThrow(() -> new GenreNotFoundException("Genre not found"));

        Movie movie = movieRepository.findById(id).orElseThrow(() ->new MovieNotFoundException("Movie not found"));

        if(movieDto.getName()!=null){
            movie.setName(movieDto.getName());
        }

        if(movieDto.getGenreId()!=null){
            movie.setGenre(genre);
        }

        if(movieDto.getDescription()!=null){
            movie.setDescription(movieDto.getDescription());
        }

        return movieRepository.save(movie);
    }

    // Delete a movie

    @Transactional
    public void deleteMovie(Long id){
        Movie movie = movieRepository.findById(id).orElseThrow(() ->new MovieNotFoundException("Movie not found"));

        movieRepository.delete(movie);
    }

    // Get all movies

    @Transactional(readOnly = true)
    public List<MovieWithGenreDto> getAllMovies(){
         List<Movie> movies = (List<Movie>) movieRepository.findAll();
         return movies.stream()
                 .map(m -> new MovieWithGenreDto(m.getName(),m.getGenre(),m.getDescription()))
                 .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Movie getMovie(Long id){
        return movieRepository.findById(id).orElseThrow(() -> new MovieNotFoundException("Movie not found"));
    }
}

