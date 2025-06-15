package com.example.capstone.service.imp;

import com.example.capstone.entity.Role;
import com.example.capstone.entity.User;
import com.example.capstone.repository.RoleRepository;
import com.example.capstone.repository.UserRepository;
import com.example.capstone.service.UserService;
import com.example.capstone.util.error.IdInvalidException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImp(UserRepository userRepository, RoleRepository roleRepository,
            BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public User createUser(User user) throws IdInvalidException {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (user.getRole_id() == null) {
            throw new IdInvalidException("Role cannot be null");
        }
        int roleId = user.getRole_id().getId();
        System.out.println("Checking role with ID: " + roleId);
        Optional<Role> roleOptional = roleRepository.findById(roleId);
        if (!roleOptional.isPresent()) {
            throw new IdInvalidException("Role with ID " + roleId + " does not exist");
        }
        user.setRole_id(roleOptional.get());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Page<User> getAllUsers(int page, int size) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Page must be >= 0 and size must be > 0");
        }
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    @Override
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(User updatedUser) throws IdInvalidException {
        if (updatedUser.getUsername() == null || updatedUser.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (updatedUser.getEmail() == null || updatedUser.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        Optional<User> optionalUser = userRepository.findById(updatedUser.getId());
        if (!optionalUser.isPresent()) {
            throw new IdInvalidException("User with ID " + updatedUser.getId() + " does not exist");
        }
        if (updatedUser.getRole_id() == null) {
            throw new IdInvalidException("Role cannot be null");
        }
        Optional<Role> roleOptional = roleRepository.findById(updatedUser.getRole_id().getId());
        if (!roleOptional.isPresent()) {
            throw new IdInvalidException("Role with ID " + updatedUser.getRole_id().getId() + " does not exist");
        }
        User user = optionalUser.get();
        if (!user.getUsername().equals(updatedUser.getUsername())
                && userRepository.existsByUsername(updatedUser.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (!user.getEmail().equals(updatedUser.getEmail()) && userRepository.existsByEmail(updatedUser.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        user.setUsername(updatedUser.getUsername());
        user.setPassword(updatedUser.getPassword() != null ? passwordEncoder.encode(updatedUser.getPassword())
                : user.getPassword());
        user.setFullname(updatedUser.getFullname());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());
        user.setRole_id(roleOptional.get());
        return userRepository.save(user);
    }

    @Override
    @Transactional // Đảm bảo thao tác xóa được commit
    public void deleteUser(int id) throws IdInvalidException {
        if (!userRepository.existsById(id)) {
            throw new IdInvalidException("User with ID " + id + " does not exist");
        }
        userRepository.deleteById(id);
    }
}
