package com.example.capstone.service;

import com.example.capstone.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, UserDTO userDTO);
    boolean deleteUser(Long id);
    UserDTO getUserByUsername(String username);
}
