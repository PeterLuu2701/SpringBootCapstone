package com.example.capstone.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
@Entity(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id",  nullable = false, unique = true) // Tên cột khóa ngoại sẽ là user_id
    private User user;
    private Timestamp created_at;
    private Timestamp updated_at;
    private String status;
    private Double total_price;


    @ManyToMany(mappedBy = "carts")
    private List<CartItem> cartItems;


}
