package org.agus.springboot.cinema_project.entities;

import jakarta.persistence.*;

@Entity
@Table(name="bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    @OneToOne
    private Seat seat;

    @ManyToOne
    private Function function;

    @ManyToOne
    private User user;

    public Booking() {
    }

    public Booking(String status, Seat seat, Function function, User user) {
        this.status = status;
        this.seat = seat;
        this.function = function;
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Function getFunction() {
        return function;
    }

    public void setFunction(Function function) {
        this.function = function;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
