package com.example.capstone.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Set;

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
    private String google_map_url;
    private String region_name;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "destination_activity",  // Tên bảng trung gian trong DB
            joinColumns = @JoinColumn(name = "destination_id"), // Cột trong bảng trung gian trỏ về Destination
            inverseJoinColumns = @JoinColumn(name = "activity_id") // Cột trong bảng trung gian trỏ về Activity
    )
    private Set<Activity> activities;
}
