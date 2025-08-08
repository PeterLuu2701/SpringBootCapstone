package com.example.capstone.repository.specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.example.capstone.dto.TourSearchCriteriaDTO;
import com.example.capstone.entity.Tour;

public class TourSpecifications {

    public static Specification<Tour> buildSpecification(TourSearchCriteriaDTO criteria) {
        return (Root<Tour> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction(); // Tạo một predicate rỗng

            // Lọc theo name nếu name không rỗng
            if (StringUtils.hasText(criteria.getName())) {
                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("name")),
                                "%" + criteria.getName().toLowerCase() + "%"));
            }

            return predicate;
        };
    }
}
