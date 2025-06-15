package com.example.capstone.mapper;

import com.example.capstone.dto.UserDTO;
import com.example.capstone.entity.User;
import com.example.capstone.entity.Role;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        // For security, do NOT include the password when mapping to DTO for frontend
        // dto.setPassword(user.getPassword()); // REMOVE THIS LINE IN PRODUCTION
        dto.setFullname(user.getFullname());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());

        // Map role details to DTO
        if (user.getRole() != null) { // Assuming User entity has getRole() returning a Role object
            dto.setRole_id(user.getRole().getId()); // Set the Long ID from the Role object
            dto.setRoleName(user.getRole().getName());
            dto.setRoleDescription(user.getRole().getDescription());
        }
        return dto;
    }

    public static User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setFullname(userDTO.getFullname());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());


        return user;
    }
}
