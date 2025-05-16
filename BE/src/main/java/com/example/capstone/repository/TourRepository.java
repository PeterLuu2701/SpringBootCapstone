package com.example.capstone.repository;

import com.example.capstone.entity.Tour;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    @EntityGraph(attributePaths = {"destination"})
    Optional<Tour> findById(Long id);
}
