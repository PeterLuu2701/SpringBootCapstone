package com.example.capstone.service;

import com.example.capstone.dto.DestinationDTO; // Import DestinationDTO
import com.example.capstone.entity.Destination; // Vẫn cần Entity cho Page<Destination> nếu trả về Page Entity
import com.example.capstone.util.error.IdInvalidException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional; // Vẫn cần Optional cho getById nếu trả về Optional Entity
import java.util.List; // Có thể cần List<DestinationDTO> nếu getAll không dùng Page Entity


@Service
public interface DestinationService {

    // Phương thức create nhận DTO và file
    DestinationDTO createDestination(DestinationDTO destinationDTO); // Đã đổi signature

    // Phương thức getAll trả về Page của DTO
    Page<DestinationDTO> getAllDestination(int page, int size); // Đã đổi signature

    // Phương thức getById trả về DTO
    DestinationDTO getDestinationById(long id) throws IdInvalidException; // Đã đổi signature

    // Phương thức update nhận ID, DTO và file (file có thể null cho trường hợp không update ảnh)
    DestinationDTO updateDestination(long id, DestinationDTO destinationDTO) throws IdInvalidException; // Đã đổi signature
    String deleteDestination(long id) throws IdInvalidException;
    Page<DestinationDTO> searchDestinations(String keyword, int page, int size);
}