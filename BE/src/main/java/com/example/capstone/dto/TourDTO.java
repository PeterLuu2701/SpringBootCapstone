package com.example.capstone.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile; // Import này nếu bạn muốn thêm file vào DTO cho update

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

    // Thêm trường này nếu bạn muốn cập nhật ảnh khi update tour
    // private MultipartFile file;
}