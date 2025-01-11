package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.exception.InsufficientAmountOfProductException;
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

    public CartDto getCartByUserId(Long userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        List<ProductCartDto> productsInCart = carts.stream()
                .map(Cart::cartToProductCartDto)
                .toList();
        return new CartDto(productsInCart);
    }

    public ProductCartDto addOrUpdateCart(Long userId, CartProductCommand cartProductCommand) {

        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException(String.format("User with productId=%s not exist.", userId)));
        Long productId = cartProductCommand.productId();
        int quantity = cartProductCommand.quantity();
        CartId cartId = new CartId(userId, productId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product with productId: %d not found".formatted(productId)));

        if (product.getAvailableAmount() < quantity) {
            throw new InsufficientAmountOfProductException("Insufficient amount of products in stock to add to cart.");
        }
        else {
            product.setAvailableAmount(product.getAvailableAmount() - quantity);
            productRepository.save(product);
        }

        Cart existingCart = cartRepository.findByUserIdAndProductId(userId, productId).orElse(null);

        if (existingCart != null) {
            existingCart.setQuantity(quantity + existingCart.getQuantity());
            cartRepository.save(existingCart);
            return existingCart.cartToProductCartDto();
        } else {
            Cart newCart = Cart.builder()
                    .id(cartId)
                    .user(user)
                    .product(product)
                    .quantity(quantity)
                    .build();

            cartRepository.save(newCart);

            return newCart.cartToProductCartDto();
        }
    }

    @Transactional
    public void removeCart(Long userId, Long productId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            throw new UserNotFoundException("User with productId: %d not found".formatted(userId));
        }

        Optional<Cart> cart = cartRepository.findByUserIdAndProductId(userId, productId);

        if (cart.isEmpty()) {
            throw new ProductNotFoundException("Product with productId: %d not found for user with productId: %d".formatted(productId, userId));
        }


        var product = cart.get().getProduct();
        product.setAvailableAmount(product.getAvailableAmount() + cart.get().getQuantity());
        productRepository.save(product);
        cartRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Transactional
    public void acceptCart(Long userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with productId: %d not found".formatted(userId)));

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
