package agh.boksaoracz.shopland.model.dto;

import java.sql.Timestamp;

public record OrderDto(Long id, Timestamp date, Double orderPrice) {
}
