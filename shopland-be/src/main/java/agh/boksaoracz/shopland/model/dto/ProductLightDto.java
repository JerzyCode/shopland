package agh.boksaoracz.shopland.model.dto;


public record ProductLightDto(long id,
                              String name,
                              String shortDescription,
                              Double price,
                              String imageUrl) {
}
