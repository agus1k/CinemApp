package org.agus.springboot.cinema_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="functions")
public class Function {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime date;

    @ManyToOne
    @JsonIgnore
    private Movie movie;

    @ManyToOne
    private Auditorium auditorium;

    @OneToMany(mappedBy = "function", cascade = CascadeType.ALL)
    private List<FunctionSeat> functionSeats;

    private Integer price;


    @OneToMany(mappedBy = "function", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Booking> bookings;

    public Function() {
    }

    public Function(LocalDateTime date, Movie movie, Auditorium auditorium) {
        this.date = date;
        this.movie = movie;
        this.auditorium = auditorium;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Auditorium getAuditorium() {
        return auditorium;
    }

    public void setAuditorium(Auditorium auditorium) {
        this.auditorium = auditorium;
    }

    public List<FunctionSeat> getFunctionSeats() {
        return functionSeats;
    }

    public void setFunctionSeats(List<FunctionSeat> functionSeats) {
        this.functionSeats = functionSeats;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
