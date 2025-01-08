package agh.boksaoracz.shopland.model.dto;

import agh.boksaoracz.shopland.model.entity.Opinion;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OpinionDto {
    private Long id;
    private String productName;
    private String userEmail;
    private String content;
    private int value;


    public static OpinionDto of(Opinion opinion) {
        return OpinionDto.builder()
                .id(opinion.getId())
                .productName(opinion.getProduct().getName())
                .userEmail(opinion.getUser().getEmail())
                .content(opinion.getContent())
                .value(opinion.getValue())
                .build();
    }
}
