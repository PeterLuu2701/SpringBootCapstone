package com.example.capstone.mapper;

import com.example.capstone.dto.CityDTO;
import com.example.capstone.entity.City;
import com.example.capstone.entity.Country;

public class CityMapper {
    public static CityDTO toDto(City city) {
        if (city == null) {
            return null;
        }
        CityDTO dto = new CityDTO();
        dto.setId(city.getId());
        dto.setName(city.getName());

        if (city.getCountry() != null) {
            dto.setCountryId(city.getCountry().getId());
            dto.setCountryName(city.getCountry().getName());
        }
        return dto;
    }

    public static City toEntity(CityDTO dto) {
        if (dto == null) {
            return null;
        }
        City city = new City();
        city.setId(dto.getId());
        city.setName(dto.getName());

        if (dto.getCountryId() != null) {
            Country country = new Country();
            country.setId(dto.getCountryId());
            city.setCountry(country);
        }
        return city;
    }

    public static void updateEntityFromDto(CityDTO dto, CityDTO entity) {
        if (dto == null || entity == null) {
            return;
        }
        entity.setName(dto.getName());
    }
}
