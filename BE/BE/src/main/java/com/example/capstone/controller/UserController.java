package com.example.capstone.controller;

import com.example.capstone.dto.UserDTO;
import com.example.capstone.entity.User;
import com.example.capstone.service.imp.UserServiceImp;
import com.example.capstone.util.error.IdInvalidException;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    private final UserServiceImp userService;

    public UserController(UserServiceImp userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<UserDTO>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<User> users = userService.getAllUsers(page, size);
        Page<UserDTO> userDTOPage = users.map(UserDTO::new);
        return ResponseEntity.ok(userDTOPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") int id) throws IdInvalidException {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(new UserDTO(user.get()));
        } else {
            throw new IdInvalidException("User with ID " + id + " does not exist");
        }
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody User user) throws IdInvalidException {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(new UserDTO(createdUser));
    }

    @PutMapping
    public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody User user) throws IdInvalidException {
        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(new UserDTO(updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id) throws IdInvalidException {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}