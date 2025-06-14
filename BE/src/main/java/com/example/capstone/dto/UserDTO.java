package com.example.capstone.dto;

import com.example.capstone.entity.Role;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String fullname;
    private String email;
    private String phone;
    private Long role_id;
    private String roleName;
    private String roleDescription;
}
