package com.example.capstone.service.imp;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.example.capstone.entity.City;
import com.example.capstone.entity.Country;
import com.example.capstone.repository.CityRepository;
import com.example.capstone.repository.CountryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.capstone.dto.DestinationDTO;
import com.example.capstone.mapper.DestinationMapper;
import com.example.capstone.entity.Destination;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.service.DestinationService;
import com.example.capstone.service.FileService;
import com.example.capstone.util.error.IdInvalidException;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DestinationServiceImp implements DestinationService {

    private final DestinationRepository destinationRepository;
    private final FileService fileService;
    private final CountryRepository countryRepository; // NEW
    private final CityRepository cityRepository;     // NEW

    public DestinationServiceImp(DestinationRepository destinationRepository, FileService fileService,
                                 CountryRepository countryRepository, CityRepository cityRepository) {
        this.destinationRepository = destinationRepository;
        this.fileService = fileService;
        this.countryRepository = countryRepository;
        this.cityRepository = cityRepository;
    }

    // CREATE
    @Override
    @Transactional
    public DestinationDTO createDestination(DestinationDTO destinationDTO) {
        // 1. Validate and fetch associated Country entity
        if (destinationDTO.getCountryId() == null) { // Changed to getCountry_id as per previous DTO advice
            throw new IllegalArgumentException("Country ID cannot be null when creating a Destination.");
        }
        Country country = countryRepository.findById(destinationDTO.getCountryId())
                .orElseThrow(() -> new EntityNotFoundException("Country not found with id: " + destinationDTO.getCountryId()));

        // 2. Validate and fetch associated City entity
        if (destinationDTO.getCityId() == null) { // Changed to getCity_id
            throw new IllegalArgumentException("City ID cannot be null when creating a Destination.");
        }
        City city = cityRepository.findById(destinationDTO.getCityId())
                .orElseThrow(() -> new EntityNotFoundException("City not found with id: " + destinationDTO.getCityId()));

        // 3. Convert DTO to Entity for basic fields
        Destination destination = DestinationMapper.toEntity(destinationDTO, country, city);

        // 4. Set the managed Country and City entities
        destination.setCountry(country);
        destination.setCity(city);

        // 5. Handle image file upload
        if (destinationDTO.getImageFile() != null && !destinationDTO.getImageFile().isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + destinationDTO.getImageFile().getOriginalFilename();
            fileService.save(destinationDTO.getImageFile(), fileName);
            destination.setImage_url("/file/" + fileName);
        } else {
            destination.setImage_url(null);
        }

        // 6. Save the new Destination entity
        Destination savedDestination = this.destinationRepository.save(destination);

        // 7. Convert the saved Entity back to DTO and return
        return DestinationMapper.toDTO(savedDestination);
    }

    // GET ALL Destination with Pagination
    @Override
    @Transactional(readOnly = true)
    public Page<DestinationDTO> getAllDestination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Destination> destinationPage = this.destinationRepository.findAll(pageable);

        List<DestinationDTO> dtoList = destinationPage.getContent().stream()
                .map(DestinationMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, destinationPage.getTotalElements());
    }

    // GET Destination BY ID
    @Override
    @Transactional(readOnly = true)
    public DestinationDTO getDestinationById(long id) throws IdInvalidException {
        Destination destination = this.destinationRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("Destination with Id " + id + " not found"));

        return DestinationMapper.toDTO(destination);
    }

    // UPDATE
    @Override
    @Transactional
    public DestinationDTO updateDestination(long id, DestinationDTO destinationDTO) throws IdInvalidException {
        // 1. Find the existing Destination entity
        Destination existingDestination = this.destinationRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("Destination with Id " + id + " not found"));

        // 2. Update basic fields using the static mapper's update method
        DestinationMapper.updateEntityFromDTO(existingDestination, destinationDTO);

        // 3. Handle Country relationship update
        Long dtoCountryId = destinationDTO.getCountryId();
        Long existingCountryId = (existingDestination.getCountry() != null) ? existingDestination.getCountry().getId() : null;

        if (!Objects.equals(dtoCountryId, existingCountryId)) {
            if (dtoCountryId != null) {
                Country newCountry = countryRepository.findById(dtoCountryId)
                        .orElseThrow(() -> new EntityNotFoundException("Country not found with id: " + dtoCountryId));
                existingDestination.setCountry(newCountry);
            } else {
                existingDestination.setCountry(null); // Disassociate country
            }
        }

        // 4. Handle City relationship update
        Long dtoCityId = destinationDTO.getCityId();
        Long existingCityId = (existingDestination.getCity() != null) ? existingDestination.getCity().getId() : null;

        if (!Objects.equals(dtoCityId, existingCityId)) {
            if (dtoCityId != null) {
                City newCity = cityRepository.findById(dtoCityId)
                        .orElseThrow(() -> new EntityNotFoundException("City not found with id: " + dtoCityId));
                existingDestination.setCity(newCity);
            } else {
                existingDestination.setCity(null); // Disassociate city
            }
        }

        // 5. Handle image file upload for update
        if (destinationDTO.getImageFile() != null && !destinationDTO.getImageFile().isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + destinationDTO.getImageFile().getOriginalFilename();
            fileService.save(destinationDTO.getImageFile(), fileName);
            existingDestination.setImage_url("/file/" + fileName);
        }

        // 6. Save the updated Destination
        Destination updatedDestination = this.destinationRepository.save(existingDestination);

        // 7. Convert to DTO and return
        return DestinationMapper.toDTO(updatedDestination);
    }

    // DELETE Destination
    @Override
    @Transactional
    public String deleteDestination(long id) throws IdInvalidException {
        Destination destinationToDelete = this.destinationRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("Destination with Id " + id + " not found"));

        String imageUrl = destinationToDelete.getImage_url();
        if (imageUrl != null && !imageUrl.isEmpty() && imageUrl.startsWith("/file/")) {

        }

        this.destinationRepository.delete(destinationToDelete);
        return "Destination with Id " + id + " deleted successfully!";
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DestinationDTO> searchDestinations(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Destination> destinationPage = destinationRepository
                .findByNameContainingIgnoreCase(keyword, pageable);

        List<DestinationDTO> dtoList = destinationPage.getContent().stream()
                .map(DestinationMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, destinationPage.getTotalElements());
    }

}