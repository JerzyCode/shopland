package agh.boksaoracz.shopland.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthFilter filter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> {
                    authorize.requestMatchers("/rest/api/auth/**").permitAll();
                    authorize.requestMatchers("/rest/api/products/**").permitAll();
                    authorize.anyRequest().authenticated();
                })
                .httpBasic(Customizer.withDefaults())
                .cors(cors -> cors
                        .configurationSource(request -> {
                            var corsConfiguration = new CorsConfiguration();
                            corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));
                            corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                            corsConfiguration.setAllowedHeaders(List.of("*"));
                            corsConfiguration.setAllowCredentials(true);
                            return corsConfiguration;
                        }))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}

