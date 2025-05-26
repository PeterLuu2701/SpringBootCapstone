package com.example.capstone.entity;


import jakarta.persistence.*;
import lombok.Data;

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
    private float rating;
    private String image_url;
    private  String is_feature;
    private String duration;

    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;

    @ManyToOne
    @JoinColumn(name = "activity_id")
    private Activity activity;
}
