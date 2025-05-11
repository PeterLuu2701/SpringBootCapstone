package com.example.capstone.dto;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;

public class TourMapper {

    public static TourDTO toDTO(Tour tour) {
        TourDTO dto = new TourDTO();
        dto.setId(tour.getId());
        dto.setName(tour.getName());
        dto.setDescription(tour.getDescription());
        dto.setPrice(tour.getPrice());
        dto.setRating(tour.getRating());
        dto.setImage_url(tour.getImage_url());
        dto.setIs_feature(tour.getIs_feature());
        dto.setDuration(tour.getDuration());
        dto.setDestination_id(
                tour.getDestination() != null ? tour.getDestination().getId() : 0
        );

        return dto;
    }

    public static Tour toEntity(TourDTO dto, Destination destination) {
        Tour tour = new Tour();
        tour.setId((int) dto.getId());
        tour.setName(dto.getName());
        tour.setDescription(dto.getDescription());
        tour.setPrice(dto.getPrice());
        tour.setRating(dto.getRating());
        tour.setImage_url(dto.getImage_url());
        tour.setIs_feature(dto.getIs_feature());
        tour.setDuration(dto.getDuration());
        tour.setDestination(destination);
        return tour;
    }
}