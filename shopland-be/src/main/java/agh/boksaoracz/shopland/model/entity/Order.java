package agh.boksaoracz.shopland.model.entity;

import agh.boksaoracz.shopland.model.dto.OrderDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

import java.sql.Timestamp;

@Entity
@Table(name = "orders")
@Check(constraints = "summary_price >= 0")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    User user;

    @Column()
    double summaryPrice;

    @Column(nullable = false)
    Timestamp date;

    public OrderDto orderToOrderDto(){
        return new OrderDto(id, date, summaryPrice);
    }
}
