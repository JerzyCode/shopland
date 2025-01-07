package agh.boksaoracz.shopland.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class CartDto {
    private List<ProductCartDto> products;
    private double totalPrice;

    public CartDto(List<ProductCartDto> products) {
        this.products = products;
        totalPrice = products.stream()
                .mapToDouble(ProductCartDto::price)
                .sum();
    }
}
