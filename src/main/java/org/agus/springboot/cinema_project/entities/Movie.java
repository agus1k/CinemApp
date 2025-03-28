package org.agus.springboot.cinema_project.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.agus.springboot.cinema_project.entities.Genre;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name="genre_id")
    private Genre genre;

    private String description;

    @OneToMany(mappedBy = "movie", cascade=CascadeType.REMOVE)
    @JsonIgnore
    private List<Function> function;

    public Movie() {
    }

    public Movie(String name, Genre genre) {
        this.name = name;
        this.genre = genre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
