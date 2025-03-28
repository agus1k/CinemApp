package org.agus.springboot.cinema_project.repositories;

import org.agus.springboot.cinema_project.entities.Auditorium;
import org.springframework.data.repository.CrudRepository;

public interface AuditoriumRepository extends CrudRepository<Auditorium, Long> {
}
