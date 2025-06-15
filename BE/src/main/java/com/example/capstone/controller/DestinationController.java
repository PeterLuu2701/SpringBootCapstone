package com.example.capstone.controller;

import com.example.capstone.entity.Destination;
import com.example.capstone.service.DestinationService;
import com.example.capstone.service.imp.DestinationServiceImp;
import com.example.capstone.util.error.IdInvalidException;

import jakarta.validation.Valid;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class DestinationController {
    private final DestinationServiceImp destinationService;

    public DestinationController(DestinationServiceImp destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping("/destination")
    public ResponseEntity<Page<Destination>> getAllDestinations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1000") int size) {
        Page<Destination> destinations = this.destinationService.getAllDestination(page, size);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/destination/{id}")
    public ResponseEntity<Optional<Destination>> getDestinationId(@PathVariable("id") long id)
            throws IdInvalidException {
        Optional<Destination> destination = this.destinationService.getDestinationById(id);
        if (destination.isPresent()) {
            return ResponseEntity.ok(destination);
        } else {
            throw new IdInvalidException("Destination với Id " + id + " không tồn tại");
        }
    }

    @PostMapping("/destination")
    public ResponseEntity<Destination> createNewDestination(
            @Valid @RequestBody Destination destinationPostMan) {
        Destination createdDestination = this.destinationService.createDestination(destinationPostMan);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDestination);
    }

    @PutMapping("/destination")
    public ResponseEntity<Destination> updateDestination(@RequestBody Destination destinationPostMan)
            throws IdInvalidException {
        Destination updatedDestination = this.destinationService.updateDestination(destinationPostMan);
        return ResponseEntity.ok(updatedDestination);
    }

    @DeleteMapping("/destination/{id}")
    public ResponseEntity<String> delete_destination(@PathVariable("id") long id) throws IdInvalidException {
        String result = this.destinationService.delete_destination(id);
        return ResponseEntity.ok(result);
    }
}
