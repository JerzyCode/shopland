package agh.boksaoracz.shopland.model.dto.responseapi;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
class ProductSummary {
    private Long id;
    private String title;
    private String description;
    private String category;
    private Double price;
    private Double discountPercentage;
    private Double rating;
    private int stock;
    private List<String> tags;
    private String brand;
    private String sku;
    private Double weight;
    private Dimensions dimensions;
    private String warrantyInformation;
    private String shippingInformation;
    private String availabilityStatus;
    private List<Review> reviews;
    private String returnPolicy;
    private int minimumOrderQuantity;
    private Meta meta;
    private List<String> images;
    private String thumbnail;
}
