package com.example.capstone.service;

import com.example.capstone.dto.CountryDTO;

import java.util.List;

public interface CountryService {
    List<CountryDTO> getAllCountries();
    CountryDTO getCountryById(Long id);
    CountryDTO createCountry(CountryDTO countryDto);
    CountryDTO updateCountry(Long id, CountryDTO countryDto);
    void deleteCountry(Long id);
}
