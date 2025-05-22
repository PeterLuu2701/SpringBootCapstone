package com.example.capstone.dto;

import com.example.capstone.entity.Role;
import lombok.Data;

@Data
public class RoleDTO {
    private int id;
    private String name;
    private String description;

    public RoleDTO(Role role) {
        this.id = role.getId();
        this.name = role.getName();
        this.description = role.getDescription();
    }
}