package com.example.capstone.mapper;

import com.example.capstone.dto.TourDTO;
import com.example.capstone.entity.Destination;
import com.example.capstone.entity.Tour;

public class TourMapper {

    public static TourDTO toDTO(Tour tour) {
        TourDTO dto = new TourDTO();
        dto.setId(tour.getId());
        dto.setName(tour.getName());
        dto.setDescription(tour.getDescription());
        dto.setPrice(tour.getPrice());
        dto.setRating(tour.getRating());
        // Đã sửa lỗi ở đây: Sử dụng setImage_url() thay vì setFile()
        dto.setImage_url(tour.getImage_url());
        dto.setIs_feature(tour.getIs_feature());
        dto.setDuration(tour.getDuration());

        // Kiểm tra nếu destination không null trước khi lấy id
        if (tour.getDestination() != null) {
            dto.setDestination_id(tour.getDestination().getId());
            dto.setDestinationName(tour.getDestination().getName());
            dto.setDestinationCountry(tour.getDestination().getCountry());
            dto.setDestinationCity(tour.getDestination().getCity());
        } else {
            // Gán giá trị mặc định hoặc null nếu destination null
            dto.setDestination_id(0); // Hoặc gán null nếu trường là Long
            dto.setDestinationName(null);
            dto.setDestinationCountry(null);
            dto.setDestinationCity(null);
        }

        // Kiểm tra nếu activity không null trước khi lấy thông tin
        if (tour.getActivity() != null) {
            dto.setActivity_id(tour.getActivity().getId());
            dto.setActivityName(tour.getActivity().getName());
            dto.setActivityDescription(tour.getActivity().getDescription());
        } else {
            // Gán giá trị mặc định hoặc null nếu activity null
            dto.setActivity_id(0); // Hoặc gán null nếu trường là Long
            dto.setActivityName(null);
            dto.setActivityDescription(null);
        }


        return dto;
    }

    public static Tour toEntity(TourDTO dto, Destination destination) {
        Tour tour = new Tour();
        // Lưu ý: Đảm bảo trường id trong Tour là long nếu bạn gán từ dto.getId() (long)
        // Hiện tại Tour entity có id kiểu long, nên cast (int) là sai.
        // Sửa:
        tour.setId(dto.getId());

        tour.setName(dto.getName());
        tour.setDescription(dto.getDescription());
        tour.setPrice(dto.getPrice());
        tour.setRating(dto.getRating());
        // Sử dụng getImage_url() từ DTO
        tour.setImage_url(dto.getImage_url());
        tour.setIs_feature(dto.getIs_feature());
        tour.setDuration(dto.getDuration());
        tour.setDestination(destination);

        // Activity relationship - cần xử lý khi chuyển từ DTO sang Entity nếu cần thiết
        // Hiện tại, phương thức toEntity này chỉ nhận Destination,
        // nếu bạn muốn set Activity, bạn cần pass nó vào hoặc tìm kiếm trong Service.
        // Dựa trên TourServiceImp, bạn chưa set Activity vào Tour entity khi tạo/cập nhật.
        // Nếu cần set Activity, bạn sẽ cần điều chỉnh TourServiceImp và TourMapper.toEntity.
        // Ví dụ (nếu cần set Activity):
        // if (dto.getActivity_id() != 0) { // Giả sử 0 là giá trị mặc định khi không có Activity
        //    // Cần ActivityRepository hoặc pass Activity entity vào phương thức này
        //    // Activity activity = activityRepository.findById(dto.getActivity_id()).orElse(null);
        //    // tour.setActivity(activity);
        // }

        return tour;
    }
}