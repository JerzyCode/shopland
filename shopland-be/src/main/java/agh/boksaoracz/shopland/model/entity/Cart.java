package agh.boksaoracz.shopland.model.entity;

import agh.boksaoracz.shopland.model.dto.ProductCartDto;
import agh.boksaoracz.shopland.model.entity.embeddedKeys.CartId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

@Entity
@Table(name = "carts")
@Check(constraints = "quantity > 0")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

    @EmbeddedId
    private CartId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    public ProductCartDto cartToProductCartDto() {
        return new ProductCartDto(product.getId(), product.getName(), quantity, product.getPrice() * quantity);
    }

}
