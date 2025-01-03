package agh.boksaoracz.shopland.service;

import agh.boksaoracz.shopland.model.dto.UserDto;
import agh.boksaoracz.shopland.model.entity.User;
import agh.boksaoracz.shopland.model.entity.UserRole;
import agh.boksaoracz.shopland.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.email());
        user.setName(userDto.name());
        user.setSurname(userDto.surname());
        user.setPassword(encryptPassword(userDto.password()));
        user.setRole(UserRole.USER);
        userRepository.save(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    private String encryptPassword(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }
}
