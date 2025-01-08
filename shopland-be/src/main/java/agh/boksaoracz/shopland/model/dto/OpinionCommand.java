package agh.boksaoracz.shopland.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OpinionCommand {
    private String content;
    private int score;
}
