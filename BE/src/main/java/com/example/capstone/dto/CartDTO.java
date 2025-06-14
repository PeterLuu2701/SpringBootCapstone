package com.example.capstone.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class CartDTO {
    private Long id;
    private Long user_id;
    private Timestamp created_at;
    private Timestamp updated_at;
    private String status;
    private Double total_price;
    private List<CartItemDTO> cartItems;
}
