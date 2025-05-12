package org.agus.springboot.cinema_project.dtos;

import java.time.LocalDateTime;

public class UserBookingDto {

    private Long id;

    private Integer seatNumber;

    private LocalDateTime functionDate;

    private String movieName;

    private Long auditoriumNumber;

    public UserBookingDto() {
    }

    public UserBookingDto(Long id, Integer seatNumber, LocalDateTime functionDate, String movieName, Long auditoriumNumber) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.functionDate = functionDate;
        this.movieName = movieName;
        this.auditoriumNumber = auditoriumNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public LocalDateTime getFunctionDate() {
        return functionDate;
    }

    public void setFunctionDate(LocalDateTime functionDate) {
        this.functionDate = functionDate;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public Long getAuditoriumNumber() {
        return auditoriumNumber;
    }

    public void setAuditoriumNumber(Long auditorium) {
        this.auditoriumNumber = auditorium;
    }
}
