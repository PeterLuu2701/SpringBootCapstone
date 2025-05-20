package com.example.capstone.dto;

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

    // Phương thức toEntity cho trường hợp CREATE
    public static Tour toEntity(TourDTO dto, Destination destination) {
        Tour tour = new Tour();
        // Khi tạo mới, không set ID, database sẽ tự sinh
        tour.setName(dto.getName());
        tour.setDescription(dto.getDescription());
        tour.setPrice(dto.getPrice());
        tour.setRating(dto.getRating());
        tour.setImage_url(dto.getImage_url()); // Lấy image_url từ DTO (đã được set sau khi upload file)
        tour.setIs_feature(dto.getIs_feature());
        tour.setDuration(dto.getDuration());
        tour.setDestination(destination);
        return tour;
    }

    // Phương thức toEntity cho trường hợp UPDATE (để giữ lại ID)
    public static Tour toEntity(Long id, TourDTO dto, Destination destination) {
        Tour tour = new Tour();
        tour.setId(id); // Set ID cho trường hợp update
        tour.setName(dto.getName());
        tour.setDescription(dto.getDescription());
        tour.setPrice(dto.getPrice());
        tour.setRating(dto.getRating());
        tour.setImage_url(dto.getImage_url()); // Lấy image_url từ DTO
        tour.setIs_feature(dto.getIs_feature());
        tour.setDuration(dto.getDuration());
        tour.setDestination(destination);
        return tour;
    }
}