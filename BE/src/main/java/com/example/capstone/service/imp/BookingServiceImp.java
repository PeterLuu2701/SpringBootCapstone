package com.example.capstone.service.imp;

import com.example.capstone.dto.BookingDTO;
import com.example.capstone.entity.Booking;
import com.example.capstone.entity.Tour;
import com.example.capstone.entity.User;
import com.example.capstone.mapper.BookingMapper;
import com.example.capstone.repository.BookingRepository;
import com.example.capstone.repository.TourRepository;
import com.example.capstone.repository.UserRepository;
import com.example.capstone.service.BookingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImp implements BookingService {

    private final BookingRepository bookingRepository;
    private final TourRepository tourRepository;
    private final UserRepository userRepository;

    public BookingServiceImp(BookingRepository bookingRepository,
                             TourRepository tourRepository,
                             UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.tourRepository = tourRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Tour tour = tourRepository.findById(bookingDTO.getTour_id())
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + bookingDTO.getTour_id()));

        User user = userRepository.findById(Math.toIntExact(bookingDTO.getUser_id()))
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + bookingDTO.getUser_id()));

        Booking booking = BookingMapper.toEntity(bookingDTO, tour, user);

        booking.setBooking_date(Timestamp.valueOf(LocalDateTime.now())); // set thời gian hiện tại

        Booking saved = bookingRepository.save(booking);

        return BookingMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + id));
        return BookingMapper.toDTO(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(BookingMapper::toDTO)
                .collect(Collectors.toList());
    }


    @Override
    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
        Booking existing = bookingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + id));

        Tour tour = tourRepository.findById(bookingDTO.getTour_id())
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + bookingDTO.getTour_id()));

        User user = userRepository.findById(Math.toIntExact(bookingDTO.getUser_id()))
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + bookingDTO.getUser_id()));

        existing.setTour(tour);
        existing.setUser(user);

        existing.setStart_date(Timestamp.valueOf((bookingDTO.getStart_date())));
        existing.setEnd_date(Timestamp.valueOf((bookingDTO.getEnd_date())));
        existing.setMax_guest(bookingDTO.getMax_guest());
        existing.setTotal_price(bookingDTO.getTotal_price());
        existing.setPayment(Boolean.TRUE.equals(bookingDTO.getPaymentStatus()));

        Booking updated = bookingRepository.save(existing);
        return BookingMapper.toDTO(updated);
    }

    @Override
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new EntityNotFoundException("Booking not found with id: " + id);
        }
        bookingRepository.deleteById(id);
    }

    private Timestamp localDateToTimestamp(LocalDate localDate) {
        if (localDate == null) return null;
        return Timestamp.valueOf(localDate.atStartOfDay());
    }
}
