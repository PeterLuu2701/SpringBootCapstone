package com.example.capstone.controller;

import com.example.capstone.dto.DestinationDTO; // Import DestinationDTO
import com.example.capstone.service.DestinationService;
import com.example.capstone.util.annotation.ApiMessage; // Import ApiMessage
import com.example.capstone.util.error.IdInvalidException;

import jakarta.validation.Valid;

import java.util.Optional; // Vẫn cần nếu Service trả về Optional (nhưng giờ trả về DTO)
import java.util.List; // Import List nếu getAll trả về List

import org.springframework.data.domain.Page; // Import Page
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile; // Import MultipartFile

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
    @ApiMessage("Get all destinations with pagination") // Sử dụng ApiMessage
    public ResponseEntity<Page<DestinationDTO>> getAllDestinations( // Đổi kiểu trả về
                                                                    @RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "10") int size) {
        Page<DestinationDTO> destinations = this.destinationService.getAllDestination(page, size); // Gọi service mới
        return ResponseEntity.ok(destinations);
    }

    // GET Destination BY ID
    @GetMapping("/{id}") // Sử dụng PathVariable cho ID
    @ApiMessage("Get destination by ID") // Sử dụng ApiMessage
    public ResponseEntity<DestinationDTO> getDestinationId(@PathVariable("id") long id) // Đổi kiểu trả về và nhận PathVariable
            throws IdInvalidException { // Service ném IdInvalidException
        DestinationDTO destination = this.destinationService.getDestinationById(id); // Gọi service mới
        // Service đã ném exception nếu không tìm thấy, nên không cần kiểm tra Optional.isPresent() ở đây
        return ResponseEntity.ok(destination);
    }

    // CREATE Destination
    @PostMapping
    @ApiMessage("Create a new destination") // Sử dụng ApiMessage
    // Nhận DestinationDTO và file ảnh. Dùng @ModelAttribute khi có file.
    public ResponseEntity<DestinationDTO> createNewDestination(
            @Valid @ModelAttribute DestinationDTO destinationDTO, // Nhận DTO
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile // Nhận file ảnh (tên param là imageFile)
    ) {
        // Set imageFile vào DTO
        destinationDTO.setImageFile(imageFile);
        DestinationDTO createdDestination = this.destinationService.createDestination(destinationDTO); // Gọi service mới
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDestination);
    }

    // UPDATE Destination
    @PutMapping("/{id}") // Sử dụng PathVariable cho ID
    @ApiMessage("Update an existing destination") // Sử dụng ApiMessage
    // Nhận ID từ PathVariable, DTO và file ảnh. Dùng @ModelAttribute khi có file.
    public ResponseEntity<DestinationDTO> updateDestination(
            @PathVariable("id") long id, // Nhận ID từ PathVariable
            @Valid @ModelAttribute DestinationDTO destinationDTO, // Nhận DTO
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile // Nhận file ảnh (tên param là imageFile)
    ) throws IdInvalidException { // Service ném IdInvalidException
        // Set ID và imageFile vào DTO
        destinationDTO.setId(id); // Set ID từ PathVariable vào DTO
        destinationDTO.setImageFile(imageFile); // Set imageFile vào DTO

        DestinationDTO updatedDestination = this.destinationService.updateDestination(id, destinationDTO); // Gọi service mới
        return ResponseEntity.ok(updatedDestination);
    }

    // DELETE Destination
    @DeleteMapping("/{id}") // Sử dụng PathVariable cho ID
    @ApiMessage("Delete a destination") // Sử dụng ApiMessage
    public ResponseEntity<String> deleteDestination(@PathVariable("id") long id) throws IdInvalidException { // Nhận PathVariable
        String result = this.destinationService.deleteDestination(id); // Gọi service mới
        return ResponseEntity.ok(result); // Trả về thông báo từ service
    }
}