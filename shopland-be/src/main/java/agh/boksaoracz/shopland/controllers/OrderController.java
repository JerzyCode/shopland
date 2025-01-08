package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.OrderDetailsDto;
import agh.boksaoracz.shopland.model.dto.OrdersDto;
import agh.boksaoracz.shopland.service.HeaderService;
import agh.boksaoracz.shopland.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final HeaderService headerService;

    @GetMapping
    ResponseEntity<OrdersDto> getOrders() {
        Long userId = headerService.getUserId();
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @GetMapping("/{orderId}")
    ResponseEntity<OrderDetailsDto> getOrder(@PathVariable Long orderId) {
        Long userId = headerService.getUserId();
        return ResponseEntity.ok(orderService.getOrderDetails(userId, orderId));
    }

}
