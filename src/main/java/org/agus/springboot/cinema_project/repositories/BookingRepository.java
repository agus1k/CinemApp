package org.agus.springboot.cinema_project.repositories;

import org.agus.springboot.cinema_project.entities.Booking;
import org.agus.springboot.cinema_project.entities.Function;
import org.agus.springboot.cinema_project.entities.Seat;
import org.springframework.data.repository.CrudRepository;

public interface BookingRepository extends CrudRepository<Booking, Long> {

    boolean existsBySeatAndFunction(Seat seat, Function function);
}
