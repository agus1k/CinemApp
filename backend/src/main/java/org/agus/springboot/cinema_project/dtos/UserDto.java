package org.agus.springboot.cinema_project.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.agus.springboot.cinema_project.validation.groups.BasicChecks;

public class UserDto {

    @NotBlank(groups = BasicChecks.class)
    @Size(min = 4, max = 10, message = "El nombre de usuario debe tener entre 4 y 10 caracteres", groups = BasicChecks.class)
    private String username;

    @NotBlank(groups = BasicChecks.class)
    @Size(min = 8, max = 16, message = "La contrasena debe tener entre 8 y 16 caracteres.")
    private String password;

    @NotBlank(groups = BasicChecks.class)
    private String email;

    public UserDto() {
    }

    public UserDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
