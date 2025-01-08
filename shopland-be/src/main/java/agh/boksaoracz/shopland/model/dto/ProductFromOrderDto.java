package agh.boksaoracz.shopland.model.dto;

import jakarta.persistence.Lob;

public record ProductFromOrderDto (
        Long productId,
        String name,
        String description,
        Double unitPrice,
        @Lob byte[] image,
        int quantity
){
}
