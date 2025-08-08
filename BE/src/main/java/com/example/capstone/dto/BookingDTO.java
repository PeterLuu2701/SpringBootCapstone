package com.example.capstone.dto;

import com.example.capstone.enums.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Data
public class BookingDTO {
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private String booking_date;
    private int max_guest;
    private Double total_price;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private String start_date;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private String end_date;
    private Long user_id;
    private Long tour_id;
    private int payment;

    private TourBookingInfoDTO tourInfo;

}
