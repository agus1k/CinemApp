package org.agus.springboot.cinema_project.repositories;

import org.agus.springboot.cinema_project.entities.Seat;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SeatRepository extends CrudRepository<Seat, Long> {

    @Query("SELECT s FROM Seat s WHERE s.auditorium.id = ?1")
    public List<Seat> findByAuditorium(Long auditoriumId);
}
