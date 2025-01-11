package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.model.dto.UserDto;
import agh.boksaoracz.shopland.model.dto.responseapi.ApiProductResponse;
import agh.boksaoracz.shopland.model.entity.Product;
import agh.boksaoracz.shopland.model.entity.UserRole;
import agh.boksaoracz.shopland.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class LoadDatabaseService {
    private static final String URL = "https://dummyjson.com/products?limit=500";
    private final ProductRepository productRepository;
    private final UserService userService;
    private final RestTemplate restTemplate;

    public void loadProductsToDatabase() {
        if (productRepository.count() > 0) {
            log.info("Not loading products, they are already loaded!");
            return;
        }
        var response = restTemplate.exchange(
                        URL,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<ApiProductResponse>() {
                        })
                .getBody()
                .getProducts();

        assert response != null;
        response.forEach(apiResponse -> {
            var product = Product.builder()
                    .name(apiResponse.getTitle())
                    .longDescription(apiResponse.getDescription())
                    .price(apiResponse.getPrice())
                    .availableAmount(apiResponse.getStock())
                    .imageUrl(apiResponse.getImages().getFirst())
                    .build();

            productRepository.save(product);
        });

    }

    public void loadUsersToDatabase() {

        if (!userService.existsByEmail("jerzy@mail.com")) {
            var jerzyCommand = UserDto.builder()
                    .email("jerzy@mail.com")
                    .name("Jerzy")
                    .password("password123")
                    .surname("Boksa")
                    .build();
            userService.createUser(jerzyCommand);
        }

        if (!userService.existsByEmail("mateusz@mail.com")) {
            var mateuszCommand = UserDto.builder()
                    .email("mateusz@mail.com")
                    .name("Mateusz")
                    .password("password123")
                    .surname("Oracz")
                    .build();
            userService.createUser(mateuszCommand);

        }

        if (!userService.existsByEmail("grzegorz@mail.com")) {
            var grzegorzCommand = UserDto.builder()
                    .email("grzegorz@mail.com")
                    .name("Grzegorz")
                    .password("password123")
                    .surname("Kunc")
                    .build();
            userService.createUser(grzegorzCommand);
        }

        if (!userService.existsByEmail("admin@mail.com")) {
            var grzegorzCommand = UserDto.builder()
                    .email("admin@mail.com")
                    .name("Admin")
                    .password("password123")
                    .surname("Admin")
                    .build();
            userService.createUser(grzegorzCommand, UserRole.ADMIN);
        }

    }

}
