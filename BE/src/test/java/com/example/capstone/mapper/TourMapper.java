package com.example.capstone.mapper;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.entity.Tour;

public class TourMapper {

    public static TourDTO toDTO(Tour tour) {
        TourDTO tourDTO = new TourDTO();
        tourDTO.setId(tour.getId());
        tourDTO.setName(tour.getName());
        tourDTO.setDescription(tour.getDescription());
        tourDTO.setPrice(tour.getPrice());
        tourDTO.setRating(tour.getRating());
        tourDTO.setImage_url(tour.getImage_url());
        tourDTO.setIs_feature(tour.getIs_feature());
        tourDTO.setDuration(tour.getDuration());
        // Map destination và activity nếu cần
        return tourDTO;
    }
}