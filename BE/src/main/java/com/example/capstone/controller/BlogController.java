package com.example.capstone.controller;

import com.example.capstone.dto.BlogDTO;
import com.example.capstone.dto.BlogReviewDTO;
import com.example.capstone.service.BlogReviewService;
import com.example.capstone.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/blog")
@CrossOrigin
public class BlogController {

    private final BlogService blogService;
    private final BlogReviewService blogReviewService;

    public BlogController(BlogService blogService, BlogReviewService blogReviewService) {
        this.blogService = blogService;
        this.blogReviewService = blogReviewService;
    }

    // Blog Endpoints
    @PostMapping
    public ResponseEntity<BlogDTO> createBlog(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("authorId") Long authorId,
            @RequestParam(value = "tourId", required = false) Long tourId,
            @RequestParam("image") MultipartFile image  // Nhận file
    ) {
        BlogDTO blogDTO = new BlogDTO();
        blogDTO.setTitle(title);
        blogDTO.setContent(content);
        blogDTO.setAuthorId(authorId);
        blogDTO.setTourId(tourId);
        blogDTO.setImage(image);

        BlogDTO createdBlog = blogService.createBlog(blogDTO);
        return ResponseEntity.ok(createdBlog);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable Long id) {
        BlogDTO blog = blogService.getBlogById(id);
        return ResponseEntity.ok(blog);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<BlogDTO>> getAllBlogs() {
        List<BlogDTO> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(blogs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogDTO> updateBlog(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("authorId") Long authorId,
            @RequestParam(value = "tourId", required = false) Long tourId,
            @RequestParam(value = "image", required = false) MultipartFile image  // Nhận file (optional)
    ) {
        BlogDTO blogDTO = new BlogDTO();
        blogDTO.setId(id);
        blogDTO.setTitle(title);
        blogDTO.setContent(content);
        blogDTO.setAuthorId(authorId);
        blogDTO.setTourId(tourId);
        blogDTO.setImage(image);

        BlogDTO updatedBlog = blogService.updateBlog(id, blogDTO);
        return ResponseEntity.ok(updatedBlog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }

    // Blog Review Endpoints
    @PostMapping("/review")
    public ResponseEntity<BlogReviewDTO> createBlogReview(
            @RequestParam("blogId") Long blogId,
            @RequestParam("authorId") Long authorId,
            @RequestParam(value = "rating", required = false) Integer rating,
            @RequestParam("comment") String comment,
            @RequestParam("image") MultipartFile image
    ) {
        BlogReviewDTO blogReviewDTO = new BlogReviewDTO();
        blogReviewDTO.setBlogId(blogId);
        blogReviewDTO.setAuthorId(authorId);
        blogReviewDTO.setRating(rating);
        blogReviewDTO.setComment(comment);
        blogReviewDTO.setImage(image);

        BlogReviewDTO createdReview = blogReviewService.createBlogReview(blogReviewDTO);
        return ResponseEntity.ok(createdReview);
    }

    @GetMapping("/review/{id}")
    public ResponseEntity<BlogReviewDTO> getBlogReviewById(@PathVariable Long id) {
        BlogReviewDTO review = blogReviewService.getBlogReviewById(id);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/review")
    public ResponseEntity<List<BlogReviewDTO>> getAllBlogReviews() {
        List<BlogReviewDTO> reviews = blogReviewService.getAllBlogReviews();
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/review/{id}")
    public ResponseEntity<BlogReviewDTO> updateBlogReview(
            @PathVariable Long id,
            @RequestParam("blogId") Long blogId,
            @RequestParam("authorId") Long authorId,
            @RequestParam(value = "rating", required = false) Integer rating,
            @RequestParam("comment") String comment,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        BlogReviewDTO blogReviewDTO = new BlogReviewDTO();
        blogReviewDTO.setId(id);
        blogReviewDTO.setBlogId(blogId);
        blogReviewDTO.setAuthorId(authorId);
        blogReviewDTO.setRating(rating);
        blogReviewDTO.setComment(comment);
        blogReviewDTO.setImage(image);

        BlogReviewDTO updatedReview = blogReviewService.updateBlogReview(id, blogReviewDTO);
        return ResponseEntity.ok(updatedReview);
    }

    @DeleteMapping("/review/{id}")
    public ResponseEntity<Void> deleteBlogReview(@PathVariable Long id) {
        blogReviewService.deleteBlogReview(id);
        return ResponseEntity.noContent().build();
    }
}