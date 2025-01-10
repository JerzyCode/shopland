package agh.boksaoracz.shopland.configuration;

import agh.boksaoracz.shopland.service.LoadDatabaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class FillDatabase {
    private final LoadDatabaseService loadDatabaseService;

    @Bean
    public CommandLineRunner run() {
        log.info("Load data...");
        return args -> {
            loadDatabaseService.loadUsersToDatabase();
            loadDatabaseService.loadProductsToDatabase();
        };
    }
}
