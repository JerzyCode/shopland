package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.CartDto;
import agh.boksaoracz.shopland.model.dto.CartProductCommand;
import agh.boksaoracz.shopland.model.entity.Cart;
import agh.boksaoracz.shopland.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    //TODO: zrobić get i post po tokenie
    @GetMapping("/{userId}")
    ResponseEntity<CartDto> getCartByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping("/{userId}")
    ResponseEntity<Cart> createCart(@PathVariable Long userId, @RequestBody CartProductCommand cartProductCommand) {
        return ResponseEntity.ok(cartService.addOrUpdateCart(userId, cartProductCommand));
    }
}
