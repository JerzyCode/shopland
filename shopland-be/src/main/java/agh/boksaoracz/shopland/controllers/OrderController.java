package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.exception.NoAuthHeaderException;
import agh.boksaoracz.shopland.model.dto.OrderDetailsDto;
import agh.boksaoracz.shopland.model.dto.OrdersDto;
import agh.boksaoracz.shopland.service.JwtService;
import agh.boksaoracz.shopland.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;

@RestController
@RequestMapping("/rest/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final NativeWebRequest nativeWebRequest;
    private final JwtService jwtService;

    @GetMapping("/")
    ResponseEntity<OrdersDto> getOrders() {
        Long userId = getUserId();
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @GetMapping("/{orderId}")
    ResponseEntity<OrderDetailsDto> getOrder(@PathVariable Long orderId) {
        Long userId = getUserId();
        return ResponseEntity.ok(orderService.getOrderDetails(userId, orderId));
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
