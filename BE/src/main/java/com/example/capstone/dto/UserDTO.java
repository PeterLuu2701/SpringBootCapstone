package com.example.capstone.dto;

import com.example.capstone.entity.User;
import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String username;
    private String fullname;
    private String email;
    private String phone;
    private String roleName;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.fullname = user.getFullname();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.roleName = user.getRole_id() != null ? user.getRole_id().getName() : null;
    }
}