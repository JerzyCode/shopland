package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.ProductDto;
import agh.boksaoracz.shopland.model.dto.ProductLightDto;
import agh.boksaoracz.shopland.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/")
    ResponseEntity<List<ProductLightDto>> getProducts(@RequestParam(value = "name", required = false) String name) {
        return ResponseEntity.ok(productService.getProducts(name));
    }

    @GetMapping("/{id}")
    ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
}
