package com.example.capstone.service.imp;

import com.example.capstone.dto.CountryDTO;
import com.example.capstone.entity.Country;
import com.example.capstone.mapper.CountryMapper;
import com.example.capstone.repository.CountryRepository;
import com.example.capstone.service.CountryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryServiceImp implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImp(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CountryDTO> getAllCountries() {
        return countryRepository.findAll().stream()
                .map(CountryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CountryDTO getCountryById(Long id) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Country not found with id: " + id));
        return CountryMapper.toDto(country);
    }

    @Override
    @Transactional
    public CountryDTO createCountry(CountryDTO countryDto) {
        Country country = CountryMapper.toEntity(countryDto);
        Country savedCountry = countryRepository.save(country);
        return CountryMapper.toDto(savedCountry);
    }

    @Override
    @Transactional
    public CountryDTO updateCountry(Long id, CountryDTO countryDto) {
        Country existingCountry = countryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Country not found with id: " + id));

        CountryMapper.updateEntityFromDto(countryDto, existingCountry);

        Country updatedCountry = countryRepository.save(existingCountry);
        return CountryMapper.toDto(updatedCountry);
    }

    @Override
    @Transactional
    public void deleteCountry(Long id) {
        if (!countryRepository.existsById(id)) {
            throw new EntityNotFoundException("Country not found with id: " + id);
        }
        countryRepository.deleteById(id);
    }
}
