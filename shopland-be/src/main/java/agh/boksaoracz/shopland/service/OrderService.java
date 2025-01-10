package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.exception.OrderNotFoundException;
import agh.boksaoracz.shopland.model.dto.OrderDetailsDto;
import agh.boksaoracz.shopland.model.dto.OrderDto;
import agh.boksaoracz.shopland.model.dto.OrdersDto;
import agh.boksaoracz.shopland.model.dto.ProductFromOrderDto;
import agh.boksaoracz.shopland.model.entity.Order;
import agh.boksaoracz.shopland.model.entity.OrderProduct;
import agh.boksaoracz.shopland.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderProductService orderProductService;

    public OrderService(OrderRepository orderRepository, OrderProductService orderProductService) {
        this.orderRepository = orderRepository;
        this.orderProductService = orderProductService;
    }

    public OrdersDto getOrdersByUserId(Long userId){
        List<Order> orders = orderRepository.findByUserId(userId);

        List<OrderDto> ordersDtos = orders.stream()
                .map(Order::orderToOrderDto)
                .toList();

        return new OrdersDto(ordersDtos);
    }

    public OrderDetailsDto getOrderDetails(Long userId, Long orderId){
        Order order = orderRepository.findById(orderId).orElse(null);

        if (order == null || !order.getUser().getId().equals(userId)) {
            throw new OrderNotFoundException("Order with productId " + orderId + " not found for user " + userId);
        }

        List<OrderProduct> orderProducts = orderProductService.findAllByOrderId(order.getId());

        List<ProductFromOrderDto> productsFromOrder = orderProducts.stream()
                .map(OrderProduct::orderProductToProductFromOrderDto)
                .toList();

        return new OrderDetailsDto(orderId, productsFromOrder, order.getSummaryPrice());

    }
}
