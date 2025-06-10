package com.example.capstone.controller;

import com.example.capstone.dto.DestinationDTO;
import com.example.capstone.service.DestinationService;
import com.example.capstone.util.annotation.ApiMessage;
import com.example.capstone.util.error.IdInvalidException;

import jakarta.validation.Valid;

// import java.util.Optional; // Không cần thiết nếu service ném exception
// import java.util.List; // Không cần thiết nếu trả về Page
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/destination")
public class DestinationController {

    private final DestinationService destinationService;

    // Constructor injection
    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    // GET ALL Destination with Pagination
    @GetMapping
    @ApiMessage("Get all destinations with pagination")
    public ResponseEntity<Page<DestinationDTO>> getAllDestinations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<DestinationDTO> destinations = this.destinationService.getAllDestination(page, size);
        return ResponseEntity.ok(destinations); // DestinationDTO đã chứa regionName (nếu mapper đúng)
    }

    // GET Destination BY ID
    @GetMapping("/{id}")
    @ApiMessage("Get destination by ID")
    public ResponseEntity<DestinationDTO> getDestinationId(@PathVariable("id") long id)
            throws IdInvalidException {
        DestinationDTO destination = this.destinationService.getDestinationById(id);
        return ResponseEntity.ok(destination); // DestinationDTO đã chứa regionName (nếu mapper đúng)
    }

    // CREATE Destination
    @PostMapping
    @ApiMessage("Create a new destination")
    public ResponseEntity<DestinationDTO> createNewDestination(
            @Valid @ModelAttribute DestinationDTO destinationDTO, // Spring sẽ bind regionName từ form-data vào đây
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
    ) {
        destinationDTO.setImageFile(imageFile); // Gán file vào DTO để service xử lý
        DestinationDTO createdDestination = this.destinationService.createDestination(destinationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDestination); // DestinationDTO đã chứa regionName
    }

    // UPDATE Destination
    @PutMapping("/{id}")
    @ApiMessage("Update an existing destination")
    public ResponseEntity<DestinationDTO> updateDestination(
            @PathVariable("id") long id,
            @Valid @ModelAttribute DestinationDTO destinationDTO, // Spring sẽ bind regionName từ form-data vào đây
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
    ) throws IdInvalidException {
        destinationDTO.setId(id); // Quan trọng: Set ID từ path vào DTO
        destinationDTO.setImageFile(imageFile);
        DestinationDTO updatedDestination = this.destinationService.updateDestination(id, destinationDTO);
        return ResponseEntity.ok(updatedDestination); // DestinationDTO đã chứa regionName
    }

    // DELETE Destination
    @DeleteMapping("/{id}")
    @ApiMessage("Delete a destination")
    public ResponseEntity<String> deleteDestination(@PathVariable("id") long id) throws IdInvalidException {
        String result = this.destinationService.deleteDestination(id);
        return ResponseEntity.ok(result);
    }
}