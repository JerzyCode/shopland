package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.exception.ProductNotFoundException;
import agh.boksaoracz.shopland.exception.UserNotFoundException;
import agh.boksaoracz.shopland.model.dto.CartDto;
import agh.boksaoracz.shopland.model.dto.CartProductCommand;
import agh.boksaoracz.shopland.model.dto.ProductCartDto;
import agh.boksaoracz.shopland.model.entity.Cart;
import agh.boksaoracz.shopland.model.entity.Product;
import agh.boksaoracz.shopland.model.entity.User;
import agh.boksaoracz.shopland.model.entity.embeddedKeys.CartId;
import agh.boksaoracz.shopland.repository.CartRepository;
import agh.boksaoracz.shopland.repository.ProductRepository;
import agh.boksaoracz.shopland.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
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


}
