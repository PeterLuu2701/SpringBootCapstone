package com.example.capstone.mapper;

import com.example.capstone.dto.BookingDTO;
import com.example.capstone.entity.Booking;
import com.example.capstone.entity.User;
import com.example.capstone.entity.Tour;
import com.example.capstone.enums.PaymentStatus;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException; // Import để xử lý lỗi phân tích

public class BookingMapper {

    // Định nghĩa formatter dựa trên định dạng chuỗi bạn đang nhận
    // Ví dụ: nếu chuỗi có dạng "2023-10-27 10:30:00", formatter sẽ là:
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    // Nếu chuỗi có thể có phần mili/nano giây, hãy thêm ".SSS" hoặc ".nnnnnnnnn" vào pattern


    public static BookingDTO toDTO(Booking booking) {
        // ... (phần này giữ nguyên hoặc có thể cải thiện việc format Timestamp sang String)
        if (booking == null) return null;

        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());

        // Chuyển đổi Timestamp sang String với định dạng mong muốn
        // Nếu entity Booking lưu Timestamp, bạn có thể format nó
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

        if (booking.isPayment()) {
            dto.setPaymentStatus(PaymentStatus.COMPLETED);
        } else {
            dto.setPaymentStatus(PaymentStatus.PENDING);
        }

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

        return dto;
    }

    // Phương thức ánh xạ từ DTO sang Entity (khi đã có Tour và User)
    public static Booking toEntity(BookingDTO dto, Tour tour, User user) {
        if (dto == null) return null;

        Booking booking = new Booking();

        // Sử dụng formatter để phân tích chuỗi và tạo Timestamp
        if (dto.getBooking_date() != null && !dto.getBooking_date().isEmpty()) {
            try {
                LocalDateTime localDateTime = LocalDateTime.parse(dto.getBooking_date(), formatter);
                booking.setBooking_date(Timestamp.valueOf(localDateTime));
            } catch (DateTimeParseException e) {
                // Xử lý lỗi nếu chuỗi không đúng định dạng
                // Ví dụ: throw một exception khác hoặc log lỗi
                throw new IllegalArgumentException("Invalid booking_date format: " + dto.getBooking_date(), e);
            }
        } else {
            booking.setBooking_date(null); // Hoặc giá trị mặc định phù hợp
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

        if (dto.getPaymentStatus() != null && dto.getPaymentStatus() == PaymentStatus.COMPLETED) {
            booking.setPayment(true);
        } else {
            booking.setPayment(false);
        }

        booking.setUser(user);
        booking.setTour(tour);

        return booking;
    }

    // Phương thức ánh xạ từ DTO sang Entity (khi chưa có Tour và User đầy đủ)
    public static Booking toEntity(BookingDTO dto) {
        if (dto == null) return null;

        Booking booking = new Booking();
        // Sử dụng formatter để phân tích chuỗi và tạo Timestamp
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

        if (dto.getPaymentStatus() != null && dto.getPaymentStatus() == PaymentStatus.COMPLETED) {
            booking.setPayment(true);
        } else {
            booking.setPayment(false);
        }


        if (dto.getUser_id() != null && dto.getUser_id() > 0) {
            User user = new User();
            user.setId(dto.getUser_id());
            booking.setUser(user);
        } else {
            booking.setUser(null);
        }

        if (dto.getTour_id() != null && dto.getTour_id() > 0) {
            Tour tour = new Tour();
            tour.setId(dto.getTour_id());
            booking.setTour(tour);
        } else {
            booking.setTour(null);
        }


        return booking;
    }
}