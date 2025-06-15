package com.example.capstone.service;

import com.example.capstone.entity.Destination;
import com.example.capstone.util.error.IdInvalidException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface DestinationService {

    Destination createDestination(Destination destination);

    Page<Destination> getAllDestination(int page, int size);

    Optional<Destination> getDestinationById(long id);

    Destination updateDestination(Destination updatedDestination) throws IdInvalidException;

    String delete_destination(long id) throws IdInvalidException;
}