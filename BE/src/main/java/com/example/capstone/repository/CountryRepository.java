package com.example.capstone.repository;

import com.example.capstone.entity.City;
import com.example.capstone.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
//    List<City> findByCountryId(Long countryId);
}
