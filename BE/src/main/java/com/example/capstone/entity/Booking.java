package com.example.capstone.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;

@Data
@Entity(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Timestamp booking_date;
    private int max_guest;
    private Double total_price;
    private Timestamp start_date;
    private Timestamp end_date;
    private int payment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

}
