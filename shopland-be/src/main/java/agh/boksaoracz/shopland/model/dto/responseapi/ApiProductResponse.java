package agh.boksaoracz.shopland.model.dto.responseapi;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ApiProductResponse {
    private List<ProductSummary> products;
    private int total;
    private int skip;
    private int limit;
}
