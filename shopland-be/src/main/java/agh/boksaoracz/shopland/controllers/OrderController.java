package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.OrderDto;
import agh.boksaoracz.shopland.model.dto.OrdersDto;
import agh.boksaoracz.shopland.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/")
    ResponseEntity<OrdersDto> getOrders() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(orderService.getOrdersByEmail(email));
    }

}
