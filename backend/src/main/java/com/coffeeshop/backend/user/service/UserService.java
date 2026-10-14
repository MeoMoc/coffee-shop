package com.coffeeshop.backend.user.service;

import com.coffeeshop.backend.common.exception.ConflictException;
import com.coffeeshop.backend.common.exception.UserNotFoundException;
import com.coffeeshop.backend.user.entity.User;
import com.coffeeshop.backend.enums.UserRoleE;
import com.coffeeshop.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User createUser(String username, String email, String password, UserRoleE role) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new ConflictException("Username already exist");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setRole(role);
        
        return userRepository.save(user);
    }
    
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
