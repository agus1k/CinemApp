package org.agus.springboot.cinema_project.dtos;

import org.agus.springboot.cinema_project.entities.Genre;

public class MovieWithGenreDto {
    private Long id;

    private String name;

    private String imageUrl;

    private Genre genreDto;

    private String description;

    public MovieWithGenreDto() {
    }

    public MovieWithGenreDto(Long id, String name, String imageUrl, Genre genreDto, String description) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.genreDto = genreDto;
        this.description = description;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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
