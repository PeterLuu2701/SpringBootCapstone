package com.example.capstone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile; // Import MultipartFile

@Data
public class DestinationDTO {
    private Long id;
    @NotBlank(message = "name không được để trống")
    private String name;
    private String description;

    @NotNull(message = "Country ID is required")
    private Long countryId;
    private String countryName;
    @NotNull(message = "City ID is required")
    private Long cityId;
    private String cityName;

    private MultipartFile imageFile;
    private String imageUrl;

    private Boolean popular;
    private String duration;
    private String google_map_url;
    private String region_name;

}