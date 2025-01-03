package agh.boksaoracz.shopland.controllers;

import agh.boksaoracz.shopland.model.dto.UserDto;
import agh.boksaoracz.shopland.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/auth/")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        if(userService.existsByEmail(userDto.email())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Użytkownik o podanym emailu lub telefonie już istnieje.");
        }

        userService.createUser(userDto);
        return ResponseEntity.ok("Użytkownik został pomyślnie zarejestrowany.");
    }


}
