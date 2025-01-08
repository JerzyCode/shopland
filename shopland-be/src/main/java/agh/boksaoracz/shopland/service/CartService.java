package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.exception.ProductNotFoundException;
import agh.boksaoracz.shopland.exception.UserNotFoundException;
import agh.boksaoracz.shopland.model.dto.CartDto;
import agh.boksaoracz.shopland.model.dto.CartProductCommand;
import agh.boksaoracz.shopland.model.dto.ProductCartDto;
import agh.boksaoracz.shopland.model.entity.*;
import agh.boksaoracz.shopland.model.entity.embeddedKeys.CartId;
import agh.boksaoracz.shopland.model.entity.embeddedKeys.OrderProductId;
import agh.boksaoracz.shopland.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;

    public CartService(CartRepository cartRepository, ProductRepository productRepository, UserRepository userRepository, OrderRepository orderRepository, OrderProductRepository orderProductRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderProductRepository = orderProductRepository;
    }

    public CartDto getCartByEmail(Long userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        List<ProductCartDto> productsInCart = carts.stream()
                .map(Cart::cartToProductCartDto)
                .toList();
        return new CartDto(productsInCart);
    }

    public Cart addOrUpdateCart(Long userId, CartProductCommand cartProductCommand) {

        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException(String.format("User with id=%s not exist.", userId)));
        Long productId = cartProductCommand.productId();
        Integer quantity = cartProductCommand.quantity();
        CartId cartId = new CartId(userId, productId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product with id: %d not found".formatted(productId)));

        Cart existingCart = cartRepository.findByUserIdAndProductId(userId, productId).orElse(null);

        if (existingCart != null) {
            existingCart.setQuantity(quantity);
            return cartRepository.save(existingCart);
        } else {
            Cart newCart = Cart.builder()
                    .id(cartId)
                    .user(user)
                    .product(product)
                    .quantity(quantity)
                    .build();

            return cartRepository.save(newCart);
        }
    }

    @Transactional
    public void removeCart(Long userId, Long productId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            throw new UserNotFoundException("User with id: %d not found".formatted(userId));
        }

        Optional<Cart> cartDto = cartRepository.findByUserIdAndProductId(userId, productId);

        if (cartDto.isEmpty()) {
            throw new ProductNotFoundException("Product with id: %d not found for user with id: %d".formatted(productId, userId));
        }

        cartRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Transactional
    public void acceptCart(Long userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id: %d not found".formatted(userId)));

        double summaryPrice = carts.stream()
                .mapToDouble(cart -> cart.getQuantity() * cart.getProduct().getPrice())
                .sum();

        Order order = Order.builder()
                .date(Timestamp.valueOf(LocalDateTime.now()))
                .user(user)
                .summaryPrice(summaryPrice)
                .build();
        orderRepository.save(order);
        for(Cart cart : carts) {
            OrderProduct orderProduct = OrderProduct.builder()
                    .id(new OrderProductId(order.getId(), cart.getProduct().getId()))
                    .order(order)
                    .product(cart.getProduct())
                    .quantity(cart.getQuantity())
                    .build();
            orderProductRepository.save(orderProduct);
            cartRepository.delete(cart);
        }

    }


}
