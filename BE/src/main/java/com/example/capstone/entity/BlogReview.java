package com.example.capstone.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity(name = "blog_review")
public class BlogReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "blog_id")
    private Blog blog;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private Timestamp reviewDate;

    private String imageUrl;   // Thêm trường này
}