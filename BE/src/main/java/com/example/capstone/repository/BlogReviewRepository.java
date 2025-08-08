package com.example.capstone.repository;

import com.example.capstone.entity.BlogReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogReviewRepository extends JpaRepository<BlogReview, Long> {
}