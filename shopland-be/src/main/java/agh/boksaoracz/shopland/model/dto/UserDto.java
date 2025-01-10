package agh.boksaoracz.shopland.model.dto;

import lombok.Builder;

@Builder
public record UserDto(String email, String name, String surname, int age, String password) {

}
