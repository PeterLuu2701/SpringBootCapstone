package com.example.capstone.mapper;

import com.example.capstone.dto.BookingDTO;
import com.example.capstone.entity.Booking;
import com.example.capstone.entity.Tour;
import com.example.capstone.entity.User;

public class BookingMapper {
    public static BookingDTO toDTO(Booking booking) {
        if (booking == null) {
            return null;
        }

        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setBooking_date(booking.getBooking_date());
        dto.setMax_guest(booking.getMax_guest());
        dto.setTotal_price(booking.getTotal_price());

        if (booking.getUser() != null) {
            dto.setUser_id(booking.getUser().getId());
            dto.setUserName(booking.getUser().getUsername());
            dto.setUserEmail(booking.getUser().getEmail());
            dto.setUserPhone(booking.getUser().getPhone());
        }

        if (booking.getTour() != null) {
            dto.setTour_id(booking.getTour().getId());
            dto.setTourName(booking.getTour().getName());
            dto.setTourPrice(String.valueOf(booking.getTour().getPrice()));
            dto.setTourDuration(booking.getTour().getDuration());
        }

        return dto;
    }

    public static Booking toEntity(BookingDTO dto) {
        if (dto == null) {
            return null;
        }

        Booking booking = new Booking();
        booking.setId(dto.getId());
        booking.setBooking_date(dto.getBooking_date());
        booking.setMax_guest(dto.getMax_guest());
        booking.setTotal_price(dto.getTotal_price());

        if (dto.getUser_id() != 0) {
            User user = new User();
            user.setId(dto.getUser_id());

            booking.setUser(user);
        }

        if (dto.getTour_id() != 0) {
            Tour tour = new Tour();
            tour.setId(dto.getTour_id());

            booking.setTour(tour);
        }


        return booking;
    }
}
