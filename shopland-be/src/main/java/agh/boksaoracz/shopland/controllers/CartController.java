package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.CartDto;
import agh.boksaoracz.shopland.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    //TODO: zrobić to po tokenie
    @GetMapping("/{userId}")
    ResponseEntity<CartDto> getCartByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }
}
