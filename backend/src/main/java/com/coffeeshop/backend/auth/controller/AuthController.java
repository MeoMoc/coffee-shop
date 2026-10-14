package com.coffeeshop.backend.auth.controller;

import com.coffeeshop.backend.auth.security.JwtService;
import com.coffeeshop.backend.auth.dto.RegisterRequest;
import com.coffeeshop.backend.auth.dto.LoginRequest;
import com.coffeeshop.backend.user.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.*;
import com.coffeeshop.backend.user.entity.User;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthController(
        UserService userService,
        JwtService jwtService,
        AuthenticationManager authenticationManager
    ) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    };

    
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        User user = userService.createUser(request.getUsername(), request.getEmail(), request.getPassword(), request.getRole());
        return jwtService.generateToken(
            user.getId(),
            user.getUsername(),
            user.getRole().name()
        );
    }
    
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );
        
        User user = userService.findByUsername(request.getUsername());
        return jwtService.generateToken(
            user.getId(),
            user.getUsername(),
            user.getRole().name()
        );
    }
}
