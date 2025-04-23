package com.example.capstone.dto;

import lombok.Data;

@Data
public class TourDTO {
    private long id;
    private String name;
    private String description;
    private Double price;
    private float rating;
    private String image_url;
    private String is_feature;
    private String duration;
    private long destination_id;
}