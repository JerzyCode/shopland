package agh.boksaoracz.shopland.model.dto;

import java.util.List;

public record OrderDetailsDto(Long orderId, List<ProductFromOrderDto> products, Double totalPrice) {
}
