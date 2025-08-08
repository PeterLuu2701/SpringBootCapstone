package com.example.capstone.service;

import com.example.capstone.dto.BlogDTO;
import com.example.capstone.dto.BookingDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface BookingService {

    BookingDTO createBooking(BookingDTO bookingDTO);
    BookingDTO getBookingById(Long id);
    List<BookingDTO> getAllBookings ();
    BookingDTO updateBooking(Long id, BookingDTO bookingDTO);
    void deleteBooking(Long id);

}
