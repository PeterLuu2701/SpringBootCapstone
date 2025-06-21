package com.example.capstone.controller;

import com.example.capstone.dto.CityDTO;
import com.example.capstone.service.CityService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/city")
public class CityController {
    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public ResponseEntity<List<CityDTO>> getAllCities() {
        List<CityDTO> cities = cityService.getAllCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CityDTO> getCityById(@PathVariable Long id) {
        try {
            CityDTO city = cityService.getCityById(id);
            return ResponseEntity.ok(city);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CityDTO> createCity(@RequestBody CityDTO cityDto) {
        try {
            CityDTO createdCity = cityService.createCity(cityDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCity);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CityDTO> updateCity(@PathVariable Long id, @RequestBody CityDTO cityDto) {
        try {
            CityDTO updatedCity = cityService.updateCity(id, cityDto);
            return ResponseEntity.ok(updatedCity);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCity(@PathVariable Long id) {
        try {
            cityService.deleteCity(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/by-country/{countryId}")
    public ResponseEntity<List<CityDTO>> getCitiesByCountryId(@PathVariable Long countryId) {
        List<CityDTO> cities = cityService.getCitiesByCountryId(countryId);
        return ResponseEntity.ok(cities);
    }
}
