package com.example.capstone.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "destination")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message = "name không được để trống")
    private String name;
    private String description;
    private String country;
    private String city;
    private String image_url;
    @Column(columnDefinition = "BOOLEAN DEFAULT true")
    private boolean popular;
    private String duration;

    @OneToMany(mappedBy = "destination")
    private List<Tour> tours;

}
