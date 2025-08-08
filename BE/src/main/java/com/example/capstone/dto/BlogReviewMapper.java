package com.example.capstone.dto;

import com.example.capstone.dto.BlogReviewDTO;
import com.example.capstone.entity.Blog;
import com.example.capstone.entity.BlogReview;
import com.example.capstone.entity.User;

public class BlogReviewMapper {

    public static BlogReviewDTO toDTO(BlogReview blogReview) {
        BlogReviewDTO dto = new BlogReviewDTO();
        dto.setId(blogReview.getId());
        dto.setBlogId(blogReview.getBlog().getId());
        dto.setAuthorId(blogReview.getAuthor().getId().longValue());
        dto.setRating(blogReview.getRating());
        dto.setComment(blogReview.getComment());
        dto.setReviewDate(blogReview.getReviewDate());
        dto.setImageUrl(blogReview.getImageUrl());
        return dto;
    }

    public static BlogReview toEntity(BlogReviewDTO dto, Blog blog, User author, String imageUrl) { // Thêm Blog và User
        BlogReview blogReview = new BlogReview();
        blogReview.setId(dto.getId());
        blogReview.setBlog(blog); // Set Blog
        blogReview.setAuthor(author); // Set Author
        blogReview.setRating(dto.getRating());
        blogReview.setComment(dto.getComment());
        blogReview.setImageUrl(imageUrl);
        return blogReview;
    }
}