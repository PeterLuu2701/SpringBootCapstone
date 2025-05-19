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
        if (tour.getDestination() != null) {
            dto.setDestination_id(tour.getDestination().getId());
            dto.setDestinationName(tour.getDestination().getName());
            dto.setDestinationCountry(tour.getDestination().getCountry());
            dto.setDestinationCity(tour.getDestination().getCity());
        } else {
            dto.setDestination_id(0);
        }
        if (tour.getActivity() != null) {
            dto.setActivity_id(tour.getActivity().getId());
            dto.setActivityName(tour.getActivity().getName());
            dto.setActivityDescription(tour.getActivity().getDescription());
        } else {
            dto.setActivity_id(0);
        }

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