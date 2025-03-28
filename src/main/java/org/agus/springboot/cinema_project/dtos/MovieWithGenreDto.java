package org.agus.springboot.cinema_project.dtos;

import org.agus.springboot.cinema_project.entities.Genre;

public class MovieWithGenreDto {
    private String name;

    private Genre genreDto;

    private String description;

    public MovieWithGenreDto() {
    }

    public MovieWithGenreDto(String name, Genre genreDto, String description) {
        this.name = name;
        this.genreDto = genreDto;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Genre getGenreDto() {
        return genreDto;
    }

    public void setGenreDto(Genre genreDto) {
        this.genreDto = genreDto;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
