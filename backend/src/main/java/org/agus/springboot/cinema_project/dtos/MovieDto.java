package org.agus.springboot.cinema_project.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.agus.springboot.cinema_project.validation.groups.BasicChecks;

public class MovieDto {

    private Long id;

    @NotEmpty(groups = BasicChecks.class)
    private String name;

    @NotNull(groups = BasicChecks.class)
    private Long genreId;

    @NotEmpty(groups = BasicChecks.class)
    private String description;

    @NotEmpty(groups = BasicChecks.class)
    private String imageUrl;

    public MovieDto() {
    }

    public MovieDto(Long id, String name, Long genreId, String description, String imageUrl) {
        this.id = id;
        this.name = name;
        this.genreId = genreId;
        this.description = description;
        this.imageUrl = imageUrl;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
