package com.example.capstone.service;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;
import com.example.capstone.mapper.TourMapper;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.repository.TourRepository;
import jakarta.persistence.EntityNotFoundException;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public interface TourService {

    TourDTO createTour(TourDTO dto);
    List<TourDTO> getAllTours();
    TourDTO getTourById(long id);
    TourDTO updateTour(long id, TourDTO dto);
    void deleteTour(long id);


}
