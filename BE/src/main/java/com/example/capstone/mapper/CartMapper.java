package com.example.capstone.mapper;

import com.example.capstone.dto.CartDTO;
import com.example.capstone.dto.CartItemDTO;
// Import Tour Entity để có thể truy cập getId()
import com.example.capstone.entity.Tour;
import com.example.capstone.entity.Cart;
import com.example.capstone.entity.CartItem;
import com.example.capstone.service.TourService;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartMapper {
    private final TourService tourService;
    public CartMapper(TourService tourService) {
        this.tourService = tourService;
    }
    public CartDTO toDTO(Cart cart) {
        if (cart == null) {
            return null;
        }

        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUser_id(cart.getUser() != null ? cart.getUser().getId() : null);
        cartDTO.setCreated_at(cart.getCreated_at());
        cartDTO.setUpdated_at(cart.getUpdated_at());
        cartDTO.setStatus(cart.getStatus());
        cartDTO.setTotal_price(cart.getTotal_price());
        if (cart.getCartItems() != null) {
            List<CartItemDTO> itemDTOs = cart.getCartItems().stream()
                    .map(this::toItemDTO) // Sử dụng phương thức toItemDTO riêng
                    .collect(Collectors.toList());
            cartDTO.setCartItems(itemDTOs);
        }

        return cartDTO;
    }
    private CartItemDTO toItemDTO(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }

        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setId(cartItem.getId());
        itemDTO.setQuantity(cartItem.getQuantity());

        if (cartItem.getTours() != null && !cartItem.getTours().isEmpty()) {
            Tour firstTour = cartItem.getTours().get(0); // Lấy Tour đầu tiên từ danh sách
            itemDTO.setTour_id(firstTour.getId()); // Gọi getId() trên đối tượng Tour
        } else {
            itemDTO.setTour_id(null);
        }
        return itemDTO;
    }
    public Cart toEntity(CartDTO cartDTO) {
        Cart cart = new Cart(); // Hoặc lấy Cart hiện có từ DB dựa trên cartDTO.getId()
        cart.setId(cartDTO.getId());
        cart.setCreated_at(cartDTO.getCreated_at());
        cart.setUpdated_at(cartDTO.getUpdated_at());
        cart.setStatus(cartDTO.getStatus());
        cart.setTotal_price(cartDTO.getTotal_price());

        return cart;
    }
    private CartItem toItemEntity(CartItemDTO itemDTO) {
        CartItem cartItem = new CartItem();
        cartItem.setId(itemDTO.getId());
        cartItem.setQuantity(itemDTO.getQuantity());
        return cartItem;
    }
}