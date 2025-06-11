package com.example.capstone.repository; // Giả sử đây là package của bạn


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
            // 1. Lọc theo thông tin Destination
            if (StringUtils.hasText(criteria.getDestination())) {
                Join<Tour, Destination> destinationJoin = root.join("destination", JoinType.LEFT);
                String searchTerm = "%" + criteria.getDestination().toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(destinationJoin.get("name")), searchTerm),
                        cb.like(cb.lower(destinationJoin.get("cityName")), searchTerm),
                        cb.like(cb.lower(destinationJoin.get("regionName")), searchTerm),
                        cb.like(cb.lower(destinationJoin.get("countryName")), searchTerm)
                ));
            }
            // 2. Lọc theo Activity
            if (StringUtils.hasText(criteria.getActivity())) {
                Join<Tour, Destination> tourDestinationJoin = root.join("destination", JoinType.LEFT);
                Join<Destination, Activity> activityJoin = tourDestinationJoin.join("activities", JoinType.LEFT);
                if (query.getResultType() != Long.class && query.getResultType() != long.class) {
                    query.distinct(true);
                }
                predicates.add(cb.equal(
                        cb.lower(activityJoin.get("name")),
                        criteria.getActivity().toLowerCase()
                ));
            }
            // 3. Lọc theo ngày khởi hành
            if (criteria.getStartDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("departureDate"), criteria.getStartDate()));
            }
            // 4. Lọc theo  khách
            if (criteria.getGuest() > 0) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("maxGuests"), criteria.getGuest()));
            }
            if (predicates.isEmpty()) {
                return cb.conjunction();
            }
            return cb.and(predicates.toArray(new Predicate[0])); // Kết hợp bằng AND


        };
    }
}



