package com.example.capstone.controller;

import com.example.capstone.entity.Destination;
import com.example.capstone.service.DestinationService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class DestinationController {

    private DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping("/destination")
    public List<Destination> getAllDestinations() {
        return this.destinationService.getAllDestination();
    }

    @GetMapping("/destination/{id}")
    public Optional<Destination> getDestinationId(@PathVariable("id") long id) {
        return this.destinationService.getDestinationById(id);
    }

    // CREATE
    @PostMapping("/destination")
    public ResponseEntity<Destination> createNewUcreateNewDestinationser(
            @Valid @RequestBody Destination destinationPostMan) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.destinationService.createDestination(destinationPostMan));
    }

    @PutMapping("/destination")
    public Destination updateDestination(@RequestBody Destination destinationPostMan) {
        return this.destinationService.updateDestination(destinationPostMan);
    }

    @DeleteMapping("/destination/{id}")
    public String deleteDestination(@PathVariable("id") long id) {
        return this.destinationService.deleteDestination(id);
    }

}
