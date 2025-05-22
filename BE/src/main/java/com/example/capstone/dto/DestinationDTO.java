package com.example.capstone.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile; // Import MultipartFile

@Data
public class DestinationDTO {
    private long id;
    @NotBlank(message = "name không được để trống")
    private String name;
    private String description;
    private String country;
    private String city;

    // Thêm trường để nhận file upload
    private MultipartFile imageFile;
    // Trường để trả về URL ảnh
    private String imageUrl;

    private boolean popular;
    private String duration;
    private String google_map_url;

    // Getters and Setters (Lombok @Data handles this)
}