package org.agus.springboot.cinema_project.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.agus.springboot.cinema_project.validation.groups.BasicChecks;

public class MovieDto {

    @NotEmpty(groups = BasicChecks.class)
    private String name;

    @NotNull(groups = BasicChecks.class)
    private Long genreId;

    @NotEmpty(groups = BasicChecks.class)
    private String description;

    public MovieDto() {
    }

    public MovieDto(String name, Long genreId) {
        this.name = name;
        this.genreId = genreId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getGenreId() {
        return genreId;
    }

    public void setGenreId(Long genreId) {
        this.genreId = genreId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
