package com.example.capstone.mapper;
import com.example.capstone.dto.CartItemDTO;
import com.example.capstone.entity.Cart;
import com.example.capstone.entity.CartItem;
import com.example.capstone.entity.Tour;
import java.util.List;
import java.util.stream.Collectors;

public class CartItemMapper {
    public CartItemMapper() {
    }
    public CartItemDTO toDTO(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }
        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setId(cartItem.getId());
        itemDTO.setQuantity(cartItem.getQuantity());
        if (cartItem.getCarts() != null && !cartItem.getCarts().isEmpty()) {
            Cart firstCart = cartItem.getCarts().get(0);
            itemDTO.setCart_id(firstCart.getId());
        } else {
            itemDTO.setCart_id(null);
        }
        if (cartItem.getTours() != null && !cartItem.getTours().isEmpty()) {
            Tour firstTour = cartItem.getTours().get(0);
            itemDTO.setTour_id(firstTour.getId());
        } else {
            itemDTO.setTour_id(null);
        }
        return itemDTO;
    }
    public List<CartItemDTO> toDTOList(List<CartItem> cartItems) {
        if (cartItems == null) {
            return null;
        }
        return cartItems.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    public CartItem toEntity(CartItemDTO itemDTO) {
        CartItem cartItem = new CartItem();
        cartItem.setId(itemDTO.getId());
        cartItem.setQuantity(itemDTO.getQuantity());
        return cartItem;
    }
    public List<CartItem> toEntityList(List<CartItemDTO> itemDTOs) {
        if (itemDTOs == null) {
            return null;
        }
        return itemDTOs.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}