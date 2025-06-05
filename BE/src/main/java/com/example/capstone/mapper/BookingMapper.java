package com.example.capstone.mapper;

import com.example.capstone.dto.BookingDTO;
import com.example.capstone.entity.Booking;
import com.example.capstone.entity.User;
import com.example.capstone.entity.Tour;

public class BookingMapper {

    public static BookingDTO toDTO(Booking booking) {
        if (booking == null) return null;

        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setBooking_date(booking.getBooking_date());
        dto.setStart_date(booking.getStart_date());
        dto.setEnd_date(booking.getEnd_date());
        dto.setMax_guest(booking.getMax_guest());
        dto.setTotal_price(booking.getTotal_price());
        dto.setPayment(booking.isPayment());

        if (booking.getUser() != null) {
            dto.setUser_id(booking.getUser().getId());
        } else {
            dto.setUser_id(0L);
        }

        if (booking.getTour() != null) {
            dto.setTour_id(booking.getTour().getId());
        } else {
            dto.setTour_id(0L);
        }

        return dto;
    }

    public static Booking toEntity(BookingDTO dto, Tour tour, User user) {
        if (dto == null) return null;

        Booking booking = new Booking();
        booking.setBooking_date(dto.getBooking_date());
        booking.setStart_date(dto.getStart_date());
        booking.setEnd_date(dto.getEnd_date());
        booking.setMax_guest(dto.getMax_guest());
        booking.setTotal_price(dto.getTotal_price());
        booking.setPayment(dto.getPayment() != null ? dto.getPayment() : false);
        booking.setUser(user);
        booking.setTour(tour);

        return booking;
    }

    public static Booking toEntity(BookingDTO dto) {
        if (dto == null) return null;

        Booking booking = new Booking();
        booking.setBooking_date(dto.getBooking_date());
        booking.setStart_date(dto.getStart_date());
        booking.setEnd_date(dto.getEnd_date());
        booking.setMax_guest(dto.getMax_guest());
        booking.setTotal_price(dto.getTotal_price());
        booking.setPayment(dto.getPayment() != null ? dto.getPayment() : false);

        if (dto.getUser_id() != null && dto.getUser_id() > 0) {
            User user = new User();
            user.setId(dto.getUser_id());
            booking.setUser(user);
        }

        if (dto.getTour_id() != null && dto.getTour_id() > 0) {
            Tour tour = new Tour();
            tour.setId(dto.getTour_id());
            booking.setTour(tour);
        }

        return booking;
    }
}
