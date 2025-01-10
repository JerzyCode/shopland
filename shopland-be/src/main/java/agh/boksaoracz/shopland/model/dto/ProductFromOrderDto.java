package agh.boksaoracz.shopland.model.dto;

public record ProductFromOrderDto(
        Long productId,
        String name,
        String description,
        Double unitPrice,
        String imageUrl,
        int quantity
) {
}
