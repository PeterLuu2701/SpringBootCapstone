package com.example.capstone.controller;

import com.example.capstone.dto.CartDTO;
import com.example.capstone.dto.CartItemDTO;
import com.example.capstone.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {
    @Autowired
    private final CartService cartService;
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }
    @GetMapping("/{user_id}")
    public ResponseEntity<CartDTO> getOrCreateCartForUser(@PathVariable Long user_id) {
        CartDTO cartDTO = cartService.getOrCreateCartForUser(user_id);
        return ResponseEntity.ok(cartDTO);
    }
    @PostMapping("/add")
    public ResponseEntity<CartDTO> addItemToCart(@RequestParam Long user_id,
                                                 @RequestParam Long tour_id,
                                                 @RequestParam int quantity) {
        CartDTO updatedCart = cartService.addItemToCart(user_id, tour_id, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedCart); // Trả về 201 Created và CartDTO cập nhật
    }
    @PutMapping("/update")
    public ResponseEntity<CartDTO> updateItemQuantity(@RequestParam Long user_id,
                                                      @RequestParam Long cartItem_id,
                                                      @RequestParam int newQuantity) {
        CartDTO updatedCart = cartService.updateItemQuantity(user_id, cartItem_id, newQuantity);
        return ResponseEntity.ok(updatedCart);
    }
    @DeleteMapping("/remove")
    public ResponseEntity<CartDTO> removeItemFromCart(@RequestParam Long user_id,
                                                      @RequestParam Long cartItem_id) {
        CartDTO updatedCart = cartService.removeItemFromCart(user_id, cartItem_id);
        return ResponseEntity.ok(updatedCart);
    }
    @DeleteMapping("/clear/{user_id}")
    public ResponseEntity<CartDTO> clearCart(@PathVariable Long user_id) {
        CartDTO clearedCart = cartService.clearCart(user_id);
        return ResponseEntity.ok(clearedCart); // Trả về 200 OK và CartDTO giỏ hàng đã cleared
    }
    @GetMapping("/item/{cartItem_id}")
    public ResponseEntity<CartItemDTO> getCartItemById(@PathVariable Long cartItem_id) {
        CartItemDTO itemDTO = cartService.getCartItemById(cartItem_id);
        return ResponseEntity.ok(itemDTO);
    }
}
