package com.example.capstone.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class BookingDTO {
    private long id;
    private Timestamp booking_date;
    private int max_guest;
    private Double total_price;
    private int payment;
    private long user_id;
    private String userName;
    private String userEmail;
    private String userPhone;
    private long tour_id;
    private String tourName;
    private String tourPrice;
    private String tourDuration;
}
