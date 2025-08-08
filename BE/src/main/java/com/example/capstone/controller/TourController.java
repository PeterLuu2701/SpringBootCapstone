package com.example.capstone.controller;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.dto.TourSearchCriteriaDTO;
import com.example.capstone.service.TourService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/tour")
@CrossOrigin
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    // GET ALL
    @GetMapping()
    public ResponseEntity<List<TourDTO>> getAllTours() {
        List<TourDTO> tours = tourService.getAllTours();
        return ResponseEntity.ok(tours);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<TourDTO> getTourById(@PathVariable Long id) {
        TourDTO tour = tourService.getTourById(id);
        return ResponseEntity.ok(tour);
    }

    // CREATE
    @PostMapping()
    public ResponseEntity<TourDTO> createTour(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @Valid @ModelAttribute TourDTO dto) {
        TourDTO createdTour = tourService.createTour(file, dto);
        return ResponseEntity.ok(createdTour);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<TourDTO> updateTour(
            @PathVariable long id,
            @Valid @ModelAttribute TourDTO dto,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        dto.setImageFile(file);
        TourDTO updatedTour = tourService.updateTour(id, dto);
        return ResponseEntity.ok(updatedTour);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTour(@PathVariable long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok("Tour đã được xóa thành công!");
    }

    @PostMapping("/search")
    public ResponseEntity<Page<TourDTO>> searchTours(
            @Valid @RequestBody TourSearchCriteriaDTO criteria,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        Page<TourDTO> tourPage = tourService.searchTours(criteria, pageable);
        return ResponseEntity.ok(tourPage);
    }

    // GET tour by destination id
    @GetMapping("/destination/{destinationId}")
    public ResponseEntity<List<TourDTO>> getToursByDestinationId(@PathVariable Long destinationId) {
        List<TourDTO> tours = tourService.getToursByDestinationId(destinationId);
        if (tours.isEmpty()) {
            return ResponseEntity.noContent().build(); // Or HttpStatus.NOT_FOUND if you prefer
        }
        return ResponseEntity.ok(tours);
    }
}