package com.example.capstone.service;

import com.example.capstone.dto.CityDTO;

import java.util.List;

public interface CityService {
    List<CityDTO> getAllCities();
    CityDTO getCityById(Long id);
    CityDTO createCity(CityDTO cityDto);
    CityDTO updateCity(Long id, CityDTO cityDto);
    void deleteCity(Long id);
    List<CityDTO> getCitiesByCountryId(Long countryId);
}
