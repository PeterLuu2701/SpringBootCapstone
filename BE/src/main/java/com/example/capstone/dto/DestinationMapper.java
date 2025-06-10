package com.example.capstone.dto;

import com.example.capstone.dto.DestinationDTO;
import com.example.capstone.entity.Destination;

public class DestinationMapper {

    // Chuyển đổi từ Entity sang DTO
    public static DestinationDTO toDTO(Destination destination) {
        DestinationDTO dto = new DestinationDTO();
        dto.setId(destination.getId());
        dto.setName(destination.getName());
        dto.setDescription(destination.getDescription());
        dto.setCountry(destination.getCountry());
        dto.setCity(destination.getCity());
        // Gán imageUrl từ Entity sang DTO
        dto.setImageUrl(destination.getImage_url());
        dto.setPopular(destination.isPopular());
        dto.setDuration(destination.getDuration());
        dto.setGoogle_map_url(destination.getGoogle_map_url());
        dto.setRegion_name(destination.getRegion_name() != null ? destination.getRegion_name() : "");
        // Không set imageFile ở đây vì DTO này dùng để trả về dữ liệu
        return dto;
    }

    // Chuyển đổi từ DTO sang Entity
    // Không nhận imageFile ở đây, Service sẽ xử lý file và gán imageUrl vào Entity
    public static Destination toEntity(DestinationDTO dto) {
        Destination destination = new Destination();
        // Lưu ý: ID có thể được set nếu là update
        destination.setId(dto.getId()); // Nếu dto.getId() là 0 hoặc null, Hibernate sẽ tự sinh ID mới

        destination.setName(dto.getName());
        destination.setDescription(dto.getDescription());
        destination.setCountry(dto.getCountry());
        destination.setCity(dto.getCity());
        // ImageUrl sẽ được set trong Service sau khi lưu file
        // destination.setImage_url(dto.getImageUrl()); // Không set ở đây
        destination.setPopular(dto.isPopular());
        destination.setDuration(dto.getDuration());
        destination.setGoogle_map_url(dto.getGoogle_map_url());
        destination.setRegion_name(dto.getRegion_name());
        return destination;
    }

    // Phương thức để copy dữ liệu từ DTO sang Entity đã tồn tại (dùng cho update)
    public static void updateEntityFromDTO(Destination existingDestination, DestinationDTO dto) {
        existingDestination.setName(dto.getName());
        existingDestination.setDescription(dto.getDescription());
        existingDestination.setCountry(dto.getCountry());
        existingDestination.setCity(dto.getCity());
        // ImageUrl sẽ được set trong Service nếu có file mới
        existingDestination.setPopular(dto.isPopular());
        existingDestination.setDuration(dto.getDuration());
        existingDestination.setGoogle_map_url(dto.getGoogle_map_url());
        existingDestination.setRegion_name(dto.getRegion_name());
        // Không update ID ở đây
    }
}