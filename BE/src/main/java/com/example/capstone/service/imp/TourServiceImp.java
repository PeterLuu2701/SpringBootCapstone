package com.example.capstone.service.imp;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.dto.TourMapper;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;

import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.repository.TourRepository;
import com.example.capstone.service.FileService;
import com.example.capstone.service.TourService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional; // Import Optional

@Service
public class TourServiceImp implements TourService {

    private final TourRepository tourRepository;
    private final DestinationRepository destinationRepository;
    private final FileService fileService; // Inject FileService thông qua constructor

    // Sửa lại constructor để Autowire FileService
    @Autowired
    public TourServiceImp(TourRepository tourRepository, DestinationRepository destinationRepository, FileService fileService) {
        this.tourRepository = tourRepository;
        this.destinationRepository = destinationRepository;
        this.fileService = fileService;
    }


    @Override
    public TourDTO createTour(MultipartFile file, TourDTO dto) {
        Destination destination = destinationRepository.findById(dto.getDestination_id())
                .orElseThrow(() -> new EntityNotFoundException("Destination not found with id: " + dto.getDestination_id()));

        String imageUrl = null;
        if (file != null && !file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();  // tự sinh tên file
            fileService.save(file, fileName);  // truyền file và tên file muốn lưu
            imageUrl = "/file/" + fileName;  // Gán đường dẫn *đúng* cho FileController
        }

        dto.setImage_url(imageUrl); // Gán imageUrl vào DTO trước khi map sang Entity

        Tour saved = tourRepository.save(TourMapper.toEntity(dto, destination)); // Sử dụng toEntity cho CREATE
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

        // Xử lý cập nhật ảnh (nếu TourDTO có trường MultipartFile)
        // Nếu bạn thêm MultipartFile vào TourDTO, bạn sẽ cần sửa phương thức này
        // Ví dụ:
        // String imageUrl = existingTour.getImage_url(); // Giữ lại ảnh cũ theo mặc định
        // if (dto.getFile() != null && !dto.getFile().isEmpty()) {
        //     String fileName = System.currentTimeMillis() + "_" + dto.getFile().getOriginalFilename();
        //     fileService.save(dto.getFile(), fileName);
        //     imageUrl = "/file/" + fileName; // Cập nhật đường dẫn ảnh mới
        // }
        // dto.setImage_url(imageUrl); // Set imageUrl vào DTO trước khi map


        // Hiện tại, nếu không có file trong DTO update, giữ lại ảnh cũ.
        // Nếu trong DTO update có image_url, thì dùng image_url đó.
        // Nếu muốn cập nhật ảnh bằng file, cần thêm MultipartFile vào TourDTO và phương thức này
        String imageUrlToSave = (dto.getImage_url() != null && !dto.getImage_url().isEmpty()) ? dto.getImage_url() : existingTour.getImage_url();
        dto.setImage_url(imageUrlToSave);


        Tour updatedTour = TourMapper.toEntity(id, dto, destination); // Sử dụng toEntity cho UPDATE với ID
        Tour saved = tourRepository.save(updatedTour);
        return TourMapper.toDTO(saved);
    }

    @Override
    public void deleteTour(long id) {
        if (!tourRepository.existsById(id)) {
            throw new EntityNotFoundException("Tour not found  id: " + id);
        }
        // Bạn có thể thêm logic xóa file ảnh cũ ở đây nếu cần
        // Tour tourToDelete = tourRepository.findById(id).get();
        // if (tourToDelete.getImage_url() != null && !tourToDelete.getImage_url().isEmpty()) {
        //     fileService.delete(tourToDelete.getImage_url()); // Cần thêm phương thức delete vào FileService
        // }
        tourRepository.deleteById(id);
    }
}