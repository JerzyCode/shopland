package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.model.dto.ProductDto;
import agh.boksaoracz.shopland.model.dto.ProductLightDto;
import agh.boksaoracz.shopland.model.entity.Product;
import agh.boksaoracz.shopland.exception.ProductNotFoundException;
import agh.boksaoracz.shopland.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductLightDto> getProducts(String name) {
        List<Product> products = (name == null || name.isEmpty())
                ? productRepository.findAll()
                : productRepository.findByNameContainingIgnoreCase(name);

        return products.stream()
                .map(Product::productToProductLightDto)
                .collect(Collectors.toList());
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));
        return product.productToProductDto();
    }

}
