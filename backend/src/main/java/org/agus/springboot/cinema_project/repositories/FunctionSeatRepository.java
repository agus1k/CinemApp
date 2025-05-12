package org.agus.springboot.cinema_project.repositories;

import org.agus.springboot.cinema_project.entities.Function;
import org.agus.springboot.cinema_project.entities.FunctionSeat;
import org.agus.springboot.cinema_project.entities.Seat;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface FunctionSeatRepository extends CrudRepository<FunctionSeat, Long> {

    @Modifying
    @Query("DELETE FROM FunctionSeat f WHERE f.function.id = ?1")
    public void deleteAllByFunctionId(Long functionId);

    @Query("SELECT fs.seat FROM FunctionSeat fs WHERE fs.function.id = ?1 AND fs.avaible = true")
    public List<Seat> findByFunctionId(Long functionId);

    public boolean existsByFunctionAndSeat(Function function, Seat seat);

    Optional<FunctionSeat> findByFunctionAndSeat(Function function, Seat seat);
}
