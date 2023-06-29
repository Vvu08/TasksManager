package com.taru.taskmanager.security;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

public class SecurityConstants {
    public static final long JWT_EXPIRATION = 9000000;
    public static final Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public static String CURRENT_TOKEN;
}