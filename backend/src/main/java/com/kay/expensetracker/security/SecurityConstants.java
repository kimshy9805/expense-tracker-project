package com.kay.expensetracker.security;

public class SecurityConstants {
    public static final String SECRET = "expense";
    public static final long EXPIRATION_TIME = 900_000;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "api/v1/expense-tracker/expense";

}
