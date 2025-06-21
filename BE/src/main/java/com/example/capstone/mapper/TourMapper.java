package com.example.capstone.mapper;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.entity.Activity;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;

public class TourMapper {

    public static TourDTO toDTO(Tour tour) {
        if (tour == null) {
            return null;
        }
        TourDTO dto = new TourDTO();
        dto.setId(tour.getId());
        dto.setName(tour.getName());
        dto.setDescription(tour.getDescription());
        dto.setPrice(tour.getPrice());
        dto.setRating((float) tour.getRating());
        dto.setImage_url(tour.getImage_url());
        dto.setIs_feature(tour.getIs_feature());
        dto.setDuration(tour.getDuration());

        // Handle Destination details
        if (tour.getDestination() != null) {
            Destination destination = tour.getDestination();
            dto.setDestination_id(destination.getId());
            dto.setDestinationName(destination.getName());

            // Access Country and City from the Destination object
            if (destination.getCountry() != null) {
                dto.setDestinationCountryId(destination.getCountry().getId());
                dto.setDestinationCountryName(destination.getCountry().getName());
            }
            if (destination.getCity() != null) {
                dto.setDestinationCityId(destination.getCity().getId());
                dto.setDestinationCityName(destination.getCity().getName());
            }
        } else {
            // Set null if destination is not present
            dto.setDestination_id(null);
            dto.setDestinationName(null);
            dto.setDestinationCountryId(null);
            dto.setDestinationCountryName(null);
            dto.setDestinationCityId(null);
            dto.setDestinationCityName(null);
        }

        // Handle Activity details
        if (tour.getActivity() != null) {
            Activity activity = tour.getActivity();
            dto.setActivity_id(activity.getId());
            dto.setActivityName(activity.getName());
            dto.setActivityDescription(activity.getDescription());
        } else {
            // Set null if activity is not present
            dto.setActivity_id(null);
            dto.setActivityName(null);
            dto.setActivityDescription(null);
        }

        return dto;
    }

    public static Tour toEntity(TourDTO dto, Destination destination, Activity activity) {
        if (dto == null) {
            return null;
        }
        Tour tour = new Tour();
        tour.setName(dto.getName());
        tour.setDescription(dto.getDescription());
        tour.setPrice(dto.getPrice());
        tour.setRating(dto.getRating());
        tour.setImage_url(dto.getImage_url());
        tour.setIs_feature(dto.getIs_feature());
        tour.setDuration(dto.getDuration());

        tour.setDestination(destination);
        tour.setActivity(activity);

        return tour;
    }

    public static void updateEntityFromDTO(Tour existingTour, TourDTO dto) {
        if (existingTour == null || dto == null) {
            return;
        }
        existingTour.setName(dto.getName());
        existingTour.setDescription(dto.getDescription());
        existingTour.setPrice(dto.getPrice());
        existingTour.setRating(dto.getRating());
        existingTour.setIs_feature(dto.getIs_feature()); // Always update boolean directly
        existingTour.setDuration(dto.getDuration());
    }
}