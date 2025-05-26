package com.example.capstone.service;

import com.example.capstone.dto.ActivityDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ActivityService {
    List<ActivityDTO> getAllActivities();
}
