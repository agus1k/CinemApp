package org.agus.springboot.cinema_project.dtos;

import jakarta.validation.constraints.NotNull;
import org.agus.springboot.cinema_project.validation.groups.BasicChecks;

public class BookingDto {

    @NotNull(groups = BasicChecks.class)
    private Long seatId;

    public BookingDto(Long seatId) {
        this.seatId = seatId;
    }

    public BookingDto() {
    }

    public Long getSeatId() {
        return seatId;
    }

    public void setSeatId(Long seatId) {
        this.seatId = seatId;
    }

}
