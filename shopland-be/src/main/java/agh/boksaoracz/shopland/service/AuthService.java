package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.model.dto.LoginCommand;
import agh.boksaoracz.shopland.model.dto.LoginResponse;
import agh.boksaoracz.shopland.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository repository;

    public LoginResponse authenticateUser(LoginCommand loginCommand) {
        var user = repository.findByEmail(loginCommand.email()).orElseThrow(() -> new BadCredentialsException("Bad Credentials"));
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginCommand.email(), loginCommand.password()));
        var jwtToken = jwtService.buildToken(user);
        return new LoginResponse(jwtToken, user.getName(), user.getEmail(), user.getRole());
    }



}
