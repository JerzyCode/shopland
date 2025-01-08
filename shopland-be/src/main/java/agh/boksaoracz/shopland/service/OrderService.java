package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.model.dto.OrderDto;
import agh.boksaoracz.shopland.model.dto.OrdersDto;
import agh.boksaoracz.shopland.model.entity.Order;
import agh.boksaoracz.shopland.repository.OrderRepository;
import agh.boksaoracz.shopland.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public OrdersDto getOrdersByEmail(String email){
        Long UserId = userRepository.findByEmail(email).get().getId();
        List<Order> orders = orderRepository.findByUserId(UserId);

        List<OrderDto> ordersDtos = orders.stream()
                .map(Order::orderToOrderDto)
                .toList();

        return new OrdersDto(ordersDtos);

    }
}
