package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.LoginCommand;
import agh.boksaoracz.shopland.model.dto.LoginResponse;
import agh.boksaoracz.shopland.model.dto.UserDto;
import agh.boksaoracz.shopland.model.entity.User;
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
            User user = (User) userService.loadUserByUsername(loginCommand.email());
            String jwtToken = authService.authenticateUser(user);
            return ResponseEntity.ok((new LoginResponse(jwtToken, user.getName(), user.getEmail(), user.getRole())));
        }
        catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
