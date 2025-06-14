package com.example.capstone.service.imp;
import com.example.capstone.dto.CartDTO;
import com.example.capstone.dto.CartItemDTO;
import com.example.capstone.entity.Cart;
import com.example.capstone.entity.CartItem;
import com.example.capstone.entity.Tour;
import com.example.capstone.entity.User;
import com.example.capstone.mapper.CartMapper;
import com.example.capstone.repository.CartItemRepository;
import com.example.capstone.repository.CartRepository;
import com.example.capstone.repository.TourRepository;
import com.example.capstone.repository.UserRepository;
import com.example.capstone.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
@Service
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final CartMapper cartMapper;
    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository,
                           UserRepository userRepository, TourRepository tourRepository,
                           CartMapper cartMapper) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.tourRepository = tourRepository;
        this.cartMapper = cartMapper;
    }

    @Override
    @Transactional
    public CartDTO getOrCreateCartForUser(Long userId) { // Đổi tên parameter thành userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        Optional<Cart> existingCart = cartRepository.findByUserId(userId);
        Cart cart;
        if (existingCart.isPresent()) {
            cart = existingCart.get();
        } else {
            cart = new Cart();
            cart.setUser(user);
            cart.setStatus("active");
            cart.setCreated_at(new Timestamp(System.currentTimeMillis()));
            cart.setUpdated_at(new Timestamp(System.currentTimeMillis()));
            cart.setTotal_price(0.0);
            cart = cartRepository.save(cart);
        }
        return cartMapper.toDTO(cart);
    }

    @Override
    @Transactional
    public CartDTO addItemToCart(Long userId, Long tourId, int quantity) { // Sử dụng userId nhất quán
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }

        // Sử dụng getOrCreateCartForUser để đảm bảo giỏ hàng tồn tại
        CartDTO cartDTO = getOrCreateCartForUser(userId);
        Cart cart = cartRepository.findById(cartDTO.getId())
                .orElseThrow(() -> new RuntimeException("Error retrieving cart after creation/fetch")); // Nên kiểm tra lại sau khi getOrCreate

        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found with ID: " + tourId));

        Optional<CartItem> existingItemOptional = cartItemRepository.findByCartsIdAndToursId(cart.getId(), tour.getId());
        CartItem cartItem;

        if (existingItemOptional.isPresent()) {
            cartItem = existingItemOptional.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setQuantity(quantity);

            // Đảm bảo các collection không null và thêm mối quan hệ
            if (cartItem.getCarts() == null) {
                cartItem.setCarts(new java.util.ArrayList<>()); // Hoặc new HashSet<>() nếu dùng Set
            }
            cartItem.getCarts().add(cart);

            if (cartItem.getTours() == null) {
                cartItem.setTours(new java.util.ArrayList<>()); // Hoặc new HashSet<>() nếu dùng Set
            }
            cartItem.getTours().add(tour);

            // Đảm bảo collection cartItems trong Cart không null và thêm CartItem
            if (cart.getCartItems() == null) {
                cart.setCartItems(new java.util.ArrayList<>()); // Hoặc new HashSet<>() nếu dùng Set
            }
            cart.getCartItems().add(cartItem);
        }

        cartItem = cartItemRepository.save(cartItem); // Lưu CartItem trước

        cart.setUpdated_at(new Timestamp(System.currentTimeMillis()));
        calculateAndSetTotalPrice(cart); // Tính toán lại tổng giá
        cartRepository.save(cart); // Lưu Cart sau khi cập nhật total_price

        // Lấy lại giỏ hàng sau khi cập nhật để đảm bảo dữ liệu mới nhất
        Cart updatedCart = cartRepository.findById(cart.getId()).orElseThrow(() -> new RuntimeException("Error retrieving updated cart"));
        return cartMapper.toDTO(updatedCart);
    }

    @Override
    @Transactional
    public CartDTO updateItemQuantity(Long userId, Long cartItemId, int newQuantity) {
        if (newQuantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with ID: " + cartItemId));
        if (cartItem.getCarts() == null || !cartItem.getCarts().contains(cart)) { // Thêm kiểm tra null
            throw new SecurityException("Cart item does not belong to this user's cart");
        }
        cartItem.setQuantity(newQuantity);
        cartItemRepository.save(cartItem);
        cart.setUpdated_at(new Timestamp(System.currentTimeMillis()));
        calculateAndSetTotalPrice(cart);
        cartRepository.save(cart);

        Cart updatedCart = cartRepository.findById(cart.getId()).orElseThrow(() -> new RuntimeException("Error retrieving updated cart"));
        return cartMapper.toDTO(updatedCart);
    }

    @Transactional
    @Override
    public CartDTO removeItemFromCart(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with ID: " + cartItemId));
        if (cartItem.getCarts() == null || !cartItem.getCarts().contains(cart)) { // Thêm kiểm tra null
            throw new SecurityException("Cart item does not belong to this user's cart");
        }
        if (cartItem.getCarts() != null) { // Thêm kiểm tra null trước khi remove
            cartItem.getCarts().remove(cart);
        }
        if (cartItem.getCarts() == null || cartItem.getCarts().isEmpty()) {
            cartItemRepository.delete(cartItem);
        } else {
            cartItemRepository.save(cartItem);
        }

        if (cart.getCartItems() != null) {
            cart.getCartItems().remove(cartItem);
        }
        cart.setUpdated_at(new Timestamp(System.currentTimeMillis()));
        calculateAndSetTotalPrice(cart);
        cartRepository.save(cart);

        Cart updatedCart = cartRepository.findById(cart.getId()).orElseThrow(() -> new RuntimeException("Error retrieving updated cart"));
        return cartMapper.toDTO(updatedCart);
    }
    @Override
    @Transactional
    public CartDTO clearCart(Long userId) {
        // Tìm giỏ hàng của người dùng
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));
        List<CartItem> itemsToRemove = new java.util.ArrayList<>(cart.getCartItems());
        for (CartItem cartItem : itemsToRemove) {
            if (cartItem.getCarts() != null) {
                cartItem.getCarts().remove(cart);
            }

            if (cartItem.getCarts() == null || cartItem.getCarts().isEmpty()) {
                cartItemRepository.delete(cartItem);
            } else {
                cartItemRepository.save(cartItem);
            }
        }
        if (cart.getCartItems() != null) {
            cart.getCartItems().clear();
        }
        cart.setUpdated_at(new Timestamp(System.currentTimeMillis()));
        cart.setTotal_price(0.0);
        cartRepository.save(cart);
        Cart updatedCart = cartRepository.findById(cart.getId()).orElseThrow(() -> new RuntimeException("Error retrieving updated cart"));
        return cartMapper.toDTO(updatedCart);
    }

    @Override
    @Transactional
    public CartItemDTO getCartItemById(Long cartItemId) {
        // Tìm CartItem
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with ID: " + cartItemId));
        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setId(cartItem.getId());
        itemDTO.setQuantity(cartItem.getQuantity());
        if (cartItem.getCarts() != null && !cartItem.getCarts().isEmpty()) {
            itemDTO.setCart_id(cartItem.getCarts().get(0).getId());
        } else {
            itemDTO.setCart_id(null);
        }
        if (cartItem.getTours() != null && !cartItem.getTours().isEmpty()) {
            itemDTO.setTour_id(cartItem.getTours().get(0).getId());
        } else {
            itemDTO.setTour_id(null);
        }

        return itemDTO;
    }

    private void calculateAndSetTotalPrice(Cart cart) {
        double total = 0.0;
        if (cart != null && cart.getCartItems() != null) {
            for (CartItem item : cart.getCartItems()) {
                if (item.getTours() != null && !item.getTours().isEmpty()) {
                    Tour firstTour = item.getTours().get(0);
                    if (firstTour != null) {
                        double price = firstTour.getPrice();
                        Integer quantity = item.getQuantity();
                        if (quantity != null) {
                            total += quantity * price;
                        }
                    }
                }
            }
        }
        cart.setTotal_price(total);
    }
}