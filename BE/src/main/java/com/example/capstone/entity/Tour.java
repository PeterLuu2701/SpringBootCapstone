package com.example.capstone.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Locale;

@Entity(name = "tour")
@Data
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
    private double price;
    private double rating;
    private String image_url;
    private Boolean is_feature;
    private String duration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id", referencedColumnName = "id")
    private Destination destination;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id", referencedColumnName = "id")
    private Activity activity;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true) // <-- Sửa mappedBy thành "tour"
    private List<Booking> bookings; // Hoặc Set<Booking>

}
