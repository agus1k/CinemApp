package org.agus.springboot.cinema_project.services;

import org.agus.springboot.cinema_project.entities.Seat;
import org.agus.springboot.cinema_project.repositories.FunctionSeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {

    private FunctionSeatRepository functionSeatRepository;

    @Autowired
    public SeatService(FunctionSeatRepository functionSeatRepository) {
        this.functionSeatRepository = functionSeatRepository;
    }

    public List<Seat> getAvaibleSeats(Long functionId) {
        return functionSeatRepository.findByFunctionId(functionId);
    }
}
