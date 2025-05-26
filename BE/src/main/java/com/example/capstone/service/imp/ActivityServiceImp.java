package com.example.capstone.service.imp;

import com.example.capstone.dto.ActivityDTO;
import com.example.capstone.mapper.ActivityMapper;
import com.example.capstone.repository.ActivityRepository;
import com.example.capstone.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityServiceImp implements ActivityService {
    @Autowired
    private final ActivityRepository activityRepository;

    public ActivityServiceImp(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public List<ActivityDTO> getAllActivities() {
        return activityRepository.findAll().stream()
                .map(ActivityMapper::toDTO)
                .collect(Collectors.toList());
    }
}
