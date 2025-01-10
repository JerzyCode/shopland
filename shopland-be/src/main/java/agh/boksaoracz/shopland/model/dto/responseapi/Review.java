package agh.boksaoracz.shopland.model.dto.responseapi;

import lombok.Data;

import java.util.Date;

@Data
class Review {
    private Double rating;
    private String comment;
    private Date date;
    private String reviewerName;
    private String reviewerEmail;
}
