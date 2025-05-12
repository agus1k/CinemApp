package org.agus.springboot.cinema_project.repositories;

import org.agus.springboot.cinema_project.entities.Booking;
import org.agus.springboot.cinema_project.entities.Function;
import org.agus.springboot.cinema_project.entities.Seat;
import org.agus.springboot.cinema_project.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends CrudRepository<Booking, Long> {

    boolean existsBySeatAndFunction(Seat seat, Function function);

    @Query("SELECT b FROM Booking b WHERE b.user = ?1 AND b.status != 'CANCELLED'")
    List<Booking> findByUser(User user);
}
