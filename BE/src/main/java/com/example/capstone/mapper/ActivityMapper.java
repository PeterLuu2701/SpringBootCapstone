package com.example.capstone.mapper;

import com.example.capstone.dto.ActivityDTO;
import com.example.capstone.dto.TourDTO;
import com.example.capstone.entity.Activity;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;

public class ActivityMapper {

    public static ActivityDTO toDTO(Activity activity) {
        ActivityDTO dto = new ActivityDTO();
        dto.setId(activity.getId());
        dto.setName(activity.getName());
        dto.setDescription(activity.getDescription());
        return dto;
    }

    public static Activity toEntity(ActivityDTO dto) {
        Activity activity = new Activity();
        activity.setId((long) dto.getId());
        activity.setName(dto.getName());
        activity.setDescription(dto.getDescription());

        return activity;
    }
}
