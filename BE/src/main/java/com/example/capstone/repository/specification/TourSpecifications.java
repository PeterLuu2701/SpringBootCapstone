package com.example.capstone.repository;

import com.example.capstone.dto.TourSearchCriteriaDTO;
import com.example.capstone.entity.Activity;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import java.util.ArrayList;
import java.util.List;

public class TourSpecifications {

    public static Specification<Tour> buildSpecification(TourSearchCriteriaDTO criteria) {
        return (Root<Tour> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Filter by specific Destination City
            if (criteria != null && StringUtils.hasText(criteria.getDestinationCity())) {
                Join<Tour, Destination> destinationJoin = root.join("destination", JoinType.INNER);
                predicates.add(cb.equal(
                        cb.lower(destinationJoin.get("city")),
                        criteria.getDestinationCity().toLowerCase()
                ));
            }

            // 2. Broader Destination Search
            /*
            if (criteria != null && StringUtils.hasText(criteria.getDestination())) {
                Join<Tour, Destination> destinationJoin = root.join("destination", JoinType.LEFT);
                String searchTerm = "%" + criteria.getDestination().toLowerCase() + "%";

                Predicate destinationOrPredicate = cb.or(
                        cb.like(cb.lower(destinationJoin.get("name")), searchTerm),
                        cb.like(cb.lower(destinationJoin.get("city")), searchTerm), // Using 'city' field
                        cb.like(cb.lower(destinationJoin.get("region_name")), searchTerm), // Using 'region_name' field
                        cb.like(cb.lower(destinationJoin.get("country")), searchTerm) // Using 'country' field
                );
                predicates.add(destinationOrPredicate);
            }
            */

            // 3. Filter by Activity
            if (criteria != null && StringUtils.hasText(criteria.getActivity())) {
                Join<Tour, Activity> activityJoin = root.join("activity", JoinType.LEFT);
                predicates.add(cb.equal(
                        cb.lower(activityJoin.get("name")),
                        criteria.getActivity().toLowerCase()
                ));

                if (query.getResultType() != Long.class && query.getResultType() != long.class &&
                        query.getResultType() != Void.class && query.getResultType() != void.class) {
                    query.distinct(true);
                }
            }

            // 4. Filter by Start Date
            if (criteria != null && criteria.getStartDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("departureDate"), criteria.getStartDate()));
            }

            // 5. Filter by Guest Count
            if (criteria != null && criteria.getGuest() > 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("maxGuests"), criteria.getGuest()));
            }

            if (predicates.isEmpty()) {
                return cb.conjunction();
            }

            // Combine all active predicates with an AND operator (standard search behavior)
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}