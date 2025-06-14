package com.example.capstone.service;

import com.example.capstone.dto.CartDTO;
import com.example.capstone.dto.CartItemDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface CartService {
    CartDTO getOrCreateCartForUser(Long user_id);
    CartDTO addItemToCart(Long userId, Long tourId, int quantity);
    CartDTO updateItemQuantity(Long userId, Long cartItemId, int newQuantity);
    @Transactional
    CartDTO removeItemFromCart(Long userId, Long cartItemId);
    CartDTO clearCart(Long userId);
    CartItemDTO getCartItemById(Long cartItemId);
}
