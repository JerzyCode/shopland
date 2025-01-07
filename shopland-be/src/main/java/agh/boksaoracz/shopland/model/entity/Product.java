package agh.boksaoracz.shopland.model.entity;

import agh.boksaoracz.shopland.model.dto.ProductLightDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

@Entity
@Check(constraints = "price >= 0 AND available_amount >= 0")
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
    @Lob
    private byte[] image;

    public ProductLightDto productToProductLightDto() {
        return new ProductLightDto(getId(), getName(), getShortDescription(), getPrice());
    }
}
