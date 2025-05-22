package com.example.capstone.service.imp;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors; // Import Collectors

import org.springframework.beans.factory.annotation.Autowired; // Import Autowired
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl; // Import PageImpl
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.capstone.dto.DestinationDTO; // Import DestinationDTO
import com.example.capstone.dto.DestinationMapper; // Import DestinationMapper
import com.example.capstone.entity.Destination;
import com.example.capstone.repository.DestinationRepository;
import com.example.capstone.service.DestinationService;
import com.example.capstone.service.FileService; // Import FileService
import com.example.capstone.util.error.IdInvalidException;
import jakarta.persistence.EntityNotFoundException; // Import EntityNotFoundException

@Service
public class DestinationServiceImp implements DestinationService {

    private final DestinationRepository destinationRepository;
    private final FileService fileService; // Inject FileService

    // Constructor injection
    public DestinationServiceImp(DestinationRepository destinationRepository, FileService fileService) { // Thêm FileService vào constructor
        this.destinationRepository = destinationRepository;
        this.fileService = fileService; // Gán FileService
    }

    // CREATE
    @Override
    public DestinationDTO createDestination(DestinationDTO destinationDTO) {
        // Sử dụng mapper toEntity (không xử lý file ở đây)
        Destination destination = DestinationMapper.toEntity(destinationDTO);

        // Xử lý lưu file ảnh
        if (destinationDTO.getImageFile() != null && !destinationDTO.getImageFile().isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + destinationDTO.getImageFile().getOriginalFilename();
            fileService.save(destinationDTO.getImageFile(), fileName); // Lưu file vật lý
            // Gán URL ảnh vào Entity
            destination.setImage_url("/file/" + fileName); // Lưu URL với tiền tố /file/
        } else {
            // Nếu không có file ảnh, gán imageUrl là null hoặc giá trị mặc định
            destination.setImage_url(null);
        }


        Destination savedDestination = this.destinationRepository.save(destination);
        // Trả về DTO của destination đã lưu
        return DestinationMapper.toDTO(savedDestination);
    }

    // GET ALL Destination with Pagination
    @Override
    public Page<DestinationDTO> getAllDestination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Destination> destinationPage = this.destinationRepository.findAll(pageable);

        // Chuyển đổi Page<Destination> sang Page<DestinationDTO>
        List<DestinationDTO> dtoList = destinationPage.getContent().stream()
                .map(DestinationMapper::toDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, destinationPage.getTotalElements());
    }

    // GET Destination BY ID
    @Override
    public DestinationDTO getDestinationById(long id) throws IdInvalidException {
        Destination destination = this.destinationRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("Destination with Id " + id + " not found")); // Sử dụng EntityNotFoundException hoặc IdInvalidException tùy ý

        // Trả về DTO của destination tìm được
        return DestinationMapper.toDTO(destination);
    }

    // UPDATE
    @Override
    public DestinationDTO updateDestination(long id, DestinationDTO destinationDTO) throws IdInvalidException {
        Destination existingDestination = this.destinationRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("Destination with Id " + id + " not found")); // Sử dụng EntityNotFoundException hoặc IdInvalidException

        // Copy dữ liệu từ DTO sang Entity, bỏ qua ID và imageUrl
        DestinationMapper.updateEntityFromDTO(existingDestination, destinationDTO);

        // Xử lý cập nhật file ảnh (nếu có file mới)
        if (destinationDTO.getImageFile() != null && !destinationDTO.getImageFile().isEmpty()) {
            // Tùy chọn: Xóa file ảnh cũ nếu tồn tại
            // String oldImageUrl = existingDestination.getImage_url();
            // if (oldImageUrl != null) {
            //     // Cần thêm phương thức delete vào FileService và gọi ở đây
            //     // fileService.delete(extractFileNameFromUrl(oldImageUrl));
            // }

            String fileName = System.currentTimeMillis() + "_" + destinationDTO.getImageFile().getOriginalFilename();
            fileService.save(destinationDTO.getImageFile(), fileName); // Lưu file vật lý mới
            existingDestination.setImage_url("/file/" + fileName); // Cập nhật URL ảnh mới vào Entity
        }
        // Nếu destinationDTO.getImageFile() là null hoặc rỗng, giữ lại imageUrl cũ trong existingDestination

        Destination updatedDestination = this.destinationRepository.save(existingDestination);
        // Trả về DTO của destination đã cập nhật
        return DestinationMapper.toDTO(updatedDestination);
    }

    // DELETE Destination
    @Override
    public String deleteDestination(long id) throws IdInvalidException {
        // Tìm destination trước để kiểm tra và tùy chọn xóa file
        Destination destinationToDelete = this.destinationRepository.findById(id)
                .orElseThrow(() -> new IdInvalidException("Destination with Id " + id + " not found")); // Sử dụng EntityNotFoundException hoặc IdInvalidException

        // Tùy chọn: Xóa file ảnh vật lý liên quan đến destination này
        // String imageUrl = destinationToDelete.getImage_url();
        // if (imageUrl != null && !imageUrl.isEmpty()) {
        //     // Cần thêm logic vào FileService để lấy tên file từ URL và xóa file vật lý
        //     // fileService.delete(extractFileNameFromUrl(imageUrl));
        // }

        this.destinationRepository.delete(destinationToDelete); // Xóa entity
        return "Destination with Id " + id + " deleted successfully!"; // Thông báo thành công
    }
}