package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.model.dto.CartDto;
import agh.boksaoracz.shopland.model.dto.ProductCartDto;
import agh.boksaoracz.shopland.model.entity.Cart;
import agh.boksaoracz.shopland.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public CartDto getCartByUserId(Long userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        List<ProductCartDto> productsInCart = carts.stream()
                .map(Cart::cartToProductCartDto)
                .toList();
        return new CartDto(productsInCart);
    }
}
