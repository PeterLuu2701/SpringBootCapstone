package com.example.capstone.service.imp;

import com.example.capstone.dto.BookingDTO;
import com.example.capstone.entity.Booking;
import com.example.capstone.entity.Tour;
import com.example.capstone.entity.User;
import com.example.capstone.enums.PaymentStatus;
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
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImp implements BookingService {

    private final BookingRepository bookingRepository;
    private final TourRepository tourRepository;
    private final UserRepository userRepository;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public BookingServiceImp(BookingRepository bookingRepository,
            TourRepository tourRepository,
            UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.tourRepository = tourRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Long tourId = bookingDTO.getTour_id();

        Tour tour = tourRepository.findById(tourId) // Use the extracted tourId
                .orElseThrow(() -> new EntityNotFoundException("Tour not found with id: " + tourId));

        // Default user ID to 1 for quick testing
        Long userId = 1L;

        // To get user ID from JWT
        /*
         * Authentication authentication =
         * SecurityContextHolder.getContext().getAuthentication();
         * if (authentication != null && authentication.getPrincipal() instanceof
         * UserDetails) {
         * String username = ((UserDetails)
         * authentication.getPrincipal()).getUsername();
         * User loggedInUser = userRepository.findByUsername(username) // Assuming you
         * have a findByUsername method
         * .orElseThrow(() -> new
         * EntityNotFoundException("User not found with username: " + username));
         * userId = (long) loggedInUser.getId();
         * } else {
         * // Handle case where authentication is not available or not UserDetails
         * // For now, it will default to 1L
         * }
         */

        User user = userRepository.findById(Math.toIntExact(userId))
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        // Calculate total_price
        bookingDTO.setTotal_price(tour.getPrice() * bookingDTO.getMax_guest()); // Using double directly
        bookingDTO.setPayment(0); // Set default payment status to 0 (unpaid/pending)

        Booking booking = BookingMapper.toEntity(bookingDTO, tour, user);
        booking.setBooking_date(Timestamp.valueOf(LocalDateTime.now())); // Set current time for booking_date

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
    @Transactional
    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
        Booking existing = bookingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with id: " + id));

        boolean maxGuestChanged = false;

        // 1. Update max_guest:
        if (bookingDTO.getMax_guest() > 0 && existing.getMax_guest() != bookingDTO.getMax_guest()) {
            existing.setMax_guest(bookingDTO.getMax_guest());
            maxGuestChanged = true;
        }

        // 2. Update tour_id:
        if (bookingDTO.getTour_id() != null && !bookingDTO.getTour_id().equals(existing.getTour().getId())) {
            Tour newTour = tourRepository.findById(bookingDTO.getTour_id())
                    .orElseThrow(
                            () -> new EntityNotFoundException("Tour not found with id: " + bookingDTO.getTour_id()));
            existing.setTour(newTour);
            // Recalculate total_price
            if (!maxGuestChanged) {
                existing.setTotal_price(newTour.getPrice() * existing.getMax_guest());
            }
        }

        // 3. Recalculate total_price if max_guest or tour changed
        if (maxGuestChanged) {
            // Get the current tour associated with the booking
            Tour currentTour = existing.getTour();
            if (currentTour != null) {
                Double newTotalPrice = currentTour.getPrice() * existing.getMax_guest();
                existing.setTotal_price(newTotalPrice);
            }
        }

        // 4. Update total_price directly
        if (bookingDTO.getTotal_price() != null && !bookingDTO.getTotal_price().equals(existing.getTotal_price())) {
            existing.setTotal_price(bookingDTO.getTotal_price());
        }

        // 5. Update start_date:
        if (bookingDTO.getStart_date() != null && !bookingDTO.getStart_date().isEmpty()) {
            try {
                Timestamp newStartDate = Timestamp.valueOf(LocalDateTime.parse(bookingDTO.getStart_date(), formatter));
                if (!newStartDate.equals(existing.getStart_date())) {
                    existing.setStart_date(newStartDate);
                }
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid start_date format: " + bookingDTO.getStart_date(), e);
            }
        }

        // 6. Update end_date:
        if (bookingDTO.getEnd_date() != null && !bookingDTO.getEnd_date().isEmpty()) {
            try {
                Timestamp newEndDate = Timestamp.valueOf(LocalDateTime.parse(bookingDTO.getEnd_date(), formatter));
                if (!newEndDate.equals(existing.getEnd_date())) {
                    existing.setEnd_date(newEndDate);
                }
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid end_date format: " + bookingDTO.getEnd_date(), e);
            }
        }

        // 7. Update user_id:
        if (bookingDTO.getUser_id() != null
                && !bookingDTO.getUser_id().equals(Long.valueOf(existing.getUser().getId()))) {
            User newUser = userRepository.findById(Math.toIntExact(bookingDTO.getUser_id()))
                    .orElseThrow(
                            () -> new EntityNotFoundException("User not found with id: " + bookingDTO.getUser_id()));
            existing.setUser(newUser);
        }

        // 8. Update payment:
        if (bookingDTO.getPayment() != existing.getPayment()) {
            existing.setPayment(bookingDTO.getPayment());
        }

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
        if (localDate == null)
            return null;
        return Timestamp.valueOf(localDate.atStartOfDay());
    }
}
