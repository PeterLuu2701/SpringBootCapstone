package com.example.capstone.service.imp;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.dto.TourSearchCriteriaDTO;
import com.example.capstone.entity.Activity;
import com.example.capstone.mapper.TourMapper;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;

import com.example.capstone.repository.ActivityRepository;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.repository.TourRepository;
import com.example.capstone.repository.TourSpecifications;
import com.example.capstone.service.FileService;
import com.example.capstone.service.TourService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.stream.Collectors;

@Service
public  class TourServiceImp implements TourService {

    @Autowired
    private final TourRepository tourRepository;
    @Autowired
    private final DestinationRepository destinationRepository;
    @Autowired
    private FileService fileService;
    @Autowired
    private ActivityRepository activityRepository;

    public TourServiceImp(TourRepository tourRepository, DestinationRepository destinationRepository) {
        this.tourRepository = tourRepository;
        this.destinationRepository = destinationRepository;
        this.fileService = fileService;
    }


    @Override
    public TourDTO createTour(MultipartFile file, TourDTO dto) {
        Destination destination = destinationRepository.findById(dto.getDestination_id())
                .orElseThrow(() -> new EntityNotFoundException("Destination not found with id: " + dto.getDestination_id()));
        Activity activity = activityRepository.findById(dto.getActivity_id())
                .orElseThrow(() -> new EntityNotFoundException("Activity not found with id: " + dto.getActivity_id()));
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();  // tự sinh tên file
        fileService.save(file, fileName);  // truyền file và tên file muốn lưu
        dto.setImage_url("/file/" + fileName);  // gán đường dẫn file vào DTO
        Tour saved = tourRepository.save(TourMapper.toEntity(dto, destination,activity));
        return TourMapper.toDTO(saved);
    }
    @Override
    public List<TourDTO> getAllTours() {
        return tourRepository.findAll().stream()
                .map(TourMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TourDTO getTourById(long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + id));
        return TourMapper.toDTO(tour);
    }

    @Override
    public TourDTO updateTour(long id, TourDTO dto) {
        Tour existingTour = tourRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + id));

        Destination destination = destinationRepository.findById(dto.getDestination_id())
                .orElseThrow(() -> new EntityNotFoundException("Destination not found with id: " + dto.getDestination_id()));
        Activity activity = activityRepository.findById(dto.getActivity_id())
                .orElseThrow(() -> new EntityNotFoundException("Activity not found with id: " + dto.getActivity_id()));
        Tour updatedTour = TourMapper.toEntity(dto, destination, activity);
        updatedTour.setId(id);
        Tour saved = tourRepository.save(updatedTour);
        return TourMapper.toDTO(saved);
    }

    @Override
    public void deleteTour(long id) {
        if (!tourRepository.existsById(id)) {
            throw new EntityNotFoundException("Tour not found  id: " + id);
        }
        tourRepository.deleteById(id);
    }



    @Transactional(readOnly = true)
    public Page<TourDTO> searchTours(TourSearchCriteriaDTO criteria, Pageable pageable) {
        Specification<Tour> spec = TourSpecifications.buildSpecification(criteria);
        Page<Tour> tourPage = tourRepository.findAll(spec, pageable);
        return tourPage.map(TourMapper::toDTO);
    }


}