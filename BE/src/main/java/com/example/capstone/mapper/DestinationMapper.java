package com.example.capstone.mapper;

import com.example.capstone.dto.DestinationDTO;
import com.example.capstone.entity.City;
import com.example.capstone.entity.Country;
import com.example.capstone.entity.Destination;

public class DestinationMapper {

    public static DestinationDTO toDTO(Destination destination) {
        if (destination == null) {
            return null;
        }
        DestinationDTO dto = new DestinationDTO();
        dto.setId(destination.getId());
        dto.setName(destination.getName());
        dto.setDescription(destination.getDescription());

        if (destination.getCountry() != null) {
            dto.setCountryId(destination.getCountry().getId());
            dto.setCountryName(destination.getCountry().getName());
        }

        if (destination.getCity() != null) {
            dto.setCityId(destination.getCity().getId());
            dto.setCityName(destination.getCity().getName());
        }

        dto.setImageUrl(destination.getImage_url());
        dto.setPopular(destination.isPopular());
        dto.setDuration(destination.getDuration());
        // dto.setGoogle_map_url(destination.getGoogle_map_url());
        // dto.setRegion_name(destination.getRegion_name());

        return dto;
    }

    public static Destination toEntity(DestinationDTO dto, Country country, City city) {
        if (dto == null) {
            return null;
        }
        Destination destination = new Destination();
        destination.setName(dto.getName());
        destination.setDescription(dto.getDescription());

        destination.setCountry(country);
        destination.setCity(city);

        destination.setPopular(dto.getPopular());
        destination.setDuration(dto.getDuration());

        return destination;
    }

    public static void updateEntityFromDTO(Destination existingDestination, DestinationDTO dto) {
        if (existingDestination == null || dto == null) {
            return;
        }
        existingDestination.setName(dto.getName());
        existingDestination.setDescription(dto.getDescription());
        if (dto.getPopular() != null) {
            existingDestination.setPopular(dto.getPopular());
        }

        if (dto.getDuration() != null) {
            existingDestination.setDuration(dto.getDuration());
        } else {
            existingDestination.setDuration(null);
        }
    }
}