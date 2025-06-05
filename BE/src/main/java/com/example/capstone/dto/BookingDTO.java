package com.example.capstone.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Data
public class BookingDTO {
    private int id;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp booking_date;
    private int max_guest;
    private BigDecimal total_price;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp start_date;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp end_date;
    private Long user_id;
    private Long tour_id;
    private Boolean payment;



}
