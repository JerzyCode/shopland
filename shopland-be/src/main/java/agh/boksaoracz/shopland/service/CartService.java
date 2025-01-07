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
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private EntityManager entityManager;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public CartDto getCartByUserId(Long userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        List<ProductCartDto> productsInCart = carts.stream()
                .map(Cart::cartToProductCartDto)
                .toList();
        return new CartDto(productsInCart);
    }

    public Cart addOrUpdateCart(Long userId, CartProductCommand cartProductCommand) {

        Long productId = cartProductCommand.productId();
        Integer quantity = cartProductCommand.quantity();
        CartId cartId = new CartId(userId, productId);

        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User with id: %d not found".formatted(userId));
        }

        if (!productRepository.existsById(productId)) {
            throw new ProductNotFoundException("Product with id: %d not found".formatted(productId));
        }

        Cart existingCart = cartRepository.findByUserIdAndProductId(userId, productId).orElse(null);

        if (existingCart != null) {
            existingCart.setQuantity(quantity);
            return cartRepository.save(existingCart);
        } else {
            User user = entityManager.getReference(User.class, userId);
            Product product = entityManager.getReference(Product.class, productId);

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
    public void removeCart(String email, Long productId) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new UserNotFoundException("User with email: %s not found".formatted(email));
        }

        Long userId = user.get().getId();
        Optional<Cart> cartDto = cartRepository.findByUserIdAndProductId(userId, productId);

        if (cartDto.isEmpty()) {
            throw new ProductNotFoundException("Product with id: %d not found for user with id: %d".formatted(productId, userId));
        }

        cartRepository.deleteByUserIdAndProductId(userId, productId);
    }


}
