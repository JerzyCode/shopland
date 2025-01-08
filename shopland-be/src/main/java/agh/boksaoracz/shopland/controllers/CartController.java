package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.CartDto;
import agh.boksaoracz.shopland.model.dto.CartProductCommand;
import agh.boksaoracz.shopland.model.entity.Cart;
import agh.boksaoracz.shopland.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/")
    ResponseEntity<CartDto> getCartByUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(cartService.getCartByEmail(email));
    }

    @PostMapping("/")
    ResponseEntity<Cart> addProductToCart(@RequestBody CartProductCommand cartProductCommand) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(cartService.addOrUpdateCart(email, cartProductCommand));
    }

    @DeleteMapping("/{productId}")
    ResponseEntity<Void> deleteProductCart(@PathVariable Long productId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        cartService.removeCart(email, productId);
        return ResponseEntity.ok().build();
    }

}
