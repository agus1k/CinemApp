package org.agus.springboot.cinema_project.services;

import org.agus.springboot.cinema_project.dtos.UserDto;
import org.agus.springboot.cinema_project.entities.Role;
import org.agus.springboot.cinema_project.entities.User;
import org.agus.springboot.cinema_project.exception.custom.NullPasswordException;
import org.agus.springboot.cinema_project.exception.custom.UserExistsException;
import org.agus.springboot.cinema_project.exception.custom.UserNotFoundException;
import org.agus.springboot.cinema_project.repositories.RoleRepository;
import org.agus.springboot.cinema_project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public User register(UserDto userDto) {
        User user = new User();
        List<Role> roles = new ArrayList<>();

        Optional<Role> optionalRole = roleRepository.findByName("ROLE_USER");
        optionalRole.ifPresent(roles::add);

        user.setUsername(userDto.getUsername());
        if(userDto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        } else {
            throw new NullPasswordException("Password cannot be null");
        }

        user.setRoles(roles);
        user.setEnabled(true);

        if(userRepository.existsByUsername(userDto.getUsername())) {
            throw new UserExistsException("User already exists");
        }

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
