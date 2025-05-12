package org.agus.springboot.cinema_project.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name="functions_seats")
public class FunctionSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Seat seat;

    @ManyToOne
    @JsonIgnore
    private Function function;

    private Boolean avaible;

    public FunctionSeat() {
    }

    public FunctionSeat(Function function, Seat seat, Boolean avaible) {
        this.function = function;
        this.seat = seat;
        this.avaible = avaible;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public Function getFunction() {
        return function;
    }

    public void setFunction(Function function) {
        this.function = function;
    }

    public Boolean getAvaible() {
        return avaible;
    }

    public void setAvaible(Boolean avaible) {
        this.avaible = avaible;
    }
}
