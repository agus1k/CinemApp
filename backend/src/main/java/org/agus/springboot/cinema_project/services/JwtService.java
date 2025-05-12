package org.agus.springboot.cinema_project.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.agus.springboot.cinema_project.entities.User;
import org.agus.springboot.cinema_project.security.SimpleGrantedAuthorityJsonCreator;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.jackson2.SimpleGrantedAuthorityMixin;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import static org.agus.springboot.cinema_project.security.TokenJwtConfig.*;

@Service
public class JwtService {

    //AUTHENTICATION

    // Get the authentication token

    public UsernamePasswordAuthenticationToken getAuthenticationToken(HttpServletRequest request) {
        User user = null;
        String username = null;
        String password = null;

        try {
            user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            username = user.getUsername();
            password = user.getPassword();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new UsernamePasswordAuthenticationToken(username, password);
    }

    // Create the JsonWebToken

    public String getJwt(Authentication authResult) throws JsonProcessingException {
        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authResult.getPrincipal();
        String username = user.getUsername();
        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();

        Claims claims = Jwts.claims()
                .add("roles",new ObjectMapper().writeValueAsString(authorities)).build();

        return Jwts.builder()
                .subject(username)
                .claims(claims)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(SECRET_KEY)
                .compact();
    }

    // AUTHORIZATION

    public boolean shouldSkipProcessing(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        if (request.getRequestURI().equals("/register")) {
            return true;
        }

        String header = request.getHeader(HEADER_AUTHORIZATION);
        return header == null || !header.startsWith(PREFIX_TOKEN);
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader(HEADER_AUTHORIZATION);
        return header.replace(PREFIX_TOKEN, "");
    }

    public UsernamePasswordAuthenticationToken getAuthorizationToken(String token) throws IOException {
        Claims claims = Jwts.parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        String username = claims.getSubject();
        Object autoritiesClaims = claims.get("roles");

        SimpleGrantedAuthority[] authoritiesArray = new ObjectMapper()
                .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
                .readValue(autoritiesClaims.toString().getBytes(), SimpleGrantedAuthority[].class);
        Collection<? extends GrantedAuthority> authorities = Arrays.asList(authoritiesArray);

        return new UsernamePasswordAuthenticationToken(username, null, authorities);
    }
}
