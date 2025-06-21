package com.example.capstone.repository;

//import com.example.capstone.dto.CityDTO;
import com.example.capstone.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findByCountryId(Long countryId);

    List<City> id(Long id);
}
