package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.model.entity.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public String authenticateUser(User user) {
        try {
            return jwtService.buildToken(user);
        } catch (BadCredentialsException ex) {
            throw new AuthenticationException("Invalid username or password."){};
        }
    }
}
