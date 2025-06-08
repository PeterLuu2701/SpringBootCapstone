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
        dto.setPassword(user.getPassword());
        dto.setFullname(user.getFullname());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());

        if (user.getRole_id() != null) {
            dto.setRole_id(user.getRole_id());
            dto.setRoleName(user.getRole_id().getName());
            dto.setRoleDescription(user.getRole_id().getDescription());
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

        user.setRole_id(userDTO.getRole_id());

        return user;
    }
}
