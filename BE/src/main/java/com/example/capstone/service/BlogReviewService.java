package com.example.capstone.service;

import com.example.capstone.dto.BlogReviewDTO;
import java.util.List;

public interface BlogReviewService {
    BlogReviewDTO createBlogReview(BlogReviewDTO blogReviewDTO);
    BlogReviewDTO getBlogReviewById(Long id);
    List<BlogReviewDTO> getAllBlogReviews();
    BlogReviewDTO updateBlogReview(Long id, BlogReviewDTO blogReviewDTO);
    void deleteBlogReview(Long id);
}