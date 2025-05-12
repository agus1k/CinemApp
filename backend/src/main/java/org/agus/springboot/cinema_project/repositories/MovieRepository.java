package org.agus.springboot.cinema_project.repositories;

import org.agus.springboot.cinema_project.entities.Genre;
import org.agus.springboot.cinema_project.entities.Movie;
import org.springframework.data.repository.CrudRepository;

public interface MovieRepository extends CrudRepository<Movie, Long> {
}
