package com.example.capstone.service;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.dto.TourSearchCriteriaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    Page<TourDTO> searchTours(TourSearchCriteriaDTO criteria, Pageable pageable);


}
