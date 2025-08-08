package com.example.capstone.mapper;

import com.example.capstone.dto.BookingDTO;
import com.example.capstone.dto.TourBookingInfoDTO;
import com.example.capstone.entity.*;
import com.example.capstone.enums.PaymentStatus;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException; // Import để xử lý lỗi phân tích

public class BookingMapper {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static BookingDTO toDTO(Booking booking) {
        if (booking == null) return null;

        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());

        if (booking.getBooking_date() != null) {
            dto.setBooking_date(booking.getBooking_date().toLocalDateTime().format(formatter));
        } else {
            dto.setBooking_date(null);
        }
        if (booking.getStart_date() != null) {
            dto.setStart_date(booking.getStart_date().toLocalDateTime().format(formatter));
        } else {
            dto.setStart_date(null);
        }
        if (booking.getEnd_date() != null) {
            dto.setEnd_date(booking.getEnd_date().toLocalDateTime().format(formatter));
        } else {
            dto.setEnd_date(null);
        }

        dto.setMax_guest(booking.getMax_guest());
        dto.setTotal_price(booking.getTotal_price());
        dto.setPayment(booking.getPayment());

        if (booking.getUser() != null) {
            dto.setUser_id(booking.getUser().getId());
        } else {
            dto.setUser_id(null);
        }

        if (booking.getTour() != null) {
            dto.setTour_id(booking.getTour().getId());
        } else {
            dto.setTour_id(null);
        }

        // Populate TourBookingInfoDTO
        if (booking.getTour() != null) {
            TourBookingInfoDTO tourInfoDTO = new TourBookingInfoDTO();
            Tour tour = booking.getTour();
            tourInfoDTO.setId(tour.getId());
            tourInfoDTO.setName(tour.getName());
            tourInfoDTO.setDescription(tour.getDescription());
            tourInfoDTO.setPrice(tour.getPrice());
            tourInfoDTO.setRating((float) tour.getRating());
            tourInfoDTO.setImage_url(tour.getImage_url());
            tourInfoDTO.setDuration(tour.getDuration());

            if (tour.getDestination() != null) {
                Destination destination = tour.getDestination();
                tourInfoDTO.setDestination_id(destination.getId());
                tourInfoDTO.setDestinationName(destination.getName());

                if (destination.getCountry() != null) {
                    Country country = destination.getCountry();
                    tourInfoDTO.setDestinationCountryName(country.getName());
                }
                if (destination.getCity() != null) {
                    City city = destination.getCity();
                    tourInfoDTO.setDestinationCityName(city.getName());
                }
            }
            dto.setTourInfo(tourInfoDTO);
        } else {
            dto.setTourInfo(null);
        }

        return dto;
    }

    public static Booking toEntity(BookingDTO dto, Tour tour, User user) {
        if (dto == null) return null;

        Booking booking = new Booking();

        if (dto.getBooking_date() != null && !dto.getBooking_date().isEmpty()) {
            try {
                LocalDateTime localDateTime = LocalDateTime.parse(dto.getBooking_date(), formatter);
                booking.setBooking_date(Timestamp.valueOf(localDateTime));
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid booking_date format: " + dto.getBooking_date(), e);
            }
        } else {
            booking.setBooking_date(null);
        }

        if (dto.getStart_date() != null && !dto.getStart_date().isEmpty()) {
            try {
                LocalDateTime localDateTime = LocalDateTime.parse(dto.getStart_date(), formatter);
                booking.setStart_date(Timestamp.valueOf(localDateTime));
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid start_date format: " + dto.getStart_date(), e);
            }
        } else {
            booking.setStart_date(null);
        }

        if (dto.getEnd_date() != null && !dto.getEnd_date().isEmpty()) {
            try {
                LocalDateTime localDateTime = LocalDateTime.parse(dto.getEnd_date(), formatter);
                booking.setEnd_date(Timestamp.valueOf(localDateTime));
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid end_date format: " + dto.getEnd_date(), e);
            }
        } else {
            booking.setEnd_date(null);
        }

        booking.setMax_guest(dto.getMax_guest());
        booking.setTotal_price(dto.getTotal_price());
        booking.setPayment(dto.getPayment());

        booking.setUser(user);
        booking.setTour(tour);

        return booking;
    }

    public static Booking toEntity(BookingDTO dto) {
        if (dto == null) return null;

        Booking booking = new Booking();

        if (dto.getBooking_date() != null && !dto.getBooking_date().isEmpty()) {
            try {
                LocalDateTime localDateTime = LocalDateTime.parse(dto.getBooking_date(), formatter);
                booking.setBooking_date(Timestamp.valueOf(localDateTime));
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid booking_date format: " + dto.getBooking_date(), e);
            }
        } else {
            booking.setBooking_date(null);
        }

        if (dto.getStart_date() != null && !dto.getStart_date().isEmpty()) {
            try {
                LocalDateTime localDateTime = LocalDateTime.parse(dto.getStart_date(), formatter);
                booking.setStart_date(Timestamp.valueOf(localDateTime));
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid start_date format: " + dto.getStart_date(), e);
            }
        } else {
            booking.setStart_date(null);
        }

        if (dto.getEnd_date() != null && !dto.getEnd_date().isEmpty()) {
            try {
                LocalDateTime localDateTime = LocalDateTime.parse(dto.getEnd_date(), formatter);
                booking.setEnd_date(Timestamp.valueOf(localDateTime));
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid end_date format: " + dto.getEnd_date(), e);
            }
        } else {
            booking.setEnd_date(null);
        }

        booking.setMax_guest(dto.getMax_guest());
        booking.setTotal_price(dto.getTotal_price());
        booking.setPayment(dto.getPayment()); // Set the int payment field from DTO

        if (dto.getUser_id() != null && dto.getUser_id() > 0) {
            User user = new User();
            user.setId(dto.getUser_id());
            booking.setUser(user);
        } else {
            booking.setUser(null);
        }

        if (dto.getTourInfo() != null && dto.getTourInfo().getId() != null) {
            Tour tour = new Tour();
            tour.setId(dto.getTourInfo().getId());
            booking.setTour(tour);
        } else {
            booking.setTour(null);
        }

        return booking;
    }
}