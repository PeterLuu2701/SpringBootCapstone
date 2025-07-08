package com.example.capstone.dto;

import lombok.Data;

@Data
public class TourBookingInfoDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private float rating;
    private String image_url;
    private String duration;

    private Long destination_id;
    private String destinationName;
    private String destinationCountryName;
    private String destinationCityName;
}
