package org.agus.springboot.cinema_project.repositories;

import org.agus.springboot.cinema_project.entities.Auditorium;
import org.agus.springboot.cinema_project.entities.Function;
import org.agus.springboot.cinema_project.entities.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface FunctionRepository extends CrudRepository<Function, Long> {

    @Query(value = "select * from functions f where DATE(f.date) = ?1", nativeQuery = true)
    List<Function> getAllSpecificDate(LocalDate date);

    boolean existsByMovieAndDateAndAuditorium(Movie movie,LocalDateTime dateTime,Auditorium auditorium);
}
