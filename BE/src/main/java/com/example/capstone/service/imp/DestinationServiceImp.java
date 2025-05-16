package com.example.capstone.service.imp;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.capstone.entity.Destination;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.service.DestinationService;
import com.example.capstone.util.error.IdInvalidException;

@Service
public class DestinationServiceImp implements DestinationService {
    private final DestinationRepository destinationRepository;

    // Constructor injection
    public DestinationServiceImp(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    // CREATE
    public Destination createDestination(Destination destination) {
        return this.destinationRepository.save(destination);
    }

    // GET ALL Destination with Pagination
    public Page<Destination> getAllDestination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return this.destinationRepository.findAll(pageable);
    }

    // GET Destination BY ID
    public Optional<Destination> getDestinationById(long id) {
        return this.destinationRepository.findById(id);
    }

    public Destination updateDestination(Destination updatedDestination) throws IdInvalidException {
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
            destination.setGoogle_map_url(updatedDestination.getGoogle_map_url());
            return this.destinationRepository.save(destination);
        } else {
            throw new IdInvalidException("Destination với Id " + updatedDestination.getId() + " không tồn tại!");
        }
    }

    // DELETE Destination
    public String delete_destination(long id) throws IdInvalidException {
        if (this.destinationRepository.findById(id).isPresent()) {
            this.destinationRepository.deleteById(id);
            return "Xóa thành công!";
        } else {
            throw new IdInvalidException("Destination với Id " + id + " không tồn tại!");
        }
    }
}
