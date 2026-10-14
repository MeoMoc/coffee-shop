package com.coffeeshop.backend.auth.dto;

import com.coffeeshop.backend.enums.UserRoleE;

public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private UserRoleE role;
    
    public String getUsername() {return username;}
    public String getEmail() {return email;}
    public String getPassword() {return password;}
    public UserRoleE getRole() {return role;}
    
    public void setUsername(String username) {this.username = username;}
    public void setEmail(String email) {this.email = email;}
    public void setPassword(String password) {this.password = password;}
    public void setRole(UserRoleE role) {this.role = role;}
    
}
