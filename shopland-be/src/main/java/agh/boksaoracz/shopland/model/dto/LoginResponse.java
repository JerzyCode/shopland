package agh.boksaoracz.shopland.model.dto;

public record LoginResponse(String jwtToken, String name, String email, agh.boksaoracz.shopland.model.entity.UserRole role) {
}
