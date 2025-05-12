package org.agus.springboot.cinema_project.mappers;

import org.agus.springboot.cinema_project.dtos.FunctionDto;
import org.agus.springboot.cinema_project.entities.Function;
import org.springframework.stereotype.Component;

@Component
public class FunctionMapper {

    public FunctionDto toDto(Function function) {
        return new FunctionDto(
                function.getId(),
                function.getDate().toString(),
                function.getMovie().getId(),
                function.getAuditorium().getId(),
                function.getPrice()
        );
    }
}
