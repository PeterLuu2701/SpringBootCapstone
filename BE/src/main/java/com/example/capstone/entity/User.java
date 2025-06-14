package com.example.capstone.entity;

import jakarta.persistence.*;
import lombok.Data; // Lombok will generate getters/setters for 'role'

import java.util.Date; // Keep if you use it elsewhere, otherwise can remove

@Data
@Entity(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String fullname;
    private String email;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

}
