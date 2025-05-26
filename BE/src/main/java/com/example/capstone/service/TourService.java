package com.example.capstone.service;

import com.example.capstone.dto.TourDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface TourService {

    TourDTO createTour(MultipartFile file,TourDTO dto);
    List<TourDTO> getAllTours();
    TourDTO getTourById(long id);
    TourDTO updateTour(long id, TourDTO dto);
    void deleteTour(long id);


}
