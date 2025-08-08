package com.example.capstone.controller;

import com.example.capstone.dto.CountryDTO;
import com.example.capstone.service.CountryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/country")
public class CountryController {
    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public ResponseEntity<List<CountryDTO>> getAllCountries() {
        List<CountryDTO> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountryDTO> getCountryById(@PathVariable Long id) {
        try {
            CountryDTO country = countryService.getCountryById(id);
            return ResponseEntity.ok(country);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CountryDTO> createCountry(@RequestBody CountryDTO countryDto) {
        CountryDTO createdCountry = countryService.createCountry(countryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCountry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CountryDTO> updateCountry(@PathVariable Long id, @RequestBody CountryDTO countryDto) {
        try {
            CountryDTO updatedCountry = countryService.updateCountry(id, countryDto);
            return ResponseEntity.ok(updatedCountry);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable Long id) {
        try {
            countryService.deleteCountry(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
