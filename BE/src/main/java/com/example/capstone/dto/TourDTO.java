package com.example.capstone.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TourDTO {
    private long id;
    private String name;
    private String description;
    private Double price;
    private float rating;
    private String image_url;
    private MultipartFile imageFile;
    private Boolean is_feature;
    private String duration;

    private Long destination_id;
    private String destinationName;
    private Long destinationCountryId;
    private String destinationCountryName;
    private Long destinationCityId;
    private String destinationCityName;

    private Long activity_id;
    private String activityName;
    private String activityDescription;
}