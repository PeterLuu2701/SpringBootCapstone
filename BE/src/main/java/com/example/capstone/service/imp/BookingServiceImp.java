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
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingServiceImp implements BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;

    public BookingServiceImp(BookingRepository bookingRepository,
                             UserRepository userRepository,
                             TourRepository tourRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.tourRepository = tourRepository;
    }

    @Override
    @Transactional
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Optional<User> userOptional = userRepository.findById(bookingDTO.getUser_id());
        Optional<Tour> tourOptional = tourRepository.findById(bookingDTO.getTour_id());

        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found with ID: " + bookingDTO.getUser_id());
        }
        if (!tourOptional.isPresent()) {
            throw new RuntimeException("Tour not found with ID: " + bookingDTO.getTour_id());
        }

        // Map DTO to Entity
        Booking booking = BookingMapper.toEntity(bookingDTO);

        // Set the fetched User and Tour entities on the booking entity
        booking.setUser(userOptional.get());
        booking.setTour(tourOptional.get());

        // Save the booking entity
        Booking savedBooking = bookingRepository.save(booking);

        // Map the saved entity back to DTO and return
        return BookingMapper.toDTO(savedBooking);
    }

    @Override
    public BookingDTO getBookingById(Long id) {
        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        return bookingOptional.map(BookingMapper::toDTO).orElse(null);
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(BookingMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
        Optional<Booking> existingBookingOptional = bookingRepository.findById(id);

        if (existingBookingOptional.isPresent()) {
            Booking existingBooking = existingBookingOptional.get();

            // Update fields from DTO to existing entity
            existingBooking.setBooking_date(bookingDTO.getBooking_date());
            existingBooking.setMax_guest(bookingDTO.getMax_guest());
            existingBooking.setTotal_price(bookingDTO.getTotal_price());

            // If user or tour IDs are updated, fetch and set new entities
            if (bookingDTO.getUser_id() != 0 && existingBooking.getUser().getId() != bookingDTO.getUser_id()) {
                Optional<User> newUserOptional = userRepository.findById(bookingDTO.getUser_id());
                if (newUserOptional.isPresent()) {
                    existingBooking.setUser(newUserOptional.get());
                } else {
                    throw new RuntimeException("New User not found with ID: " + bookingDTO.getUser_id());
                }
            }

            if (bookingDTO.getTour_id() != 0 && existingBooking.getTour().getId() != bookingDTO.getTour_id()) {
                Optional<Tour> newTourOptional = tourRepository.findById(bookingDTO.getTour_id());
                if (newTourOptional.isPresent()) {
                    existingBooking.setTour(newTourOptional.get());
                } else {
                    throw new RuntimeException("New Tour not found with ID: " + bookingDTO.getTour_id());
                }
            }

            Booking updatedBooking = bookingRepository.save(existingBooking);
            return BookingMapper.toDTO(updatedBooking);
        }
        return null;
    }

    @Override
    public boolean deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
