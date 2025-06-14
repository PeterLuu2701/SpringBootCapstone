package com.example.capstone.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.awt.*;
import java.sql.Timestamp;
import java.util.List;

@Entity(name = "cart_item")
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(name = "cart_id")
    private List<Cart> carts;

    @ManyToMany
    @JoinTable(name = "tour_id")
    private List<Tour> tours;
    private int quantity;

}
