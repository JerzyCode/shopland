package agh.boksaoracz.shopland.model.entity;

import agh.boksaoracz.shopland.model.dto.ProductDto;
import agh.boksaoracz.shopland.model.dto.ProductFromOrderDto;
import agh.boksaoracz.shopland.model.dto.ProductLightDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

@Entity
@Check(constraints = "unitPrice >= 0 AND available_amount >= 0")
@Table(name = "products")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String shortDescription;

    @Column
    private String longDescription;

    @Column
    private Double price;

    @Column
    private int availableAmount;

    @Column
    private String imageUrl;

    public ProductLightDto productToProductLightDto() {
        return new ProductLightDto(getId(), getName(), getShortDescription(), getPrice(), getImageUrl());
    }

    public ProductDto productToProductDto() {
        return new ProductDto(getName(), getLongDescription(), getAvailableAmount(), imageUrl);
    }

    public ProductFromOrderDto productToProductFromOrderDto(int quntity) {
        return new ProductFromOrderDto(id, name, longDescription, price, imageUrl, quntity);
    }
}
