package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.model.dto.UserDto;
import agh.boksaoracz.shopland.model.entity.User;
import agh.boksaoracz.shopland.model.entity.UserRole;
import agh.boksaoracz.shopland.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void createUser(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.email());
        user.setName(userDto.name());
        user.setSurname(userDto.surname());
        user.setPassword(passwordEncoder.encode(userDto.password()));
        user.setRole(UserRole.USER);
        userRepository.save(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}
