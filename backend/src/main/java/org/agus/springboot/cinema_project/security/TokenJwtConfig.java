package org.agus.springboot.cinema_project.security;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class TokenJwtConfig {
    public static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode("SuperMuySeguraYConfiableClaveSecretaInhackeableYMuyLarga"));
    public static final String PREFIX_TOKEN = "Bearer ";
    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String CONTENT_TYPE = "application/json";
}
