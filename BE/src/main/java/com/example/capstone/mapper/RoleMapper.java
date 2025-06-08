package com.example.capstone.mapper;

import com.example.capstone.dto.RoleDTO;
import com.example.capstone.entity.Role;

public class RoleMapper {
    public static RoleDTO toDTO(Role role) {
        RoleDTO dto = new RoleDTO();
        dto.setId(role.getId());
        dto.setName(role.getName());
        dto.setDescription(role.getDescription());
        return dto;
    }

    public static Role toEntity(RoleDTO dto) {
        Role role = new Role();
        role.setId(dto.getId());
        role.setName(dto.getName());
        role.setDescription(dto.getDescription());

        return role;
    }
}
