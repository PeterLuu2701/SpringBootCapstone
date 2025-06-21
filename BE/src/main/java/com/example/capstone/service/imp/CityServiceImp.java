package com.example.capstone.service.imp;

import com.example.capstone.dto.CityDTO;
import com.example.capstone.entity.City;
import com.example.capstone.entity.Country;
import com.example.capstone.mapper.CityMapper;
import com.example.capstone.repository.CityRepository;
import com.example.capstone.repository.CountryRepository;
import com.example.capstone.service.CityService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CityServiceImp implements CityService {
    private final CityRepository cityRepository;
    private final CountryRepository countryRepository;

    public CityServiceImp(CityRepository cityRepository, CountryRepository countryRepository) {
        this.cityRepository = cityRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CityDTO> getAllCities() {
        return cityRepository.findAll().stream()
                .map(CityMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CityDTO getCityById(Long id) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("City not found with id: " + id));
        return CityMapper.toDto(city);
    }

    @Override
    @Transactional
    public CityDTO createCity(CityDTO cityDto) {
        Country country = countryRepository.findById(cityDto.getCountryId())
                .orElseThrow(() -> new EntityNotFoundException("Country not found with id: " + cityDto.getCountryId()));

        City city = CityMapper.toEntity(cityDto);
        city.setCountry(country);

        City savedCity = this.cityRepository.save(city);
        return CityMapper.toDto(savedCity);
    }

    @Override
    @Transactional
    public CityDTO updateCity(Long id, CityDTO cityDto) {
        City existingCity = cityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("City not found with id: " + id));

        existingCity.setName(cityDto.getName());

        City updatedCity = cityRepository.save(existingCity);

        return CityMapper.toDto(updatedCity);
    }

    @Override
    @Transactional
    public void deleteCity(Long id) {
        if (!cityRepository.existsById(id)) {
            throw new EntityNotFoundException("City not found with id: " + id);
        }
        cityRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CityDTO> getCitiesByCountryId(Long countryId) {
        if (!countryRepository.existsById(countryId)) {
            throw new EntityNotFoundException("Country not found with id: " + countryId + ". Cannot retrieve cities.");
        }
        return cityRepository.findByCountryId(countryId).stream()
                .map(CityMapper::toDto)
                .collect(Collectors.toList());
    }
}
