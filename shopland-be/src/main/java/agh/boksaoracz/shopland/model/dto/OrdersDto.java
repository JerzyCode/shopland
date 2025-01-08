package agh.boksaoracz.shopland.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrdersDto {
    private List<OrderDto> orders;
    private int orderCount;

    public OrdersDto(List<OrderDto> orders) {
        this.orders = orders;
        this.orderCount = orders.size();
    }
}
