package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.LoginCommand;
import agh.boksaoracz.shopland.model.dto.LoginResponse;
import agh.boksaoracz.shopland.model.dto.UserDto;
import agh.boksaoracz.shopland.service.AuthService;
import agh.boksaoracz.shopland.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@RequestBody UserDto userDto) {
        if (userService.existsByEmail(userDto.email())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        userService.createUser(userDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginCommand loginCommand) {
        try {
            LoginResponse response = authService.authenticateUser(loginCommand);
            return ResponseEntity.ok(response);
        }
        catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
