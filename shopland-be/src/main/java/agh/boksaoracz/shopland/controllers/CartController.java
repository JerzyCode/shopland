package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.CartDto;
import agh.boksaoracz.shopland.model.dto.CartProductCommand;
import agh.boksaoracz.shopland.model.entity.Cart;
import agh.boksaoracz.shopland.service.CartService;
import agh.boksaoracz.shopland.service.HeaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/rest/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    private final HeaderService headerService;

    @GetMapping
    ResponseEntity<CartDto> getCartByUserId() {
        Long userId = headerService.getUserId();
        return ResponseEntity.ok(cartService.getCartByEmail(userId));
    }

    @PostMapping
    ResponseEntity<Cart> addProductToCart(@RequestBody CartProductCommand cartProductCommand) {
        Long userId = headerService.getUserId();
        return ResponseEntity.ok(cartService.addOrUpdateCart(userId, cartProductCommand));
    }

    @DeleteMapping("/{productId}")
    ResponseEntity<Void> deleteProductCart(@PathVariable Long productId) {
        Long userId = headerService.getUserId();
        cartService.removeCart(userId, productId);
        return ResponseEntity.ok().build();
    }

}
