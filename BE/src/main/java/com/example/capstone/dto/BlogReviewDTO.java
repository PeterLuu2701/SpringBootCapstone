package com.example.capstone.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;

@Data
public class BlogReviewDTO {
    private Long id;
    private Long blogId;
    private Long authorId;
    private Integer rating;
    private String comment;
    private Timestamp reviewDate;

    private MultipartFile image;   // Thêm trường này
    private String imageUrl;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}