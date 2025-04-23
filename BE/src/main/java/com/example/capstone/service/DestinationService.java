package com.example.capstone.service;

import java.util.List;
import java.util.Optional;

import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import com.example.capstone.entity.Destination;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.util.error.IdInvalidException;

@Service
public class DestinationService {
    private final DestinationRepository destinationRepository;

    // Constructor injection
    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    // CREATE
    public Destination createDestination(Destination destination) {
        return this.destinationRepository.save(destination);
    }

    // GET ALL Destination
    public List<Destination> getAllDestination() {
        return this.destinationRepository.findAll();
    }

    // GET Destination BY ID
    public Optional<Destination> getDestinationById(long id) {

        return this.destinationRepository.findById(id);
    }

    public Destination updateDestination(@NotNull Destination updatedDestination) throws IdInvalidException {
        Optional<Destination> optionalDestination = this.destinationRepository.findById(updatedDestination.getId());
        if (optionalDestination.isPresent()) {
            Destination destination = optionalDestination.get();
            destination.setName(updatedDestination.getName());
            destination.setDescription(updatedDestination.getDescription());
            destination.setCountry(updatedDestination.getCountry());
            destination.setCity(updatedDestination.getCity());
            destination.setImage_url(updatedDestination.getImage_url());
            destination.setPopular(updatedDestination.isPopular());
            destination.setDuration(updatedDestination.getDuration());
            return this.destinationRepository.save(destination);
        } else {
            throw new IdInvalidException("Destination với Id " + updatedDestination.getId() + " không tồn tại!");
        }
    }

    // DELETE Destination
    public String deleteDestination(long id) throws IdInvalidException {
        if (this.destinationRepository.findById(id).isPresent()) {
            this.destinationRepository.deleteById(id);
            return "Xóa thành công!";
        } else {
            throw new IdInvalidException("Destination với Id " + id + " không tồn tại!");
        }
    }
}
