package com.example.capstone.controller;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.service.TourService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/tour")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    // GET ALL
    @GetMapping("/get-all-tour")
    public ResponseEntity<List<TourDTO>> getAllTours() {
        List<TourDTO> tours = tourService.getAllTours();
        return ResponseEntity.ok(tours);
    }

    // GET BY ID
    @GetMapping("/get-tour-by-id")
    public ResponseEntity<TourDTO> getTourById(@RequestParam long id) {
        TourDTO tour = tourService.getTourById(id);
        return ResponseEntity.ok(tour);
    }

    // CREATE
    @PostMapping("/create-tour")
    public ResponseEntity<TourDTO> createTour(@RequestParam MultipartFile file,@ModelAttribute  TourDTO dto) {
        TourDTO createdTour = tourService.createTour(file,dto);
        return ResponseEntity.ok(createdTour);
    }

    // UPDATE
    @PutMapping("/update-tour")
    public ResponseEntity<TourDTO> updateTour(@RequestParam long id, @Valid @RequestBody TourDTO dto) {
        TourDTO updatedTour = tourService.updateTour(id, dto);
        return ResponseEntity.ok(updatedTour);
    }

    // DELETE
    @DeleteMapping("/delete-tour")
    public ResponseEntity<String> deleteTour(@RequestParam long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok("Tour đã được xóa thành công!");
    }
}