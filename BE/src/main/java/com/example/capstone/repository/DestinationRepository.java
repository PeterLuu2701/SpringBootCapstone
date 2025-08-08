package com.example.capstone.repository;

import com.example.capstone.entity.Destination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    Page<Destination> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
}
