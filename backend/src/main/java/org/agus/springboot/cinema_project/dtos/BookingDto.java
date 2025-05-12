package org.agus.springboot.cinema_project.dtos;

import jakarta.validation.constraints.NotNull;
import org.agus.springboot.cinema_project.validation.groups.BasicChecks;

public class BookingDto {

    @NotNull(groups = BasicChecks.class)
    private Long seatId;

    private Long functionId;

    public BookingDto(Long seatId, Long functionId) {
        this.seatId = seatId;
        this.functionId = functionId;
    }

    public BookingDto() {
    }

    public Long getSeatId() {
        return seatId;
    }

    public void setSeatId(Long seatId) {
        this.seatId = seatId;
    }

    public Long getFunctionId() {
        return functionId;
    }

    public void setFunctionId(Long functionId) {
        this.functionId = functionId;
    }
}
