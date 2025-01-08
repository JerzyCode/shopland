package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.model.entity.OrderProduct;
import agh.boksaoracz.shopland.repository.OrderProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderProductService {

    OrderProductRepository orderProductRepository;

    public List<OrderProduct> findAllByOrderId(Long orderId) {
        return orderProductRepository.findByOrderId(orderId);
    }
}
