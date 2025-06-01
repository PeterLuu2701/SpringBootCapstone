package com.example.capstone.service;

import com.example.capstone.dto.BookingDTO;

import java.util.List;

public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO);
    BookingDTO getBookingById(Long id);
    List<BookingDTO> getAllBookings();
    BookingDTO updateBooking(Long id, BookingDTO bookingDTO);
    boolean deleteBooking(Long id);
}
