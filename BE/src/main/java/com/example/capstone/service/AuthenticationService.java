package com.example.capstone.service;

public interface AuthenticationService {
    String authenticate(String email, String password);
    boolean signUp(String email, String password, String fullname);
}
