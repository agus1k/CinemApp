package org.agus.springboot.cinema_project.repositories;

import org.agus.springboot.cinema_project.entities.Genre;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface GenreRepository extends CrudRepository<Genre, Long> {

}
