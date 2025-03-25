package com.example.capstone.service.imp;

import com.example.capstone.entity.Destination;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationServiceImp implements DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Override
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }
}
