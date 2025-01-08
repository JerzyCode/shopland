package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.exception.NoAuthHeaderException;
import agh.boksaoracz.shopland.model.dto.CartDto;
import agh.boksaoracz.shopland.model.dto.CartProductCommand;
import agh.boksaoracz.shopland.model.entity.Cart;
import agh.boksaoracz.shopland.service.CartService;
import agh.boksaoracz.shopland.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;


@RestController
@RequestMapping("/rest/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final NativeWebRequest nativeWebRequest;
    private final JwtService jwtService;

    @GetMapping("/")
    ResponseEntity<CartDto> getCartByUserId() {
        Long userId = getUserId();
        return ResponseEntity.ok(cartService.getCartByEmail(userId));
    }

    @PostMapping("/")
    ResponseEntity<Cart> addProductToCart(@RequestBody CartProductCommand cartProductCommand) {
        Long userId = getUserId();
        return ResponseEntity.ok(cartService.addOrUpdateCart(userId, cartProductCommand));
    }

    @DeleteMapping("/{productId}")
    ResponseEntity<Void> deleteProductCart(@PathVariable Long productId) {
        Long userId = getUserId();
        cartService.removeCart(userId, productId);
        return ResponseEntity.ok().build();
    }

    private Long getUserId() throws NoAuthHeaderException {
        var bearerPrefix = "Bearer ";
        var header = nativeWebRequest.getHeader("Authorization");
        if (header == null) {
            throw new NoAuthHeaderException();
        }
        var token = header.contains(bearerPrefix) ? header.substring(bearerPrefix.length()) : header;
        return jwtService.extractUserId(token);
    }

}
