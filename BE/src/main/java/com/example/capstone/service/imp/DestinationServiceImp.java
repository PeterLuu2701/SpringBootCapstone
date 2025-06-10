package com.example.capstone.service.imp;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.capstone.dto.DestinationDTO;
import com.example.capstone.dto.DestinationMapper;
import com.example.capstone.entity.Destination;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.service.DestinationService;
import com.example.capstone.service.FileService;
import com.example.capstone.util.error.IdInvalidException;

@Service
public class DestinationServiceImp implements DestinationService {

    private final DestinationRepository destinationRepository;
    private final FileService fileService;

    // Constructor injection
    public DestinationServiceImp(DestinationRepository destinationRepository, FileService fileService) {
        this.destinationRepository = destinationRepository;
        this.fileService = fileService;
    }
    // CREATE
    @Override
    public DestinationDTO createDestination(DestinationDTO destinationDTO) {
        // Chuyển đổi từ DTO sang Entity (mapper đã bao gồm region_name nếu được cập nhật đúng)
        Destination destination = DestinationMapper.toEntity(destinationDTO);
        if (destinationDTO.getImageFile() != null && !destinationDTO.getImageFile().isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + destinationDTO.getImageFile().getOriginalFilename();
            fileService.save(destinationDTO.getImageFile(), fileName);
            destination.setImage_url("/file/" + fileName); // Hoặc destination.setImage_url(...)
        } else {
            destination.setImage_url(null); // Hoặc destination.setImage_url(null)
        }

        // THÊM/CẬP NHẬT: Dòng này đã có sẵn trong toEntity nếu mapper đúng
        // destination.setRegionName(destinationDTO.getRegionName()); // Đảm bảo DTO có getRegionName()

        Destination savedDestination = this.destinationRepository.save(destination);
        return DestinationMapper.toDTO(savedDestination); // Mapper toDTO cũng cần trả về region_name
    }

    // GET ALL Destination with Pagination
    @Override
    public Page<DestinationDTO> getAllDestination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Destination> destinationPage = this.destinationRepository.findAll(pageable);

        List<DestinationDTO> dtoList = destinationPage.getContent().stream()
                .map(DestinationMapper::toDTO) // Đảm bảo toDTO trả về region_name
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, destinationPage.getTotalElements());
    }

    // GET Destination BY ID
    @Override
    public DestinationDTO getDestinationById(long id) throws IdInvalidException {
        Destination destination = this.destinationRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("Destination with Id " + id + " not found"));

        return DestinationMapper.toDTO(destination); // Đảm bảo toDTO trả về region_name
    }

    // UPDATE
    @Override
    public DestinationDTO updateDestination(long id, DestinationDTO destinationDTO) throws IdInvalidException {
        Destination existingDestination = this.destinationRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("Destination with Id " + id + " not found"));
        DestinationMapper.updateEntityFromDTO(existingDestination, destinationDTO);
        if (destinationDTO.getImageFile() != null && !destinationDTO.getImageFile().isEmpty()) {
            // Tùy chọn: Xóa file ảnh cũ nếu tồn tại
            String oldImageUrl = existingDestination.getImage_url(); // Hoặc existingDestination.getImage_url()
            if (oldImageUrl != null && !oldImageUrl.isEmpty()) {
            }

            String fileName = System.currentTimeMillis() + "_" + destinationDTO.getImageFile().getOriginalFilename();
            fileService.save(destinationDTO.getImageFile(), fileName);
            existingDestination.setImage_url("/file/" + fileName); // Hoặc existingDestination.setImage_url(...)
        }
        Destination updatedDestination = this.destinationRepository.save(existingDestination);
        return DestinationMapper.toDTO(updatedDestination); // Đảm bảo toDTO trả về region_name
    }
    // DELETE Destination
    @Override
    public String deleteDestination(long id) throws IdInvalidException {
        Destination destinationToDelete = this.destinationRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("Destination with Id " + id + " not found"));
        String imageUrl = destinationToDelete.getImage_url(); // Hoặc destinationToDelete.getImage_url()
        if (imageUrl != null && !imageUrl.isEmpty()) {
        }

        this.destinationRepository.delete(destinationToDelete);
        return "Destination with Id " + id + " deleted successfully!";
    }

}