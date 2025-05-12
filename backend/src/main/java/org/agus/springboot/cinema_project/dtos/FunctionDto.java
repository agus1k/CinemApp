package org.agus.springboot.cinema_project.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.agus.springboot.cinema_project.validation.IsFunctionExists;
import org.agus.springboot.cinema_project.validation.groups.BasicChecks;
import org.agus.springboot.cinema_project.validation.groups.CustomChecks;

import java.time.LocalDateTime;

@IsFunctionExists(groups = CustomChecks.class)
public class FunctionDto {

    private Long id;

    @NotEmpty(groups = BasicChecks.class)
    private String date;

    @NotNull(groups = BasicChecks.class)
    private Long movieId;

    @NotNull(groups = BasicChecks.class)
    private Long auditoriumId;

    @NotNull(groups = BasicChecks.class)
    private Integer price;

    public FunctionDto() {
    }

    public FunctionDto(Long id, String date, Long movieId, Long auditoriumId, Integer price) {
        this.id = id;
        this.date = date;
        this.movieId = movieId;
        this.auditoriumId = auditoriumId;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getAuditoriumId() {
        return auditoriumId;
    }

    public void setAuditoriumId(Long auditoriumId) {
        this.auditoriumId = auditoriumId;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
