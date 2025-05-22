package com.example.capstone.service;

import com.example.capstone.entity.User;
import com.example.capstone.util.error.IdInvalidException;
import org.springframework.data.domain.Page;
import java.util.Optional;

public interface UserService {

    User createUser(User user) throws IdInvalidException;

    Page<User> getAllUsers(int page, int size);

    Optional<User> getUserById(int id);

    User updateUser(User updatedUser) throws IdInvalidException;

    void deleteUser(int id) throws IdInvalidException;
}