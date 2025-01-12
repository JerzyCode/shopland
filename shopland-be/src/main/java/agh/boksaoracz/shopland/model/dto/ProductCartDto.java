package agh.boksaoracz.shopland.model.dto;

public record ProductCartDto(Long productId, String productName, int quantity, double price, String imageUrl) {
}
