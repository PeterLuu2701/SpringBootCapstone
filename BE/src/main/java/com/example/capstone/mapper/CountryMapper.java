package com.example.capstone.mapper;

import com.example.capstone.dto.CountryDTO;
import com.example.capstone.entity.Country;

public class CountryMapper {
    public static CountryDTO toDto(Country country) {
        if (country == null) {
            return null;
        }
        CountryDTO dto = new CountryDTO();
        dto.setId(country.getId());
        dto.setName(country.getName());
        return dto;
    }

    public static Country toEntity(CountryDTO dto) {
        if (dto == null) {
            return null;
        }
        Country country = new Country();
        country.setName(dto.getName());
        return country;
    }

    public static void updateEntityFromDto(CountryDTO dto, Country entity) {
        if (dto == null || entity == null) {
            return;
        }
        entity.setName(dto.getName());
        // Do not update ID here
    }
}
