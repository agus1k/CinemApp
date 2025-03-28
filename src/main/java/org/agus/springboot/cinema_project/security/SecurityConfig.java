package org.agus.springboot.cinema_project.security;

import org.agus.springboot.cinema_project.security.filter.JwtAuthenticationFilter;
import org.agus.springboot.cinema_project.security.filter.JwtAuthorizationFilter;
import org.agus.springboot.cinema_project.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig{

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    AuthenticationManager authenticationManager() throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() throws Exception{
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, JwtService jwtService) throws Exception {
        return http.authorizeHttpRequests((auth) -> auth
                        // LOGIN AND REGISTER
                        .requestMatchers(HttpMethod.POST,"/register").permitAll()
                        .requestMatchers(HttpMethod.POST,"/login").permitAll()
                        //FUNCTIONS
                        .requestMatchers(HttpMethod.POST,"/functions").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/functions/update/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,"/functions/delete/{id}").hasRole("ADMIN")
                        //MOVIES
                        .requestMatchers(HttpMethod.POST,"/movies").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/movies/update/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,"/movies/delete/{id}").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtService))
                .addFilterBefore(new JwtAuthorizationFilter(authenticationManager(), jwtService), JwtAuthenticationFilter.class)
                .csrf(config -> config.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }
}