package com.example.capstone.service.imp;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;
import com.example.capstone.mapper.TourMapper;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.repository.TourRepository;
import com.example.capstone.service.TourService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TourServiceImp implements TourService {

    private final TourRepository tourRepository;
    private final DestinationRepository destinationRepository;

    public TourServiceImp(TourRepository tourRepository, DestinationRepository destinationRepository) {
        this.tourRepository = tourRepository;
        this.destinationRepository = destinationRepository;
    }

    @Override
    public TourDTO createTour(TourDTO dto) {
        Destination destination = destinationRepository.findById(dto.getDestination_id())
                .orElseThrow(() -> new EntityNotFoundException("Destination not found with id: " + dto.getDestination_id()));
        Tour saved = tourRepository.save(TourMapper.toEntity(dto, destination));
        return TourMapper.toDTO(saved);
    }

    @Override
    public List<TourDTO> getAllTours() {
        return tourRepository.findAll().stream()
                .map(TourMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TourDTO getTourById(long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + id));
        return TourMapper.toDTO(tour);
    }

    @Override
    public TourDTO updateTour(long id, TourDTO dto) {
        Tour existingTour = tourRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + id));

        Destination destination = destinationRepository.findById(dto.getDestination_id())
                .orElseThrow(() -> new EntityNotFoundException("Destination not found with id: " + dto.getDestination_id()));

        Tour updatedTour = TourMapper.toEntity(dto, destination);
        updatedTour.setId(id);
        Tour saved = tourRepository.save(updatedTour);
        return TourMapper.toDTO(saved);
    }

    @Override
    public void deleteTour(long id) {
        if (!tourRepository.existsById(id)) {
            throw new EntityNotFoundException("Tour not found  id: " + id);
        }
        tourRepository.deleteById(id);
    }
}
