package com.example.capstone.service.imp;

import com.example.capstone.dto.UserDTO;
import com.example.capstone.entity.Role;
import com.example.capstone.entity.User;
import com.example.capstone.mapper.UserMapper;
import com.example.capstone.repository.RoleRepository;
import com.example.capstone.repository.UserRepository;
import com.example.capstone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public UserServiceImp(UserRepository userRepository, RoleRepository roleRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);

        if (userDTO.getRoleName() != null && !userDTO.getRoleName().isEmpty()) {
            Optional<Role> existingRole = roleRepository.findByName(userDTO.getRoleName());
            if (existingRole.isPresent()) {
                user.setRole_id(existingRole.get());
            } else {
                Role newRole = new Role();
                newRole.setName(userDTO.getRoleName());
                newRole.setDescription(userDTO.getRoleDescription());
                user.setRole_id(roleRepository.save(newRole)); // Save and set the new role
            }
        } else if (userDTO.getRole_id() != null && userDTO.getRole_id().getId() != null) {
            roleRepository.findById(userDTO.getRole_id().getId())
                    .ifPresent(user::setRole_id);
        } else {

        }


        User savedUser = userRepository.save(user);

        return userMapper.toDTO(savedUser);
    }

    @Override
    public UserDTO getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(userMapper::toDTO).orElse(null);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        Optional<User> existingUserOptional = userRepository.findById(id);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            existingUser.setUsername(userDTO.getUsername());
            existingUser.setPassword(userDTO.getPassword());
            existingUser.setFullname(userDTO.getFullname());
            existingUser.setEmail(userDTO.getEmail());
            existingUser.setPhone(userDTO.getPhone());

            if (userDTO.getRoleName() != null && !userDTO.getRoleName().isEmpty()) {
                Optional<Role> roleToSet = roleRepository.findByName(userDTO.getRoleName());
                roleToSet.ifPresent(existingUser::setRole_id);
            } else if (userDTO.getRole_id() != null && userDTO.getRole_id().getId() != null) {
                roleRepository.findById(userDTO.getRole_id().getId())
                        .ifPresent(existingUser::setRole_id);
            }

            User updatedUser = userRepository.save(existingUser);
            return userMapper.toDTO(updatedUser);
        }
        return null;
    }

    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        return userOptional.map(userMapper::toDTO).orElse(null);
    }
}
