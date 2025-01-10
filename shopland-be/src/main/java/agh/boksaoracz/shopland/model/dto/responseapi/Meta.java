package agh.boksaoracz.shopland.model.dto.responseapi;

import lombok.Data;

@Data
class Meta {
    private String createdAt;
    private String updatedAt;
    private String barcode;
    private String qrCode;
}
