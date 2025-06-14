package com.example.capstone.dto;
import lombok.Data;
import java.sql.Timestamp;

@Data
public class CartItemDTO {
    private Long id;
    private Long cart_id;
    private Long tour_id;
    private int quantity;

}
