package com.example.capstone.service.imp;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.dto.TourSearchCriteriaDTO;
import com.example.capstone.entity.Activity;
import com.example.capstone.mapper.TourMapper;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;

import com.example.capstone.repository.ActivityRepository;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.repository.TourRepository;
import com.example.capstone.repository.specification.TourSpecifications;
import com.example.capstone.service.FileService;
import com.example.capstone.service.TourService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public  class TourServiceImp implements TourService {

    private final TourRepository tourRepository;
    private final DestinationRepository destinationRepository;
    private final FileService fileService;
    private final ActivityRepository activityRepository;

    public TourServiceImp(TourRepository tourRepository,
                          DestinationRepository destinationRepository,
                          FileService fileService,
                          ActivityRepository activityRepository) {
        this.tourRepository = tourRepository;
        this.destinationRepository = destinationRepository;
        this.fileService = fileService;
        this.activityRepository = activityRepository;
    }

    @Override
    @Transactional
    public TourDTO createTour(MultipartFile file, TourDTO dto) {
        // 1. Validate and fetch associated Destination entity
        Destination destination = destinationRepository.findById(dto.getDestination_id())
                .orElseThrow(() -> new EntityNotFoundException("Destination not found with id: " + dto.getDestination_id()));

        // 2. Validate and fetch associated Activity entity
        Activity activity = activityRepository.findById(dto.getActivity_id())
                .orElseThrow(() -> new EntityNotFoundException("Activity not found with id: " + dto.getActivity_id()));

        // 3. Handle image file upload
        String fileName = null;
        if (file != null && !file.isEmpty()) {
            fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            fileService.save(file, fileName);
            dto.setImage_url("/file/" + fileName);
        } else {
            dto.setImage_url(null);
        }

        // 4. Convert DTO to Entity and set relationships
        Tour tour = TourMapper.toEntity(dto, destination, activity);

        // 5. Save the tour
        Tour savedTour = tourRepository.save(tour);
        return TourMapper.toDTO(savedTour);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TourDTO> getAllTours() {
        return tourRepository.findAll().stream()
                .map(TourMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TourDTO getTourById(long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + id));
        return TourMapper.toDTO(tour);
    }

    @Override
    @Transactional
    public TourDTO updateTour(long id, TourDTO dto) {
        Tour existingTour = tourRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + id));

        // 1. Update basic fields using the mapper
        TourMapper.updateEntityFromDTO(existingTour, dto);

        // 2. Handle Destination relationship update
        Long dtoDestinationId = dto.getDestination_id();
        Long existingDestinationId = (existingTour.getDestination() != null) ? existingTour.getDestination().getId() : null;

        if (!Objects.equals(dtoDestinationId, existingDestinationId)) {
            if (dtoDestinationId != null) {
                Destination newDestination = destinationRepository.findById(dtoDestinationId)
                        .orElseThrow(() -> new EntityNotFoundException("Destination not found with id: " + dtoDestinationId));
                existingTour.setDestination(newDestination);
            } else {
                existingTour.setDestination(null); // Disassociate destination
            }
        }

        // 3. Handle Activity relationship update
        Long dtoActivityId = dto.getActivity_id();
        Long existingActivityId = (existingTour.getActivity() != null) ? existingTour.getActivity().getId() : null;

        if (!Objects.equals(dtoActivityId, existingActivityId)) {
            if (dtoActivityId != null) {
                Activity newActivity = activityRepository.findById(dtoActivityId)
                        .orElseThrow(() -> new EntityNotFoundException("Activity not found with id: " + dtoActivityId));
                existingTour.setActivity(newActivity);
            } else {
                existingTour.setActivity(null); // Disassociate activity
            }
        }

        // 4. Handle image file update
        if (dto.getImageFile() != null && !dto.getImageFile().isEmpty()) {
            String newFileName = System.currentTimeMillis() + "_" + dto.getImageFile().getOriginalFilename();
            fileService.save(dto.getImageFile(), newFileName);
            existingTour.setImage_url("/file/" + newFileName);
        } else if (dto.getImage_url() != null && dto.getImage_url().isEmpty()) {
            existingTour.setImage_url(null);
        }
        // 5. Save the updated tour entity
        Tour saved = tourRepository.save(existingTour);
        return TourMapper.toDTO(saved);
    }

    @Override
    @Transactional
    public void deleteTour(long id) {
        Tour tourToDelete = tourRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + id));

        tourRepository.delete(tourToDelete);
    }

    @Transactional(readOnly = true)
    public Page<TourDTO> searchTours(TourSearchCriteriaDTO criteria, Pageable pageable) {
        Specification<Tour> spec = TourSpecifications.buildSpecification(criteria);
        Page<Tour> tourPage = tourRepository.findAll(spec, pageable);
        return tourPage.map(TourMapper::toDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TourDTO> getToursByDestinationId(Long destinationId) {
        // You'll need to add a method to TourRepository to find tours by destination ID
        // For example: List<Tour> findByDestination_Id(Long destinationId);
        return tourRepository.findByDestination_Id(destinationId).stream()
                .map(TourMapper::toDTO)
                .collect(Collectors.toList());
    }
}